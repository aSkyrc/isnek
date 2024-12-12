import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ActivityIndicator, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage
import { useFonts } from 'expo-font';
import Icon from 'react-native-vector-icons/FontAwesome';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, rtdb, ref, get, update } from "../firebaseConfig";
import styles from '../styles/loginScreenStyles';

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

  useEffect(() => {
    // Load saved credentials if "Remember Me" was previously checked
    const loadCredentials = async () => {
      try {
        const savedEmail = await AsyncStorage.getItem('email');
        const savedPassword = await AsyncStorage.getItem('password');
        if (savedEmail && savedPassword) {
          setEmail(savedEmail);
          setPassword(savedPassword);
          setRememberMe(true);
        }
      } catch (error) {
        console.error('Error loading saved credentials:', error);
      }
    };
    loadCredentials();
  }, []);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please enter both email and password.");
      return;
    }

    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      const userRef = ref(rtdb, `users/${user.uid}`);
      const snapshot = await get(userRef);
      const userData = snapshot.val();

      if (userData) {
        const username = userData.username;

        await update(userRef, {
          status: 'LOGGED_IN',
        });

        // Save credentials if "Remember Me" is checked
        if (rememberMe) {
          await AsyncStorage.setItem('email', email);
          await AsyncStorage.setItem('password', password);
        } else {
          await AsyncStorage.removeItem('email');
          await AsyncStorage.removeItem('password');
        }

        navigation.navigate('HomePage', { userId: user.uid, username: username });
      } else {
        console.error('No username found in Firebase for this user.');
      }
    } catch (error) {
      console.error('Login failed with error:', error);
      if (error.code === 'auth/invalid-email') {
        Alert.alert("Invalid Email", "Please enter a valid email address.");
      } else if (error.code === 'auth/user-not-found') {
        Alert.alert("User Not Found", "No account found with this email.");
      } else if (error.code === 'auth/wrong-password') {
        Alert.alert("Wrong Password", "The password entered is incorrect.");
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

export default LoginScreen;
