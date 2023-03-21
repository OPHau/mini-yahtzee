import React from 'react';
import Header from './components/Header';
import Home from './components/Home';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Gameboard from './components/Gameboard';
import Scoreboard from './components/Scoreboard';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Header />
      <Tab.Navigator initialRouteName="Home" screenOptions={{headerShown : false}}>
        <Tab.Screen name="Home" component={Home}
          options={{
            tabBarShowLabel: false,
            tabBarIcon: ({ focused, color, size }) => (
              <MaterialCommunityIcons name="home" color={focused ? "orange" : "gray"} size={30}/>),
          }} />
        <Tab.Screen name="Gameboard" component={Gameboard}
          options={{
            tabBarShowLabel: false,
            tabBarIcon: ({ focused, color, size }) => (
              <MaterialCommunityIcons name="dice-multiple" color={focused ? "orange" : "gray"} size={30}/>),
          }} />
        <Tab.Screen name="Scoreboard" component={Scoreboard}
          options={{
            tabBarShowLabel: false,
            tabBarIcon: ({ focused, color, size }) => (
              <MaterialCommunityIcons name="format-list-bulleted-square" color={focused ? "orange" : "gray"} size={30}/>),
          }} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
