import React from "react";
import {TouchableOpacity, Text, View, StyleSheet, Button } from 'react-native';
import { COLORS } from "../utils/colors";

const PanelButton = ({title, style}) => {
    return (
        <TouchableOpacity  style = {[panelStyle.button, style]}
            onPress={() => {
                console.log("bedule");
            }}
        >
            <Text style= {panelStyle.text}> {title} </Text>
        </TouchableOpacity>
    );
};

const panelStyle= StyleSheet.create({

    button: {
        backgroundColor: COLORS.backgroundDark,
    }, 

    text: {
        
        color : COLORS.primaryText,
    }
})

export default PanelButton;