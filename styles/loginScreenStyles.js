import { StyleSheet } from 'react-native';

const loginScreenStyles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#000',
      justifyContent: 'center',
      paddingHorizontal: 20,
    },
    logoContainer: {
      alignItems: 'center',
      marginBottom: 20,
    },
    logo: {
      width: 170,
      height: 190,
    },
    title: {
      fontSize: 28,
      color: '#fff',
      textAlign: 'center',
      marginTop: 10,
    },
    titlelogin: {
      marginTop: 50,
      marginBottom: 20,
      fontSize: 22,
      color: '#fff',
      textAlign: 'center',
    },
    inputContainer: {
      backgroundColor: '#222',
      borderRadius: 10,
      marginBottom: 20,
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 10,
      height: 50,
      borderWidth: 1,
      borderColor: '#444',
    },
    input: {
      flex: 1,
      color: '#fff',
      fontSize: 11,
      fontFamily: 'PressStart2P-Regular',
      marginTop: 7,
    },
    inputIcon: {
      paddingRight: 10,
    },
    lockIcon: {
      paddingRight: 15,
      marginLeft: 3, // Adjust horizontal position
      alignSelf: 'center', // Ensures vertical alignment
    },
    placeholderText: {
      position: 'absolute',
      left: 45,
      top: 22,
      color: '#aaa',
      fontSize: 11,
      fontFamily: 'PressStart2P-Regular',
    },
    eyeIcon: {
      paddingLeft: 10,
    },
    loginButton: {
      backgroundColor: '#ff8c00',
      borderRadius: 50,
      padding: 15,
      alignItems: 'center',
      marginBottom: 20,
      // Shadow for iOS
      shadowColor: '#fff',          // Shadow color
      shadowOffset: { width: 50, height: 5 },  // Shadow direction and spread
      shadowOpacity: 0.2,           // Shadow opacity (change this for more/less shadow)
      shadowRadius: 10,             // Shadow blur radius
      // Elevation for Android
      elevation: 10,                // Elevation (Android shadow)
    },
    loginButtonText: {
      color: '#fff',
      fontSize: 14,
    },
    forgotPassword: {
      fontSize: 12,
      color: '#ff8c00',
      textAlign: 'center',
      marginBottom: 20,
      textDecorationLine: 'underline',
    },
    signUpText: {
      marginTop: 120,
      fontSize: 13,
      color: '#fff',
      textAlign: 'center',
    },
    signUpLink: {
      marginLeft: 5,
      color: '#ff8c00',
      textDecorationLine: 'underline',
      // Shadow for iOS
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.5,
      shadowRadius: 4,
      // Elevation for Android
      elevation: 4,
    },
    rememberMeContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 20,
    },
    checkbox: {
      marginRight: 10,
      padding: 10,
    },
    rememberMeText: {
      color: '#fff',
      fontSize: 12,
    },
  });
  
  export default loginScreenStyles;
  