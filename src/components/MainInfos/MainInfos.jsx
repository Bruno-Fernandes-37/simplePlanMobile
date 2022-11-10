import React from 'react';
import { View, Text } from 'react-native';
import UserPicture from '../UserPicture/UserPicture';
import { Ionicons } from '@expo/vector-icons';
import styles from './styles';

const MainInfos = ({username, role}) => {
  return (
    <View style={styles.container}>
    <UserPicture />
      <View style={{marginLeft: 16}}>
        <Text style={styles.username}>{username}</Text>
        <Text style={styles.role}>{role}</Text>
      </View>
    {/* <Ionicons name='create' color="grey" size={26} style={{marginLeft: 16}} /> */}
  </View>
  )
}

export default MainInfos