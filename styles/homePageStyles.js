import { StyleSheet } from 'react-native';

const homePageStyles = StyleSheet.create({
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
  
  export default homePageStyles;
  