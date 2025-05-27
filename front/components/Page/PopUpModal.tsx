import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import Modal from "react-native-modal";
import { COLORS, DIMENSIONS, responsiveHeight, responsiveWidth } from "../../utils";

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
      backdropOpacity={COLORS.opacity}
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
    paddingVertical: DIMENSIONS.paddingSmall,
  },

  title: {
    textAlign: "left",
    fontSize: DIMENSIONS.fontLarge,
    fontWeight: "bold",
    textTransform: "uppercase",
    color: COLORS.textPrimary,
  },

  modalContent: {
    backgroundColor: COLORS.background,
    width: "90%",
    borderRadius: DIMENSIONS.radius,
    paddingHorizontal: DIMENSIONS.padding,
    paddingVertical: DIMENSIONS.paddingSmall,
    maxHeight: "50%",
    justifyContent: "space-evenly",
  },
});

export default PopUpModal;
