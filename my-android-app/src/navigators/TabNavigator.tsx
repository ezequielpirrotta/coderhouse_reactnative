import Home from '../screens/Home';
import Profile from '../screens/Profile';
import Header from '../components/Header';
import FooterTabBar from '../components/FooterTabBar';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

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