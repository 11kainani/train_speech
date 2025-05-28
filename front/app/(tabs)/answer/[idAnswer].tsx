import { useLocalSearchParams } from "expo-router";
import { View, Text } from "react-native";

interface AnswerDetailProps {}
const AnswerDetail: React.FC<AnswerDetailProps> = () => {
  const { idAnswer, file_location, duration, subject } = useLocalSearchParams();
  const parsedSubject = subject ? JSON.parse(subject as string) : null;
  return (
    <View>
      <Text>HAHAHAH</Text>
    </View>
  );
};

export default AnswerDetail;
