import React from 'react'
import { StyleSheet, Text, View } from 'react-native';
import { Colors } from '../../assets/styles/colors';

export default function Status({status}) {

    // returns a style with a coloured border depending on the status of the project
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

    // returns a style with a colour status according to the project status
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

    return (
        <View style={[styles.borderHaeder, colorBorder(status)]}>
            <Text style={colorStatus(status)}>{status}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    borderHaeder: {
        width: 100,
        padding: 5,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderRadius: 10,
    },
    colorYellow: {
        borderColor: Colors.yellow,
        backgroundColor: Colors.bgYellow
    },
    colorMelonPastel: {
        borderColor: 'red',
        backgroundColor: Colors.melonPastel
    },
    colorGreenTea: {
        borderColor: 'green',
        backgroundColor: Colors.greenTea
    },
    colorGrey: {
        borderColor: Colors.grey,
        backgroundColor: Colors.bgGrey
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
})
