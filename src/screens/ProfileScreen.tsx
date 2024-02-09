import { ScrollView, StyleSheet, View } from 'react-native'
import React from 'react'
import ProfileData from '../components/users/ProfileData'

const Profile = () => {

   return (
      <View style={styles.container}>
         <ProfileData/>
      </View>
   )
}

export default Profile

const styles = StyleSheet.create({
   container: {
      flex: 1,
      border: '6px',
      borderColor: 'solid black',
      borderWidth: 3,
      backgroundColor: '#fff',
      justifyContent: 'center',
   },
})