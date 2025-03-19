import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, Button } from "react-native";
import Modal from "react-native-modal";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { COLORS, DIMENSIONS, responsiveHeight, responsiveWidth } from "../../utils";
import PanelButton from "../Button/PanelButton";


const PopUpPage : React.FC<PopUpPageProps> = ({isVisible, onClose}) => {

    const [isModalVisible, setModalVisible] = useState(isVisible);

    useEffect(() => {
        setModalVisible(isVisible);
        console.log("From Modal: ", isModalVisible);
    }, [isVisible]);
    

    return (
            <Modal isVisible={isModalVisible} 
            hasBackdrop = {true}
            onBackdropPress={onClose}
            animationIn="fadeIn"
            animationOut="fadeOut"
            useNativeDriver={true}
            >
                
                <View style={styles.overlay}>
                <View style={styles.container}>
                    <Text style={styles.text}>This pop-up page!</Text>
                    <PanelButton title={"CREATE"} />
                </View>
            </View>
            </Modal>
        
    );
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    container: {
        height: responsiveHeight(50),
        width: responsiveWidth(80),
        padding: DIMENSIONS.padding,
        borderRadius: DIMENSIONS.radius,
        backgroundColor: COLORS.backgroundDark,   
        justifyContent: "center",
        alignItems: "center",
     
    },
    text: {
        color: COLORS.white,
    },
});
export default PopUpPage;