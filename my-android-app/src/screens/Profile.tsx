import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Header from '../components/Header'
import ProfileData from '../components/ProfileData'

const Profile = () => {

   return (
      <>
         <Header title='Profile'/>
         <ProfileData />
      </>
   )
}

export default Profile

const styles = StyleSheet.create({})