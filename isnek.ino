#include <MD_MAX72xx.h>
#include <SPI.h>
#include <Firebase_ESP_Client.h>
#include <WiFi.h>
#include <WebServer.h>
#include <ArduinoJson.h>

#define WIFI_SSID "wifi SSID"
#define WIFI_PASSWORD "your wifi password"

// Firebase credentials
#define API_KEY ""
#define DATABASE_URL ""
#define FIREBASE_AUTH ""

// Define the LED matrix and joystick
#define DATA_PIN 23
#define CLOCK_PIN 18
#define LOAD_PIN 5
#define JOY_VERT 34    // Analog pin for joystick vertical
#define JOY_HORIZ 35   // Analog pin for joystick horizontal
#define BUZZER_PIN 25  // Buzzer pin
#define HARDWARE_TYPE MD_MAX72XX::PAROLA_HW
#define MAX_DEVICES 1  // For a single 8x8 matrix

MD_MAX72XX M = MD_MAX72XX(HARDWARE_TYPE, DATA_PIN, CLOCK_PIN, LOAD_PIN);

int snakeLength = 2;
int snakeX[64];
int snakeY[64];

int foodX = 4;
int foodY = 4;

int direction = 0;
unsigned long lastFoodTime = 0;
bool snakeBody[8][8];

// Firebase Authentication variables
FirebaseData fbdo;
FirebaseAuth auth;
FirebaseConfig config;

WebServer server(80);

// Game state variables
int score = 0;
bool gameStarted = false;
unsigned long gameStartTime = 0;

String userUID = "";  

//reset the sequence of displayISNEK
int step = 0;



void handleStartGame() {
  if (server.method() == HTTP_POST) {
    String payload = server.arg("plain");
    DynamicJsonDocument doc(256);
    if (deserializeJson(doc, payload) == DeserializationError::Ok && doc.containsKey("uid")) {
      userUID = doc["uid"].as<String>();
      server.send(200, "application/json", "{\"status\":\"success\"}");
    } else {
      server.send(400, "application/json", "{\"status\":\"error\", \"message\":\"Invalid JSON\"}");
    }
  } else {
    server.send(405, "application/json", "{\"status\":\"error\", \"message\":\"Invalid method\"}");
  }
}

void setup() {
  Serial.begin(115200);


  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  Serial.print("Connecting to Wi-Fi...");
  while (WiFi.status() != WL_CONNECTED) {
    Serial.print(".");
    delay(500);
  }
  Serial.println();
  Serial.print("Connected with IP: ");
  Serial.println(WiFi.localIP());


  config.api_key = API_KEY;
  config.database_url = DATABASE_URL;
  config.signer.tokens.legacy_token = FIREBASE_AUTH;

  Firebase.begin(&config, &auth);
  Firebase.reconnectWiFi(true);

  if (Firebase.ready()) {
    Serial.println("Connected to Firebase!");
  } else {
    Serial.println("Failed to connect to Firebase.");
  }

  server.on("/startGame", HTTP_POST, handleStartGame);
  server.begin();
  Serial.println("Server started");

  Serial.println(ESP.getFreeHeap());

  M.begin();
  pinMode(JOY_VERT, INPUT);
  pinMode(JOY_HORIZ, INPUT);
  pinMode(BUZZER_PIN, OUTPUT);

  if (!gameStarted) {
    displayISNEK();
  }

  initSnake();
  drawFood();

  monitorGameState(userUID);
}

unsigned long previousMillis = 0;
const long interval = 259;

void loop() {
  server.handleClient();

  if (gameStarted) {
    unsigned long currentMillis = millis();
    if (currentMillis - previousMillis >= interval) {
      previousMillis = currentMillis;
      updateJoystick();
      moveSnake();
      checkCollision();
      checkFood();
      render();
    }
  } else {
    monitorGameState(userUID);
    
    // Only show the letters sequence if the game hasn't started yet
    if (!gameStarted) {
       displayISNEK();
    }
  }
}


void initSnake() {
  snakeX[0] = 3;
  snakeY[0] = 3;
  snakeX[1] = 3;
  snakeY[1] = 4;
  snakeBody[snakeX[0]][snakeY[0]] = true;
  snakeBody[snakeX[1]][snakeY[1]] = true;
}

void monitorGameState(String userUID) {
  if (userUID.isEmpty()) return;

  String gameStatus;
  if (Firebase.RTDB.getString(&fbdo, String("users/") + userUID + "/gameStatus", &gameStatus)) {
    if (gameStatus == "STARTED" && !gameStarted) {
      startGame(userUID);
    } else if (gameStatus == "ENDED" && gameStarted) {
      stopGame(userUID);
    }
  } else {
    Serial.println("Failed to fetch game state from Firebase");
  }
}

