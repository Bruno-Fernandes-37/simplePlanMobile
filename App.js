import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Platform, SafeAreaView, StyleSheet, Text, View } from 'react-native';
// import {AppoloProvider, AppoloClient} from '@apollo/client';
import {ApolloClient, ApolloProvider, InMemoryCache, createHttpLink, useMutation} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';
import { AuthContextProvider, AuthContext } from './src/contexts/AuthContext';
import Login from './src/screens/Login';

import HomeProjects from './src/screens/HomeProjects';


export default function App() {


  return (
    <AuthContextProvider>
        <AppScreen />
    </AuthContextProvider>
  )
}

const AppScreen = () => {
  const { onLogout } = React.useContext(AuthContext);
  const VITE_SERVER_URL = "http://localhost:5000/graphql";

  const httpLink = createHttpLink({
    uri: VITE_SERVER_URL,
  });

  const authLink = setContext((_, { headers }) => {
    // get the authentication token from local storage if it exists
    // const token = localStorage.getItem('access-token');
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

  if (isLogged) {
    return (
      <SafeAreaView style={styles.androidSafeArea}>
        <StatusBar style="auto" />
        <Login />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.androidSafeArea}>
      <StatusBar style="auto" />
      <HomeProjects />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  androidSafeArea: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
  }
});