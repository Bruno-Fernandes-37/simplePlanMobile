import React from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "@expo/vector-icons/Ionicons";
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeProjectScreen from '../../screens/HomeProjectScreen';
import { Colors } from '../../assets/styles/colors';
import LogoutScreen from '../../screens/LogoutScreen';
import SettingsScreen from '../../screens/SettingsScreen';
import ProjectScreen from '../../screens/ProjectScreen';


const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

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
                                ? 'ios-settings'
                                : 'ios-settings-outline';
                        } else if (route.name === 'Logout') {
                            iconName = focused
                                ? 'ios-exit'
                                : 'ios-exit-outline';
                        }
                        // You can return any component that you like here!
                        return <Ionicons name={iconName} size={size} color={color} />;
                    },
                    tabBarActiveTintColor: Colors.veryPeri,
                    tabBarInactiveTintColor: Colors.grey,
                    headerShown: false,
                })}
            >
                <Tab.Screen name="Home" component={NavigationStack} />
                <Tab.Screen name="Settings" component={SettingsScreen} />
                <Tab.Screen name="Logout" component={LogoutScreen} />
            </Tab.Navigator>
        </NavigationContainer>
    )
};

function NavigationStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Home" component={HomeProjectScreen} />
            <Stack.Screen name="ProjectScreen" component={ProjectScreen} />
        </Stack.Navigator>
    );
}
