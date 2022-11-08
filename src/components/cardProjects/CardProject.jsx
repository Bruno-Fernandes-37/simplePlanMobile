import { useNavigation } from '@react-navigation/native';
import React from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'

import { Colors } from '../../assets/styles/colors'
import DueDate from '../date/DueDate';
import Status from '../status/Status';

export default function CardProject({ name, status, dueDate, id }) {

    // changes the colour of the border depending on the status of the project
    const colorBorder = (status) => {
        switch (status) {
            case 'in progress':
                return styles.colorYellow;
            case 'late':
                return styles.colorMelonPastel;
            case 'done':
                return styles.colorGreenTea;
            default:
                return styles.colorGrey;
        }
    }

    const navigation = useNavigation();

    return (
        <Pressable onPress={() => { navigation.navigate('ProjectScreen', { id: id }) }}>
            <View style={[styles.container, colorBorder(status)]} /*corlor carte status*/>
                <Text style={styles.title}>{name.length < 12 ? name : name.slice(0, 12) + '...'}</Text>
                <Status status={status} style={styles.containerStatus} />
                <DueDate dueDate={dueDate} />
            </View>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    container: {
        width: 155,
        padding: 15,
        borderWidth: 2,
        margin: 8,
        borderRadius: 10,
        backgroundColor: Colors.bgGrey,
    },
    colorYellow: {
        borderColor: Colors.yellow
    },
    colorMelonPastel: {
        borderColor: 'red'
    },
    colorGreenTea: {
        borderColor: 'green'
    },
    colorGrey: {
        borderColor: Colors.grey
    },
    title: {
        fontSize: 16,
        marginBottom: 5,
    },
    containerStatus: {

        margin: 1,
        padding: 3,
        borderWidth: 1,
        borderRadius: 5,
    },
})