import { useLocalSearchParams } from "expo-router";
import { View, Text } from "react-native";
import { Answer } from "../../../models";
import { useEffect, useState } from "react";
import { MediaPlayer, ReviewCenter, SubjectCard } from "../../../components";
import { useAnswerStore } from "../../../stores";

interface AnswerDetailProps {
  handleAnswerUpdate: (answer: Answer) => void;
}
const AnswerDetail: React.FC<AnswerDetailProps> = ({ handleAnswerUpdate }) => {
  const { idAnswer } = useLocalSearchParams<{ idAnswer: string }>();
  const answerWithSubject = useAnswerStore().getAnswer(idAnswer);
  const [localAnswer, setLocalAnswer] = useState<Answer | null>(null);

  useEffect(() => {
    if (answerWithSubject) {
      setLocalAnswer(answerWithSubject.answer);
    } else {
      //TODO ALERT
     // Alert.alert("Answer Not Found", `No answer found for id: ${idAnswer}`);
    }
  }, [answerWithSubject, idAnswer]);

  if (!localAnswer) {
    return (
      <View>
        <Text>ID Answer hasn't been found</Text>
      </View>
    );
  }

  const handleReviewUpdate = (updatedAnswer: Answer) => {
    setLocalAnswer(updatedAnswer);
    handleAnswerUpdate(updatedAnswer);
  };

  return (
    <View>
      <SubjectCard
        small={true}
        description={localAnswer.subject.description}
      />
      <ReviewCenter answer={localAnswer} onReviewUpdate={handleReviewUpdate} />
    
    </View>
  );
};

export default AnswerDetail;
