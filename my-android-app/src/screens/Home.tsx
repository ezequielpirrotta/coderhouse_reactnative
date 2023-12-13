import { StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import UserCard from '../components/UserCard'
import Footer from '../components/Footer'

const Home = () => {
   return (
      <>
         <Header/>
         <UserCard/>
      </>
   )
}

export default Home

const styles = StyleSheet.create({})