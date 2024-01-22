import Home from '../screens/HomeScreen';
import Profile from '../screens/ProfileScreen';
import Header from '../components/Header';
import FooterTabBar from '../components/FooterTabBar';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ChatScreen from '../screens/ChatScreen';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { setCurrentUser } from '../features/users/userSlice';
import { UserState } from '../data/objectTypes';
import { useGetUserQuery } from '../app/servicies';
import { ActivityIndicator } from 'react-native';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
   
   const email = useAppSelector(state => state.auth.email)
   const {data: userData,isLoading,error} = useGetUserQuery({username: email})
   useEffect(()=> {
      
   },[])
   return (
      <>
         {
            !isLoading ? 
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
               <Tab.Screen name='chat' component={ChatScreen} options={
                  ()=>{
                     return {
                     header: ()=> {
                        return <Header title='Chat'/>
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
            :
            <ActivityIndicator size="large"/>
         }
      </>
   )
}
export default TabNavigator;