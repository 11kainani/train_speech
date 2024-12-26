// RecordStack.js
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import RecordScreen from '../../screens/RecordScreen';
import RecordSettings from '../../screens/RecordSettings'

const Stack = createNativeStackNavigator();

const RecordStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Record" component={RecordScreen} />
      <Stack.Screen name="Record Settings" component={RecordSettings} />
    </Stack.Navigator>
  );
};

export default RecordStack;
