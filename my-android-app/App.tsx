import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, FlatList,Modal} from 'react-native';
import AddToDo from './components/AddToDo';
import React, {useState} from 'react';
import uuid from 'react-native-uuid';

export default function App() {
  type toDoProps = {
    title: string
    id: string
    completed: boolean
  }
  const [toDOs, setToDOs] = useState<toDoProps[]>([])

  const onAdd = (data:string) => {
    const newToDo: toDoProps = {
      title: data,
      id: String(uuid.v4()),
      completed: false
    }; 
    setToDOs(current => [...current, newToDo])

  }
  const onDelete = (id:string) => {
    let array = toDOs;
    array = array.filter((item)=>item.id !== id)
    setToDOs(array)
  }
  const onCompleted = (id: string) => {
    let array = toDOs;
    let index = array.findIndex((item) => item.id === id)
    array[index].completed = true;
    setToDOs(array)
  }
  return (
    <View style={styles.container}>
      <Text style={styles.title}>To do list</Text>
      <AddToDo onAdd={onAdd}></AddToDo>
      <View>
        <FlatList 
          data={toDOs}
          keyExtractor={item => item.id}
          renderItem={ ({item}) =>
            <View style={styles.task}>
              <Text style={styles.taskText}>{item.title}</Text>
              <View style={styles.buttons}>
                <Button color='red' title='Borrar' onPress={()=> {onDelete(item.id)}}/>
                <Button color='green' title='Completar' onPress={()=> {onCompleted(item.id)}}/>
              </View>
              <View>
                {}
              </View>
            </View>  
          }
        />
        <Modal>

        </Modal>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    border: '2px',
    borderColor: 'solid black',
    backgroundColor: '#fff',
    alignItems: 'center',
    /*justifyContent: */
  },
  title: {
    fontSize: 20,
    alignItems: 'flex-start'
  },
  task: {
    flex: 1,
    border: '3px',
    borderColor: 'black',
    padding: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  taskText: {
    margin: 20,
    width: '60%',
    borderBottomWidth: 2,
    borderBottomColor: '#aaaabb',
    borderCurve: 'circular'
  },
  buttons: {
    padding: 5,
    justifyContent: 'space-around'
  },
  
});
