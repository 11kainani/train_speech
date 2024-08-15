// SubjectBankScreen.js

import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, FlatList } from 'react-native';
import ScreenContainer from '../components/Display/screenContainer';
import { subjectService } from '../api/index';

const SubjectBankScreen = () => {

  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const fetchSubjects = async () => {
    try {
        const results = await subjectService.getSubjects();
        console.log("Fetched Subjects:", results);
        setData(results.subjects);
        
    } catch (error) {
        console.error("Failed to fetch subjects:", error);
    }finally {
      setLoading(false);
    }
  };

  // Use useEffect to fetch subjects when component mounts
  useEffect(() => {
    fetchSubjects();
  }, []); // Empty dependency array means this runs only on mount

  return (
    <ScreenContainer>
      <Text>Subject Bank!</Text>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          data={data}
          keyExtractor={({idSubject}) => idSubject}
          renderItem={({item}) => (
      
            <Text>
              {item.description}
            </Text>
          )}
        />
      )}
    </ScreenContainer>  
  );
};

export default SubjectBankScreen;
