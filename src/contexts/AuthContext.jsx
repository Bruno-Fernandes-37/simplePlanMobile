import React from 'react';
import jwt_decode from 'jwt-decode';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContextDefaultValue = {
  isLogged: false,
  onLogout: () => { },
  onLogin: () => { },
  currentUser: {},
};

const getToken = async () => {
  try {
    const access = await AsyncStorage.getItem('access-token');
    return access;
  } catch (error) {
    console.warn(JSON.stringify(error.message))
  }
  return;
};

const getCurrentUser = async () => {
  try {
    const user = await AsyncStorage.getItem('@current-user');
    return user;
  } catch (error) {
    console.warn(JSON.stringify(error.message))
  }
  return;
};

export const AuthContext = React.createContext(AuthContextDefaultValue);

export function AuthContextProvider({ children }) {
  const [isLogged, setIsLogged] = React.useState(false);
  const [token, setToken] = React.useState(getToken());
  const [currentUser, setCurrentUser] = React.useState(getCurrentUser());

  const onLogout = async () => {
    try {
      const removed = await AsyncStorage.multiRemove(['@access-token', '@current-user']);
      setIsLogged(false);
    } catch (e) {
      console.warn(JSON.stringify(e.message))
    }
  };

  const onLogin = async (userToken) => {
    const decodedToken = jwt_decode(userToken);
    if (decodedToken) {
      try {
        const currentU = await AsyncStorage.setItem('@current-user', JSON.stringify(decodedToken.data))
        setCurrentUser(decodedToken.data);
      } catch (e) {
        console.warn(JSON.stringify(e.message))
      }
    }
    try {
      const accessT = await AsyncStorage.setItem('@access-token', userToken)
      setToken(userToken);
      setIsLogged(true);
    } catch (e) {
      console.warn(JSON.stringify(e.message))
    }
  };
  // Peut être mieux de ne pas garder la session ouverte si l'application est fermée
  // React.useEffect(() => {
  //   if (!token) {
  //     return setIsLogged(false);
  //   }
  //   setIsLogged(true);
  // }, [token, setIsLogged]);

  const value = { isLogged, onLogout, onLogin, currentUser };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
