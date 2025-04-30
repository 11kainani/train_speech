import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import PopUpModal from "../Page/PopUpModal";
import { DescriptionInput } from "../Input";
import { DefiniteActionButton, PanelButton } from "../Button";
import { COLORS, DIMENSIONS } from "../../utils";
import {
  SubjectType,
  PromptResponse,
  QuestionResponse,
  Subject,
  SubjectResponse,
} from "../../models/Subject";
import { subjectService } from "../../api";

interface AddSubjectProps {
  isVisible: boolean;
  onClose: () => void;
  description: string;
  setDescription: (text: string) => void;
  onSubmit: (SubjectType: SubjectType, Subject: Subject) => void;
}

const AddSubject: React.FC<AddSubjectProps> = ({
  isVisible,
  onClose,
  description,
  setDescription,
  onSubmit,
}) => {
  const [isModalVisible, setModalVisible] = useState(isVisible);

  const [subjectSelector, setSubjectSelector] = useState<SubjectType>(
    SubjectType.NONE
  );

  const handleSubjectSelector = (type: SubjectType) => {
    if (subjectSelector != type) {
      setSubjectSelector(type);
    } else {
      setSubjectSelector(SubjectType.NONE);
    }
  };

  const handleUnassignedCreation = async () => {
    try {
      //Add directly to data and to the list of questionsID
      const subject: SubjectResponse = await subjectService.createSubject(
        description
      );

      if (!subject) {
        throw new Error("Invalid response from createSubject.");
      }
      setDescription("");
      onClose();
      return subject.subject;
    } catch (error) {
      console.log(error);
    }
  };

  const handleQuestionCreation = async () => {
    try {
      //Add directly to data and to the list of questionsID
      const question: QuestionResponse = await subjectService.createQuestion(
        description
      );
      setDescription("");
      onClose();
      return question.subject;
    } catch (error) {
      console.log(error);
    }
  };

  const handlePromptCreation = async () => {
    //Add directly to data and to the list of promptID
    try {
      const prompt: PromptResponse = await subjectService.createPrompt(
        description
      );
      setDescription("");
      onClose();

      return prompt.subject;
    } catch (error) {
      console.log(error);
    }
  };
  const handleSubjectCreation = async () => {
    try {
      if (description == "") {
        throw new Error("The description is emplty");
      }

      if (description.length > DIMENSIONS.maxDescriptionLength) {
        throw new Error("The description is too long");
      }

      if (description.length < DIMENSIONS.minDescriptionLength) {
        throw new Error("The description is too short");
      }

      let createdSubject: Subject | undefined;
      switch (subjectSelector) {
        case SubjectType.NONE:
          createdSubject = await handleUnassignedCreation();
          break;
        case SubjectType.QUESTION:
          createdSubject = await handleQuestionCreation();
          break;
        case SubjectType.PROMPT:
          createdSubject = await handlePromptCreation();
          break;
      }
      if (createdSubject) {
        onSubmit(subjectSelector, createdSubject);
        onClose();
      }
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
      <DescriptionInput
        description={description}
        onDescriptionChange={setDescription}
      />
      <Text style={styles.text}>Mode</Text>
      <View style={styles.underline} />
      <View style={styles.horizontal}>
        <PanelButton
          title="Prompt"
          selected={subjectSelector === SubjectType.PROMPT}
          onPress={() => handleSubjectSelector(SubjectType.PROMPT)}
        />
        <PanelButton
          title="Question"
          onPress={() => handleSubjectSelector(SubjectType.QUESTION)}
          selected={subjectSelector === SubjectType.QUESTION}
        />
      </View>
      
        <DefiniteActionButton title="CREATE" onPress={handleSubjectCreation} buttonStyle={styles.confirmButton} />

    </PopUpModal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "center",
    padding: 10,
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
  confirmButton: {backgroundColor: COLORS.primary},
});

export default AddSubject;
