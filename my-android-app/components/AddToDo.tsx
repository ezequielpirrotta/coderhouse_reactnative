import React, {useState} from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';

type Props = {
    onAdd: Function
}
const AddToDo = ({onAdd}: Props) => {
    const [text, setText] = useState('')
    return (
        <View style={styles.container}>
            <TextInput style={styles.input} onChangeText={(value) => setText(value)} placeholder='Ej: lavar la ropa'/>
            <Button title='Añadir' onPress={()=> {onAdd(text)}}></Button>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 30,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    input: {
        margin: 20,
        width: '70%',
        borderBottomWidth: 2,
        borderBottomColor: '#aaaabb',
        borderCurve: 'circular'
    },
})
export default AddToDo;