import React from 'react';
import { View, StyleSheet, FlatList, Text, Image, Dimensions } from 'react-native';
import { useAppSelector } from '../app/hooks';
import UserMatch from '../components/users/UserMatch';
import UserLike from '../components/users/UserLike';

const ChatScreen = () => {
  const {data: user, isLoading} = useAppSelector((state) => state.user)

  return (
    <View style={styles.container}>
      {
        user?
        <View style={styles.likeContainer}>
          <Text>Usuarios que te gustaron</Text>
          {
            user.likes?
              <FlatList
                data={user.likes}
                keyExtractor={(item,index) => index.toString()}
                renderItem={ ({item}) =>
                  <UserLike localId={item}/>
                }
              />
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
