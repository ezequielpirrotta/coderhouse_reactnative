import { ActivityIndicator, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import Login from '../components/users/Login';
import Register from './RegisterNavigator';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Header from '../components/Header';
import { RootStackParamList } from '../data/navigationTypes';
import { Provider } from 'react-redux';
import { registerStore } from '../app/Register/registerStore';


const RootStack = createNativeStackNavigator<RootStackParamList>();

const AuthNavigator = () => {
   return (
      <Provider store={registerStore}>
         <RootStack.Navigator initialRouteName='Login'>
            <RootStack.Screen name='Login' component={Login} 
               options={
                  ()=>{
                     return {
                        header: ()=> {
                           return <Header title='Bienvenido de nuevo!!'/>
                        }
                     }
                  }
               }
            />
            <RootStack.Screen name='Register' component={Register} />
         </RootStack.Navigator>
      </Provider>
   )
}
export default AuthNavigator
const styles = StyleSheet.create({})