import React, { useEffect } from 'react'
import { StyleSheet } from 'react-native'
import { RootStackParamList } from '../data/navigationTypes';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../components/users/Login';
import Header from '../components/Header';
import RegisterNavigator from './RegisterNavigator';


const RootStack = createNativeStackNavigator<RootStackParamList>();

const AuthNavigator = () => {
   
   return (
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
         <RootStack.Screen name='RegisterNavigator' component={RegisterNavigator} 
            options={
               ()=>{
                  return {
                     header: ()=> {
                        return <Header title='Registro'/>
                     }
                  }
               }
            }
         />
      </RootStack.Navigator>
   )
}
export default AuthNavigator
const styles = StyleSheet.create({})