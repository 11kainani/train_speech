import { useRoute } from '@react-navigation/native';
import { Text } from 'react-native';
import { Subject } from '../../models';
import { useLocalSearchParams } from 'expo-router';
import { SubjectCard } from '../../components';

const RecordingScreen = () => {
  const route = useRoute();
  const { subject } = useLocalSearchParams();
  const parsedSubject: Subject = JSON.parse(subject as string);

  console.log(parsedSubject); // Use it normally now

  return (
    <SubjectCard small={true} description={parsedSubject.description} />
  );
};


export default RecordingScreen;