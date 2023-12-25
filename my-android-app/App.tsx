import React, { useEffect } from 'react';
import UserContextProvider from './src/contexts/UserContext';
import { useFonts } from 'expo-font';
import { Provider, TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import Store, { AppDispatch, RootState } from './src/app/store';
import TabNavigator from './src/navigators/TabNavigator';
import { getUser } from './src/features/users/userSlice';
import { useAppDispatch, useAppSelector } from './src/app/hooks';

const App = () =>{
  
  const [fontLoaded] = useFonts({
    JosefinItalic: require('./assets/fonts/Josefin/JosefinSlab-Italic-VariableFont_wght.ttf'),
    JosefinVariable: require('./assets/fonts/Josefin/JosefinSlab-VariableFont_wght.ttf'),
    JosefinBold: require('./assets/fonts/Josefin/JosefinSlab-Bold.ttf'),
  })
  if(!fontLoaded) return null
  const dispatch = useAppDispatch()
  const user = useAppSelector(state => state)
  useEffect(()=> {
    dispatch(getUser())
  },[])
  console.log(user)
  return (
    <Provider store={Store}>
      {
        user.isloading
      }
      
        <TabNavigator/>
      
    </Provider>
  );
}

export default App;