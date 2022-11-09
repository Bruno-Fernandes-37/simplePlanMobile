import React from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "@expo/vector-icons/Ionicons";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Button } from 'react-native';

import HomeProjectScreen from '../../screens/HomeProjectScreen';
import { Colors } from '../../assets/styles/colors';
import LogoutScreen from '../../screens/LogoutScreen';
import SettingsScreen from '../../screens/SettingsScreen';
import ProjectScreen from '../../screens/ProjectScreen';
import TasksScreen from '../../screens/TasksScreen';



const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// icons active or not depending on the view displayed 
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
                <Tab.Screen name="Settings" component={SettingsScreen} options={{headerShown: true, headerTitle: "Mon profil", headerTitleAlign: 'center'}} />
                <Tab.Screen name="Logout" component={LogoutScreen} />
            </Tab.Navigator>
        </NavigationContainer>
    )
};

function NavigationStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="HomeScreen" component={HomeProjectScreen} />
            <Stack.Screen
                name="ProjectScreen"
                component={ProjectScreen}
                options={({ navigation }) => ({
                    headerTitle: '',
                    headerRight: () => (
                        <Button
                            title='Tasks'
                            onPress={() => { navigation.navigate('TasksScreen') }}
                            color='#684F8E'
                            accessibilityLabel="Learn more about this purple button"
                        >
                            Tasks
                        </Button>
                    )
                })} />
            <Stack.Screen name="TasksScreen" component={TasksScreen} />
        </Stack.Navigator>
    );
}
