import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, Button, Dimensions, Image, ActivityIndicator, Pressable, ScrollView, TextInput } from 'react-native';
import { colors } from '../../global/colors'
import { Filter, Location,UserData } from '../../data/objectTypes';
import { Slider } from '@miblanchard/react-native-slider';
import SliderContainer from '../SliderContainer';
import AwesomeAlert from 'react-native-awesome-alerts';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { updateUser } from '../../features/users/userSlice';
import SubmitButton from '../SubmitButton';
import { deleteSession } from '../../database';
import { logOut } from '../../features/users/authSlice';
import { MaterialIcons, Feather, AntDesign } from '@expo/vector-icons';
import ImageSelector from '../ImageSelector';
import { useGetUserQuery, useUpdateUserMutation } from '../../app/servicies';
import EditButton from './EditButton';
import MapPreview from '../MapPreview';
import { initialMaxAge, initialMaxDistance, maxAge, maxDistance, minAge, minDistance } from '../../global/constants';
import BioInput from './BioInput';
import Search from '../Search';

const ProfileData = () => {
   const {data:user,isLoading,error} = useAppSelector((state) => state.user)
   const {localId} = useAppSelector((state) => state.auth)
   const [modalVisible, setModalVisible] = useState(false);
   const [itemSelected, setItemSelected] = useState('')
   const [showAlert, setShowAlert] = useState(false);
   const [didEdit, setDidEdit] = useState(false)
   const [bioDidEdit, setBioDidEdit] = useState(false)
   const [userFilters, setUserFilters] = useState<Filter>(user?.filters? {...user?.filters} : {ageRange:[minAge,initialMaxAge],distanceRange:initialMaxDistance})
   const [showImagePick, setShowImagePick] = useState(false)
   const dispatch = useAppDispatch()
   const [updateUserProfile] = useUpdateUserMutation();

   
   const onAgeRangeChange = (ageRange: [number,number]) => {
      setDidEdit(true)
      let newFilter = {...userFilters}
      if(ageRange) {
         newFilter.ageRange = ageRange;
      }
      setUserFilters(newFilter)
   }
   const onDistanceRangeChange = (distanceRange: number) => {
      setDidEdit(true)
      let newFilter = userFilters
      if(distanceRange) {
         newFilter.distanceRange = distanceRange;
      }
      setUserFilters(newFilter)
   }
   const onEditProfileLocation = async (location: Location) => {
      if(user) {
         let newUser = {...user}
         newUser.location = location 
         try {

            const updateResult = await updateUserProfile({localId, data: newUser})
            if('data' in updateResult){
               dispatch(updateUser(updateResult.data))
               
            }
         }
         
         catch(error:any) {
            console.log('Error editando usuario: ',error)
         }
      }
   }
   const onEditProfilePic = async (images: string[]) => {
      if(user) {
         let newUser = {...user}
         newUser.pictures = images 
         try {

            const updateResult = await updateUserProfile({localId, data: newUser})
            if('data' in updateResult){
               dispatch(updateUser(updateResult.data))
               setShowImagePick(!showImagePick)
            }
         }
         
         catch(error:any) {
            console.log('Error editando usuario: ',error)
         }
      }
   }
   const onEdit = () => {
      if(user){
         let newData:UserData  = {...user}
         if(newData){
            newData.filters=userFilters
            dispatch(updateUser(newData))
            updateUserProfile({localId,data: newData})
            setDidEdit(false)
         }
      }
   }
   const onSave = () => {
      
      setShowAlert(true)
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
         {user?
            !showImagePick?
               <>
               <View style={styles.logOutContainer}>
                  <Pressable style={styles.logOutbutton} onPress={onLogOut}>
                     <MaterialIcons name="logout" size={32} color="black" />
                     <Text>Cerrar sesion</Text>
                  </Pressable>
               </View>
               <ScrollView contentContainerStyle={styles.userData}>
                  <View style={styles.profile}>
                     <View style={styles.profilePic}>
                        <View>
                           <Pressable onPress={()=>{}}>
                              {
                                 user.pictures?
                                    <Image source={{uri:user.pictures[0]}} style={styles.image}/>
                                    :
                                    <Image source={require('../../../assets/images/deafultProfilePic.jpg')} style={styles.image}/>
                              }
                           </Pressable>
                           <EditButton onPress={()=>{setShowImagePick(true)}}/>
                        </View>
                     </View>
                     <Text style={styles.name}>{user.name}, {user.age}</Text>

                     {/** Biografy section */}
                     <BioInput {...user} ></BioInput>
                     
                     {
                        bioDidEdit?
                           <SubmitButton title='Guardar' onPress={()=>{setShowImagePick(true)}}/> : null
                     }
                     
                  </View>
                  {/** Map section */}
                  {
                     user.location?
                        <>
                           <Text style={styles.title}>Tu ubicacion</Text>
                           <Text>{user.location.address}</Text>
                           <MapPreview {...user.location} />
                        </>
                        :
                        <>
                           <Text>No tienes tu ubicación guardada</Text>
                        </>
                  }
                  <View style={styles.preferences}>
                     <Text style={styles.title}>Preferencias</Text>
                     {userFilters?.ageRange && userFilters?.ageRange.length > 0?
                        <SliderContainer
                           caption="Rango de edad"
                           symbol='Años'
                           sliderValue={userFilters.ageRange}
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
                        :
                        null
                     }{userFilters?.distanceRange ?
                        <SliderContainer
                           caption="Distancia"
                           sliderValue={userFilters.distanceRange}
                           symbol='Km'
                           onValueChange={onDistanceRangeChange}>
                           <Slider
                              animateTransitions
                              maximumTrackTintColor="#d3d3d3"
                              maximumValue={maxDistance}
                              minimumTrackTintColor="#1fb28a"
                              minimumValue={minDistance}
                              step={1}
                              thumbTintColor="#1a9274"
                              containerStyle={styles.slider}
                           />
                        </SliderContainer>
                        :
                        null
                     }
                     {
                        didEdit?
                           <View  style={styles.buttons}>
                              <Button title='Guardar' onPress={()=>setShowAlert(true)}></Button>
                              <Button title='Restablecer' onPress={()=>{setUserFilters({...user?.filters});  setDidEdit(false)}}></Button>
                           </View>
                           :null
                     }
                     <AwesomeAlert
                        show={showAlert}
                        showProgress={false}
                        title="Guardar los cambios?"
                        closeOnTouchOutside={true}
                        closeOnHardwareBackPress={false}
                        showCancelButton={true}
                        showConfirmButton={true}
                        cancelText='NO'
                        confirmText='SI'
                        confirmButtonColor={colors.green}
                        onCancelPressed={() => {
                           setDidEdit(false)
                           setUserFilters(user.filters)
                           setShowAlert(false);
                        }}
                        onConfirmPressed={() => {
                           onEdit()
                           setShowAlert(false);
                        }}
                     />
                  </View>
               </ScrollView>
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
      borderWidth: 4
   },
   imageSelectorContainer: {
      padding: 20
   },
   name: {
      fontSize: 24,
      fontFamily: 'JosefinBold'
   },
   bio: {
      textAlign: 'center',
      textAlignVertical: 'top'
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
      margin: 10,
      padding: 20,
      backgroundColor:'#d9d9d9',
      shadowColor: "#000000",
      shadowOpacity: 0.8,
      shadowRadius: 2,
      shadowOffset: {
         height: 1,
         width: 1
      }
   },
   title: {
      fontSize: 20
   },
   slider: {
      width: '90%'
   },
   userData: {
      justifyContent: 'flex-start',
      alignItems: 'center',
      margin: 5
   },
   bioContainer: {
      textAlign: 'justify',
      justifyContent:'center',
      alignItems: 'center',
      backgroundColor: colors.yellow,
      padding: 10,
      margin: 10,
      width: windowWidth/1.2,
      height: 200,
      borderWidth: 3,
      borderRadius: 7,
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
      display: "flex",
      flexDirection:"row",
      gap: 9,
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