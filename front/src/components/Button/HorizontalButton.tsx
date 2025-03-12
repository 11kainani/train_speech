import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import PanelButton from './PanelButton';


const HorizontalButtons: React.FC<HorizontalButtonsProps> = (buttonList) => {
    return (
        <View>
            {buttonList.map((title:string,index:string) =>(
                <PanelButton
                    key = {index}
                    title={title}
                />
            ))}
        </View>
    )
};



export default HorizontalButtons;