import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, SafeAreaView, ActivityIndicator, ScrollView, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage
import { useFonts } from 'expo-font';
import { rtdb, ref, get } from '../firebaseConfig'; // Import Firebase methods
import { update } from 'firebase/database'; // Make sure to import update
import styles from '../styles/homePageStyles';

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
            setUsername(snapshot.val().username); // Set the username from Firebase
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
          // Update user status to LOGGED_OUT in Firebase
          const userRef = ref(rtdb, `users/${userId}`);
          await update(userRef, {
            status: 'LOGGED_OUT', // Update status to logged out
          });

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
    const aboutUsMembers = [
      { 
        name: 'Aronales, Angelyn', 
        role: 'Project Manager', 
        image: require('../images/angelyn.jpg'), 
        description: 'Ang buhay parang life, walang life kung wala si kurt ❤'
      },
      { 
        name: 'Robles, Renel Nathan Angelo', 
        role: 'UI/UX Developer', 
        image: require('../images/Robles.jpg'), 
        description: 'Kapag may kinana, may mabubuong bata.'
      },
      { 
        name: 'Gamo, Stanley', 
        role: 'Frontend Developer', 
        image: require('../images/gamo.jpg'), 
        description: "Hangga't may paa, may ilalakad."
      },
      { 
        name: 'Anthonie Cotanda', 
        role: 'Backend Developer', 
        image: require('../images/cotanda.webp'), 
        description: 'Shabu shabu lang sa daan'
      },
      { 
        name: 'Atay, Sweet Lea', 
        role: 'Database Administrator', 
        image: require('../images/sweet.jpg'), 
        description: 'Working night shift and surviving off water is my motto lol'
      },
      { 
        name: 'Castro, Crystal Raven', 
        role: 'Assurance Specialist', 
        image: require('../images/castro.jpg'), 
        description: 'Better to be late than to be absent.'
      },
      { 
        name: 'Apolinar, Julien', 
        role: 'Release Manager', 
        image: require('../images/apolinar.jpg'), 
        description: 'Believe in your self and your dreams.'
      },
      { 
        name: 'Alfonso, Raijen', 
        role: 'User Insights Specialists', 
        image: require('../images/Raijen.jpg'), 
        description: 'Kung ang balon sa gilid ng damo, ang semento ay mag - gigisa ng sapatos ng liwanag.'
      },

      
    ];
  
    return aboutUsMembers.map((member, index) => (
      <View key={index} style={styles.aboutCard}>
        <View style={styles.aboutCardContent}>
          <Image source={member.image} style={styles.aboutTeamImage} />
          <View style={styles.aboutCardDescriptionContainer}>
            <Text style={[styles.aboutCardTitle, { fontFamily: 'PressStart2P-Regular' }]}>{member.name}</Text>
            <Text style={[styles.aboutCardDescriptionTitle, { fontFamily: 'PressStart2P-Regular' }]}>{member.role}</Text>
          </View>
        </View>
        <View style={styles.aboutUnderline} />
        <Text style={[styles.aboutCardDescription, { fontFamily: 'PressStart2P-Regular', marginTop: 10 }]}>{member.description}</Text>
      </View>
    ));
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

export default HomePage;
