import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, FlatList,Modal,LayoutAnimation,
  Platform,TouchableOpacity,
  UIManager,
  Switch} from 'react-native';
import BouncyCheckbox from "react-native-bouncy-checkbox";
import AddToDo from './components/AddToDo';
import React, {useState, useEffect} from 'react';
import uuid from 'react-native-uuid';

export default function App() {
  type toDoProps = {
    title: string
    id: string
    completed: boolean
  }
  const [toDOs, setToDOs] = useState<toDoProps[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [itemSelected, setItemSelected] = useState('')

  const onAdd = (data:string) => {
    const newToDo: toDoProps = {
      title: data,
      id: String(uuid.v4()),
      completed: false
    }; 
    setToDOs(current => [...current, newToDo])
  }
  const onDelete = (id:string) => {
    setItemSelected(id);
    setModalVisible(true);
  }
  const onDeleteConfirm = () => {
    setToDOs(current => current.filter((item)=>item.id !== itemSelected))
    setModalVisible(false)
  }
  const onCompleted = (id: string) => {
    setToDOs((currentToDOs: toDoProps[])=> {
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
      <Text style={styles.title}>To do list</Text>
      <AddToDo onAdd={onAdd}></AddToDo>
      <View style={styles.list}>
        <FlatList 
          
          data={toDOs}
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
        <Modal visible={modalVisible}>
          <View style={styles.modal}>
            <Text>Esta seguro de que quiere eliminar la tarea?</Text>
            <View style={styles.modal_buttons}>
              <Button color={'red'} title='Eliminar' onPress={()=>{onDeleteConfirm()}}></Button>
              <Button title='Cancelar' onPress={()=>{setModalVisible(false)}}></Button>
            </View>
          </View>
        </Modal>
        
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    border: '6px',
    borderColor: 'solid black',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  title: {
    fontSize: 20,
    justifyContent: 'center',
    alignItems: 'center'
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
    //padding: 3*/
    
  },
  modal: {
    flex: 1,
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 3
  },
  modal_buttons: {
    padding: 4,
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 4
  }
});