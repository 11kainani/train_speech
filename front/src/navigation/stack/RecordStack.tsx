// RecordStack.js
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import RecordScreen from '../../screens/record/RecordScreen';
import RecordSettings from '../../screens/record/RecordSettings'

const Stack = createNativeStackNavigator();

const RecordStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="RecordHome" component={RecordScreen} />
      <Stack.Screen name="Record Settings" component={RecordSettings} />
    </Stack.Navigator>
  );
};

export default RecordStack;
