import react from 'react';
import { Platform, SafeAreaView, StatusBar, StyleSheet } from 'react-native';

import HomeProjects from './src/screens/HomeProjects';

export default function App() {

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
