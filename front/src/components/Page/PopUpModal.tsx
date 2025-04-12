import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import Modal from "react-native-modal";
import { COLORS, DIMENSIONS } from "../../utils";

interface PopUpModalProps {
  isVisible: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const PopUpModal: React.FC<PopUpModalProps> = ({
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
      backdropColor={COLORS.primary}
    >


        <View style={styles.modalContent}>{children}</View>
    
    </Modal>
  );
};

const styles = StyleSheet.create({

  modalContainer: {
    justifyContent: "center",
    alignItems: "center",
    margin: 0, 

  
  },
  modalContent: {
    backgroundColor: COLORS.backgroundDark,
    maxWidth: "80%",
    width: "70%",
    height: "60%", // Adjust to your needs
    borderRadius: 10,
    padding: DIMENSIONS.padding,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default PopUpModal;
