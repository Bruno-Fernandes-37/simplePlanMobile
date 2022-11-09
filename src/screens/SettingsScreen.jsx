import React from 'react'
import { Text, SafeAreaView, View } from 'react-native'
import useStorage from '../hooks/useStorage';
import jwt_decode  from 'jwt-decode';
import useRole from '../hooks/useRole';
import UserPicture from '../components/UserPicture/UserPicture';
import { Colors } from '../assets/styles/colors';
import { Ionicons } from '@expo/vector-icons';
import MainInfos from '../components/MainInfos/MainInfos';


export default function SettingsScreen() {
  const { storageData } = useStorage('@access-token');
  const [userInfos, setUserInfos] = React.useState();
  const { role } = useRole(userInfos?.role, userInfos?.preferred_language);
  const bg = Colors.lavenderPastel;
  
  React.useEffect(() => {
    if(storageData){
      const { data } = jwt_decode(storageData);
      setUserInfos(data);
    }
  },[storageData])


  if(!storageData){
    return (
      <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1,  justifyContent: 'center', paddingTop: 20}} >
        <Text>Loading ...</Text>
      </View>
    </SafeAreaView>
    )
  }

  return (
    <SafeAreaView style={{flex: 1, padding: 16, backgroundColor: bg }}>
      <View style={{flex: 1,  justifyContent: 'flex-start', paddingTop: 20}} >
        {userInfos &&
          <>
            <MainInfos username={userInfos?.username} role={role} />
            <View style={{width: '100%', height: '60%', display: "flex", flexDirection:'column', justifyContent:'flex-start', marginTop: 4}}>
              <View style={{marginBottom: 8}} >
                <View style={{display: 'flex', flexDirection:'row', alignItems:'center'}}>
                  <Text style={{color: 'grey', fontSize: 16, fontWeight: '700'}}>Email :</Text>
                  <Ionicons name='create' color="grey" size={20} style={{marginLeft: 16}} />
                </View>              
                  <Text className='text-red' >{userInfos.email}</Text>
              </View>
              <View style={{marginBottom: 8}} >
                <View style={{display: 'flex', flexDirection:'row', alignItems:'center'}}>
                  <Text style={{color: 'grey', fontSize: 16, fontWeight: '700'}}>Username :</Text>
                  <Ionicons name='create' color="grey" size={20} style={{marginLeft: 16}} />
                </View>
                <Text className='text-red' >{userInfos.username}</Text>
              </View>
              <View style={{marginBottom: 8}} >
                <View style={{display: 'flex', flexDirection:'row', alignItems:'center'}}>
                  <Text style={{color: 'grey', fontSize: 16, fontWeight: '700'}}>Langue :</Text>
                  <Ionicons name='create' color="grey" size={20} style={{marginLeft: 16}} />
                </View>
                <Text>{userInfos.preferred_language === 'fr' ? 'Français' : 'Anglais'}</Text>
              </View>
            </View>
          </>
        }
      </View>
    </SafeAreaView>
  )
}
