import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, SafeAreaView, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useFonts } from 'expo-font';
import { rtdb, ref, get } from '../firebaseConfig'; // Import Firebase functions
import styles from '../styles/leaderBoardsStyles';

const LeaderBoards = ({ navigation, route }) => {
  const { userId } = route.params; // Getting the userId from the route params
  const [username, setUsername] = useState('Guest'); // Default username
  const [score, setScore] = useState(0); // State to store the user's score
  const [loaded] = useFonts({
    'century-gothic': require('../assets/fonts/PressStart2P-Regular.ttf'),
  });

  // Sample leaderboard data
  const leaderboard = [
    { rank: 1, username: 'Player1', score: 1000 },
    { rank: 2, username: 'Player2', score: 900 },
    { rank: 3, username: 'Player3', score: 850 },
    { rank: 4, username: 'Player4', score: 800 },
    { rank: 5, username: 'Player5', score: 750 },
    { rank: 6, username: 'Player6', score: 700 },
    { rank: 7, username: 'Player7', score: 650 },
    { rank: 8, username: 'Player8', score: 600 },
    { rank: 9, username: 'Player9', score: 550 },
    { rank: 10, username: 'Player10', score: 500 },
  ];

  // Fetch user data from Firebase
  useEffect(() => {
    if (userId) {
      const userRef = ref(rtdb, `users/${userId}`);
      get(userRef)
        .then((snapshot) => {
          if (snapshot.exists()) {
            const userData = snapshot.val();
            setUsername(userData.username || 'Guest'); // Set the fetched username
            setScore(userData.score || 0); // Set the fetched score, default to 0
          }
        })
        .catch((error) => {
          console.error('Error fetching data: ', error);
        });
    }
  }, [userId]);

  if (!loaded) {
    return null; // Return null to avoid rendering unnecessary loading state
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.mainContent}>
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
            <Text style={styles.homeTitle}>Leaderboards</Text>
            <Image source={require('../images/isnek.png')} style={styles.logo} />
          </View>
        </LinearGradient>

        {/* Display the fetched username */}
        <Text style={styles.usernameText}>{`Welcome, ${username}`}</Text>

        <View style={styles.leaderboardContainer}>
          <Text style={styles.topText}>Top Players</Text>

          <ScrollView contentContainerStyle={styles.scrollContainer}>
            {leaderboard.map((player) => (
              <View key={String(player.rank)} style={styles.leaderboardRow}>
                <Text style={styles.rankText}>{String(player.rank)}</Text>
                <Text style={styles.usernameText}>{String(player.username)}</Text>
                <Text style={styles.scoreText}>{String(player.score)}</Text>
              </View>
            ))}
          </ScrollView>

          {/* Current user */}
          <View style={[styles.leaderboardRow, styles.currentUserContainer]}>
            <Text style={[styles.rankText, { color: '#FFD700' }]}>{String(leaderboard.length + 1)}</Text>
            <Text style={[styles.usernameText, { color: '#FFD700' }]}>{username}</Text>
            <Text style={[styles.scoreText, { color: '#FFD700' }]}>{String(score)}</Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default LeaderBoards;
