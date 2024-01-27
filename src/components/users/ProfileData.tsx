import React, { useEffect, useState } from 'react'
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { StyleSheet, Text, View, Button, FlatList,Modal, Dimensions, Image, ActivityIndicator, Pressable, ScrollView } from 'react-native';
import { colors } from '../../global/colors'
import { Filter, User } from '../../data/objectTypes';
import { Slider } from '@miblanchard/react-native-slider';
import SliderContainer from '../SliderContainer';
import AwesomeAlert from 'react-native-awesome-alerts';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { updateUser } from '../../features/users/userSlice';
import SubmitButton from '../SubmitButton';
import { deleteSession } from '../../database';
import { logOut } from '../../features/users/authSlice';
import { MaterialIcons, Feather, AntDesign } from '@expo/vector-icons';
import ImageSelector from './Registration/ImageSelector';
import { useGetUserQuery, useUpdateUserMutation } from '../../app/servicies';

const ProfileData = () => {
   const {data:user,isLoading,error} = useAppSelector((state) => state.user)
   const {localId} = useAppSelector((state) => state.auth)
   const [modalVisible, setModalVisible] = useState(false);
   const [itemSelected, setItemSelected] = useState('')
   const [showAlert, setShowAlert] = useState(false);
   const [didEdit, setDidEdit] = useState(false)
   const [userFilters, setUserFilters] = useState(user?.filter || {})
   const [showImagePick, setShowImagePick] = useState(false)
   const dispatch = useAppDispatch()
   const [updateUserProfile] = useUpdateUserMutation();
   const {data,isSuccess} = useGetUserQuery(localId)

   useEffect(()=>{
      if(isSuccess) {
         
      }
   },[user])
   const onValueChange = (filters: Filter | undefined) => {
      setDidEdit(true)
      setUserFilters(current=>filters?filters:current)
   }
   const onEditProfilePic = async (images: string[]) => {
      if(user) {
         let newUser = {...user}
         console.log('Imagenes',images)
         newUser.pictures = images 
         console.log('Nuevo usuario',newUser)
         try {

            const updateResult = await updateUserProfile({localId, data: newUser})
            if('data' in updateResult){
               dispatch(updateUser(updateResult.data))
               setShowImagePick(!showImagePick)
            }
            console.log('Resultado exitoso: ',updateResult)
         }
         
         catch(error:any) {
            console.log('Error editando usuario: ',error)
         }
      }
   }
   const onEdit = () => {
      let newData: User | null = user
      if(newData){
         newData.filter=userFilters
         dispatch(updateUser(newData))
         updateUserProfile({localId,data: newData})
         setDidEdit(false)
      }
   }
   const onDelete = (id:string) => {
      setItemSelected(id);
      setModalVisible(true);
   }
   
   const onLogOut = async() => {
      dispatch(logOut())
      await deleteSession(localId)
   }
   return (
      <ScrollView contentContainerStyle={styles.container}>
         {
         user?
            !showImagePick?
               <>
               <View style={styles.logOutContainer}>
                  <Pressable style={styles.logOutbutton} onPress={onLogOut}>
                     <MaterialIcons name="logout" size={32} color="black" />
                     <Text>Cerrar sesion</Text>
                  </Pressable>
               </View>
               <View style={styles.userData}>
                  <View style={styles.profile}>
                     <View style={styles.profilePic}>
                        <View>
                           {
                              user.pictures?
                                 <Image source={{uri:user.pictures[0]}} style={styles.image}/>
                                 :
                                 <Image source={require('../../../assets/images/deafultProfilePic.jpg')} style={styles.image}/>
                           }
                        </View>
                        <View style={styles.editContainer}>
                           <Pressable onPress={()=>{setShowImagePick(true)}} >
                              <Feather name="edit" size={32} color="black" style={styles.featherIcon}/>
                           </Pressable>
                        </View>
                     </View>
                     <Text style={styles.name}>{user.name}, {user.age}</Text>
                  </View>
                  <View style={styles.preferences}>
                     <Text style={styles.prefsTitle}>Preferencias</Text>
                     {user?.filter?.ageRange?
                        <>
                           <SliderContainer
                              caption="Age"
                              sliderValue={[user?.filter.ageRange[0],user?.filter.ageRange[1]]}
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
               </>
               :
               <View style={styles.imageSelectorContainer}>
                  <Pressable onPress={()=>{setShowImagePick(false)}} style={styles.backButton}>
                     <AntDesign name="back" size={24} color="black" />
                  </Pressable>
                  <ImageSelector maxImages={5} currentImages={user.pictures?user.pictures:[]} onAdd={onEditProfilePic}/>
               </View>
         :isLoading?

            <ActivityIndicator size="large"/>
            :
            <Text>Error: {error?.toString()}</Text>
         }
      </ScrollView>
   )
}

export default ProfileData

const windowWidth = Dimensions.get('window').width 
const windowHeight = Dimensions.get('window').width 
const styles = StyleSheet.create({

   container: {
      width: '100%',
      backgroundColor: colors.darkCream,
      justifyContent: 'flex-start',
      alignItems: "center",
      paddingTop: 20,
      paddingBottom: 20
   },
   logOutContainer: {
      width: '50%',
      justifyContent: 'center',
      alignItems: 'center',
      padding: 10
   },
   editContainer: {
      backgroundColor: colors.red
   },
   profile:{
      gap: 5,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 10,
      paddingBottom: 30
   },
   profilePic: {
      position: 'relative',
      overflow: 'hidden',
      borderRadius: 10
      
   },
   image:{
      minWidth: 90,
      minHeight: 90,
      width: windowWidth/2,
      height: windowHeight/2,
      resizeMode: 'contain',
      borderRadius: 90,
      borderColor: 'black',
      borderWidth: 2
   },
   imageSelectorContainer: {
      padding: 20
   },
   featherIcon: {
      position: 'absolute',
      bottom: 0,
      right: 0,
   },
   name: {
      fontSize: 24,
      fontFamily: 'JosefinBold'
   },
   logOutbutton: {
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors.green,
      borderRadius: 10,
      width: '100%'
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
      justifyContent: 'flex-start',
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
   buttons: {
      padding: 10,
   },
   backButton: {
      
   },
   modal_buttons: {
      padding: 4,
      justifyContent: 'center',
      flexDirection: 'row',
      gap: 4
   }
})

/**
 * <FlatList 
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
 */