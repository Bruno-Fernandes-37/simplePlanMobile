import React from 'react';
import { Image, SafeAreaView, View, Text, Pressable } from 'react-native';
import styles from './styles';

const UserPicture = () => {
  return (
    <SafeAreaView>
        <View style={styles.container}>
          <Pressable style={({pressed}) => pressed && styles.imagePressing}>
            <Image source={{uri: 'https://images.unsplash.com/photo-1630763882488-73a2d2267c0d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80'}} style={styles.image} />
          </Pressable>
        </View>
    </SafeAreaView>
  )
}

export default UserPicture