void startGame(String userUID) {
  gameStarted = true;
  score = 0;  // Reset score
  gameStartTime = millis();
  resetGame();

  if (Firebase.RTDB.setString(&fbdo, String("users/") + userUID + "/gameStatus", "RUNNING") && Firebase.RTDB.setInt(&fbdo, String("users/") + userUID + "/score", score)) {
    Serial.println("Game started and score reset in Firebase");
  } else {
    Serial.println("Failed to start game or reset score in Firebase");
  }

  M.clear();
  M.update();
}

void updateJoystick() {
  int vert = analogRead(JOY_VERT);
  int horiz = analogRead(JOY_HORIZ);

  if (vert < 500 && direction != 3) direction = 1;
  else if (vert > 3500 && direction != 1) direction = 3;
  else if (horiz < 500 && direction != 0) direction = 2;
  else if (horiz > 3500 && direction != 2) direction = 0;
}

void moveSnake() {
  int headX = snakeX[0];
  int headY = snakeY[0];

  if (direction == 0) headX++;
  else if (direction == 1) headY--;
  else if (direction == 2) headX--;
  else if (direction == 3) headY++;

  if (headX < 0) headX = 7;
  if (headX >= 8) headX = 0;
  if (headY < 0) headY = 7;
  if (headY >= 8) headY = 0;

  for (int i = snakeLength; i > 0; i--) {
    snakeX[i] = snakeX[i - 1];
    snakeY[i] = snakeY[i - 1];
    snakeBody[snakeX[i]][snakeY[i]] = true;
  }

  snakeX[0] = headX;
  snakeY[0] = headY;
  snakeBody[snakeX[0]][snakeY[0]] = true;
  M.setPoint(snakeX[0], snakeY[0], true);
}

void checkCollision() {
  for (int i = 1; i < snakeLength; i++) {
    if (snakeX[0] == snakeX[i] && snakeY[0] == snakeY[i]) {
      stopGame(userUID);
    }
  }
}

void drawFood() {
  M.setPoint(foodX, foodY, true);
}

void checkFood() {
  if (snakeX[0] == foodX && snakeY[0] == foodY) {
    snakeLength++;
    foodX = random(0, 8);
    foodY = random(0, 8);
    drawFood();
    digitalWrite(BUZZER_PIN, HIGH);
    delay(100);
    digitalWrite(BUZZER_PIN, LOW);
    score++;

    if (!Firebase.RTDB.setInt(&fbdo, String("users/") + userUID + "/score", score)) {
      Serial.println("Failed to update score in Firebase");
    }


    updateHighestScore();
  }
}

void updateHighestScore() {
  int highestScore = 0;

  if (Firebase.RTDB.getInt(&fbdo, String("users/") + userUID + "/highestScore", &highestScore)) {
    if (score > highestScore) {
      Firebase.RTDB.setInt(&fbdo, String("users/") + userUID + "/highestScore", score);
    }
  } else {
    Firebase.RTDB.setInt(&fbdo, String("users/") + userUID + "/highestScore", score);
  }
}

void stopGame(String userUID) {
  gameStarted = false;

  if (Firebase.RTDB.setString(&fbdo, String("users/") + userUID + "/gameStatus", "ENDED") &&
      Firebase.RTDB.setInt(&fbdo, String("users/") + userUID + "/score", score)) {
    Serial.println("Game ended, score saved in Firebase");
  } else {
    Serial.println("Failed to update game status or save score in Firebase");
  }

  updateHighestScore();

  displayGameOver();

  M.clear();
  M.update();

  step = 0; 

  while (!gameStarted) {
    displayISNEK();
    monitorGameState(userUID);
  }
}


void render() {
  M.clear();
  for (int i = 0; i < snakeLength; i++) {
    M.setPoint(snakeX[i], snakeY[i], true);
  }
  drawFood();
  M.update();
}

void displayGameOver() {
  M.clear();
  displayX();
  digitalWrite(BUZZER_PIN, HIGH);
  delay(2000);
  digitalWrite(BUZZER_PIN, LOW);
}

void resetGame() {
  snakeLength = 2;
  initSnake();
  foodX = random(0, 8);
  foodY = random(0, 8);
  memset(snakeBody, 0, sizeof(snakeBody));
}


void displayI() {
  M.setPoint(3, 0, true);
  M.setPoint(3, 1, true);
  M.setPoint(3, 2, true);
  M.setPoint(3, 3, true);
  M.setPoint(3, 4, true);
  M.setPoint(3, 5, true);
  M.setPoint(3, 6, true);
  M.setPoint(3, 7, true);
  M.update();
}

