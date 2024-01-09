import React, {useState} from 'react';
import { View, TextInput, Button, StyleSheet, Pressable } from 'react-native';
import { colors } from '../global/colors';
import { AntDesign } from '@expo/vector-icons';

type searchProps = {
    setKeyword: Function
}

const Search = ({setKeyword}: searchProps) => {
    const [text, setText] = useState('')
    
    
    return (
        <View style={styles.container}>
            <View style={styles.inputContainer}>
               <TextInput style={styles.input} value={text} onChangeText={(value) => setText(value)} placeholder='   Nombre'/>
            </View>
            <Pressable onPress={()=> {setKeyword(text)}}>
                <AntDesign name="search1" size={24} color="black" />
            </Pressable>
            <Pressable onPress={()=> {setText(''); setKeyword(text);}}>
                <AntDesign name="closecircle" size={24} color="black" />
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
   container: {
      padding: 10,
      margin: 10,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      gap: 2
   },
   inputContainer: {
      width: '70%',
      backgroundColor: 'white',
      borderWidth: 2,
      borderCurve: 'circular',
      borderRadius: 50,
   },
   input: {
   },
})
export default Search;