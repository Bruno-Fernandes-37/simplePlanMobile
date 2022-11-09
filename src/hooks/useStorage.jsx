import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react'

const useStorage = (storage_key) => {
    const [storageData, setStorageData] = React.useState('');
    
    const getStorageData = async (storage_key) => {
        try {
          const value = await AsyncStorage.getItem(storage_key);
          if(value !== null) {
            // value previously stored
            setStorageData(value);
          }
        } catch(e) {
          // error reading value
          console.log(e);
        }
    };

    const storeData = async (storage_key, value) => {
        try {
            await AsyncStorage.setItem(storage_key, value);
        } catch (e) {
        // saving error
            console.log(e);
        }
    };

    React.useEffect(() => {
      try {
        getStorageData(storage_key)
      } catch (error) {
        console.log(error)
      }
    },[])

    return { storageData,  storeData };
};

export default useStorage;