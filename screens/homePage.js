import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, SafeAreaView, ActivityIndicator, ScrollView, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage
import { useFonts } from 'expo-font';
import { rtdb, ref, get } from '../firebaseConfig'; // Import Firebase methods

const HomePage = ({ navigation, route }) => {
  const { userId } = route.params;
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState('Home');

  const [loaded] = useFonts({
    'PressStart2P-Regular': require('../assets/fonts/PressStart2P-Regular.ttf'),
  });

  useEffect(() => {
    if (userId) {
      const userRef = ref(rtdb, `users/${userId}`);
      get(userRef)
        .then((snapshot) => {
          if (snapshot.exists()) {
            setUsername(snapshot.val().username);
          } else {
            console.log('No user data available');
          }
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching data: ', error);
          setLoading(false);
        });
    }
  }, [userId]);

  const logout = async () => {
    try {
      Alert.alert('Logout', 'Are you sure you want to log out?', [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Logout',
          onPress: async () => {
            // Clear userId from AsyncStorage
            await AsyncStorage.removeItem('userId');

            // Navigate to Login screen
            navigation.navigate('Login');
          },
        },
      ]);
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  if (loading || !loaded) {
    return <ActivityIndicator size="large" color="#fff" style={{ flex: 1, justifyContent: 'center', backgroundColor: '#000' }} />;
  }

  const renderContent = () => {
    switch (currentPage) {
      case 'Home':
        return (
          <ScrollView style={styles.scrollContent}>
            <View style={styles.homepageContainer}>
              <View style={styles.underline} />
              <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('PlayGame', { userId: userId })}>
                <View style={styles.cardContent}>
                  <Image source={require('../images/gamelogo.png')} style={styles.cardImage} />
                  <View style={styles.cardDescriptionContainer}>
                    <Text style={[styles.cardTitle, { fontFamily: 'PressStart2P-Regular' }]}>PLAY GAME</Text>
                  </View>
                </View>
              </TouchableOpacity>
              <View style={styles.underlineMiddle} />
              <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('LeaderBoards', { userId: userId })}>
                <View style={styles.cardContent}>
                  <View style={{ flex: 1 }}>
                    <View style={styles.cardDescriptionContainer}>
                      <Text style={[styles.cardTitle, { fontFamily: 'PressStart2P-Regular' }]}>LEADERBOARDS</Text>
                    </View>
                  </View>
                  <Image source={require('../images/trophy.png')} style={styles.cardImage} />
                </View>
              </TouchableOpacity>
              <View style={styles.underline} />
            </View>
          </ScrollView>
        );
      case 'AboutUs':
        return (
          <ScrollView style={styles.scrollContent}>
            {renderAboutUsTeam()}
          </ScrollView>
        );
      default:
        return null;
    }
  };

  const renderAboutUsTeam = () => {
    // Render the About Us team members here...
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient colors={['rgba(249, 139, 0, 0.7)', 'rgba(249, 139, 0, 0.30)', '#000000']} style={styles.navbar}>
        <View style={styles.logoContainer}>
          <Image source={require('../images/isnek.png')} style={styles.logo} />
          <Text style={[styles.homeTitle, { fontFamily: 'PressStart2P-Regular' }]}>{currentPage === 'Home' ? 'Home' : 'About Us'}</Text>
        </View>
      </LinearGradient>

      <Text style={styles.usernameText}>{username ? `Welcome, ${username}` : 'Loading username...'}</Text>

      {renderContent()}

      <View style={styles.footer}>
        <TouchableOpacity style={styles.footerButton} onPress={() => setCurrentPage('Home')}>
          <Icon name="home" size={24} color={currentPage === 'Home' ? '#FFA500' : '#aaa'} />
          <Text style={[styles.footerText, { fontFamily: 'PressStart2P-Regular', color: currentPage === 'Home' ? '#FFA500' : '#ffffff' }]}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.footerButton} onPress={() => setCurrentPage('AboutUs')}>
          <Icon name="star" size={24} color={currentPage === 'AboutUs' ? '#FFA500' : '#aaa'} />
          <Text style={[styles.footerText, { fontFamily: 'PressStart2P-Regular', color: currentPage === 'AboutUs' ? '#FFA500' : '#ffffff' }]}>About Us</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.footerButton} onPress={logout}>
          <Icon name="sign-out" size={24} color={'#aaa'} />
          <Text style={[styles.footerText, { fontFamily: 'PressStart2P-Regular' }]}>Logout</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },

  scrollContent: {
    flex: 1,
    paddingBottom: 10,
  },
  homepageContainer: {
    marginVertical: 70,
  },
  navbar: {
    padding: 10,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
  },
  logo: {
    width: 40,
    height: 46,
    marginRight: 15,
    marginTop: 40,
  },
  homeTitle: {
    marginTop: 50,
    color: '#ffffff',
    fontSize: 25,
  },
  card: {
    marginVertical: 15,
    padding: 10,
    backgroundColor: 'transparent',
    alignItems: 'flex-start',
    paddingHorizontal: 20,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  cardImage: {
    width: 150,
    height: 200,
    borderRadius: 30,
    marginRight: 15,
    marginBottom: 15,
    objectFit: 'contain',
  },
  cardDescriptionContainer: {
    flex: 1,
    marginVertical: 80,
    justifyContent: 'center', // Center vertically
    alignItems: 'center',    // Center horizontally
  },
  
  cardTitle: {
    textAlign: 'center',
    fontSize: 20,
    color: '#ffffff',
    textDecorationLine: 'underline',
    alignSelf: 'center', // Center horizontally
    flex: 1,            // Allow the text to take up space in the container
  },
  
  underline: {
    height: 1, // Height of the underline
    backgroundColor: '#ffffff', // Color of the underline
    marginVertical: 5, // Space around the underline
    marginHorizontal: 15,
    alignItems: 'center',
  },
  underlineMiddle: {
    height: 1, // Height of the underline
    backgroundColor: '#ffffff', // Color of the underline
    marginVertical: 5, // Space around the underline
    marginHorizontal: 15,
    alignItems: 'center',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#000',
    padding: 10,
  },
  footerButton: {
    alignItems: 'center',
  },
  footerText: {
    marginTop: 5,
    color: '#ffffff',
    fontSize: 10,
  },
  aboutCard: {
    marginLeft: 15,
    marginRight: 15,
    marginVertical: 10,
    padding: 20,
    borderRadius: 20,
    backgroundColor: '#222222',
    paddingHorizontal: 20,
    height: 250,
  },
  aboutCardContent: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  aboutTeamImage: {
    width: 60,
    height: 60,
    marginLeft: 5,
    borderRadius: 30,
    marginRight: 5,
  },
  aboutCardTitle: {
    marginTop: 10,
    fontSize: 17,
    left: 10,
    marginBottom: 5,
    color: '#ffffff',
  },
  aboutCardDescriptionContainer: {
    flex: 1,
  },
  aboutCardDescription: {
    fontSize: 16,
    top: 10,
    paddingHorizontal: 13,
    fontWeight: 'bold',
    textAlign: 'justify',
    color: '#ffffff',
    maxHeight: 200,
    overflow: 'hidden',
  },
  aboutCardDescriptionTitle: {
    fontSize: 16,
    paddingHorizontal: 13,
    fontWeight: 'bold',
    textAlign: 'justify',
    color: '#5A5A5A',
    maxHeight: 200,
    overflow: 'hidden',
  },
  aboutUnderline: {
    height: 1,
    backgroundColor: '#ffffff',
    width: '100%',
    marginTop: 20,
  },
  aboutIntroductionContainer: {
    padding: 20,
  },
  aboutIntroductionText: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
  },
});

export default HomePage;
