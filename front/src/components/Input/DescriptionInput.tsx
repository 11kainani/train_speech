import React from "react";
import { SafeAreaView, TextInput, View, StyleSheet } from "react-native";
import { COLORS, DIMENSIONS, responsiveHeight, responsiveWidth } from "../../utils";

const DescriptionInput: React.FC<DescriptionInputProps> = ({description, onDescriptionChange}) => {

    const [text, onChangeText] = React.useState(description||'');
return (

    <SafeAreaView style= {styles.container}>
        <TextInput 
        editable
        style={styles.input}
        multiline
        maxLength={DIMENSIONS.maxDescriptionInput}
        onChangeText={(newText) =>{ 
            onChangeText(newText); 
            onDescriptionChange(newText);}
        }
        value={text}
        placeholder="Input the description"
        />
    </SafeAreaView>
);
}

const styles = StyleSheet.create({
    container:{

        backgroundColor: COLORS.white,
        padding: DIMENSIONS.padding*2,
        height: responsiveHeight(30),
        width: responsiveWidth(60),
        borderRadius: DIMENSIONS.radius,
        borderColor: COLORS.primaryText,
        borderWidth: DIMENSIONS.unit*2,
    },

    input: {
        color: COLORS.primary,
        textAlign:"center",
        
    },
});


export default DescriptionInput;