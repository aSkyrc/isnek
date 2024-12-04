import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, SafeAreaView, ActivityIndicator, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useFonts } from 'expo-font';

const HomePage = ({ navigation }) => {
  const [currentPage, setCurrentPage] = useState('Home');

  // Century Gothic font
  const [loaded] = useFonts({
    'PressStart2P-Regular': require('../assets/fonts/PressStart2P-Regular.ttf'),
  });

  // Display an activity indicator until the font is loaded
  if (!loaded) {
    return <ActivityIndicator size="large" color="#fff" style={{ flex: 1, justifyContent: 'center', backgroundColor: '#000' }} />;
  }

  const renderContent = () => {
    switch (currentPage) {
      case 'Home':
        return (
          <ScrollView style={styles.scrollContent}>
           <View style={styles.homepageContainer}>
              <View style={styles.underline} />
              <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('PlayGame')}>
                <View style={styles.cardContent}>
                  <Image 
                    source={require('../images/gamelogo.png')}
                    style={styles.cardImage}
                  />
                  <View style={styles.cardDescriptionContainer}>
                    <Text style={[styles.cardTitle, { fontFamily: 'PressStart2P-Regular' }]}>PLAY GAME</Text>
                  </View>
                </View>
              </TouchableOpacity>
              <View style={styles.underlineMiddle} />
              {/* Cultural Music Card */}
              <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('LeaderBoards')}>
                <View style={styles.cardContent}>
                  <View style={{ flex: 1 }}>
                    <View style={styles.cardDescriptionContainer}>
                      <Text style={[styles.cardTitle, { fontFamily: 'PressStart2P-Regular' }]}>LEADERBOARDS</Text>
                    </View>
                  </View>
                  <Image 
                    source={require('../images/trophy.png')}
                    style={styles.cardImage}
                  />
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
      {/* Navbar with logo and title */}
      <LinearGradient colors={['rgba(249, 139, 0, 0.7)', 'rgba(249, 139, 0, 0.30)', '#000000']} style={styles.navbar}>
        <View style={styles.logoContainer}>
          <Image 
            source={require('../images/isnek.png')}
            style={styles.logo}
          />
          <Text style={[styles.homeTitle, { fontFamily: 'PressStart2P-Regular' }]}>
            {currentPage === 'Home' ? 'Home' : 'About Us'}
          </Text>
        </View>
      </LinearGradient>

      {renderContent()}

      {/* Footer Navigation */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.footerButton}
          onPress={() => setCurrentPage('Home')}
        >
          <Icon name="home" size={24} color={currentPage === 'Home' ? '#FFA500' : '#aaa'} />
          <Text style={[styles.footerText, { fontFamily: 'PressStart2P-Regular', color: currentPage === 'Home' ? '#FFA500' : '#ffffff' }]}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.footerButton}
          onPress={() => setCurrentPage('AboutUs')}
        >
          <Icon name="star" size={24} color={currentPage === 'AboutUs' ? '#FFA500' : '#aaa'} />
          <Text style={[styles.footerText, { fontFamily: 'PressStart2P-Regular', color: currentPage === 'AboutUs' ? '#FFA500' : '#ffffff' }]}>About Us</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.footerButton}
          onPress={() => navigation.navigate('Login')}
        >
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
