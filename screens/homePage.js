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
        name: 'Anthonie Cotanda', 
        role: 'UI/UX - React Native Developer', 
        image: require('../images/cotanda.webp'), 
        description: 'I am the React Native Developer of this group, I implemented all the Designs made by our designer. I am also the leader of this group, and I am the one who handles all the tasks of our members. In terms of suggestions, I am very open about the ideas of my members, and I am also giving my thoughts and suggestions to them.'
      },
      { 
        name: 'Robles, Renel Nathan Angelo', 
        role: 'UI/UX - Figma Designer and 60,30,10 Rule', 
        image: require('../images/Robles.jpg'), 
        description: 'I am the Figma Designer Developer of this group, I designed our Figma prototype, and I also got some help from our Leader, He gives me suggestions about our Figma designs. I also handle the 60,30,10 Rule, which is the color palette of our project. I use black, orange, and white colors to match the theme of our own app logo.'
      },
      { 
        name: 'Alfonso, Raijen', 
        role: 'User Persona', 
        image: require('../images/Raijen.jpg'), 
        description: 'As a user persona, we talked about what will be the outcome of what we will do, especially in designing to make it attractive to the audience.'
      },
      { 
        name: 'Castro, Crystal Raven', 
        role: 'Color Theory', 
        image: require('../images/castro.jpg'), 
        description: 'In color theory, we only choose a good color that is good to look at not too dazzling and the color that matches our theme so that it is not difficult to identify what out theme is.'
      },
      { 
        name: 'Apolinar, Julien', 
        role: 'Lazy thinking prototype', 
        image: require('../images/apolinar.jpg'), 
        description: 'In lazy thinking prototype presenting a prototype that users can interact with, designers can gather insights on usablity and identify potential issues early in the design process.'
      },
      { 
        name: 'Montalban, John Mark', 
        role: 'Typography', 
        image: require('../images/Montalban.jpg'), 
        description: 'In typhography, we chose proper fonts that can be read from a distance, not totally too big or small, as long as they attract when you read or understand them.'
      },
      { 
        name: 'Vallejo Carlos', 
        role: 'Spacing', 
        image: require('../images/vallejo.jpg'), 
        description: 'In creating visual balance, organization, and readability in any design, including digital interfaces, printed materials, and even musical scores.'
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
