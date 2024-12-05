import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ActivityIndicator, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import Icon from 'react-native-vector-icons/FontAwesome';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig";
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

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please enter both email and password.");
      return;
    }
  
    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;  // Firebase user object
      navigation.navigate('HomePage', { userId: user.uid });  // Pass userId here
    } catch (error) {
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

export default LoginScreen;
