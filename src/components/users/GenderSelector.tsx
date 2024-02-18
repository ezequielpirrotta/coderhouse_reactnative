import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import InputSelectForm from '../InputSelectForm'
import { useGetGendersQuery } from '../../app/servicies'

const GenderSelector = (props: {onChange: CallableFunction}) => {
   const {onChange} = props;
   const {data,error,isLoading,isError} = useGetGendersQuery()
   useEffect(()=>{
      if(isError){
         console.log("Error al conseguir los generos: ",error)
      }
   },[isError])
   return (
      <>
         {
            isLoading?
            <>
               <Text>Cargando generos</Text>
               <ActivityIndicator size={'large'}/>
            </>
            :
            <InputSelectForm
               label='Genero'
               onChange={onChange}
               options={data?.genders?data?.genders:[]}
            />
         }
      </>
   )
}

export default GenderSelector

const styles = StyleSheet.create({})