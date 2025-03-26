import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, Button } from "react-native";
import Modal from "react-native-modal";
import {
  COLORS,
  DIMENSIONS,
  responsiveHeight,
  responsiveWidth,
} from "../../utils";
import { PanelButton } from "../Button";
import { DescriptionInput } from "../Input";
import { subjectService } from "../../api";
import { PromptResponse, QuestionResponse, SubjectType } from "../../models";

const PopUpPage: React.FC<PopUpPageProps> = ({
  isVisible,
  onClose,
  description,
  setDescription,
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

  const handleQuestionCreation = async () => {
    try {
      //Add directly to data and to the list of questionsID
      const question: QuestionResponse = await subjectService.createQuestions(
        description
      );
      setDescription("");
      onClose();
      return question;
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

      return prompt;
    } catch (error) {
      console.log(error);
    }
  };
  const handleSubjectCreation = async () => {
    if (description == "") {
      throw new Error("The description is emplty");
    }

    if (description.length > DIMENSIONS.maxDescriptionInput) {
      throw new Error("The description is too long");
    }

    let createdSubject;
    switch (subjectSelector) {
      case SubjectType.NONE:
        throw new Error("Subject type needs to be selected");
      case SubjectType.QUESTION:
        createdSubject = await handleQuestionCreation();
        break;
      case SubjectType.PROMPT:
        createdSubject = await handlePromptCreation();
        break;
    
    }
    if(createdSubject)
    {
      onClose(); 
      return [subjectSelector, createdSubject];
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
              style={[
                styles.defaultButton,
                subjectSelector === SubjectType.PROMPT
                  ? styles.select
                  : styles.unselect,
              ]}
              onPress={() => handleSubjectSelector(SubjectType.PROMPT)}
            />
            <PanelButton
              title={"Question"}
              style={[
                styles.defaultButton,
                subjectSelector === SubjectType.QUESTION
                  ? styles.select
                  : styles.unselect,
              ]}
              onPress={() => handleSubjectSelector(SubjectType.QUESTION)}
            />
          </View>

          <PanelButton
            title={"CREATE"}
            style={styles.createButton}
            onPress={async () => {
              try {
                const result = await handleSubjectCreation();
                console.log(result);
              } catch (error) {
                console.error(error);
              }
            }}
          />
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

  createButton: {
    backgroundColor: COLORS.subSecondary,
    borderRadius: DIMENSIONS.radius,
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
