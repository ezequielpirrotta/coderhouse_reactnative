import React, { useEffect } from 'react';
import TabNavigator from './src/navigators/TabNavigator';
import { getUser } from './src/features/users/userSlice';
import { useAppDispatch, useAppSelector } from './src/app/hooks';
import LoginScreen from './src/screens/LoginScreen';

const ActualApp = () =>{
   const dispatch = useAppDispatch()
   const {data,isLoading} = useAppSelector(state => state.user)

   useEffect(()=> {
      dispatch(getUser())
   },[])
   
   return (
      <>
         {
            isLoading ?  
               <LoginScreen/>
               : 
               <TabNavigator/> 
         }
      </>
      
   );
}
  
export default ActualApp;