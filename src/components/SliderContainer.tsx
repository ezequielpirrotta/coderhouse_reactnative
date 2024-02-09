import React, {Children, ReactElement, cloneElement, useEffect, useState} from 'react'
import { StyleSheet, Text, View} from 'react-native'; 
import { Slider } from '@miblanchard/react-native-slider';

const SliderContainer = (props: {
    caption: string;
    symbol?:string;
    children: ReactElement;
    sliderValue?: Array<number> | number;
    trackMarks?: Array<number>;
    vertical?: boolean;
    onValueChange?: CallableFunction;
}) => {
    const {caption, symbol, sliderValue, trackMarks, onValueChange} = props;
    const [value, setValue] = useState(
        sliderValue ? sliderValue : 1,
    );
    useEffect(()=>{
        setValue(sliderValue ? sliderValue : 1)
    },[sliderValue])
    let renderTrackMarkComponent: (index: number) => ReactElement | null;

    if (trackMarks?.length && (!Array.isArray(value) || value?.length === 1)) {
        renderTrackMarkComponent = (index: number) => {
            const currentMarkValue = trackMarks[index];
            const currentSliderValue =
                value || (Array.isArray(value) && value[0]) || 0;
            const style =
                currentMarkValue > Math.max(currentSliderValue)
                    ? trackMarkStyles.activeMark
                    : trackMarkStyles.inactiveMark;
            return <View style={style} />;
        };
    }

    const onChange = (newValue: number[] | number) =>{
        setValue(newValue);
        if(onValueChange !== undefined) {
            onValueChange(newValue)
        }
    }
    const renderChildren = () => {
        return Children.map(
            props.children,
            (child: ReactElement) => {
                if (!!child && child.type === Slider) {
                    return cloneElement(child, {
                        onValueChange: onChange,
                        renderTrackMarkComponent,
                        trackMarks,
                        value,
                    });  
                }

                return child;
            },
        );
    };
    
    return (
        <View style={styles.sliderContainer}>
            <View style={styles.titleContainer}>
                <Text>{caption}</Text>
                <Text>{Array.isArray(value) ? value.join(' - ') : value} {symbol?symbol:''}</Text>
            </View>
            {renderChildren()}
        </View>
    );
};

const borderWidth = 4
const styles = StyleSheet.create({
    
    sliderContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 300,
        margin: 5
        //addingVertical: 16,
    },
    titleContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
})
const trackMarkStyles = StyleSheet.create({
    activeMark: {
        borderColor: 'red',
        borderWidth,
        left: -borderWidth / 2,
    },
    inactiveMark: {
        borderColor: 'grey',
        borderWidth,
        left: -borderWidth / 2,
    },
});

export default SliderContainer;
