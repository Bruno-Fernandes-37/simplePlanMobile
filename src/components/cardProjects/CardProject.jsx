import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { Colors } from '../../assets/styles/colors'


export default function CardProject({name, status, dueDate}) {

    let colorStatus = Colors.grey;
    switch ({ status }) {
        case 'not_started':
            break;
        case 'in_progress':
            colorStatus = Colors.veryPeri;
            break;
        case 'late':
            colorStatus = Colors.melonPastel;
            break;
        case 'done':
            colorStatus = Colors.greenTea;
            break;
        case 'archived':
            break;
        default:
            break;
    }

    return (      
            <View style={styles.container}/*corlor carte status*/>
                <Text /* titre project */>{name}</Text>
                <View >
                    <Text>{status}</Text>
                </View>
                <Text> {dueDate} </Text>
            </View>
    )
}

const styles = StyleSheet.create({
    container: {
       padding: 15,
       borderWidth: 1,
       margin: 5,
      
    },
})