import { ActivityIndicator, Alert, Dimensions, FlatList, Image, Modal, StyleSheet, Text, View } from 'react-native'
import React, { useState, useEffect } from 'react'
import { User, Location } from '../data/objectTypes'
import { colors } from '../global/colors'
import BouncyCheckbox from 'react-native-bouncy-checkbox'
import Search from '../components/Search'
import { useAppSelector, useAppDispatch } from '../app/hooks'
import * as ExpoLocation from 'expo-location'
import { useGetUserQuery, useUpdateUserMutation } from '../app/servicies'
import AwesomeAlert from 'react-native-awesome-alerts'
import MapPreview from './MapPreview'
import { updateUser } from '../features/users/userSlice'
import SubmitButton from './SubmitButton'

const UserCard = () => {
   const dispatch = useAppDispatch()
   const user = useAppSelector((state) => state.user.data)
   const {localId} = useAppSelector((state) => state.auth)
   const [location, setLocation] = useState<Location>({latitude:'',longitude:''})
   const [updateUserProfile, result] = useUpdateUserMutation()
   const {data,isSuccess} = useGetUserQuery(localId)
   const [error,setError] = useState('')
   const [showAlert, setShowAlert] = useState(false);
   const [showMap, setShowMap] = useState(user?.location?.latitude? false : true)
   const [userLiked, setUserLiked] = useState('')
   const [keyword,setKeyword] = useState('')
   const [users,setUsers] = useState<User[]>([])
   const [filteredUsers, setFilteredUsers] = useState<User[]>([])
   const [isLoading, setIsLoading] = useState(true)

   const onLike = (id: string) => {
      setUserLiked(id);
   }
   const onEditProfileLocation = async () => {
      if(user) {
         let newUser = {...user}
         newUser.location = location 
         console.log('Nuevo usuario',newUser)
         try {

            const updateResult = await updateUserProfile({localId, data: newUser})
            if('data' in updateResult){
               dispatch(updateUser(updateResult.data))
               setShowMap(!showMap)
            }
            console.log('Resultado exitoso: ',updateResult)
         }
         
         catch(error:any) {
            console.log('Error editando usuario: ',error)
         }
      }
   }
   useEffect(()=>{
      (async ()=> {
         if (!user?.location?.latitude || !user?.location?.longitude){
            let {status} = await ExpoLocation.requestForegroundPermissionsAsync();
            if(status !== 'granted') {
               setError('Permisos de ubicación denegados')
               setShowAlert(true)
               return
            }
            let fetchedLocation = await ExpoLocation.getCurrentPositionAsync({})
            setLocation({
               latitude: (fetchedLocation.coords.latitude).toString(),
               longitude: (fetchedLocation.coords.longitude).toString()
            })
            
         }
      })()
      const fetchData = async () => {
         try {
            return []
         }
         catch(error) {
            throw error;
         }
      };
      fetchData()
      .then(async (newUsers) => {
         setUsers(newUsers);
         setIsLoading(false);
      })
      .catch((error: Error) => {
         // Handle error appropriately, e.g., show an alert  
         setError(`Error, Failed to fetch user data, ${error.message}`)
         setShowAlert(true)
      });
   },[user])
   useEffect(()=> {
      if(user){
         const usersLocation = users.filter(usr => user?usr.home === user.home:false)
         const filtered = usersLocation.filter(user => user.name.includes(keyword))
         setFilteredUsers(keyword!=''?filtered:usersLocation)
         setIsLoading(false);
      }
      
   },[keyword])
   
   return (
      <View style={styles.container}>
         {
            !showMap?
            <>
               <Text style={styles.title}>Usuarios cerca de ti</Text>
               <Search setKeyword={setKeyword}/>
               <View style={styles.list}>
                  {
                     !isLoading?
                        filteredUsers.length>0?
                           <FlatList 
                              data={filteredUsers.length>0?filteredUsers:users}
                              keyExtractor={(item,index) => index.toString()}
                              renderItem={ ({item,index}) =>
                                 <View style={styles.user}>
                                    
                                    <Image source={{uri: user?.pictures[0]}} style={styles.image}/>
                                    <Text style={styles.userText}>{item.name}, {item.age} años</Text>
                                    <Text>{item.home}</Text>
                                    <View style={styles.buttons}>
                                       <BouncyCheckbox  onPress={() => {onLike(index.toString())}}/>
                                    </View>
                                 </View>  
                              }
                           />
                        :
                        <View>
                           <Text>No se encontraron usuarios</Text>
                        </View>
                     :
                     <>
                        <ActivityIndicator size={'large'}></ActivityIndicator>
                        <Text>Cargando usuarios...</Text>
                     </>
                  }
               </View>
            </>
            :
            <View>
               <Text>Parece que no tienes tu ubicación guardada</Text>
               <MapPreview {...location}/>
               <SubmitButton title='Confirmar ubicacion' onPress={onEditProfileLocation}/>
            </View>
         }
         <AwesomeAlert
            show={showAlert}
            showProgress={false}
            title="Ha ocurrido un error :("
            message={error}
            closeOnTouchOutside={false}
            closeOnHardwareBackPress={false}
            showConfirmButton={true}
            confirmText="De acuerdo"
            confirmButtonColor="blue"
            onConfirmPressed={() => {
               setShowAlert(false);
            }}
         />
      </View>
   )
}
export default UserCard

const windowWidth = Dimensions.get('window').width

const styles = StyleSheet.create({
   container: {
      flex:1,
      backgroundColor: colors.darkCream,
      width: "100%",
      justifyContent: "center",
      alignItems: "center",
      paddingTop: 20,
      paddingBottom: 50
   },
   title: {
      textAlign: 'center',
      fontSize: 30,
      fontFamily: 'JosefinBold',
      fontWeight: '200'
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
    user: {
      flex: 1,
      gap: 3,
      border: '3px',
      borderWidth: 3,
      borderColor: colors.salmon,
      width: windowWidth-30,
      margin: 10,
      padding: 30,
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center'
    },
    image:{
      minWidth: 90,
      minHeight: 90,
      resizeMode: 'contain',
      borderRadius: 50
    },
    userText: {
      margin: 5,
      width: '60%',	
    },
    buttons: {
      padding: 10,
    },
})