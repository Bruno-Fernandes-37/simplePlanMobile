import { StatusBar } from 'expo-status-bar';
import React from 'react'
import { FlatList, Image, Pressable, StyleSheet, Text, View } from 'react-native'

import CardProject from '../components/cardProjects/CardProject';
import { projects } from '../projects'
import { Colors } from '../assets/styles/colors';


export default function HomeProjects() {

    const renderProject = ({ item }) => <CardProject name={item.name} status={item.status} dueDate={item.dueDate} />;

    return (
        <View  >
            <StatusBar style="auto" />
            <View style={styles.containerImg}>
                <Pressable onPress={() => { }} >
                    <Image
                        source={require('../assets/images/settings.png')}
                        style={styles.image}
                    />
                </Pressable>
            </View>
            <Text style={styles.title}>Your projects</Text>
            <View style={styles.containerList}>
                <Text style={styles.text}>In progress</Text>
                <FlatList
                    data={projects}
                    renderItem={renderProject}
                    keyExtractor={item => item.id}
                    horizontal={true}
                />
            </View>
            <View style={styles.containerList}>
                <Text style={styles.text}>Coming soon</Text>
                <FlatList
                    data={projects}
                    renderItem={renderProject}
                    keyExtractor={item => item.id}
                    horizontal={true}
                />
            </View>
        </View >
    );
}
const styles = StyleSheet.create({
    safeArea: {
        flex: 1
    },
    containerImg: {
        alignItems: 'flex-end',
    },
    image: {
        width: 40,
        height: 40,
        margin: 20,
    },
    title: {
        fontSize: 30,
        textAlign: 'center',
        fontWeight: 'bold',
        color: Colors.veryPeri,
        margin: 20,
    },
    containerList: {
        marginTop: 20
    },
    text: {
        margin: 10,
    },
})