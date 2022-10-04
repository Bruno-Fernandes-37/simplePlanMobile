import React from 'react'
import { Button, Image, Pressable, StyleSheet, Text, TextInput, View } from 'react-native'

import { Colors } from '../assets/styles/colors'

export default function Login() {
  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/images/Logo.png')}
        style={styles.logo}
      />
      <Text style={styles.title}>
        Welcome Back !
      </Text>
      <View>
        <View style={styles.input_label}>
          <Text style={styles.label}>
            Email
          </Text>
          <TextInput
            style={styles.input}
            placeholder="email"
            selectionColor={Colors.melonPastel}
            autoComplete='email'
          />
        </View>
        <View style={styles.input_label}>
          <Text style={styles.label}>
            Password
          </Text>
          <TextInput
            style={styles.input}
            placeholder="password"
            secureTextEntry={true}
            selectionColor={Colors.melonPastel}
            autoComplete='password'
          />
        </View>
      </View>
      <View style={styles.button}>
        <Button
          style={styles.button}
          onPress={() => { }}
          title='Login'
          accessibilityLabel='clik for connection'
          color={Colors.melonPastel}
        />
        <Pressable onPress={() => { }}>
          <Text style={styles.forgotPass} >
             Forgot your password ?
          </Text>
        </Pressable>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: Colors.veryPeri,
    marginTop: 0
  },
  logo: {
    margin: 20
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: Colors.melonPastel,
    margin: 20,
  },
  label: {
    color: Colors.greenTea
  },
  input: {
    marginTop: 5,
    height: 40,
    width: 250,
    borderRadius: 5,
    padding: 10,
    backgroundColor: 'white'
  },
  input_label: {
    margin: 15
  },
  button: {
    marginTop: 15,
  },
  forgotPass: {
    marginTop: 10,
    color: Colors.greenTea
  }
});