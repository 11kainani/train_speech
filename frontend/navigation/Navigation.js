import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import RecordScreen from '../screens/RecordScreen';
import SubjectBankScreen from '../screens/SubjectBankScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { COLORS } from '../utils/colors';
import { Colors } from 'react-native/Libraries/NewAppScreen';

const Tab = createBottomTabNavigator();

const Navigation = () => {
  return (
    <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({focused, color}) => {
        let iconName; 
          switch(route.name)
          {
            case "Home": iconName = focused ? 'home' : 'home-outline';
            break; 
            case "Record" : iconName = focused ? 'mic' : 'mic-outline';
            break;
            case  "SubjectBank" : iconName = focused ? 'folder-open' : "folder-outline";

          }
          return <Ionicons name={iconName} color={color}/>
      },
      tabBarActiveTintColor : COLORS.selection , 
      tabBarInactiveTintColor: COLORS.subAccent,

    })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Record" component={RecordScreen} />
      <Tab.Screen name="SubjectBank" component={SubjectBankScreen} />
    </Tab.Navigator>
  );
};

export default Navigation;
