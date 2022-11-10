import React from 'react';
import { Pressable, TextInput, View } from 'react-native';
import styles from './styles';
import { Colors } from '../../assets/styles/colors';
import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';


const CustomTextInput = ({name, value, defaultValue='', placeholder, onChange, autoComplete='', onClose, onSubmit }) => {

  return (
    <View style={{display: 'flex',  flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
    <TextInput
        style={styles.input}
        onChangeText={(text) => onChange(name, text)}
        placeholder={placeholder}
        value={value}
        clearButtonMode='while-editing'
        defaultValue={defaultValue}
        selectionColor={Colors.veryPeri}
        autoComplete={autoComplete}
        />
      <Pressable onPress={() => onSubmit()}>
        <AntDesign name="checkcircleo" size={24} color="green" />
        </Pressable>
      <Pressable onPress={() => onClose()}>
        <MaterialIcons name="cancel" size={28} color="red" />
      </Pressable>
    </View>
  )
}

export default CustomTextInput;