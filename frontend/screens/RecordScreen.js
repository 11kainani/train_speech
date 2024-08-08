// RecordScreen.js

import React from 'react';
import { View, Text, Button } from 'react-native';
import PanelButton from '../components/PanelButton';

const RecordScreen = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Record!</Text>

      <Button 
        onPress={() => {
          console.log("check");
        }}
        title = "Press me"
      />

      <PanelButton title = "Reading Prompt" />
      <PanelButton title = "New Subject" />
      <PanelButton title = "Random Question"/>

    </View>
  );
};

export default RecordScreen;
