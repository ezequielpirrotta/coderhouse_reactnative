import React, {useState} from 'react';
import { View, TextInput, Button, StyleSheet, Text } from 'react-native';
import AwesomeAlert from 'react-native-awesome-alerts';

type Props = {
    onAdd: Function
}

const AddToDo = ({onAdd}: Props) => {
    const [text, setText] = useState('')
    const [showAlert, setShowAlert] = useState(false)

    const addNew = () => {
        if(text!==''){
            onAdd(text)
            setText('')
        }
    }
    return (
        <View style={styles.container}>
            <TextInput style={styles.input} value={text} onChangeText={(value) => setText(value)} placeholder='Ej: lavar la ropa'/>
            <Button title='Añadir' onPress={()=> {text===''?setShowAlert(true):addNew()}}></Button>
            <AwesomeAlert
                show={showAlert}
                showProgress={false}
                title="No podés crear una tarea vacía &#128530;"
                closeOnTouchOutside={true}
                closeOnHardwareBackPress={false}
                showConfirmButton={true}
                confirmText="OK"
                confirmButtonColor="#DD6B55"
                onCancelPressed={() => {
                    setShowAlert(false);
                }}
                onConfirmPressed={() => {
                    addNew()
                    setShowAlert(false);
                }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 30,
        flexDirection: 'row',
        justifyContent: 'center',
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