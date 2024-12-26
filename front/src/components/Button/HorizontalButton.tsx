import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import PanelButton from './PanelButton';


const HorizontalButtons = (buttonList) => {
    return (
        <View>
            {buttonList.map((title,index) =>(
                <PanelButton
                    key = {index}
                    title={title} 
                />
            ))}
        </View>
    )
};



export default HorizontalButtons;