import React, {useContext, useState} from 'react'
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { StyleSheet, Text, View, Button, FlatList,Modal, ScrollView} from 'react-native';
import uuid from 'react-native-uuid';
import { colors } from '../global/colors'
import { Filter, User, UserContextType } from '../data/objectTypes';
import { UserContext } from '../contexts/UserContext';
import { users as allUsers } from '../data/users';
import { Slider } from '@miblanchard/react-native-slider';
import SliderContainer from './SliderContainer';
import AwesomeAlert from 'react-native-awesome-alerts';

const ProfileData = () => {
  const {user, updateUser} = useContext(UserContext) as UserContextType;
  const [modalVisible, setModalVisible] = useState(false);
  const [itemSelected, setItemSelected] = useState('')
  const [showAlert, setShowAlert] = useState(false);
  const [didEdit, setDidEdit] = useState(false)
  const [userFilters, setUserFilters] = useState(user.filter)

  const onValueChange = (filters: Filter | undefined) => {
    setDidEdit(true)
    setUserFilters(current=>filters?filters:current)
  }

  const onEdit = () => {
    let newData: User | undefined = user
    newData.filter=userFilters
    updateUser(newData)
    setDidEdit(false)
  }
  const onDelete = (id:string) => {
    setItemSelected(id);
    setModalVisible(true);
  }
  const onDeleteConfirm = () => {
   
  }
  
  const getUserMatched = () => {
    const matchedUsers = allUsers.filter((currentUser)=>{
      let match = false;
      user.matches.forEach(element => {
        if(currentUser.id===element.userId){
          match = true;
        }
      });
      return match
    })
    return matchedUsers
  }
  
  return (
    
    <View style={styles.container}>
      <View >
        <ScrollView >
          {user.filter.ageRange?
              <>
                <SliderContainer
                  caption="Age"
                  sliderValue={[user.filter.ageRange[0],user.filter.ageRange[1]]}
                  onValueChange={onValueChange}>
                  <Slider
                    animateTransitions
                    maximumTrackTintColor="#d3d3d3"
                    maximumValue={80}
                    minimumTrackTintColor="#1fb28a"
                    minimumValue={18}
                    step={1}
                    thumbTintColor="#1a9274"
                    containerStyle={styles.slider}
                  />
                </SliderContainer>
                {
                  didEdit?
                  <Button title='Guardar' onPress={()=>setShowAlert(true)}></Button>
                  :null
                }
              </>
            :
            null
          }
          <AwesomeAlert
            show={showAlert}
            showProgress={false}
            title="Estás seguro que querés cambiar la edad?"
            closeOnTouchOutside={true}
            closeOnHardwareBackPress={false}
            showConfirmButton={true}
            showCancelButton={true}
            confirmText='SI'
            cancelText='NO'
            confirmButtonColor="#DD6B55"
            onCancelPressed={() => {
                setShowAlert(false);
            }}
            onConfirmPressed={() => {
                onEdit()
                setShowAlert(false);
            }}
        />
        </ScrollView>
      </View>
      <View style={styles.list}>
        <FlatList 
          data={getUserMatched()}
          keyExtractor={item => item.id}
          renderItem={ ({item}) =>
            <View style={styles.task}>
              <BouncyCheckbox  onPress={() => {} } />
              <Text style={styles.taskText}>{item.username}, {item.age} años</Text>
                  <Text>{item.location}</Text>
                  <View style={styles.buttons}>
                     
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
/**
 *  <Text style={styles.sliderTitle}>Age</Text>
    <Slider
      minimumValue={user.filter.ageRange[0]}
      maximumValue={user.filter.ageRange[1]}
      step={1}
      value={0.1}
      trackClickable={true}
    />
 */
const styles = StyleSheet.create({
  
  container: {
    backgroundColor: colors.darkCream,
    width: "100%",
    justifyContent: "center",
    alignItems: "center"
  },
  /*sliders: {
    flex:1,
    justifyContent: 'center',
    alignItems: 'center' 
  },*/
  slider: {
    width: '50%'
  },
  sliderTitle: {
    
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