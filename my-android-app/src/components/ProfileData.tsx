import React, { useState } from 'react'
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { StyleSheet, Text, View, Button, FlatList,Modal, Dimensions, Image, ActivityIndicator } from 'react-native';
import { colors } from '../global/colors'
import { Filter, User } from '../data/objectTypes';
import { users as allUsers } from '../data/users';
import { Slider } from '@miblanchard/react-native-slider';
import SliderContainer from './SliderContainer';
import AwesomeAlert from 'react-native-awesome-alerts';
import { useAppSelector } from '../app/hooks';
import { updateUser } from '../features/users/userSlice';

const ProfileData = () => {
   const user = useAppSelector((state) => state.user.data)
   const [modalVisible, setModalVisible] = useState(false);
   const [itemSelected, setItemSelected] = useState('')
   const [showAlert, setShowAlert] = useState(false);
   const [didEdit, setDidEdit] = useState(false)
   const [userFilters, setUserFilters] = useState(user?user.filter:{})

   const onValueChange = (filters: Filter | undefined) => {
      setDidEdit(true)
      setUserFilters(current=>filters?filters:current)
   }

   const onEdit = () => {
      let newData: User | null = user
      if(newData){
      newData.filter=userFilters
      updateUser(newData)
      setDidEdit(false)
      }
   }
   const onDelete = (id:string) => {
      setItemSelected(id);
      setModalVisible(true);
   }
   const onDeleteConfirm = () => {
   }
   
   const getUserMatched = () => {
      if(user){
         const matchedUsers = allUsers.filter((currentUser)=>{
         let match = false;
         user.matches.forEach(element => {
            if(currentUser.id===element.userId){
               match = true;
            }
         });
         return match
         })
         return matchedUsers
      }
   }
   
   return (
      <View style={styles.container}>
         {
         user? 
            <>
               <View style={styles.userData}>
               <View style={styles.profile}>
                  <Image source={{uri:user.pictures[0]}} style={styles.image}/>
                  <Text style={styles.name}>{user.name}, {user.age}</Text>
               </View>
               <View style={styles.preferences} >
                  <Text style={styles.prefsTitle}>Preferencias</Text>
                  {user.filter.ageRange?
                     <>
                        <SliderContainer
                           caption="Age"
                           sliderValue={[user.filter.ageRange[0],user.filter.ageRange[1]]}
                           onValueChange={onValueChange}>
                           <Slider
                           animateTransitions
                           maximumTrackTintColor="#d3d3d3"
                           maximumValue={80}
                           minimumTrackTintColor="#1fb28a"
                           minimumValue={18}
                           step={1}
                           thumbTintColor="#1a9274"
                           containerStyle={styles.slider}
                           />
                        </SliderContainer>
                        {
                           didEdit?
                           <Button title='Guardar' onPress={()=>setShowAlert(true)}></Button>
                           :null
                        }
                     </>
                     :
                     null
                  }
                  <AwesomeAlert
                     show={showAlert}
                     showProgress={false}
                     title="Estás seguro que querés cambiar la edad?"
                     closeOnTouchOutside={true}
                     closeOnHardwareBackPress={false}
                     showConfirmButton={true}
                     showCancelButton={true}
                     confirmText='SI'
                     cancelText='NO'
                     confirmButtonColor="#DD6B55"
                     onCancelPressed={() => {
                        ()=>{
         
                        }
                        setShowAlert(false);
                     }}
                     onConfirmPressed={() => {
                        onEdit()
                        setShowAlert(false);
                     }}
                  />
               </View>
               </View>
               <View style={styles.list}>
               <FlatList 
                  data={getUserMatched()}
                  keyExtractor={item => item.id}
                  renderItem={ ({item}) =>
                     <View style={styles.task}>
                     <BouncyCheckbox  onPress={() => {} } />
                     <Text style={styles.taskText}>{item.name}, {item.age} años</Text>
                           <Text>{item.location}</Text>
                           <View style={styles.buttons}>
                           
                           </View>
                     </View>  
                  }
               />
               <Modal animationType='fade' visible={modalVisible}>
                  <View style={styles.modal}>
                     <Text>Esta seguro de que quiere eliminar la tarea?</Text>
                     <View style={styles.modal_buttons}>
                     <Button color={'red'} title='Eliminar' onPress={()=>{onDeleteConfirm()}}></Button>
                     <Button title='Cancelar' onPress={()=>{setModalVisible(false)}}></Button>
                     </View>
                  </View>
               </Modal>
               </View>
            </>
         :
         <ActivityIndicator size="large"/>   
         }
      </View>
   )
}

export default ProfileData

const windowWidth = Dimensions.get('window').width 
const styles = StyleSheet.create({

   container: {
      backgroundColor: colors.darkCream,
      justifyContent: "center",
      alignItems: "center"
   },
   profile:{
      gap: 10,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
      paddingBottom: 30
   },
   image:{
      minWidth: 90,
      minHeight: 90,
      width: windowWidth/5,
      resizeMode: 'contain',
      borderRadius: 50
   },
   name: {
      fontSize: 24,
      fontFamily: 'JosefinBold'
   },
   preferences: {
      justifyContent: 'center',
      alignItems: 'center',
      padding:20,
      backgroundColor:'#d9d9d9',
      shadowColor: "#000000",
      shadowOpacity: 0.8,
      shadowRadius: 2,
      shadowOffset: {
         height: 1,
         width: 1
      }
   },
   prefsTitle: {
      fontSize: 20
   },
   slider: {
      width: '50%'
   },
   userData: {
      flex:1,
      justifyContent:'center',
      alignItems: 'center'
   },
   sliderTitle: {
      
   },
   modal: {
      flex: 1,
      padding: 5,
      alignItems: 'center',
      justifyContent: 'center',
      opacity: 3
   },
   list: {
      flex:1,
      justifyContent: 'center',
      gap: 6,
   },
   task: {
      flex: 1,
      border: '3px',
      borderWidth: 3,
      borderColor: 'black',
      margin: 10,
      padding: 30,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center'
   },
   taskText: {
      margin: 5,
      width: '60%',	
   },
   buttons: {
      padding: 10,
   },
   modal_buttons: {
      padding: 4,
      justifyContent: 'center',
      flexDirection: 'row',
      gap: 4
   }
})