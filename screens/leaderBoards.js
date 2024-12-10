import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, SafeAreaView, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useFonts } from 'expo-font';
import { rtdb, ref, get } from '../firebaseConfig'; // Import Firebase functions
import styles from '../styles/leaderBoardsStyles';
import { getAuth } from 'firebase/auth';

const LeaderBoards = ({ navigation }) => {
  const [username, setUsername] = useState('Guest'); // Default username
  const [highestScore, setHighestScore] = useState(0); // State to store the user's highest score
  const [leaderboardData, setLeaderboardData] = useState([]); // State to store leaderboard data
  const [userRank, setUserRank] = useState(null); // State to store the user's rank
  const [loaded] = useFonts({
    'century-gothic': require('../assets/fonts/PressStart2P-Regular.ttf'),
  });

  // Fetch user data from Firebase
  useEffect(() => {
    const auth = getAuth();
    const currentUser = auth.currentUser;

    if (currentUser) {
      const userId = currentUser.uid;
      const userRef = ref(rtdb, `users/${userId}`);

      // Fetch current user's data (username, highestScore)
      get(userRef)
        .then((snapshot) => {
          if (snapshot.exists()) {
            const userData = snapshot.val();
            setUsername(userData.username || 'Guest'); // Set the fetched username
            setHighestScore(userData.highestScore || 0); // Set the fetched highest score, default to 0
          }
        })
        .catch((error) => {
          console.error('Error fetching user data: ', error);
        });
    }

    // Fetch leaderboard data
    const leaderboardRef = ref(rtdb, 'users');
    get(leaderboardRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          const leaderboard = Object.keys(data).map((key) => ({
            uid: key,
            username: data[key].username || 'Guest', // Default to 'Guest' if username is null
            highestScore: data[key].highestScore || 0, // Default to 0 if highestScore is null
          }));

          // Sort leaderboard by highestScore
          leaderboard.sort((a, b) => b.highestScore - a.highestScore);

          // Find the user's rank in the leaderboard
          const userIndex = leaderboard.findIndex(player => player.username === username);
          setUserRank(userIndex !== -1 ? userIndex + 1 : null); // Set rank if user is found, otherwise null

          setLeaderboardData(leaderboard); // Update leaderboard state
        }
      })
      .catch((error) => {
        console.error('Error fetching leaderboard data: ', error);
      });
  }, [username]); // Re-run when the username changes

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

        <View style={styles.leaderboardContainer}>
          <Text style={styles.topText}>Top Players</Text>

          <ScrollView contentContainerStyle={styles.scrollContainer}>
            {leaderboardData.map((player, index) => (
              <View key={player.uid} style={styles.leaderboardRow}>
                <Text style={styles.rankText}>{index + 1}</Text>
                <Text style={styles.usernameText}>{player.username}</Text>
                <Text style={styles.scoreText}>{player.highestScore}</Text>
              </View>
            ))}
          </ScrollView>

          {/* Current user */}
          {userRank && (
            <View style={[styles.leaderboardRow, styles.currentUserContainer]}>
              <Text style={[styles.rankText, { color: '#FFD700' }]}>{userRank}</Text>
              <Text style={[styles.usernameText, { color: '#FFD700' }]}>{username}</Text>
              <Text style={[styles.scoreText, { color: '#FFD700' }]}>{highestScore}</Text>
            </View>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default LeaderBoards;
