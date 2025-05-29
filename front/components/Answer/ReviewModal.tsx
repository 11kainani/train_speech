import { View, StyleSheet } from "react-native";
import { Answer } from "../../models";
import { PopUpModal } from "../Page";
import { ModalInput } from "../Input";
import { DefiniteActionButton } from "../Button";
import { useState, useEffect } from "react";
import { COLORS } from "../../utils";

interface ReviewModalProps {
  answer: Answer;
  isVisible: boolean;
  onClose: () => void;
  review: string;
  setReview: (text:string) => void;
  onSubmit: () => void;
  originalReview : string;
}

const ReviewModal: React.FC<ReviewModalProps> = ({
  answer,
  isVisible,
  onClose,
  review,
  setReview,
  onSubmit,
  originalReview,
}) => {
  return (
    <PopUpModal
      title="Modify Review"
      isVisible={isVisible}
      onClose={onClose}
    >
        
          <ModalInput
            inputText={review}
            placeholder="Enter review for this answer"
            onDescriptionChange={setReview}
          />

          <DefiniteActionButton title={"Modify"} buttonStyle={styles.confirmButton} onPress={onSubmit} disabled={review.trim() === "" || review === originalReview}/>
        
      
      </PopUpModal>
    
  );
};

const styles = StyleSheet.create({  confirmButton: {backgroundColor: COLORS.primary},});

export default ReviewModal;
