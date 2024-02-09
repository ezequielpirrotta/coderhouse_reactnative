import React, { useEffect, useState } from 'react'
import { Button, ScrollView, StyleSheet, Text, View } from 'react-native'
import SubmitButton from '../../SubmitButton'
import { StackRegisterScreenProps } from '../../../data/navigationTypes'
import { useRegisterDispatch, useRegisterSelector } from '../../../app/hooks'
import { setFilters } from '../../../features/users/registerSlice'
import SliderContainer from '../../SliderContainer'
import { Slider } from '@miblanchard/react-native-slider'
import { colors } from '../../../global/colors'
import { initialMaxAge, initialMaxDistance, maxAge, maxDistance, minAge, minDistance } from '../../../global/constants'

const Ranges = ({navigation}: StackRegisterScreenProps) => {
   const filters = useRegisterSelector(state=>state.register.filters)
   const [ageRange,setAgeRange] = useState<[number,number]>(filters.ageRange?filters.ageRange:[minAge,initialMaxAge])
   const [distanceRange,setDistanceRange] = useState<number>(filters.distanceRange?filters.distanceRange:initialMaxDistance)
   const [didEdit, setDidEdit] = useState(false)
   const [skip, setSkip] = useState(false)
   const dispatch = useRegisterDispatch()
   useEffect(()=>{
      if(skip){
         navigation.navigate('Bio')
      }
   },[skip,ageRange,distanceRange])
   const onSubmit = () => {
      try {
         let newFilters = {...filters}
         newFilters.distanceRange = distanceRange 
         newFilters.ageRange = ageRange 
         dispatch(setFilters(newFilters))
         navigation.navigate('Bio')
      }
      catch(error: any) {
         
      }
   }
   const onAgeRangeChange = (range: [number,number]) => {
      setDidEdit(true)
      setAgeRange(range)
   }
   const onDistanceRangeChange = (range: number) => {
      setDidEdit(true)
      setDistanceRange(range)
   }
   const setDefaults =  () => {
      setAgeRange([minAge,initialMaxAge])
      setDistanceRange(initialMaxDistance)
   }
   return (
      <View style={styles.main}>
         <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Rango de edad</Text>
            <SliderContainer
               caption="Edad"
               symbol='años'
               sliderValue={[ageRange[0],ageRange[1]]}
               onValueChange={onAgeRangeChange}>
               <Slider
                  animateTransitions
                  maximumTrackTintColor="#d3d3d3"
                  maximumValue={maxAge}
                  minimumTrackTintColor="#1fb28a"
                  minimumValue={minAge}
                  step={1}
                  thumbTintColor="#1a9274"
                  containerStyle={styles.slider}
               />
            </SliderContainer>
            <Text style={styles.title}>Lejos o cerca?</Text>
            <SliderContainer
               caption="Distancia"
               symbol='Km'
               sliderValue={distanceRange}
               onValueChange={onDistanceRangeChange}>
               <Slider
                  animateTransitions
                  maximumTrackTintColor="#d3d3d3"
                  maximumValue={maxDistance}
                  minimumTrackTintColor="#1fb28a"
                  minimumValue={minDistance}
                  step={0.5}
                  thumbTintColor="#1a9274"
                  containerStyle={styles.slider}
               />
            </SliderContainer>
            {
               didEdit?
                  <View  style={styles.buttons}>
                     <Button title='Restablecer' onPress={()=>{setDefaults();  setDidEdit(false)}}></Button>
                  </View>
                  :null
            }
            <SubmitButton title='Siguiente' onPress={onSubmit}/>
            <SubmitButton title='Omitir' onPress={()=>{setSkip(true)}}/>
         </ScrollView>
      </View>
   )
}

export default Ranges

const styles = StyleSheet.create({
   main: {
      flex: 1,
      padding: 10,
   },
   container: {
      margin: 10,
      padding: 10,
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors.darkCream,
      gap: 15,
      borderWidth: 3,
      borderRadius: 10
   },
   title: {
      fontSize: 25,
      margin: 10
   },
   subLink: {
      color: 'blue',
      fontSize: 14,
      /*fontFamily: 'Josefin'*/
   },
   slider: {
      width: '90%'
   },
   buttons: {
      display: "flex",
      flexDirection:"row",
      gap: 9,
      padding: 10,
   }
})