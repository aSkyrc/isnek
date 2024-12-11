import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Alert, SafeAreaView, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useFonts } from 'expo-font';
import { rtdb, ref, get, onValue, set } from '../firebaseConfig'; // Import Firebase functions
import styles from '../styles/playGameStyles';

const PlayGame = ({ navigation, route }) => {
  const { userId } = route.params;
  const [username, setUsername] = useState('');
  const [score, setScore] = useState(0);
  const [highestScore, setHighestScore] = useState(null); // Start with null to differentiate from 0
  const [gameStatus, setGameStatus] = useState('');
  const [loading, setLoading] = useState(false); // Define loading state

  // Load the Press Start 2P font
  const [loaded] = useFonts({
    'PressStart2P-Regular': require('../assets/fonts/PressStart2P-Regular.ttf'),
  });

  // Fetch user data and high score from Firebase
  useEffect(() => {
    if (userId) {
      const userRef = ref(rtdb, `users/${userId}`);

      // Fetch user data including the highest score
      get(userRef).then((snapshot) => {
        if (snapshot.exists()) {
          const userData = snapshot.val();
          setUsername(userData.username || 'Guest');
          setHighestScore(userData.highestScore || null); // Ensure highestScore is set as null if not found
          console.log('User Data:', userData); // Debugging line to check user data
        }
      }).catch((error) => {
        console.error('Error fetching data: ', error);
      });

      // Monitor the game's score and game status in Firebase (for real-time updates)
      const gameStatusRef = ref(rtdb, `users/${userId}/gameStatus`);
      onValue(gameStatusRef, (snapshot) => {
        if (snapshot.exists()) {
          const status = snapshot.val();
          setGameStatus(status);
          if (status === 'ENDED') {
            // Reset score and show the start button again
            setScore(0); // Reset score when the game ends
          }
        }
      });

      // Listen for changes in the score from Firebase
      const scoreRef = ref(rtdb, `users/${userId}/score`);
      onValue(scoreRef, (snapshot) => {
        if (snapshot.exists()) {
          setScore(snapshot.val());
        }
      });
    }
  }, [userId]);

  const startGame = async () => {
    if (!userId) {
      Alert.alert('Error', 'You must be logged in to play the game!');
      return;
    }
  
    setLoading(true);
  
    try {
      console.log('Attempting to start the game with userId:', userId);
  
      // Update gameStatus in Firebase
      const gameStatusRef = ref(rtdb, `users/${userId}/gameStatus`);
      await set(gameStatusRef, 'STARTED');
  
      // Start the game by sending the request to the ESP32 server
      const response = await fetch('http://192.168.0.117/startGame', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ uid: userId }),
      });
  
      console.log('Response status:', response.status); // Log the status code
  
      if (response.ok) {
        const data = await response.json();
        console.log('ESP32 Server Response:', data);
  
        if (data.status === 'success') {
          setGameStatus('STARTED'); // Update local state to reflect the change
          setScore(0); // Reset the score when the game starts
        } else {
          Alert.alert('Error', 'Failed to start the game on the ESP32!');
        }
      } else {
        console.error('Server Error:', response.status);
        Alert.alert('Server Error', `Error: ${response.status}`);
      }
    } catch (error) {
      console.error('Network Error:', error); // Log the error for debugging
      Alert.alert('Network Error', 'Unable to connect to the server.');
    } finally {
      setLoading(false);
    }
  };
  
  
  if (!loaded) return null;

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.mainContent}>
        <LinearGradient
          colors={['rgba(249, 139, 0, 0.7)', 'rgba(249, 139, 0, 0.35)', '#000000']}
          style={styles.navbar}
        >
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Icon name="chevron-left" size={24} color="#ffffff" />
          </TouchableOpacity>
          <View style={styles.rightContainer}>
            <Text style={styles.homeTitle}>Play Game</Text>
            <Image source={require('../images/isnek.png')} style={styles.logo} />
          </View>
        </LinearGradient>

        <View style={styles.usernameContainer}>
          <Text style={styles.usernameText}>Hello, {username}</Text>
        </View>

        <View style={styles.scoreContainer}>
          <Text style={styles.scoreText}>Score: {score}</Text>
        </View>

        {gameStatus === 'ENDED' && (
          <View style={styles.gameOverContainer}>
            <Text style={styles.gameOverText}>Game Over!</Text>
          </View>
        )}

        {gameStatus !== 'STARTED' && (
          <View style={styles.gameArea}>
            <TouchableOpacity
              style={[styles.startButton, gameStatus === 'STARTED' && styles.disabledButton]}
              onPress={() => {
                console.log("Start button pressed");
                startGame();  // Call startGame when the button is pressed
              }}
              disabled={gameStatus === 'STARTED'}
            >
              <Text style={styles.startButtonText}>START</Text>
            </TouchableOpacity>
          </View>
        )}

        {loading && (
          <View style={styles.loadingContainer}>
            <Text>Loading...</Text>
          </View>
        )}

        <View style={styles.bottomBar}>
          <Text style={styles.highestScoreText}>
            Highest Score: {highestScore !== null ? highestScore : '0'}
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default PlayGame;
