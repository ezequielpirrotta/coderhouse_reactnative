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
  const onCompleted = (index: number) => {
    let array = toDOs;
    array[index].completed = !array[index].completed;
    console.log(array[index]);
    setToDOs(array)
  }
  useEffect(() => {
    console.log('\n',toDOs)
  },[toDOs])

  return (
    <View style={styles.container}>
      <Text style={styles.title}>To do list</Text>
      <AddToDo onAdd={onAdd}></AddToDo>
      <View style = {styles.list}>
        <FlatList 
          data={toDOs}
          keyExtractor={item => item.id}
          renderItem={ ({item,index}) =>
            <View style={styles.task}>
              <BouncyCheckbox onPress={() => {onCompleted(index)}} />
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
    justifyContent: 'space-between',
    gap: 6,
  },
  task: {
    flex: 1,
    border: '3px',
    borderWidth: 3,
    borderColor: 'black',
    padding: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  taskText: {
    margin: 5,
    width: '60%',	
    borderBottomWidth: 2,
    borderBottomColor: '#aaaabb',
    borderCurve: 'circular'
  },
  buttons: {
    margin: 3,
    /*padding: 3,*/
    gap:3
  },
  modal: {
    flex: 1,
    width: '60%',
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  modal_buttons: {
    padding: 4,
    justifyContent: 'space-between',
    flexDirection: 'row',
    gap: 4
  }
});
/*<View style={styles.container_2}>
    <TouchableOpacity
      onPress={() => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
        setExpanded(!expanded);
      }}>
      <Text>Press me to {expanded ? 'collapse' : 'expand'}!</Text>
    </TouchableOpacity>
    {expanded && (
      <View style={styles.tile}>
        <Text>I disappear sometimes!</Text>
      </View>
    )}
  </View>

  <Button color='green' title='Completar' onPress={()=> {onCompleted(item.id)}}/>
  
  */