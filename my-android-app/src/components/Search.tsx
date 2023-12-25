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
            <TextInput style={styles.input} value={text} onChangeText={(value) => setText(value)} placeholder='Nombre'/>
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
        padding: 30,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 5
    },
    input: {
        margin: 20,
        width: '70%',
        borderBottomWidth: 2,
        borderBottomColor: '#aaaabb',
        borderCurve: 'circular'
    },
})
export default Search;