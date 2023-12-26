import Home from '../screens/HomeScreen';
import Profile from '../screens/ProfileScreen';
import Header from '../components/Header';
import FooterTabBar from '../components/FooterTabBar';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ChatScreen from '../screens/ChatScreen';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
   return (
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
      </NavigationContainer>
   )
}
export default TabNavigator;