import { StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import { InputSelectFormProps } from '../../data/objectTypes'
import SelectDropdown from 'react-native-select-dropdown'

const InputSelectForm = ({label,onChange,options}: InputSelectFormProps) => {

   return (
      <View style={styles.container}>
         <Text style={styles.subTitle}>{label}</Text>
         <SelectDropdown
            data={options}
            onSelect={(selectedItem: string, index) => {
               onChange(selectedItem)
            }}
            buttonTextAfterSelection={(selectedItem, index) => {
               // text represented after item is selected
               // if data array is an array of objects then return selectedItem.property to render after item is selected
               return selectedItem
            }}
            rowTextForSelection={(item, index) => {
               // text represented for each item in dropdown
               // if data array is an array of objects then return item.property to represent item in dropdown
               return item
            }}
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
   },
   error: {
      fontSize: 16,
      color: 'red',
      /*fontFamily: 'Josefin',*/
      fontStyle: 'italic'
   }
})
export default InputSelectForm