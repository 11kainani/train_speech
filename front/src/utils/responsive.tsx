import React from "react";
import { Dimensions } from "react-native";

const {height: screenHeight, width : screenWidth} = Dimensions.get('window');

const responsiveHeight = (percentage : number) => {
    return percentage*screenHeight/100;
};

const responsiveWidth = (percentage : number) => {
    return percentage*screenWidth/100;
};

export {responsiveHeight, responsiveWidth};