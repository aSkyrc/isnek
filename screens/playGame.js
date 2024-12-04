import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, SafeAreaView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useFonts } from 'expo-font';

const PlayGame = ({ navigation }) => {
  // Game state
  const [score, setScore] = useState(0);
  const [highestScore, setHighestScore] = useState(0);

  // Load the Press Start 2P font
  const [loaded] = useFonts({
    'PressStart2P-Regular': require('../assets/fonts/PressStart2P-Regular.ttf'),
  });

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

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#000', // Ensures the background is black in the safe area
  },
  mainContent: {
    flex: 1,
    paddingBottom: 20,
    backgroundColor: '#000',
    justifyContent: 'space-between', // Ensures content is spaced between the top and bottom
  },
  navbar: {
    paddingTop: 50, // Add padding at the top for space
    paddingHorizontal: 20, // Horizontal padding for the navbar
    marginBottom: 20,
    flexDirection: 'row', // Make sure the navbar is row-based
    justifyContent: 'space-between', // Space between items
    alignItems: 'center', // Center items vertically
  },
  backButton: {
    marginLeft: 8, // Space between back button and the right items
  },
  rightContainer: {
    flexDirection: 'row',
    alignItems: 'center', // Center the title and logo vertically
  },
  logo: {
    width: 40,
    height: 46,
    marginLeft: 15, // Space between the home title and the logo
  },
  homeTitle: {
    color: '#ffffff',
    fontSize: 23,
    fontFamily: 'PressStart2P-Regular',
  },
  scoreContainer: {
    position: 'absolute', // Position it at the top
    top: 250, // Adjust to your preference
    width: '100%',
    alignItems: 'center', // Center the score horizontally
  },
  scoreText: {
    fontSize: 35,
    color: '#fff',
    fontFamily: 'PressStart2P-Regular',
  },
  gameArea: {
    flex: 1,
    justifyContent: 'center', // Centers content vertically
    alignItems: 'center', // Centers content horizontally
  },
  startButton: {
    marginTop: 20,
    backgroundColor: '#F98B00', 
    paddingVertical: 40,
    paddingHorizontal: 80,
    borderRadius: 50,
    shadowColor: '#fff',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 10,
    shadowRadius: 10,
    elevation: 5,
  },
  startButtonText: {
    fontSize: 25,
    color: '#fff', // Button text color set to white
    fontFamily: 'PressStart2P-Regular',
  },
  bottomBar: {
    height: 60,
    backgroundColor: '#transparent',
    justifyContent: 'center', // Align the text vertically
    alignItems: 'center', // Align the text horizontally
  },
  highestScoreText: {
    fontSize: 18,
    color: '#FFD700',
    fontFamily: 'PressStart2P-Regular',
  },
});

export default PlayGame;
