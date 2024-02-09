import { Dimensions, StyleSheet, Text, View, Image, Button } from 'react-native'
import React from 'react'
import { User } from '../../data/objectTypes'
import { colors } from '../../global/colors'

const UserCard = (props:{
   user: User
   onLike?: CallableFunction
   onPass?: CallableFunction
}) => {
   const {user,onLike,onPass} = props
   return (
      <View style={styles.user}>
         <View style={styles.profilePic}>

         </View>
         {
            user.data.pictures ?
               <Image source={{uri: user.data.pictures[0]}} style={styles.image}/> 
               :
               <Image source={require('../../../assets/images/deafultProfilePic.jpg')} style={styles.image}/>
         }
         <Text style={styles.userText}>{user.data.name}, {user.data.age} años</Text>
         <Text>{user.data.home}</Text>
         <View style={styles.buttons}>
            {
               (onLike && onPass) ?
               <>
                  <Button title='Like' onPress={() => {onLike(user.id)}}/>
                  {/** <Button title='Pass' onPress={() => {onPass(user.id)}}/> */}
               </>
               :null
            }
         </View>
      </View>  
   )
}

export default UserCard

const windowWidth = Dimensions.get('window').width
const windowHeight = Dimensions.get('window').height

const styles = StyleSheet.create({
   user: {
      flex: 1,
      gap: 3,
      border: '3px',
      borderWidth: 3,
      borderColor: colors.salmon,
      width: windowWidth-30,
      margin: 10,
      padding: 30,
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      position: 'relative',
      overflow: 'hidden',
   },
   profilePic: {
      position: 'relative',
      overflow: 'hidden',
      borderRadius: 10 
   },
   image:{
      minWidth: 90,
      minHeight: 90,
      width: windowWidth/2,
      height: windowHeight/4,
      resizeMode: 'contain',
      borderRadius: 90,
      borderColor: 'black',
      borderWidth: 4
   },
   userText: {
      margin: 5,
      width: '60%',	
   },
   buttons: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 5,
      padding: 10,
   },
})