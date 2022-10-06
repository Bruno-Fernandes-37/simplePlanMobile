import React from 'react'
import { Button, Image, Pressable, StyleSheet, Text, TextInput, View, SafeAreaView } from 'react-native'
import { useMutation } from '@apollo/client';
import { StatusBar } from 'expo-status-bar';

import { USERS } from '../api/users';
import { AuthContext } from '../contexts/AuthContext';
import { Colors } from '../assets/styles/colors'


export default function LoginScreen() {
  const { onLogin } = React.useContext(AuthContext);
  const [gError, setgError] = React.useState('')
  const [login, {data, loading }] = useMutation(USERS.login,  {
    onError: (err) => {
      setgError(err);
    }
  });

  const [credentials, setCredentials] = React.useState({email: '', password: ''}) 

  const onChange = (text, key) => {
    setCredentials({...credentials, [key]: text })
  }

  React.useEffect(() => {
    //  When data available logged in and register token in phone cache memory
    if(data) {
      const token = data.login;
      setgError("");
      onLogin(token);
    }
    return 
  }, [data])

  return (
    <SafeAreaView style={styles.androidSafeArea}>
      <StatusBar style="auto" />
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
              onChangeText={(text)=> onChange(text, 'email') }
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
              onChangeText={(text)=> onChange(text, 'password') }
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
            title='Login'
            onPress={() => login({ variables: credentials })}
            accessibilityLabel='clik for connection'
            color={Colors.melonPastel}
          />
          
          <Pressable onPress={() => { }}>
            <Text style={styles.forgotPass} >
              Forgot your password ?
            </Text>
          </Pressable>
        </View>
        {gError && <Text style={styles.errorText} >{gError.toString()}</Text>}
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  androidSafeArea: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
  },
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
  },
  errorText: {
    marginTop: 10,
    color: Colors.pinkPastel,
    fontSize: 20,
    fontWeight: 'bold',
  }
});