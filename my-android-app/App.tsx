import React from 'react';
import Home from './src/screens/Home';
import Profile from './src/screens/Profile';
import Header from './src/components/Header';
import FooterTabBar from './src/components/FooterTabBar';
import UserContextProvider from './src/contexts/UserContext';
import { useFonts } from 'expo-font';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';



const App = () =>{
  
  const [fontLoaded] = useFonts({
    JosefinItalic: require('./assets/fonts/Josefin/JosefinSlab-Italic-VariableFont_wght.ttf'),
    JosefinVariable: require('./assets/fonts/Josefin/JosefinSlab-VariableFont_wght.ttf'),
    JosefinBold: require('./assets/fonts/Josefin/JosefinSlab-Bold.ttf'),
  })
  if(!fontLoaded) return null

  const Tab = createBottomTabNavigator();

  return (
    <UserContextProvider>
      <NavigationContainer>
        <Tab.Navigator 
          tabBar={(props)=>{return <FooterTabBar {...props}/>}}
        >
          <Tab.Screen name='home' component={Home} options={
            ()=>{
              return {
                header: ()=> {
                  return <Header title='Connect ME'/>
                }
              }
            }
          }>
          </Tab.Screen>
          <Tab.Screen name='profile' component={Profile} options={
            ()=>{
              return {
                header: ()=> {
                  return <Header title='Profile'/>
                }
              }
            }
          }>
          </Tab.Screen>
        </Tab.Navigator>
      </NavigationContainer>
      
    </UserContextProvider>
  );
}

export default App;