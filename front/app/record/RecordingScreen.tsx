import { useRoute } from '@react-navigation/native';
import { Text } from 'react-native';
import { Subject } from '../../models';
import { useLocalSearchParams } from 'expo-router';

const RecordingScreen = () => {
  const route = useRoute();
  const { subject } = useLocalSearchParams();
  const parsedSubject: Subject = JSON.parse(subject as string);

  console.log(parsedSubject); // Use it normally now

  return (
    <Text>{subject}</Text>
  );
};


export default RecordingScreen;