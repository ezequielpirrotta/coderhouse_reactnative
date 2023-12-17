import { Button, FlatList, Image, Modal, StyleSheet, Text, View } from 'react-native'
import React, { useState, useEffect, useContext} from 'react'
import { users as allUsers }  from '../data/users'
import { User, UserContextType } from '../data/objectTypes'
import { colors } from '../global/colors'
import BouncyCheckbox from 'react-native-bouncy-checkbox'
import Search from '../components/Search'
import { UserContext } from '../contexts/UserContext'

const UserCard = () => {
   const {user} = useContext(UserContext) as UserContextType
   const [userLiked, setUserLiked] = useState('')
   const [keyword,setKeyword] = useState('')
   const [users,setUsers] = useState<User[]>([])

   const getUsers = async () => {
      const response = await fetch(
         'https://randomuser.me/api/?results=5&inc=gender,login,id,name,location,dob,cell,picture,nat&noinfo'
      );
      let newUsers: User[] = []
      const result = (await response.json()).results
      result.forEach((element: any) => {
         let newUser: User = {
            id: element.id.value,
            username: element.login.username,
            password: element.login.password,
            matches: [],
            pictures: [element.picture.thumbnail],
            age: element.dob.age,
            location: element.location.city,
            interests: ['musica','correr'],
            filter: {}
         }
         newUsers.push(newUser);
      });
      return newUsers;
   } 

   const onLike = (id: string) => {
      setUserLiked(id);
   }
   
   useEffect(()=>{
      const fetchData = async () => {
         const data = await getUsers();
         const usersLocation = data.filter(usr => user?usr.location === user.location:false)
         const filteredUsers = usersLocation.filter(user => user.username.includes(keyword));
         setUsers(filteredUsers)
      };
      fetchData();
   },[keyword])
   return (
      <View style={styles.container}>
         <Text style={styles.title}>Usuarios cerca de ti</Text>
         <Search setKeyword={setKeyword}/>
         <View style={styles.list}>
            <FlatList 
               data={users}
               keyExtractor={item => item.id}
               renderItem={ ({item}) =>
               <View style={styles.user}>
                  <View>
                     <Image source={require('../../assets/favicon.png')}></Image>
                  </View>
                  <Text style={styles.userText}>{item.username}, {item.age} años</Text>
                  <Text>{item.location}</Text>
                  <View style={styles.buttons}>
                     <BouncyCheckbox  onPress={() => {onLike(item.id)}}/>
                  </View>
               </View>  
            }
            />
         </View>
      </View>
   )
}

export default UserCard

const styles = StyleSheet.create({
   container: {
      flex:1,
      backgroundColor: colors.darkCream,
      width: "100%",
      justifyContent: "center",
      alignItems: "center"
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
      border: '3px',
      borderWidth: 3,
      borderColor: 'black',
      margin: 10,
      padding: 30,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center'
    },
    userText: {
      margin: 5,
      width: '60%',	
    },
    buttons: {
      padding: 10,
    },
})