void displayS() {
  M.setPoint(1, 7, true);
  M.setPoint(2, 7, true);
  M.setPoint(3, 7, true);
  M.setPoint(4, 7, true);
  M.setPoint(5, 7, true);
  M.setPoint(6, 7, true);
  M.setPoint(7, 7, true);

  M.setPoint(0, 5, true);
  M.setPoint(0, 6, true);

  M.setPoint(1, 4, true);
  M.setPoint(2, 4, true);
  M.setPoint(3, 4, true);
  M.setPoint(4, 4, true);
  M.setPoint(5, 4, true);
  M.setPoint(6, 4, true);

  M.setPoint(7, 1, true);
  M.setPoint(7, 2, true);
  M.setPoint(7, 3, true);

  M.setPoint(1, 0, true);
  M.setPoint(2, 0, true);
  M.setPoint(3, 0, true);
  M.setPoint(4, 0, true);
  M.setPoint(5, 0, true);
  M.setPoint(6, 0, true);
  M.setPoint(0, 0, true);

  M.update();
}

void displayN() {
  M.setPoint(0, 7, true);
  M.setPoint(1, 6, true);
  M.setPoint(2, 5, true);
  M.setPoint(3, 4, true);
  M.setPoint(4, 3, true);
  M.setPoint(5, 2, true);
  M.setPoint(6, 1, true);
  M.setPoint(7, 0, true);

  M.setPoint(0, 0, true);
  M.setPoint(0, 1, true);
  M.setPoint(0, 2, true);
  M.setPoint(0, 3, true);
  M.setPoint(0, 4, true);
  M.setPoint(0, 5, true);
  M.setPoint(0, 6, true);
  M.setPoint(0, 7, true);

  M.setPoint(7, 0, true);
  M.setPoint(7, 1, true);
  M.setPoint(7, 2, true);
  M.setPoint(7, 3, true);
  M.setPoint(7, 4, true);
  M.setPoint(7, 5, true);
  M.setPoint(7, 6, true);
  M.setPoint(7, 7, true);

  M.update();
}

void displayE() {
  M.setPoint(0, 7, true);
  M.setPoint(1, 7, true);
  M.setPoint(2, 7, true);
  M.setPoint(3, 7, true);
  M.setPoint(4, 7, true);
  M.setPoint(5, 7, true);
  M.setPoint(6, 7, true);
  M.setPoint(7, 7, true);

  M.setPoint(0, 6, true);
  M.setPoint(0, 5, true);
  M.setPoint(0, 4, true);
  M.setPoint(0, 3, true);
  M.setPoint(0, 2, true);
  M.setPoint(0, 1, true);
  M.setPoint(0, 0, true);

  M.setPoint(1, 4, true);
  M.setPoint(2, 4, true);
  M.setPoint(3, 4, true);
  M.setPoint(4, 4, true);
  M.setPoint(5, 4, true);


  M.setPoint(1, 0, true);
  M.setPoint(2, 0, true);
  M.setPoint(3, 0, true);
  M.setPoint(4, 0, true);
  M.setPoint(4, 0, true);
  M.setPoint(5, 0, true);
  M.setPoint(6, 0, true);
  M.setPoint(7, 0, true);

  M.update();
}

void displayK() {
  M.setPoint(1, 0, true);
  M.setPoint(1, 1, true);
  M.setPoint(1, 2, true);
  M.setPoint(1, 3, true);
  M.setPoint(1, 4, true);
  M.setPoint(1, 5, true);
  M.setPoint(1, 6, true);
  M.setPoint(1, 7, true);

  M.setPoint(2, 3, true);
  M.setPoint(2, 4, true);

  M.setPoint(3, 2, true);
  M.setPoint(3, 5, true);

  M.setPoint(4, 1, true);
  M.setPoint(4, 6, true);

  M.setPoint(5, 0, true);
  M.setPoint(5, 7, true);

  M.update();
}


void displayX() {
  M.setPoint(0, 0, true);
  M.setPoint(1, 1, true);
  M.setPoint(2, 2, true);
  M.setPoint(3, 3, true);
  M.setPoint(4, 4, true);
  M.setPoint(5, 5, true);
  M.setPoint(6, 6, true);
  M.setPoint(7, 7, true);

  M.setPoint(0, 7, true);
  M.setPoint(1, 6, true);
  M.setPoint(2, 5, true);
  M.setPoint(3, 4, true);
  M.setPoint(4, 3, true);
  M.setPoint(5, 2, true);
  M.setPoint(6, 1, true);
  M.setPoint(7, 0, true);
}

void displayISNEK() {
  static unsigned long lastUpdate = 0; // Tracks the last update time
  const unsigned long interval = 1000; // Time between letters

  unsigned long currentMillis = millis();

  if (gameStarted) {
    step = 0;                          // Reset the step for next time
    return;
  }

  if (currentMillis - lastUpdate >= interval) {
    lastUpdate = currentMillis;

    M.clear();
    switch (step) {
      case 0:
        displayI();
        break;
      case 1:
        displayS();
        break;
      case 2:
        displayN();
        break;
      case 3:
        displayE();
        break;
      case 4:
        displayK();
        break;
      default:
        step = 0; // Reset to the first letter
        return;
    }

    step++; // Move to the next letter
    M.update();
  }
}



