import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import TabNavigator from './TabNavigator'
import AuthNavigator from './AuthNavigator'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { useGetUserQuery } from '../app/servicies'
import { fetchSession } from '../database'
import { setUser } from '../features/users/authSlice'
import { setCurrentUser } from '../features/users/userSlice'
import { UserState } from '../data/objectTypes'

const MainNavigator = () => {
   const dispatch = useAppDispatch()
   const {token, localId} = useAppSelector((state) => state.auth)
   const result = useGetUserQuery(localId)
   useEffect(() => {
      
      (async () => {
         try {
            const session  = await fetchSession()
            if(session?.rows.length>0) {
               const user = session.rows._array[0]
               dispatch(setUser(user))
            }
         }
         catch(error) {
            console.log('Error getting session', error)
         }
      })()
   },[token])
   useEffect(()=>{
      
      if(localId!=''&&result.isSuccess) {
         
         const userData: UserState = {
            data: result.data?result.data:null,
            isLoading: false,
            error: null
         }
         dispatch(setCurrentUser(userData))
      }
   },[localId,result])
   return (
      <NavigationContainer>
         {
            localId ? <TabNavigator/> : <AuthNavigator/>
         }
      </NavigationContainer> 
   )
}
export default MainNavigator
const styles = StyleSheet.create({})