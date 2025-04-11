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
    >
      <View style={styles.overlay}>
        <View style={styles.container}>{children}</View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    padding: DIMENSIONS.padding,
    justifyContent: "center",
    alignItems: "center",
    
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: DIMENSIONS.padding,
    width: "80%",
    
    backgroundColor: COLORS.backgroundDark,
    borderRadius: DIMENSIONS.radius / 2,
  },
});

export default PopUpModal;
