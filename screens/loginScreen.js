import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ActivityIndicator, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import Icon from 'react-native-vector-icons/FontAwesome';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig";

const CustomTextInput = ({ placeholder, value, onChangeText, secureTextEntry, showPassword, setShowPassword, iconName }) => {
  const iconStyle = iconName === "lock" ? styles.lockIcon : styles.inputIcon;

  return (
    <View style={styles.inputContainer}>
      <Icon name={iconName} size={20} color="#aaa" style={iconStyle} />
      {!value && <Text style={styles.placeholderText}>{placeholder}</Text>}
      <TextInput
        style={[styles.input]}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        keyboardType={iconName === "envelope" ? "email-address" : "default"}
        autoCapitalize="none"
      />
      {iconName === "lock" && (
        <TouchableOpacity
          onPress={() => setShowPassword(!showPassword)}
          style={styles.eyeIcon}
        >
          <Icon name={showPassword ? "eye-slash" : "eye"} size={20} color="#aaa" />
        </TouchableOpacity>
      )}
    </View>
  );
};

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const navigation = useNavigation();

  const [loaded] = useFonts({
    'PressStart2P-Regular': require('../assets/fonts/PressStart2P-Regular.ttf'),
  });

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please enter both email and password.");
      return;
    }
  
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigation.navigate('HomePage');
    } catch (error) {
      // Handle specific error codes
      if (error.code === 'auth/invalid-email') {
        Alert.alert("Invalid Email", "Please enter a valid email address.");
      } else {
        Alert.alert("Login Failed", "Please check your credentials.");
      }
    } finally {
      setLoading(false);
    }
  };
  

  const handleRegister = () => {
    navigation.navigate('Register');
  };

  if (!loaded) {
    return <ActivityIndicator size="large" color="#fff" style={{ flex: 1, justifyContent: 'center', backgroundColor: '#000' }} />;
  }
  
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image 
          source={require('../images/isnek.png')}
          style={styles.logo}
        />
        <Text style={[styles.title, { fontFamily: 'PressStart2P-Regular' }]}>ISNEK</Text>
      </View>

      <Text style={[styles.titlelogin, { fontFamily: 'PressStart2P-Regular' }]}>Login your account</Text>

      {/* Email Input */}
      <CustomTextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        iconName="envelope"
      />

      {/* Password Input */}
      <CustomTextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry={!showPassword}
        showPassword={showPassword}
        setShowPassword={setShowPassword}
        iconName="lock"
      />

      {/* Remember Me Section */}
      <View style={styles.rememberMeContainer}>
        <TouchableOpacity
          style={styles.checkbox}
          onPress={() => setRememberMe(!rememberMe)}
        >
          <Icon
            name={rememberMe ? "check-square-o" : "square-o"}
            size={20}
            color="#ff8c00"
          />
        </TouchableOpacity>
        <Text style={[styles.rememberMeText, { fontFamily: 'PressStart2P-Regular' }]}>
          Remember Me
        </Text>
      </View>

      <TouchableOpacity style={styles.loginButton} onPress={handleLogin} disabled={loading}>
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={[styles.loginButtonText, { fontFamily: 'PressStart2P-Regular' }]}>Login</Text>
        )}
      </TouchableOpacity>


    <Text style={[styles.signUpText, { fontFamily: 'PressStart2P-Regular' }]}>   
      Don’t have an account?      
      <TouchableOpacity onPress={handleRegister}><Text style={[styles.signUpLink, { fontFamily: 'PressStart2P-Regular' }]}>Sign Up</Text>
      </TouchableOpacity>
    </Text>
    </View>
  );
};

const styles = StyleSheet.create({
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

export default LoginScreen;
