import React from 'react';
import {ApolloClient, ApolloProvider, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';
import { AuthContextProvider, AuthContext } from './src/contexts/AuthContext';
import AsyncStorage  from '@react-native-async-storage/async-storage';
import Constants from 'expo-constants';

import LoginScreen from './src/screens/LoginScreen';
import { Navigation } from './src/components/navigation/Navigation';


/**
 * export of the app surrounded by our context
 * we look at isLogged in the context if it false we send our login view, if it is true we send rootscreen
 */ 
export default function App() {

  return (
    <AuthContextProvider>
        <InitApp />
    </AuthContextProvider>
  )
}

const InitApp = () => {
  const { onLogout } = React.useContext(AuthContext);
  //  TODO: en PROD => renvoyer sur l'uri de  l'api DEV 
  //  Connection avec ngrok => voir cf(https://articles.wesionary.team/localhost-to-react-native-expo-projects-f0e4ce7d624f)
   

  const httpLink = createHttpLink({
    uri: Constants.manifest.extra.VITE_SERVER_URL,
  });

  const authLink = setContext( async (_, { headers }) => {
    // get the authentication token from local storage if it exists
    const token =  await AsyncStorage.getItem('@access-token');
    // return the headers to the context so httpLink can read them
    return {
      headers: {
        ...headers,
        authorization: token ? token : '',
      },
    };
  });

  const errorLink = onError(({ graphQLErrors }) => {
    if (graphQLErrors)
      graphQLErrors.forEach(({ message }) => {
        if (message === 'Invalid token') {
          onLogout();
        }
      });
  });

  const [link, setLink] = React.useState(authLink);

  const client = new ApolloClient({
    link: link.concat(errorLink).concat(httpLink),
    cache: new InMemoryCache(),
  });


  React.useEffect(() => {
    setLink(authLink);
  }, []);

  return (
      <ApolloProvider client={client} >
        <RootScreens />
      </ApolloProvider>
  )
}

const RootScreens = () => {
  const { isLogged } = React.useContext(AuthContext)

  return (
     isLogged ? <Navigation /> : <LoginScreen/> 
  )
}


