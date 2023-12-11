import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import Home from './src/screens/Home';
import Profile from './src/screens/Profile';
import UserContextProvider from './src/contexts/UserContext';

const App = () =>{
  
  const [screenSelected, setScreenSelected] = useState('home')
  const setScreen = (screen: string) => {
    console.log('cambié')
    setScreenSelected(screen)
  }
  
  return (
    <UserContextProvider>
      <View style={styles.container}>
        {
          screenSelected === 'home'?
          <Home setScreen={setScreen}/>
          :
          <Profile setScreen={setScreen}/>
        }
        <StatusBar style="auto" />
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