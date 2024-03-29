import React from 'react';
import { useFonts } from 'expo-font';
import { Provider } from 'react-redux';
import { store } from './src/app/store';
import MainNavigator from './src/navigators/MainNavigator';
import { init } from './src/database';

init()
.then((result) => {
  console.log('Database initialized')
  console.log(result)
})
.catch((error)=>console.log(error))
const App = () =>{
  
  const [fontLoaded] = useFonts({
    JosefinItalic: require('./assets/fonts/Josefin/JosefinSlab-Italic-VariableFont_wght.ttf'),
    JosefinVariable: require('./assets/fonts/Josefin/JosefinSlab-VariableFont_wght.ttf'),
    JosefinBold: require('./assets/fonts/Josefin/JosefinSlab-Bold.ttf'),
  })
  if(!fontLoaded) return null
  return (
    <Provider store={store}>
      <MainNavigator/>
    </Provider>
  );
}

export default App;