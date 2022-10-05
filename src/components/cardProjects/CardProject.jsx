import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { Colors } from '../../assets/styles/colors'

export default function CardProject({ name, status, dueDate }) {

    const colorBorder = (status) => {
        switch (status) {
            case 'in_progress':
                return styles.colorVeryPeri;
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
            case 'in_progress':
                return styles.statusVeryPeri;
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
            case 'in_progress':
                return styles.containerStatusColorVeryPeri;
            case 'late':
                return styles.containerStatusColorMelonPastel;
            case 'done':
                return styles.containerStatusColorGreenTea;
            default:
                return styles.containerStatusColorGrey;
        }
    }

    return (

        <View style={[styles.container, colorBorder(status)]}/*corlor carte status*/>
            <Text style={styles.title}>{name}</Text>
            <View style={[styles.containerStatus, colorBorderStatus(status)]}>
                <Text style={[styles.textStatus, colorStatus(status)]}>{status}</Text>
            </View>
            <Text style={styles.date}> {dueDate} </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: 145,
        padding: 15,
        borderWidth: 2,
        margin: 8,
        borderRadius: 5,
        backgroundColor: Colors.bgGrey,
    },
    colorVeryPeri: {
        borderColor: Colors.veryPeri
    },
    colorMelonPastel: {
        borderColor: Colors.melonPastel
    },
    colorGreenTea: {
        borderColor: Colors.greenTea
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
    containerStatusColorVeryPeri: {
        backgroundColor: Colors.bgVeryPeri,
        borderColor: Colors.veryPeri,
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
    statusVeryPeri: {
        color: Colors.veryPeri,
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
    date: {
        marginTop: 5,
        alignSelf: 'flex-end'
    }

})