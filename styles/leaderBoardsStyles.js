import { StyleSheet } from 'react-native';

const leaderBoardsStyles = StyleSheet.create({
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
  
  export default leaderBoardsStyles;
  