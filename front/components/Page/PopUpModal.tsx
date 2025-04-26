import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import Modal from "react-native-modal";
import { COLORS, DIMENSIONS } from "../../utils";

interface PopUpModalProps {
  title: string;
  isVisible: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const PopUpModal: React.FC<PopUpModalProps> = ({
  title,
  isVisible,
  onClose,
  children,
}) => {
  const [isModalVisible, setModalVisible] = useState(isVisible);

  useEffect(() => {
    setModalVisible(isVisible);
  }, [isVisible]);

  return (
    <Modal
      isVisible={isModalVisible}
      hasBackdrop={true}
      onBackdropPress={onClose}
      animationIn="fadeIn"
      animationOut="fadeOut"
      useNativeDriver={true}
      backdropOpacity={DIMENSIONS.opacity}
      style={styles.modalContainer}
      backdropColor={COLORS.backgroundBlur}
    >

        
        <View style={styles.modalContent}>
        <Text style={styles.title}>{title} </Text>
          {children}
          </View>
    
    </Modal>
  );
};

const styles = StyleSheet.create({

  modalContainer: {
    justifyContent: "center",
    alignItems: "center",
    margin: 0, 

  
  },

  title: 
  {
    textAlign: "left",
    fontSize: DIMENSIONS.font,
    fontWeight: "bold",
    marginTop: DIMENSIONS.marginLarge,
    textTransform: "uppercase",
    color: COLORS.text,
    
  },
  modalContent: {
    backgroundColor: COLORS.background,
    maxWidth: "80%",
    width: "70%",
    height: "50%", // Adjust to your needs
    borderRadius: DIMENSIONS.radius,
    padding: DIMENSIONS.padding,
   
    justifyContent: "center",

  },
});

export default PopUpModal;
