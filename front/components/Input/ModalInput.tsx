import React from "react";
import { SafeAreaView, TextInput, View, StyleSheet } from "react-native";
import { COLORS, DIMENSIONS, responsiveHeight, responsiveWidth } from "../../utils";

interface ModalInputProps {
    inputText : string, 
    placeholder: string
    onDescriptionChange : (text: string)=> void;

}

const ModalInput: React.FC<ModalInputProps> = ({inputText: string, onDescriptionChange, placeholder}) => {

    const [text, onChangeText] = React.useState(string);
return (

    <SafeAreaView style= {styles.container}>
        <TextInput 
        editable
        style={styles.input}
        multiline
        scrollEnabled={true}
        maxLength={DIMENSIONS.maxDescriptionLength}
        onChangeText={(newText) =>{ 
            onChangeText(newText); 
            onDescriptionChange(newText);}
        }
        value={text}
        placeholder={placeholder}
        />
    </SafeAreaView>
);
}

const styles = StyleSheet.create({
    container:{

        backgroundColor: COLORS.secondary,
        padding: DIMENSIONS.padding,
        borderRadius: DIMENSIONS.radius,
        borderColor: COLORS.primary,
        borderWidth: DIMENSIONS.border,
        height: "40%"
    },

    input: {
        color: COLORS.textPrimary,
        textAlign:"justify",
        fontSize: DIMENSIONS.font,
        
    },
});


export default ModalInput;