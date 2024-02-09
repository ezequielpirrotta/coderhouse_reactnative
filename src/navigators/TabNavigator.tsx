import { ActivityIndicator, StyleSheet } from 'react-native';
import Header from '../components/Header';
import Home from '../screens/HomeScreen';
import Profile from '../screens/ProfileScreen';
import ChatScreen from '../screens/ChatScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Entypo, Ionicons } from '@expo/vector-icons';
import { useAppSelector } from '../app/hooks';
import { useGetUserQuery } from '../app/servicies';
import { colors } from '../global/colors'

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
   
   const email = useAppSelector(state => state.auth.email)
   const {isLoading,error} = useGetUserQuery({username: email})
   
   return (
      !isLoading ? 
         <Tab.Navigator screenOptions={{
            tabBarLabelPosition: 'below-icon',
            tabBarShowLabel: true,
            tabBarStyle: styles.container ,
            tabBarLabelStyle: styles.tabLabel
         }}>
            <Tab.Screen name='home' component={Home} options={
               ()=>{
                  return {
                     tabBarIcon:  ({ color, size }) => { return <Entypo name="home" size={size*1.5} color={color} />},
                     tabBarLabel: 'Feed',
                     header: ()=> {
                        return <Header title='Connect ME' />
                     }
                  }
               }
            }>
            </Tab.Screen>
            <Tab.Screen name='chat' component={ChatScreen} options={
               ()=>{
                  return {
                     tabBarIcon:  ({ color, size }) => { return <Ionicons name="chatbubbles" size={size*1.5} color={color} />},
                     tabBarLabel: 'Chat',
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
                     tabBarIcon:  ({ color, size }) => { return <Ionicons name="person-circle-outline" size={size*1.5} color={color} />},
                     tabBarLabel: 'Perfil',
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
   )
   
}
export default TabNavigator;

const styles = StyleSheet.create({
   container: {
      flexDirection: 'row',
      backgroundColor: colors.darkCream,
      height: '10%',
      width: "100%",
      shadowOpacity: 7,
      marginTop: 10,
      padding: 10,
      justifyContent: 'space-evenly',
      shadowColor: 'black',
   },
   buttons: {
      flexDirection: 'row',
      justifyContent: 'space-evenly'
   },
   tabLabel: {
      fontSize: 20
   }
})