import { useNavigation } from '@react-navigation/native';
import React from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'

import { Colors } from '../../assets/styles/colors'

export default function CardProject({ name, status, dueDate, id }) {

    let date = new Date(dueDate * 1).toDateString()

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

    const colorStatus = (status) => {
        switch (status) {
            case 'in progress':
                return styles.statusYellow;
            case 'late':
                return styles.statusMelonPastel;
            case 'done':
                return styles.statusGreenTea;
            default:
                return styles.statusGrey;
        }
    }

    const colorBorderStatus = (status) => {
        switch (status) {
            case 'in progress':
                return styles.containerStatusColorYellow;
            case 'late':
                return styles.containerStatusColorMelonPastel;
            case 'done':
                return styles.containerStatusColorGreenTea;
            default:
                return styles.containerStatusColorGrey;
        }
    }

    const navigation = useNavigation();

    return (
        <Pressable onPress={() => { navigation.navigate('ProjectScreen', { id: id }) }}>
            <View style={[styles.container, colorBorder(status)]} /*corlor carte status*/>
                <Text style={styles.title}>{name}</Text>
                <View style={[styles.containerStatus, colorBorderStatus(status)]}>
                    <Text style={[styles.textStatus, colorStatus(status)]}>{status}</Text>
                </View>
                <View style={styles.containerDate}>
                    <Text style={styles.date}> Due Date : </Text>
                    <Text style={styles.date}> {date} </Text>
                </View>
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
    containerStatusColorYellow: {
        backgroundColor: Colors.bgYellow,
        borderColor: Colors.yellow,
    },
    containerStatusColorMelonPastel: {
        backgroundColor: Colors.melonPastel,
        borderColor: 'red',
    },
    containerStatusColorGreenTea: {
        backgroundColor: Colors.greenTea,
        borderColor: 'green',
    },
    containerStatusColorGrey: {
        backgroundColor: Colors.grey,
        borderColor: 'balck',
    },
    textStatus: {
        textAlign: 'center',
        fontSize: 12,
    },
    statusYellow: {
        color: Colors.yellow,
    },
    statusMelonPastel: {
        color: 'red',
    },
    statusGreenTea: {
        color: 'green',
    },
    statusGrey: {
        color: 'balck',
    },
    containerDate: {
        marginTop: 10,
    },
    date: {
        marginTop: 5,
        alignSelf: 'flex-end',
        fontSize: 12,
        color: 'grey'
    }
})