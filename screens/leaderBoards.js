import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, SafeAreaView, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useFonts } from 'expo-font';

const LeaderBoards = ({ navigation }) => {
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

  // Sample current user data
  const currentUser = { rank: 19, username: 'Sky', score: 400 };

  // Load the Century Gothic font
  const [loaded] = useFonts({
    'century-gothic': require('../assets/fonts/PressStart2P-Regular.ttf'),
  });

  if (!loaded) {
    return <Text>Loading...</Text>; // Return a loading message while the font is loading
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
            <Image 
              source={require('../images/isnek.png')} 
              style={styles.logo}
            />
          </View>
        </LinearGradient>

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
            <Text style={[styles.rankText, { color: '#FFD700' }]}>
              {String(currentUser.rank)}
            </Text>
            <Text style={[styles.usernameText, { color: '#FFD700' }]}>
              {String(currentUser.username)}
            </Text>
            <Text style={[styles.scoreText, { color: '#FFD700' }]}>
              {String(currentUser.score)}
            </Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#000',
  },
  mainContent: {
    flex: 1,
    backgroundColor: '#000',
  },
  navbar: {
    paddingTop: 50,
    paddingHorizontal: 20,
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  backButton: {
    marginLeft: 8,
  },
  rightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: 40,
    height: 46,
    marginLeft: 15,
  },
  homeTitle: {
    fontFamily: 'century-gothic',
    color: '#ffffff',
    fontSize: 20,
  },
  leaderboardContainer: {
    flex: 1,
    paddingHorizontal: 10,
    marginTop: 30,
  },
  topText: {
    fontFamily: 'century-gothic',
    color: '#fff',
    fontSize: 25,
    marginBottom: 15,
    textAlign: 'center',
  },
  scrollContainer: {
    paddingBottom: 20,
  },
  leaderboardRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
    backgroundColor: 'transparent',
    borderRadius: 10,
    padding: 10,
  },
  rankText: {
    fontFamily: 'century-gothic',
    color: '#fff',
    fontSize: 18,
    width: '10%',
    textAlign: 'center',
  },
  usernameText: {
    fontFamily: 'century-gothic',
    color: '#fff',
    fontSize: 18,
    width: '60%',
    textAlign: 'center',
  },
  scoreText: {
    fontFamily: 'century-gothic',
    color: '#fff',
    fontSize: 18,
    width: '30%',
    textAlign: 'center',
  },
  currentUserContainer: {
    backgroundColor: 'transparent', 
    alignItems: 'center',
  },
});

export default LeaderBoards;
