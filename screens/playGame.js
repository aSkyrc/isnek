import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, SafeAreaView, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useFonts } from 'expo-font';
import { rtdb, ref, get, update, onValue } from '../firebaseConfig'; // Import Firebase functions
import styles from '../styles/playGameStyles';

const PlayGame = ({ navigation, route }) => {
  const { userId } = route.params;
  const [username, setUsername] = useState('');
  const [score, setScore] = useState(0);
  const [highestScore, setHighestScore] = useState(0);
  const [gameStatus, setGameStatus] = useState('');

  // Load the Press Start 2P font
  const [loaded] = useFonts({
    'PressStart2P-Regular': require('../assets/fonts/PressStart2P-Regular.ttf'),
  });

  // Fetch user data and high score from Firebase
  useEffect(() => {
    if (userId) {
      const userRef = ref(rtdb, `users/${userId}`);
      get(userRef).then((snapshot) => {
        if (snapshot.exists()) {
          const userData = snapshot.val();
          setUsername(userData.username || 'Guest');
          setHighestScore(userData.highScore || 0);
        }
      }).catch((error) => {
        console.error('Error fetching data: ', error);
      });
    }
  }, [userId]);

  // Monitor the game's score and game status in Firebase
  useEffect(() => {
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

    // Listen for changes in the highest score
    const highestScoreRef = ref(rtdb, `users/${userId}/highScore`);
    onValue(highestScoreRef, (snapshot) => {
      if (snapshot.exists()) {
        setHighestScore(snapshot.val());
      }
    });
  }, [userId]);

  const startGame = () => {
    if (!userId) {
      Alert.alert('Error', 'You must be logged in to play the game!');
      return;
    }

    const userGameRef = ref(rtdb, `users/${userId}`);
    update(userGameRef, { gameStatus: 'STARTED', score: 0 }).then(() => {
      setGameStatus('STARTED');
      setScore(0); // Reset score when game starts
    }).catch((error) => {
      console.error('Error starting game: ', error);
    });
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
              onPress={startGame}
              disabled={gameStatus === 'STARTED'}
            >
              <Text style={styles.startButtonText}>START</Text>
            </TouchableOpacity>
          </View>
        )}

        <View style={styles.bottomBar}>
          <Text style={styles.highestScoreText}>Highest Score: {highestScore}</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default PlayGame;

