import React from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "@expo/vector-icons/Ionicons";
import { getHeaderTitle } from '@react-navigation/elements';


import HomeProjectScreen from '../../screens/HomeProjectScreen';
import { Colors } from '../../assets/styles/colors';
import LogoutScreen from '../../screens/LogoutScreen';
import SettingsScreen from '../../screens/SettingsScreen';


const Tab = createBottomTabNavigator();

export const Navigation = () => {
    return (
        <NavigationContainer>
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) => {
                        let iconName;

                        if (route.name === 'Home') {
                            iconName = focused
                                ? 'ios-home'
                                : 'ios-home-outline';
                        } else if (route.name === 'Settings') {
                            iconName = focused
                                ? 'ios-list'
                                : 'ios-list-outline';
                        } else if (route.name === 'Settings') {
                            iconName = focused
                                ? 'ios-exit-outline'
                                : 'ios-exit';
                        }
                        // You can return any component that you like here!
                        return <Ionicons name={iconName} size={size} color={color} />;
                    },
                    tabBarActiveTintColor: Colors.veryPeri,
                    tabBarInactiveTintColor: Colors.grey,

                })}
            >
                <Tab.Screen name="Home" component={HomeProjectScreen} />
                <Tab.Screen name="Settings" component={SettingsScreen} />
                <Tab.Screen name="Logout" component={LogoutScreen} />
            </Tab.Navigator>
        </NavigationContainer>
    )
};
