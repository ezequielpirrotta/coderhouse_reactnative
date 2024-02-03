import { StyleSheet, View } from 'react-native'
import React from 'react'
import Feed from '../components/Feed'

const Home = () => {
   return (
      <View style={styles.container}>
         <Feed/>
      </View>
   )
}

export default Home

const styles = StyleSheet.create({
   container: {
     flex: 1,
     border: '6px',
     borderColor: 'solid black',
     backgroundColor: '#fff',
     alignItems: 'center',
     justifyContent: 'flex-start'
   },
 });