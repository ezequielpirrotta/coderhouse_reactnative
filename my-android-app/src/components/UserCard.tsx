import { ActivityIndicator, Alert, Dimensions, FlatList, Image, Modal, StyleSheet, Text, View } from 'react-native'
import React, { useState, useEffect } from 'react'
import { User } from '../data/objectTypes'
import { colors } from '../global/colors'
import BouncyCheckbox from 'react-native-bouncy-checkbox'
import Search from '../components/Search'
import uuid from 'react-native-uuid';
import { useAppSelector, useAppDispatch } from '../app/hooks'

const UserCard = () => {
   const dispatch = useAppDispatch()
   const user = useAppSelector((state) => state.user.data)
   const [userLiked, setUserLiked] = useState('')
   const [keyword,setKeyword] = useState('')
   const [users,setUsers] = useState<User[]>([])
   const [filteredUsers, setFilteredUsers] = useState<User[]>([])
   const [isLoading, setIsLoading] = useState(true)

   const onLike = (id: string) => {
      setUserLiked(id);
   }
   
   useEffect(()=>{
      const fetchData = async () => {
         try {
            const response = await fetch(
               'https://randomuser.me/api/?results=5&inc=gender,login,id,name,location,dob,cell,picture,nat&noinfo'
            );
            let newUsers: User[] = []
            const result = (await response.json()).results
            result.forEach((element: any) => {
               let newUser: User = {
                  id: String(uuid.v4()),
                  name: element.name.first+' '+element.name.last,
                  username: element.login.username,
                  password: element.login.password,
                  matches: [],
                  pictures: [element.picture.thumbnail],
                  age: element.dob.age,
                  location: 'Ciudad1',
                  interests: ['musica','correr'],
                  filter: {}
               }
               newUsers.push(newUser);
            });
            return newUsers;
         }
         catch(error) {
            console.error('Error fetching user data:', error);
            throw error;
         }
      };
      fetchData()
      .then(async (newUsers) => {
         setUsers(newUsers);
         setIsLoading(false);
      })
      .catch((error) => {
         // Handle error appropriately, e.g., show an alert
         Alert.alert('Error', 'Failed to fetch user data');
      });
   },[user])
   useEffect(()=> {
      const usersLocation = users.filter(usr => user?usr.location === user.location:false)
      const filtered = usersLocation.filter(user => user.name.includes(keyword))
      setFilteredUsers(keyword!=''?filtered:usersLocation)
      setIsLoading(false);
   },[keyword])
   useEffect(()=>{
      if(users.length > 0){
         setIsLoading(false)
      }
      else {
         setIsLoading(true)
      }
   },[users])
   return (
      <View style={styles.container}>
         <Text style={styles.title}>Usuarios cerca de ti</Text>
         <Search setKeyword={setKeyword}/>
         <View style={styles.list}>
            {
               !isLoading?
               <FlatList 
                  data={filteredUsers.length>0?filteredUsers:users}
                  keyExtractor={item => item.id}
                  renderItem={ ({item}) =>
                  <View style={styles.user}>
                     
                     <Image source={{uri: user?.pictures[0]}} style={styles.image}/>
                     <Text style={styles.userText}>{item.name}, {item.age} años</Text>
                     <Text>{item.location}</Text>
                     <View style={styles.buttons}>
                        <BouncyCheckbox  onPress={() => {onLike(item.id)}}/>
                     </View>
                  </View>  
               }
               />
               :
               <>
                  <ActivityIndicator size={'large'}></ActivityIndicator>
                  <Text>Cargando usuarios...</Text>
               </>
            }
         </View>
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
      borderColor: 'black',
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