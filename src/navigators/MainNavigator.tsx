import React, { useEffect, useState } from 'react'
import { StyleSheet } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import TabNavigator from './TabNavigator'
import AuthNavigator from './AuthNavigator'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { useGetUserQuery } from '../app/servicies'
import { fetchSession } from '../database'
import { setUser } from '../features/users/authSlice'
import { setCurrentUser } from '../features/users/userSlice'
import { UserState } from '../data/objectTypes'
import AwesomeAlert from 'react-native-awesome-alerts'

const MainNavigator = () => {
   const dispatch = useAppDispatch()
   const {token, localId} = useAppSelector((state) => state.auth)
   const result = useGetUserQuery(localId)
   const [textError, setTextError] = useState('')
   const [showAlert,setShowAlert] = useState(false)

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
            setTextError('Error getting session: '+error)
            setShowAlert(true)
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
         <AwesomeAlert
            show={showAlert}
            showProgress={false}
            title="Ha ocurrido un error :("
            message={textError}
            closeOnTouchOutside={false}
            closeOnHardwareBackPress={false}
            showConfirmButton={true}
            confirmText="De acuerdo"
            confirmButtonColor="blue"
            onConfirmPressed={() => {
               setShowAlert(false);
            }}
         />
      </NavigationContainer> 
      
   )
}
export default MainNavigator
const styles = StyleSheet.create({})