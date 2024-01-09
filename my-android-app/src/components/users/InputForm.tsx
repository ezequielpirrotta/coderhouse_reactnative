import { StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import { InputFormProps } from '../../data/objectTypes'

const InputForm = ({label,onChange,error,isSecure=false}: InputFormProps) => {
   const [input,setInput] = useState('')

   const onChangeText = (text: string) => {
      setInput(text)
      onChange(text)
   }
   return (
      <View style={styles.container}>
         <Text style={styles.subTitle}>{label}</Text>
         <TextInput 
            style={styles.input}
            value={input}
            onChangeText={(value)=>{onChangeText(value)}}
            secureTextEntry={isSecure}
         />
      </View>
   )
}

const styles = StyleSheet.create({
   container: {
      flexDirection: 'column',
      justifyContent: 'flex-start',
      alignItems: 'center',
      width: '100%'
   },
   subTitle: {
      width: '90%',
      fontSize: 16

   },
   input: {
      width: '90%',
      borderWidth: 0,
      borderBottomWidth: 3,
      padding: 2,
      fontSize: 14
   }
})
export default InputForm