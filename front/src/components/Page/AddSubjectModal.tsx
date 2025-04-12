import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import PopUpModal from "./PopUpModal";
import { DescriptionInput } from "../Input";
import { PanelButton } from "../Button";
import { COLORS, DIMENSIONS, responsiveHeight, responsiveWidth } from "../../utils";
import { SubjectType, PromptResponse, QuestionResponse, Subject } from "../../models";
import { subjectService } from "../../api";


interface AddSubjectProps {
  isVisible: boolean;
  onClose: () => void;
  description: string;
  setDescription: (text: string) => void;
  onSubmit: (SubjectType:SubjectType, Subject:Subject) => void;
}

const AddSubject: React.FC<AddSubjectProps> = ({
  isVisible,
  onClose,
  description,
  setDescription,
  onSubmit
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
            const subject: Subject = await subjectService.createSubject(
              description
            );
            setDescription("");
            onClose();
            return subject;
          } catch (error) {
            console.log(error);
          }
    }
  
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

              if(description.length < DIMENSIONS.minDescriptionLength)
              {
                throw new Error("The description is too short");
              }
          
              let createdSubject : Subject | undefined;
              switch (subjectSelector) {
                case SubjectType.NONE:
                    createdSubject = await handleUnassignedCreation();
                    break;
                case SubjectType.QUESTION:
                  createdSubject = await handleQuestionCreation();
                  onClose()
                  break;
                case SubjectType.PROMPT:
                  createdSubject = await handlePromptCreation();
                  break;
              
              }
              if(createdSubject)
              {
                onClose(); 

                onSubmit(subjectSelector, createdSubject);
              }
            
        } catch (error) {
            console.log(error);
        }
     
    };
    useEffect(() => {
      setModalVisible(isVisible);
    }, [isVisible]);

  return (
    <PopUpModal isVisible={isVisible} onClose={onClose}>
      
      <Text style={styles.text}>Description</Text>
      <DescriptionInput
        description={description}
        onDescriptionChange={setDescription}
      />
      <Text style={styles.text}>Mode</Text>
      <View style={styles.horizontal}>
        <PanelButton
          title="Prompt"
          onPress={() => handleSubjectSelector(SubjectType.PROMPT)}
          style={[
            styles.defaultButton,
            subjectSelector === SubjectType.PROMPT ? styles.select : styles.unselect,
          ]}
        />
        <PanelButton
          title="Question"
          onPress={() => handleSubjectSelector(SubjectType.QUESTION)}
          style={[
            styles.defaultButton,
            subjectSelector === SubjectType.QUESTION ? styles.select : styles.unselect,
          ]}
        />
      </View>
      <PanelButton title="CREATE" onPress={handleSubjectCreation} style={styles.createButton} />
    </PopUpModal>
  );
};

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: DIMENSIONS.padding,
      },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 10,
  },
  createButton: {
    backgroundColor: COLORS.primary,
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
    backgroundColor: COLORS.white,
    color: COLORS.primary,
  },
  text: {
    color: COLORS.white,
    padding: DIMENSIONS.padding,
  },
});

export default AddSubject;

