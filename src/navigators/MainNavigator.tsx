import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import TabNavigator from './TabNavigator'
import AuthNavigator from './AuthNavigator'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { useGetUserQuery } from '../app/servicies'
import { UserState } from '../data/objectTypes'
import { setCurrentUser } from '../features/users/userSlice'
import { fetchSession } from '../database'
import { setUser } from '../features/users/authSlice'
import { ResultSet } from 'expo-sqlite'

const MainNavigator = () => {
   const dispatch = useAppDispatch()
   const {token,email} = useAppSelector((state) => state.auth)
   const {data: userData,isLoading,error} = useGetUserQuery({username: email})
   useEffect(() => {
      
      (async () => {
         console.log(token)
         try {
            const session: ResultSet | void = await fetchSession()
            .then(()=>{ 
               console.log("Session:")
               console.log(session)
               if(session?.rows.length) {
                  const user = session.rows._array[0]
                  dispatch(setUser(user))
               }
            })
            .catch((error)=> {
               throw(error)
            })
         }
         catch(error) {
            console.log('Error getting session', error)
         }
      })
      console.log('Email de usuario:',email)
      if(!error&&!isLoading) {
         console.log(userData)
         const currentUser: UserState = {
            data: userData[Object.keys(userData)[0]],
            isLoading: isLoading,
            error: error
         };
         console.log("Usuario encontrado: ")
         console.log(currentUser)
         dispatch(setCurrentUser(currentUser))
      }
   },[token])
   return (
      <NavigationContainer>
         {
            token ? <TabNavigator/> : <AuthNavigator/>
         }
      </NavigationContainer> 
   )
}
export default MainNavigator
const styles = StyleSheet.create({})