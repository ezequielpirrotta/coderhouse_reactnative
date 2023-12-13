import { Button, FlatList, Modal, StyleSheet, Text, View } from 'react-native'
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
   const onLike = (id: string) => {
      setUserLiked(id);
   }
   useEffect(()=>{
      const usersLocation = allUsers.filter(usr => usr.location === user.location)
      const filteredUsers = usersLocation.filter(user => user.username.includes(keyword));
      setUsers(filteredUsers)
   },[keyword])
   return (
      <View>
         <Text style={styles.title}>Usuarios cerca de ti</Text>
         <Search setKeyword={setKeyword}/>
         <View style={styles.list}>
            <FlatList 
               data={users}
               keyExtractor={item => item.id}
               renderItem={ ({item}) =>
               <View style={styles.task}>
                  <BouncyCheckbox  onPress={() => {onLike(item.id)}}/>
                  <Text style={styles.taskText}>{item.username}, {item.age} años</Text>
                  <Text>{item.location}</Text>
                  <View style={styles.buttons}>
                     
                  </View>
               </View>  
            }
            />
         </View>
      </View>
   )
}
//<Button color='red' title='Borrar' onPress={()=> onDelete(item.id)}/>
export default UserCard

const styles = StyleSheet.create({
   container: {
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
})