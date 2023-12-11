import { Button, FlatList, Modal, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { users } from '../data/users'
import { Props, User } from '../data/objectTypes'
import { colors } from '../global/colors'
import BouncyCheckbox from 'react-native-bouncy-checkbox'

const UserCard = ({setScreen}: Props) => {
   const [user, setUser] = useState<User[]>(users)
   
   const onLike = (id: string) => {

   })
   return (
      <View>
         <Button title={"Go Back"} onPress={setScreen(true)}></Button>
         <View style={styles.list}>
            <FlatList 
               data={users}
               keyExtractor={user => user.id}
               renderItem={ ({item}) =>
               <View style={styles.task}>
                  <BouncyCheckbox  onPress={() => {onLike(item.id)} } isChecked={item.completed}/>
                  <Text style={item.completed?{...styles.taskText, 
                  textDecorationLine: 'line-through',
                  backgroundColor: '#adff2f'  
                  }:styles.taskText}>{item.title}</Text>
                  <View style={styles.buttons}>
                  <Button color='red' title='Borrar' onPress={()=> onDelete(item.id)}/>
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
      </View>
   )
}

export default UserCard

const styles = StyleSheet.create({
   container: {
      backgroundColor: colors.darkCream,
      width: "100%",
      justifyContent: "center",
      alignItems: "center"
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