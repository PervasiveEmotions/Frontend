import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { Provider } from './context/context';
import Welcome from './screens/welcome';


export default function App() {
  return (
    <View style={styles.container}>
      <Provider>
        <Image source={require('./assets/Wallpaper.jpg')} style={styles.backgroundImage} />
        <Welcome />
      </Provider>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    position: "relative"
  },

  backgroundImage: {
    position: "absolute",
    flex: 1,
    resizeMode: 'center', // or 'stretch'
  },
  header: {
    position: "absolute",
    top: 150,
    fontWeight: "700",
    fontSize: 22,
    color: "#fff"
  }
});
