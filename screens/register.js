import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { useFonts } from 'expo-font';
import Icon from 'react-native-vector-icons/FontAwesome';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigation = useNavigation();

  // Load fonts
  const [loaded] = useFonts({
    'PressStart2P-Regular': require('../assets/fonts/PressStart2P-Regular.ttf'),
  });

  // Validation function
  const isFormValid = () => {
    if (!username || !email || !password || !confirmPassword) {
      Alert.alert("Validation Error", "All fields are required!");
      return false;
    }
    if (!email.includes("@")) {
      Alert.alert("Validation Error", "Please enter a valid email address.");
      return false;
    }
    if (password.length < 8) {
      Alert.alert("Validation Error", "Password must be at least 8 characters.");
      return false;
    }
    if (password !== confirmPassword) {
      Alert.alert("Validation Error", "Passwords do not match.");
      return false;
    }
    return true;
  };

  // Handle Signup
  const handleSignup = async () => {
    if (!isFormValid()) {
      return; // If the form is not valid, do not proceed
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      Alert.alert("Success", "Account created successfully");
      setUsername('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      navigation.navigate("Login");
    } catch (error) {
      Alert.alert("Error", `Error creating user: ${error.message}`);
    }
  };

  const handleLogin = () => {
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      {/* Logo */}
      <View style={styles.logoContainer}>
        <Image 
          source={require('../images/isnek.png')}
          style={styles.logo}
        />
        <Text style={[styles.title, { fontFamily: 'PressStart2P-Regular' }]}>ISNEK</Text>
      </View>

      <Text style={[styles.titlelogin, { fontFamily: 'PressStart2P-Regular' }]}>Registration</Text>

      {/* Name input */}
      <View style={styles.inputContainer}>
        <Icon name="user" size={18} color="#aaa" style={styles.usericon} />
        {!username && <Text style={styles.placeholderText}>Enter Username</Text>}
        <TextInput
          style={[styles.input, { fontFamily: 'PressStart2P-Regular' }]}
          placeholderTextColor="#aaa"
          value={username}
          onChangeText={setUsername}
        />
      </View>

      {/* Email input */}
      <View style={styles.inputContainer}>
        <Icon name="envelope" size={18} color="#aaa" style={styles.emailicon} />
        {!email && <Text style={styles.placeholderText}>Your Email Address</Text>}
        <TextInput
          style={[styles.input, { fontFamily: 'PressStart2P-Regular' }]}
          placeholderTextColor="#aaa"
          value={email}
          onChangeText={setEmail}
        />
      </View>

      {/* Password input */}
      <View style={styles.inputContainer}>
        <Icon name="lock" size={18} color="#aaa" style={styles.passicon} />
        {!password && <Text style={styles.placeholderText}>Create a Password</Text>}
        <TextInput
          style={[styles.input, { fontFamily: 'PressStart2P-Regular' }]}
          placeholderTextColor="#aaa"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!showPassword}
        />
        <TouchableOpacity
          onPress={() => setShowPassword(!showPassword)}
          style={styles.eyeIcon}
        >
          <Icon name={showPassword ? "eye-slash" : "eye"} size={18} color="#aaa" />
        </TouchableOpacity>
      </View>

      {/* Confirm Password input */}
      <View style={styles.inputContainer}>
        <Icon name="lock" size={18} color="#aaa" style={styles.passicon} />
        {!confirmPassword && <Text style={styles.placeholderText}>Confirm Your Password</Text>}
        <TextInput
          style={[styles.input, { fontFamily: 'PressStart2P-Regular' }]}
          placeholderTextColor="#aaa"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry={!showConfirmPassword}
        />
        <TouchableOpacity
          onPress={() => setShowConfirmPassword(!showConfirmPassword)}
          style={styles.eyeIcon}
        >
          <Icon name={showConfirmPassword ? "eye-slash" : "eye"} size={18} color="#aaa" />
        </TouchableOpacity>
      </View>

      {/* Register button */}
      <TouchableOpacity style={styles.loginButton} onPress={handleSignup}>
        <Text style={[styles.loginButtonText, { fontFamily: 'PressStart2P-Regular', color: '#fff' }]}>Register</Text>
      </TouchableOpacity>

      <Text style={[styles.signInText, { fontFamily: 'PressStart2P-Regular' }]}>   
        Already have an account?      
        <TouchableOpacity onPress={handleLogin}>
          <Text style={[styles.signInLink, { fontFamily: 'PressStart2P-Regular' }]}>Sign In</Text>
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

export default Register;
