import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './screens/loginScreen'; // Ensure the path is correct
import HomePage from './screens/homePage';
import LeaderBoards from './screens/leaderBoards';
import PlayGame from './screens/playGame';
import Register from './screens/register'

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName='Login'
        screenOptions={{ headerShown: false }}  // Hides the header for all screens 
        >
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="HomePage" component={HomePage} />
        <Stack.Screen name="LeaderBoards" component={LeaderBoards}/>
        <Stack.Screen name="PlayGame" component={PlayGame}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
