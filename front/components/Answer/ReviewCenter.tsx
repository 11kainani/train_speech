import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { COLORS, DIMENSIONS } from "../../utils";
import { DefiniteActionButton } from "../Button";
import { useEffect, useState } from "react";
import { Answer } from "../../models";
import ReviewModal from "./ReviewModal";
import { answerService } from "../../services";

interface ReviewCenterProps {
  answer: Answer;
  onReviewUpdate: (answer: Answer) => void;
}

const ReviewCenter: React.FC<ReviewCenterProps> = ({
  answer,
  onReviewUpdate,
}) => {
  const [isVisible, setVisibile] = useState(false);
  const [isModalVisible, setModalVisibile] = useState(false);
  const [review, setReview] = useState("");
  const [originalReview, setOriginalreview] = useState(answer.review || "");
  const handleVisibility = () => {
    //Todo animation for button show
    setVisibile((prev) => !prev);
  };

  const onSubmit = async () => {
    //TODO toast or alert for feedback
    //TODO Connection with back end
    try {
      const response = await answerService.patchAnswer(answer.idAnswer, review);
      if (response) {
        console.log("Sumbitted", review);
        answer.review = review;
        onReviewUpdate(answer);
      }

      setModalVisibile(false);
    } catch(error) {

        console.error(error);
        //TODO Alert with error DO THE SAME FOR ALL services
    }
  };

  useEffect(() => {
    console.log(answer);
    if (isVisible) {
      setReview(originalReview);
    }
  }, [isVisible]);
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleVisibility}>
        <Text style={styles.title}>Review</Text>
        <View style={styles.reviewCard}>
          <Text style={styles.reviewText}>{answer.review}</Text>
        </View>
        {isVisible && (
          <DefiniteActionButton
            title="MODIFY"
            buttonStyle={styles.mainButton}
            onPress={() => setModalVisibile(true)}
          />
        )}
      </TouchableOpacity>
      <ReviewModal
        answer={answer}
        isVisible={isModalVisible}
        onClose={() => setModalVisibile((prev) => !prev)}
        review={review}
        setReview={setReview}
        onSubmit={onSubmit}
        originalReview={originalReview}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.cardBackground,
    justifyContent: "center",
    alignSelf: "center",
    padding: DIMENSIONS.padding,
    width: "90%",
    borderRadius: DIMENSIONS.radius,
  },
  reviewCard: {
    backgroundColor: COLORS.background,
    padding: DIMENSIONS.padding,
    borderRadius: DIMENSIONS.radiusSmall,
  },
  reviewText: {
    textAlign: "justify",
    fontWeight: "500",
  },
  title: {
    color: COLORS.textPrimary,
    textAlign: "center",
    fontSize: DIMENSIONS.fontLarge,
    fontWeight: "bold",
    marginBottom: DIMENSIONS.marginSmall,
    textTransform: "uppercase",
  },

  mainButton: {
    backgroundColor: COLORS.primary,
  },
});

export default ReviewCenter;
