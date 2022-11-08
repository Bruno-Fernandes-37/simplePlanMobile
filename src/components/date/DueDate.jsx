import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

export default function DueDate({dueDate}) {

  const date = new Date(dueDate * 1).toDateString()

  return (
    <View style={styles.containerDate}>
      <Text style={styles.date}> Due Date : </Text>
      <Text style={styles.date}> {date} </Text>
    </View>
  )
}

const styles = StyleSheet.create({
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