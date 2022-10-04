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
  const access = await AsyncStorage.getItem('access-token');
  if (access) {
    return access;
  }
  return;
};

const getCurrentUser = async () => {
  const user = await AsyncStorage.getItem('@current-user');
  if (user) {
    return JSON.parse(user);
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
      AsyncStorage.multiRemove(['@access-token', '@current-user']);
      setIsLogged(false);
    } catch (e) {
      console.warn(JSON.stringify(e.message))
    }
  };

  const onLogin = async (userToken) => {
    const decodedToken = jwt_decode(userToken);
    if (decodedToken) {
      try {
        await AsyncStorage.setItem('@current-user', JSON.stringify(decodedToken.data))
      } catch (e) {
        console.warn(JSON.stringify(e.message))
      }
      setCurrentUser(decodedToken.data);
    }
    try {
      await AsyncStorage.setItem('@access-token', userToken)
      setToken(userToken);
      setIsLogged(true);
    } catch (e) {
      console.warn(JSON.stringify(e.message))
    }
  };

  React.useEffect(() => {
    if (!token) {
      return setIsLogged(false);
    }
    setIsLogged(true);
  }, [token, setIsLogged]);

  const value = { isLogged, onLogout, onLogin, currentUser };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
