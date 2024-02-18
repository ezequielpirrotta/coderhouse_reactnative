import React, { useEffect, useState } from 'react';
import { View, StyleSheet, FlatList, Text, Image, Dimensions } from 'react-native';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import UserMatch from '../components/users/UserMatch';
import UserLike from '../components/users/UserLike';
import { useUpdateUserMutation } from '../app/servicies';
import { updateUser } from '../features/users/userSlice';

const ChatScreen = () => {
  const {data: user} = useAppSelector((state) => state.user)
  const {localId} = useAppSelector((state) => state.auth)
  const [userDisLiked, setUserDisliked] = useState('')
  const [updateUserProfile, result] = useUpdateUserMutation()
  const dispatch = useAppDispatch()

  const onDisLike = async (id: string) => {
    setUserDisliked(id);
    if (userDisLiked) {
      let updatedUser = {...user}
      try {
          if(updatedUser?.likes && updatedUser?.likes.length > 0) {
            updatedUser.likes = updatedUser.likes.filter((item: any) => item !== userDisLiked)
            console.log(updatedUser.likes)
            const updateResult = await updateUserProfile({localId, data: updatedUser})
            console.log(updateResult)
            if('data' in updateResult){
              
              dispatch(updateUser(updateResult.data))
              setUserDisliked('')
            }
          }
      }
      
      catch(error:any) {
          console.log('Error likeando usuario: ',error)
      }
      
    }
  }
  useEffect(()=>{} , [userDisLiked,result])
  return (
    <View style={styles.container}>
      {
        user?
        <View style={styles.likeContainer}>
          {
            user.likes?
              <>
                <Text>Usuarios que te gustaron</Text>
                <FlatList
                  data={user.likes}
                  keyExtractor={(item,index) => index.toString()}
                  renderItem={ ({item}) =>
                    <UserLike localId={item} onDislike={onDisLike}/>
                  }
                />
              </>
              :<Text>No tienes usuarios que te gusten aún</Text>

          }
        </View>
          
        :null
      }
    </View>
  );
};
const windowWidth = Dimensions.get('window').width
const windowHeight = Dimensions.get('window').height

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    padding: 10,
  },
  likeContainer: {
    
    width: '100%',   
    justifyContent: "center",
    alignItems: "center",
    gap: 6
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  input: {
    flex: 1,
    height: 40,
    marginRight: 10,
    borderColor: 'darkCream',
    borderWidth: 1,
    paddingLeft: 10,
  },
});

export default ChatScreen;
