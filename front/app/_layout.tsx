import { Tabs } from "expo-router";
import { Feather, Ionicons } from '@expo/vector-icons';
import { COLORS } from "../utils";

export default function Layout() {
  return (
    <Tabs screenOptions={{ headerShown: false, 

    tabBarActiveTintColor: COLORS.primaryButton,      // primary blue
    tabBarInactiveTintColor: COLORS.secondaryBackground,    // secondary accent
     }}>
      <Tabs.Screen name="home" options={{ title: "Home", 
         tabBarIcon: ({ color }) => <Feather size={24} name="home" color={color}/>
        }} />
      <Tabs.Screen name="record" options={{ title: "Record",
         tabBarIcon: ({ color }) => <Ionicons name="recording" size={24} color={color} />
       }} />
      <Tabs.Screen name="subject" options={{ title: "Subjects",
         tabBarIcon: ({ color }) => <Feather name="database" size={24} color={color}  />
       }} />
      <Tabs.Screen name="answer" options={{ title: "Answers",
         tabBarIcon: ({ color }) => <Feather name="message-square" size={24} color={color}  />
       }} />
    </Tabs>
  );
}