import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import Modal from "react-native-modal";
import { DIMENSIONS, COLORS } from "../../utils";

interface FilterModalProps {
  onClose: () => void;
  children: React.ReactNode;
  isVisible: boolean;
}

const FilterModal: React.FC<FilterModalProps> = ({
  onClose,
  children,
  isVisible,
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
      backdropColor={COLORS.backgroundBlur}
      style={styles.container}
    >
      <View style = {styles.content}>{children}</View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {

    flex: 1,
    justifyContent: "flex-end",
    width: "100%",
    alignSelf: "center",
  },

  content: {
    backgroundColor: COLORS.background,
    borderRadius:DIMENSIONS.radius,
    width: "100%",
    padding: DIMENSIONS.padding,
  }
});
export default FilterModal;
