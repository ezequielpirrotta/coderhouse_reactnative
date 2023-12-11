import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Header from '../components/Header'
import ProfileData from '../components/ProfileData'
import { Props } from '../data/objectTypes'
import Footer from '../components/Footer'

const Profile = ({setScreen}: Props) => {

   return (
      <>
         <Header title='Profile'/>
         <ProfileData/>
         <Footer setScreen={setScreen}/>
      </>
   )
}

export default Profile

const styles = StyleSheet.create({})