import { Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { colors } from '../../../global/colors'
import InputForm from '../InputForm'
import SubmitButton from '../../SubmitButton'
import { StackRegisterScreenProps } from '../../../data/navigationTypes'
import { signUpSchema } from '../../../validations/signUpSchema'
import { useAppDispatch } from '../../../app/hooks'
import { setBasics } from '../../../features/users/registerSlice'

const MainData = ({navigation}: StackRegisterScreenProps) => {
    const [name,setName] = useState('')
    const [lastName,setLastName] = useState('')
    const [email,setEmail] = useState('')
    const [errorEmail,setErrorEmail] = useState('')
    const [password,setPassword] = useState('')
    const [errorPassword, setErrorPassword] = useState('')
    const [confirmPassword,setConfirmPassword] = useState('')
    const [errorConfirmPassword, setErrorConfirmPassword] = useState('')
    const [age, setAge] = useState(18)
    const [sex, setSex] = useState('male')
    const dispatch = useAppDispatch()

    useEffect(()=>{
        setErrorEmail('')
        setErrorPassword('')
        setErrorConfirmPassword('')
    },[email,password,confirmPassword])
    const onSubmit = () => {
        try {
            const validation = signUpSchema.validateSync({email,password,confirmPassword})
            if (validation){
                const basicInfo = {
                    name: name+' '+lastName,
                    password,
                    email,
                    age,
                    sex
                }
                dispatch(setBasics(basicInfo))
                navigation.navigate('UserHome')
            }
        }
        catch(error: any) {
            console.log('Error:')
            console.log(error.path)
            switch (error.path) {
                case 'email':
                setErrorEmail(error.message)
                break
                case 'password':
                setErrorPassword(error.message)
                break
                case 'confirmPassword':
                setErrorConfirmPassword(error.message)
                break
            }
        }
    }
    return (
        <View style={styles.main}>
            <View style={styles.container}>
            <Text style={styles.title}>Register</Text>
            <InputForm
                label='Nombre'
                onChange={setName}
            />
            <InputForm
                label='Apellido'
                onChange={setLastName}
            />
            <InputForm
                label='Email'
                onChange={setEmail}
                error={errorEmail}
            />
            <InputForm
                label='Edad'
                onChange={setAge}
            />
            <InputForm
                label='Contraseña'
                onChange={setPassword}
                isSecure={true}
                error={errorPassword}
            />
            <InputForm
                label='Confirmar contraseña'
                onChange={setConfirmPassword}
                isSecure={true}
                error={errorConfirmPassword}

            />
            <SubmitButton title='Siguiente' onPress={onSubmit}/>
            <Text>Ya ienes una cuenta?</Text>
            <Pressable onPress={()=>{}}>
                <Text style={styles.subLink}>Inicia Sesion!</Text>
            </Pressable>
            </View>
        </View>
    )
}

export default MainData

const styles = StyleSheet.create({
    main: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    container: {
        width: '90%',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.darkCream,
        gap: 15,
        paddingVertical: 20,
        borderRadius: 10
    },
    title: {
        fontSize: 25,
        margin: 10
    },
    subLink: {
        color: 'blue',
        fontSize: 14,
        /*fontFamily: 'Josefin'*/
    }
})