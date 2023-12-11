import { StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import UserCard from '../components/UserCard'
import Footer from '../components/Footer'
import { Props } from '../data/objectTypes'


const Home = ({setScreen}: Props) => {
   
   return (
      <>
         <Header/>
         <UserCard setScreen={setScreen}/>
         <Footer setScreen={setScreen}/>
      </>
   )
}

export default Home

const styles = StyleSheet.create({})