import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Login from './Login';

export default function HomeProjects() {

    const [login, setLogin] = useState(false)

    if (!login) {
        return (
            <View style={styles.safeArea}>
                <StatusBar style="auto" />
                <Login />
            </View>
        );
    }
    return (
        <View style={styles.safeArea}>
            <StatusBar style="auto" />
            <Text>Vous êtes connecté(e)"</Text>
        </View>
    );
}
const styles = StyleSheet.create({
    safeArea: {
        flex: 1
    },
})