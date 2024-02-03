import React, { useEffect, useState } from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import SubmitButton from '../../SubmitButton'
import { StackRegisterScreenProps } from '../../../data/navigationTypes'
import { useRegisterDispatch, useRegisterSelector } from '../../../app/hooks'
import { setFilters } from '../../../features/users/registerSlice'
import SliderContainer from '../../SliderContainer'
import { Slider } from '@miblanchard/react-native-slider'
import { colors } from '../../../global/colors'
import { initialMaxDistance, maxAge, maxDistance, minAge, minDistance } from '../../../global/constants'

const Ranges = ({navigation}: StackRegisterScreenProps) => {
   const filters = useRegisterSelector(state=>state.register.filters)
   const [ageRange,setAgeRange] = useState<[number,number]>(filters.ageRange?filters.ageRange:[18,60])
   const [distanceRange,setDistanceRange] = useState<number>(filters.distanceRange?filters.distanceRange:initialMaxDistance)
   const [skip, setSkip] = useState(false)
   const dispatch = useRegisterDispatch()
   useEffect(()=>{
      if(skip){
         navigation.navigate('Bio')
      }
   },[skip])
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
      setAgeRange(range)
   }
   const onDistanceRangeChange = (range: number) => {
      setDistanceRange(range)
   }
   return (
      <View style={styles.main}>
         <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Rango de edad</Text>
            <SliderContainer
               caption="Edad"
               symbol='años'
               sliderValue={[filters?.ageRange[0],filters?.ageRange[1]]}
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
               sliderValue={8}
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
})