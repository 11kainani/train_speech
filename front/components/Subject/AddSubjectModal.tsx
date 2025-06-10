import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import PopUpModal from "../Page/PopUpModal";
import { ModalInput } from "../Input";
import { DefiniteActionButton } from "../Button";
import { COLORS, DIMENSIONS } from "../../utils";
import { SubjectType, Subject, SubjectResponse } from "../../models/Subject";
import { subjectService } from "../../services";
import { useSubjectStore } from "../../stores";

interface AddSubjectProps {
  isVisible: boolean;
  onClose: () => void;
  description: string;
  setDescription: (text: string) => void;
}

const AddSubject: React.FC<AddSubjectProps> = ({
  isVisible,
  onClose,
  description,
  setDescription,
}) => {
  const [isModalVisible, setModalVisible] = useState(isVisible);
  const { createSubject } = useSubjectStore();

  const handleSubjectCreation = async () => {
    try {
      if (description === "") {
        throw new Error("The description is empty");
      }

      if (description.length > DIMENSIONS.maxDescriptionLength) {
        throw new Error("The description is too long");
      }

      if (description.length < DIMENSIONS.minDescriptionLength) {
        throw new Error("The description is too short");
      }

      const response: SubjectResponse = await subjectService.createSubject(
        description
      );

      if (!response || !response.subject) {
        throw new Error("Invalid response from createSubject.");
      }

      const createdSubject = response.subject;

      setDescription("");
      createSubject(createdSubject);
      onClose();
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    setModalVisible(isVisible);
  }, [isVisible]);

  return (
    <PopUpModal
      isVisible={isVisible}
      onClose={onClose}
      title="Add a new Subject"
    >
      <Text style={styles.text}>Description</Text>
      <View style={styles.underline} />
      <ModalInput
        inputText={description}
        onDescriptionChange={setDescription}
        placeholder="Input the description"
      />

      <DefiniteActionButton
        title="CREATE"
        onPress={handleSubjectCreation}
        buttonStyle={styles.confirmButton}
      />
    </PopUpModal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  defaultButton: {
    justifyContent: "center",
    alignItems: "center",
  },

  text: {
    color: COLORS.textPrimary,
    marginTop: DIMENSIONS.margin,
    fontWeight: "500",
  },
  underline: {
    borderWidth: DIMENSIONS.unit,
    marginBottom: DIMENSIONS.margin,
    borderColor: COLORS.textPrimary,
  },
  confirmButton: { backgroundColor: COLORS.primary },
});

export default AddSubject;
