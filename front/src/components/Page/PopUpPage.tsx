import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, Button } from "react-native";
import Modal from "react-native-modal";
import {
  COLORS,
  DIMENSIONS,
  responsiveHeight,
  responsiveWidth,
} from "../../utils";
import { HorizontalButton, PanelButton } from "../Button";
import { DescriptionInput } from "../Input";

const PopUpPage: React.FC<PopUpPageProps> = ({
  isVisible,
  onClose,
  description,
  setDescription,
}) => {
  const [isModalVisible, setModalVisible] = useState(isVisible);
  enum subjectType {
    NONE = "none",
    PROMPT = "prompt",
    QUESTION = "question",
  }
  const [subjectSelector, setSubjectSelector] = useState<subjectType>(
    subjectType.NONE
  );

  const handleSubjectSelector = (type: subjectType) => {
    if (subjectSelector != type) {
      setSubjectSelector(type);
    } else {
      setSubjectSelector(subjectType.NONE);
    }
  };
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
        <View style={styles.container}>
          <Text style={styles.text}>Description</Text>
          <DescriptionInput
            description={description}
            onDescriptionChange={setDescription}
          />
          <Text style={styles.text}>Mode</Text>
          <View style={styles.horizontal}>
            <PanelButton
              title={"Prompt"}
              style={[styles.defaultButton, subjectSelector === subjectType.PROMPT ? styles.select : styles.unselect]}
              onPress={() => handleSubjectSelector(subjectType.PROMPT)}
            />
            <PanelButton
              title={"Question"}
              style={[styles.defaultButton, subjectSelector === subjectType.QUESTION ? styles.select : styles.unselect ]}
              onPress={() => handleSubjectSelector(subjectType.QUESTION)}
            />
          </View>

          <PanelButton title={"CREATE"} />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: DIMENSIONS.padding,
  },
  container: {
    height: responsiveHeight(55),
    width: responsiveWidth(80),
    padding: DIMENSIONS.padding,
    borderRadius: DIMENSIONS.radius / 2,
    backgroundColor: COLORS.backgroundDark,
    justifyContent: "center",
    alignItems: "center",
  },

  horizontal: {
    flexDirection: "row",
  },

  defaultButton: {
    maxWidth: responsiveWidth(27),
    maxHeight: responsiveHeight(4),
    borderRadius: DIMENSIONS.radius / 2,
    
  },
  select: {
    backgroundColor: COLORS.selection,
    color: COLORS.white,

  }, 

  unselect: {
    color: COLORS.primary,
    backgroundColor: COLORS.white,
  }, 

  text: {
    color: COLORS.white,
    padding: DIMENSIONS.padding,
  },
});
export default PopUpPage;
