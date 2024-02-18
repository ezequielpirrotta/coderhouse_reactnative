import { ActivityIndicator, Dimensions, FlatList, Image, Modal, RefreshControl, StyleSheet, Text, View } from 'react-native'
import React, { useState, useEffect } from 'react'
import { User, Location } from '../data/objectTypes'
import { colors } from '../global/colors'
import Search from './Search'
import { useAppSelector, useAppDispatch } from '../app/hooks'
import * as ExpoLocation from 'expo-location'
import { useGetUsersQuery, useUpdateUserMutation } from '../app/servicies'
import AwesomeAlert from 'react-native-awesome-alerts'
import MapPreview from './MapPreview'
import { updateUser } from '../features/users/userSlice'
import SubmitButton from './SubmitButton'
import HaversineGeolocation from 'haversine-geolocation'
import UserCard from './users/UserCard'

const Feed = () => {
   const dispatch = useAppDispatch()
   const user = useAppSelector((state) => state.user.data)
   const {localId} = useAppSelector((state) => state.auth)
   const [location, setLocation] = useState<Location>({latitude:'',longitude:'',address:''})
   const [updateUserProfile, {isLoading: updateIsLoading, data: updateData, isError: updateIsError}] = useUpdateUserMutation()
   const {data: users,isSuccess} = useGetUsersQuery()
   const [error,setError] = useState('')
   const [showAlert, setShowAlert] = useState(false);
   const [showMap, setShowMap] = useState(user?.location? false : true)
   const [userPassed, setUserPassed] = useState('')
   const [keyword,setKeyword] = useState('')
   const [filteredUsers, setFilteredUsers] = useState<User[]>([])
   const [isLoading, setIsLoading] = useState(true)
   const [refreshing, setRefreshing] = React.useState(false);

   const onRefresh = React.useCallback(() => {
      setRefreshing(true);
      setTimeout(() => {
         setRefreshing(false);
      }, 2000);
   }, []);
   const onLike = async (id: string) => {
      try {
         if (id) {
            let updatedUser = {...user}
            if(updatedUser?.likes) {
               const hasLikes = updatedUser?.likes.length > 0
               if(hasLikes) {
                  console.log('Mas de uno: ',updatedUser.likes.length)
                  updatedUser.likes = [...updatedUser.likes,id]
               }
               else {
                  updatedUser.likes = []
                  updatedUser.likes.push(id)
                  console.log(updatedUser.likes)
               }
            }
            else {
               updatedUser.likes = new Array<string>(id)
               console.log(updatedUser.likes)
            }
            await updateUserProfile({localId, data: updatedUser})
            
            if(!updateIsError&&updateData){
               console.log(updateData.likes)
               dispatch(updateUser(updateData))
            }
         }
         
      }
      catch(error:any) {
         console.log('Error likeando usuario: ',error)
      }
         
   }
   const onPass = (id: string) => {
      setUserPassed(id);
   }
   const onEditProfileLocation = async () => {
      if(user) {
         let newUser = {...user}
         newUser.location = location 
         try {

            const updateResult = await updateUserProfile({localId, data: newUser})
            if('data' in updateResult){
               dispatch(updateUser(updateResult.data))
               setShowMap(!showMap)
            }
         }
         
         catch(error:any) {
            console.log('Error editando usuario: ',error)
         }
      }
   }
   const isInRange = (point1: Location, point2: Location) => {
      if(user) {
         const diff = HaversineGeolocation.getDistanceBetween(point1, point2)
         return diff <= user.filters.distanceRange
      }
      return false
   } 
   useEffect(()=>{
      (async ()=> {
         if (!(user?.location?.latitude) || !(user?.location?.longitude)){
            let {status} = await ExpoLocation.requestForegroundPermissionsAsync();
            if(status !== 'granted') {
               setError('Permisos de ubicación denegados')
               setShowAlert(true)
               return
            }
            let fetchedLocation = await ExpoLocation.getCurrentPositionAsync({})
            const latitude = fetchedLocation.coords.latitude
            const longitude = fetchedLocation.coords.longitude
            const address = (await ExpoLocation.reverseGeocodeAsync({latitude,longitude}))[0]
            setLocation({
               latitude: latitude.toString(),
               longitude: longitude.toString(),
               address: address.city+', '+address.country
            })
            
         }
      })()
      if (user?.location?.latitude || user?.location?.longitude){
         setShowMap(false)
      }
   },[user,refreshing])
   useEffect(()=> {
      if(user && isSuccess){
         let usersLocation = users? users.filter((u)=> u.id != localId) : []
         if(usersLocation){
            usersLocation = usersLocation.filter(current=>{
               let isInLikes = false
               if(user.likes?.length > 0){
                  const result = user.likes.find(currentLike=>currentLike === current.id)
                  isInLikes = result !== undefined   
               }
               return !isInLikes
            })
            usersLocation = usersLocation.filter(current=> current?.data.location && user?.location ? isInRange(current?.data.location, user?.location):false)
         }
         const filtered = usersLocation.filter(user => user.data.name.includes(keyword))
         setFilteredUsers(keyword!=''?filtered:usersLocation)
         setIsLoading(false);
      }
      
   },[users,keyword,user])
   
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
                              keyExtractor={(item) => item.id}
                              refreshControl={
                                 <RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>
                              }
                              renderItem={ ({item}) =>
                                 <UserCard user={item} mainUserLocation={user?.location? user?.location : null } onLike={onLike} onPass={onPass}/>
                              }
                           />
                        :
                        <View>
                           <Text>No se encontraron usuarios cerca tuyo</Text>
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
export default Feed


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
    
})