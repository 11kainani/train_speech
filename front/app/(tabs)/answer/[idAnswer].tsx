import { useLocalSearchParams } from "expo-router";
import { View, Text } from "react-native";
import { Answer } from "../../../models";
import { useEffect, useState } from "react";
import { MediaPlayer, ReviewCenter, SubjectCard } from "../../../components";

interface AnswerDetailProps {
  handleAnswerUpdate : (answer : Answer) => void;
}
const AnswerDetail: React.FC<AnswerDetailProps> = ({handleAnswerUpdate}) => {
  const { idAnswer, file_location, duration, review, subject } = useLocalSearchParams();
  const parsedSubject = subject ? JSON.parse(subject as string) : null;
  const parsedAnswer: Answer = {
    idAnswer : idAnswer as string, 
    file_location: file_location  as string, 
    duration: duration as string ,
    review: review as string,
    subject: parsedSubject
  }

  const [answer, setAnswer] = useState<Answer>(parsedAnswer);


   const handleReviewUpdate = (answer : Answer) => {
      setAnswer(answer);
      handleAnswerUpdate(parsedAnswer);
   }
  return (
    <View>
      <SubjectCard small={true} description={parsedAnswer.subject.description} />
      <ReviewCenter answer={parsedAnswer} onReviewUpdate={handleReviewUpdate} />
      <Text>HAHAHAH</Text>
    </View>
  );
};

export default AnswerDetail;
