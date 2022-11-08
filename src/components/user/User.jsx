import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'

export default function User({ user }) {
    return (
        <View style={styles.containerUser}>
            <Image
                source={require('../../assets/images/default.png')}
                style={styles.default}
            />
            <Text style={styles.user}>{user.username}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    containerUser: {
        flexDirection: 'row',
        alignItems: 'center',
        marginStart: 10,
    },
    default: {
        width: 30,
        height: 30,
        borderRadius: 15,
    },
    user: {
        textTransform: 'capitalize',
    },
})