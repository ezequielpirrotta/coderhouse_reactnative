import React, {useContext, useState} from 'react'
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { StyleSheet, Text, View, Button, FlatList,Modal} from 'react-native';
import uuid from 'react-native-uuid';
import { colors } from '../global/colors'
import { Props, User, UserContextType } from '../data/objectTypes';
import { UserContext } from '../contexts/UserContext';

const ProfileData = () => {
  const {user, updateUser} = useContext(UserContext) as UserContextType;
  const [modalVisible, setModalVisible] = useState(false);
  const [itemSelected, setItemSelected] = useState('')
  
  const onEdit = (data:string) => {
    const newData: User | undefined = user
    updateUser(newData)
  }
  const onDelete = (id:string) => {
    setItemSelected(id);
    setModalVisible(true);
  }
  const onDeleteConfirm = () => {
    setUserData(current => current.filter((item)=>item.id !== itemSelected))
    setModalVisible(false)
  }
  const onCompleted = (id: string) => {
    setUserData((currentToDOs: User)=> {
      const newToDOs = [...currentToDOs];
      const index: number = newToDOs.findIndex(item => item.id === id)
      if(index != -1){
        newToDOs[index].completed = !newToDOs[index].completed;
      }
      return newToDOs
    })
  }
  
  return (
    <View style={styles.container}>
      <View style={styles.list}>
        <FlatList 
          data={user?.matches}
          keyExtractor={item => item.id}
          renderItem={ ({item}) =>
            <View style={styles.task}>
              <BouncyCheckbox  onPress={() => {onCompleted(item.id)} } isChecked={item.completed}/>
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

export default ProfileData

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