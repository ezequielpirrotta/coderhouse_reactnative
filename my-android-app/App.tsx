import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import Home from './src/screens/Home';
import Profile from './src/screens/Profile';
import UserContextProvider from './src/contexts/UserContext';
import Footer from './src/components/Footer';
import { useFonts } from 'expo-font';

const App = () =>{
  
  const [screenSelected, setScreenSelected] = useState(true)
  
  const [fontLoaded] = useFonts({
    JosefinItalic: require('./assets/fonts/Josefin/JosefinSlab-Italic-VariableFont_wght.ttf'),
    JosefinVariable: require('./assets/fonts/Josefin/JosefinSlab-VariableFont_wght.ttf'),
    JosefinBold: require('./assets/fonts/Josefin/JosefinSlab-Bold.ttf'),
  })
  if(!fontLoaded) return null
  
  return (
    <UserContextProvider>
      <View style={styles.container}>
        {
          screenSelected?
          <Home />
          :
          <Profile/>
        }
        <Footer screen={screenSelected} setScreen={setScreenSelected}/>
      </View>
    </UserContextProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    border: '6px',
    borderColor: 'solid black',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
});

export default App;