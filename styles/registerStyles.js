import { StyleSheet } from 'react-native';


const registerStyles = StyleSheet.create({
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
      marginBottom: 20,
      fontSize: 20,
      color: '#fff',
      textAlign: 'center',
    },
    inputContainer: {
      backgroundColor: '#222',
      borderRadius: 10,
      marginBottom: 20,
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 5,
      height: 50,
      borderWidth: 1,
      borderColor: '#444',
    },
    input: {
      marginTop: 5,
      padding: 15,
      color: '#fff',
      fontSize: 11,
      flex: 1,
    },
    usericon: {
      marginLeft: 15,  // Adjust the icon to the left for better alignment
    },
    emailicon: {
      marginLeft: 10,  // Adjust the icon to the left for better alignment
    },
    passicon: {
      marginLeft: 15,  // Adjust the icon to the left for better alignment
    },
    eyeIcon: {
      position: 'absolute',
      right: 15,
      top: 17,
    },
    placeholderText: {
      position: 'absolute',
      left: 45,
      top: 22,
      color: '#aaa',
      fontSize: 10,
      fontFamily: 'PressStart2P-Regular',
    },
    loginButton: {
      backgroundColor: '#ff8c00',
      borderRadius: 50,
      padding: 15,
      alignItems: 'center',
      marginBottom: 20,
      shadowColor: '#fff',          
      shadowOffset: { width: 50, height: 5 },
      shadowOpacity: 0.2,           
      shadowRadius: 10,
      elevation: 10,                
      marginBottom: 50,
    },
    loginButtonText: {
      fontSize: 14,
      color: '#fff',
      textAlign: 'center',
    },
    signInText: {
      marginTop: 60,
      fontSize: 11,
      color: '#fff',
      textAlign: 'center',
    },
    signInLink: {
      marginLeft: 5,
      fontSize: 12,
      color: '#ff8c00',
      textDecorationLine: 'underline',
    },
  });
  
  export default registerStyles;
  