import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, SafeAreaView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useFonts } from 'expo-font';
import { rtdb, ref, get } from '../firebaseConfig'; // Import Firebase functions
import styles from '../styles/playGameStyles';

const PlayGame = ({ navigation, route }) => {
  const { userId } = route.params; // Get userId from route params or props
  const [username, setUsername] = useState(''); // State to store username
  const [score, setScore] = useState(0);
  const [highestScore, setHighestScore] = useState(0);

  // Load the Press Start 2P font
  const [loaded] = useFonts({
    'PressStart2P-Regular': require('../assets/fonts/PressStart2P-Regular.ttf'),
  });

  // Fetch user data from Firebase
  useEffect(() => {
    if (userId) {
      const userRef = ref(rtdb, `users/${userId}`);
      get(userRef).then((snapshot) => {
        if (snapshot.exists()) {
          const userData = snapshot.val();
          setUsername(userData.username || 'Guest'); // Set username or 'Guest' if no username
        } else {
          console.log("No user data available");
        }
      }).catch((error) => {
        console.error("Error fetching data: ", error);
      });
    }
  }, [userId]);

  if (!loaded) {
    return null; // Optionally return a loading indicator
  }

  const handleStartGame = () => {
    // Reset score and navigate to the game screen
    setScore(0);
    navigation.navigate('GameScreen'); // Replace 'GameScreen' with your actual game screen
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.mainContent}>
        {/* Navbar */}
        <LinearGradient 
          colors={['rgba(249, 139, 0, 0.7)', 'rgba(249, 139, 0, 0.35)', '#000000']} 
          style={styles.navbar}
        >
          <TouchableOpacity 
            style={styles.backButton} 
            onPress={() => navigation.goBack()} // Navigate back to the previous screen
          >
            <Icon name="chevron-left" size={24} color="#ffffff" />
          </TouchableOpacity>

          <View style={styles.rightContainer}>
            <Text style={styles.homeTitle}>Play Game</Text>
            <Image 
              source={require('../images/isnek.png')} // Adjust the path as necessary
              style={styles.logo}
            />
          </View>
        </LinearGradient>

        {/* Username Section */}
        <View style={styles.usernameContainer}>
          {/* Display Username */}
          <Text style={styles.usernameText}>{`Hello, ${username}`}</Text>
        </View>

        {/* Score Section */}
        <View style={styles.scoreContainer}>
          {/* Current Score */}
          <Text style={styles.scoreText}>Score: {score}</Text>
        </View>

        {/* Middle Content */}
        <View style={styles.gameArea}>
          {/* Start Game Button */}
          <TouchableOpacity style={styles.startButton} onPress={handleStartGame}>
            <Text style={styles.startButtonText}>START</Text>
          </TouchableOpacity>
        </View>

        {/* Bottom Bar */}
        <View style={styles.bottomBar}>
          <Text style={styles.highestScoreText}>Highest Score: {highestScore}</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default PlayGame;
