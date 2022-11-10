import React from 'react'
import { Text, SafeAreaView, View, StyleSheet, Pressable } from 'react-native'
import useStorage from '../hooks/useStorage';
import jwt_decode  from 'jwt-decode';
import useRole from '../hooks/useRole';
import { Colors } from '../assets/styles/colors';
import { Ionicons } from '@expo/vector-icons';
import MainInfos from '../components/MainInfos/MainInfos';
import { USERS } from '../api/users';
import { useApolloClient, useQuery } from '@apollo/client';
import CustomTextInput from '../components/TextInput/CustomTextInput';


export default function SettingsScreen() {
  const client = useApolloClient();
  const { storageData } = useStorage('@access-token');
  const [userInfos, setUserInfos] = React.useState();
  const { role } = useRole(userInfos?.role, userInfos?.preferred_language);
  const { loading, error, data, refetch } = useQuery(UserQuerys.getUser, {variables :{ getUserId: userInfos?.id}});

  
  const [currentField, setCurrentField] = React.useState('email');
  const [updatedUserInfos, setUpdatedUserInfos] = React.useState({
    username: '',
    email: '',
    preferred_language: '',
    picture: '',
  });

  const [disable, setDisable] = React.useState({
    username: true,
    email: true,
    preferred_language: true,
    picture: true,
  });

  const mutate = async (mutation, variables, closeField) => {
    alert(JSON.stringify(variables))
    try {
      const data = await client.mutate({
        mutation, variables : {updateUserInfosAsUserId: userInfos._id, ...variables}
      });
      await refetch({ getUserId: userInfos._id})
      setDisable({...disable, [closeField]: true})
    } catch (error) {
      alert(JSON.stringify(error));
    };
  };

  const handleDisableState = (field, isDisable) => {
    if(!isDisable){
      setUpdatedUserInfos({...updatedUserInfos, [field]: userInfos[field]});
    }
    setDisable({...disable, [field]: isDisable});
  };

  const handleUpdating = (field, value) => {
    setUpdatedUserInfos({...updatedUserInfos, [field]: value});
  };
  
  React.useEffect(() => {
    if(storageData){
      const { data } = jwt_decode(storageData);
      setUserInfos(data);
    }
  },[storageData]);
  
  React.useEffect(() => {
    if(data){
      setUserInfos(data.getUser)
    }
  },[data])

  if(!storageData){
    return (
      <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1,  justifyContent: 'center', paddingTop: 20}} >
        <Text>Loading ...</Text>
      </View>
    </SafeAreaView>
    )
  };


  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.contentView} >
        {userInfos &&
          <>
            <MainInfos username={userInfos?.username} role={role} />
            <View style={{width: '100%', height: '60%', display: "flex", flexDirection:'column', justifyContent:'flex-start', marginTop: 4}}>
              <View style={{marginBottom: 8}} >
                <View style={{display: 'flex', flexDirection:'row', alignItems:'center'}}>
                  <Text style={styles.label}>Email :</Text>
                  {disable.email  && <Pressable onPress={() =>{
                      handleDisableState('email', false);
                    }}>
                    <Ionicons name='create' color="grey" size={20} style={{marginLeft: 16}} />
                  </Pressable>}
                </View>              
                 {disable.email ? <Text >{userInfos.email}</Text> :
                  <CustomTextInput name="email"  value={updatedUserInfos?.email} defaultValue={userInfos.email} onChange={handleUpdating} autoComplete='email' onClose={() => handleDisableState('email', true)} onSubmit={() => mutate(UserMutations.email, {email: updatedUserInfos.email}, 'email') }/>}
              </View>
              <View style={{marginBottom: 8}} >
                <View style={{display: 'flex', flexDirection:'row', alignItems:'center'}}>
                  <Text style={styles.label}>Username :</Text>
                  {
                  disable.username  && <Pressable onPress={() =>{
                      handleDisableState('username', false);
                    }}>
                    <Ionicons name='create' color="grey" size={20} style={{marginLeft: 16}} />
                  </Pressable>
                  }
                </View>
                {disable.username ? <Text >{userInfos.username}</Text> :
                  <CustomTextInput name="username"  value={updatedUserInfos?.username} defaultValue={userInfos.username} onChange={handleUpdating} autoComplete='username' onClose={() => handleDisableState('username', true)} onSubmit={() => mutate(UserMutations.username, {username: updatedUserInfos.username}, 'username') }/>}
              </View>
              <View style={{marginBottom: 8}} >
                <View style={{display: 'flex', flexDirection:'row', alignItems:'center'}}>
                  <Text style={styles.label}>Langue :</Text>
                  {
                  disable.preferred_language  && <Pressable onPress={() =>{
                      handleDisableState('preferred_language', false);
                    }}>
                    <Ionicons name='create' color="grey" size={20} style={{marginLeft: 16}} />
                  </Pressable>
                  }
                </View>
                {disable.preferred_language ? <Text>{userInfos.preferred_language === 'fr' ? 'Français' : 'Anglais'}</Text> : <CustomTextInput name="preferred_language"  value={updatedUserInfos?.preferred_language} defaultValue={userInfos.preferred_language} onChange={handleUpdating} autoComplete='off' onClose={() => handleDisableState('preferred_language', true)} onSubmit={() => mutate(UserMutations.preferred_language, {preferred_language: updatedUserInfos.preferred_language}, 'preferred_language') }/>}
              </View>
            </View>
          </>
        }
      </View>
    </SafeAreaView>
  )
};


const styles = StyleSheet.create({
  safeArea: {flex: 1, padding: 16, backgroundColor: Colors.lavenderPastel },
  contentView: {flex: 1,  justifyContent: 'flex-start', paddingTop: 20},
  label: {color: 'grey', fontSize: 16, fontWeight: '700'},
});

const UserMutations = {
  picture: USERS.updatePicture,
  username: USERS.updateUsername,
  email: USERS.updateEmail,
  password: USERS.updatePassword,
  preferred_language: USERS.updatePreferredLanguage,
};

const UserQuerys = {
  getUser: USERS.getUser,
}