import * as React from "react";

import HomeScreen from "../screens/HomeScreen";
import CartScreen from "../screens/CartScreen";
import NotificationScreen from "../screens/NotificationScreen";
import SearchScreen from "../screens/SearchScreen";
// import { Ionicons } from "@expo/vector-icons";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
        screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Search') {
            iconName = 'home';
              
          } else if (route.name === 'Cart') {
            iconName =  'ios-list';
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
      })}>
      <Tab.Screen name="Search" component={SearchScreen} options={{ headerShown: false }} />
      {/* <Tab.Screen name="Notification" component={NotificationScreen} /> */}
      <Tab.Screen name="Cart" component={CartScreen} />
    </Tab.Navigator>
  ); 
};

export default TabNavigator;
