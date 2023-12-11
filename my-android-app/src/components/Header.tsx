import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { colors } from '../global/colors'

const Header = ({title = 'Connect ME'} ) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
    </View>
  )
}

export default Header

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.green,
        width: "100%",
       
        justifyContent: "center",
        alignItems: "center"
    },
    title: {
        margin: 30,
        fontSize: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
})