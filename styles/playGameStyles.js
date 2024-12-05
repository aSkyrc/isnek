import { StyleSheet } from 'react-native';

const playGameStyles = StyleSheet.create({
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
    usernameContainer: {
      position: 'absolute', // Position it at the top
      top: 150, // Adjust this position to where you want the username
      width: '100%',
      alignItems: 'center', // Center the username horizontally
    },
    usernameText: {
      fontSize: 30,
      color: '#fff',
      fontFamily: 'PressStart2P-Regular',
    },
    scoreContainer: {
      position: 'absolute', // Position it below the username
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
  
  export default playGameStyles;
  