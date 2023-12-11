import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { colors } from '../global/colors'
import Svg, { Circle, Rect } from 'react-native-svg';
import { Props } from '../data/objectTypes';

const Footer = ({setScreen}: Props) => {
  return (
    <View style={styles.container}>
        <View style={styles.buttons}>
            
            <Pressable key={'home'} onPress={setScreen('home')}>
                <Svg height="24" width="24" viewBox="0 0 576 512">
                    <path d="M575.8 255.5c0 18-15 32.1-32 32.1h-32l.7 160.2c0 2.7-.2 5.4-.5 8.1V472c0 22.1-17.9 40-40 40H456c-1.1 0-2.2 0-3.3-.1c-1.4 .1-2.8 .1-4.2 .1H416 392c-22.1 0-40-17.9-40-40V448 384c0-17.7-14.3-32-32-32H256c-17.7 0-32 14.3-32 32v64 24c0 22.1-17.9 40-40 40H160 128.1c-1.5 0-3-.1-4.5-.2c-1.2 .1-2.4 .2-3.6 .2H104c-22.1 0-40-17.9-40-40V360c0-.9 0-1.9 .1-2.8V287.6H32c-18 0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7L564.8 231.5c8 7 12 15 11 24z"/>
                </Svg>
            </Pressable>
            <Pressable key={'profile'} onPress={setScreen('profile')}>
                <Svg  height="24" width="24" viewBox="0 0 512 512"><path d="M399 384.2C376.9 345.8 335.4 320 288 320H224c-47.4 0-88.9 25.8-111 64.2c35.2 39.2 86.2 63.8 143 63.8s107.8-24.7 143-63.8zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zm256 16a72 72 0 1 0 0-144 72 72 0 1 0 0 144z"/></Svg>
            </Pressable>
        </View>
    </View>
  )
}

export default Footer

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: colors.darkCream,
        width: "100%",
        shadowOpacity: 5,
        justifyContent: "center",
        alignItems: "center",
        margin: 2,
        position: 'absolute', 
        left: 0, 
        right: 0, 
        bottom: 0
    },
    buttons: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-evenly'
    }
})