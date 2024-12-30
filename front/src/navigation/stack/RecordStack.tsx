// RecordStack.js
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import RecordScreen from '../../screens/record/RecordScreen';
import RecordSettings from '../../screens/record/RecordSettings'
import { COLORS } from '../../utils';

const Stack = createNativeStackNavigator();

const RecordStack = () => {
  return (
    <Stack.Navigator screenOptions={{ contentStyle: { flex: 1, backgroundColor: COLORS.backgroundDark }, headerShown: false }}>
      <Stack.Screen name="RecordHome" component={RecordScreen} />
      <Stack.Screen name="Record Settings" component={RecordSettings} />
    </Stack.Navigator>
  );
};

export default RecordStack;
