import { Platform, SafeAreaView, StatusBar, StyleSheet, Text } from 'react-native';

export default function App() {
  return (
    <SafeAreaView style={styles.androidSafeArea}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  androidSafeArea: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
  }
});
