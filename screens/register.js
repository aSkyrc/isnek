import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { ref, onValue, set } from "firebase/database"; // Import set and ref from Firebase Realtime Database
import { rtdb } from "../firebaseConfig"; // Correct import for Realtime Database
import { useFonts } from 'expo-font';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from '../styles/registerStyles';

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

  // Handle Signup and save user data to Realtime Database
  const handleSignup = async () => {
    if (!isFormValid()) {
      return; // If the form is not valid, do not proceed
    }

    try {
      // Create user with email and password
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
      // Get the authenticated user's UID
      const userId = userCredential.user.uid;

      // Set the username in the Realtime Database under the user's UID
      await set(ref(rtdb, 'users/' + userId), {
        username: username,
        email: email,
      });

      Alert.alert("Success", "Account created successfully");
      
      // Clear the input fields
      setUsername('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');

      // Navigate to login page
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

export default Register;
