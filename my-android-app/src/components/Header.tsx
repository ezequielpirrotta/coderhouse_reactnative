import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { colors } from '../global/colors'
import { StatusBar } from 'expo-status-bar'

const Header = ({title = 'Connect ME'} ) => {
  return (
    <View style={styles.container}>
      <StatusBar translucent={true}/>
      <Text style={styles.title}>{title}</Text>
    </View>
  )
}

export default Header

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    backgroundColor: colors.green,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    margin: 30,
    fontSize: 20,
    fontFamily: 'JosefinBold',
    justifyContent: 'center',
    alignItems: 'center'
  },
})