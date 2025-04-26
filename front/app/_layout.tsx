import { Tabs } from "expo-router";
import { Entypo, Feather, FontAwesome5, Ionicons } from "@expo/vector-icons";
import { COLORS, DIMENSIONS } from "../utils";

export default function Layout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,

        tabBarActiveTintColor: COLORS.primary, 
        tabBarInactiveTintColor: COLORS.disabled, 
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <Ionicons
              size={DIMENSIONS.iconSizeLarge}
              name="home"
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="record"
        options={{
          title: "Record",
          tabBarIcon: ({ color }) => (
            <Ionicons
              name="recording"
              size={DIMENSIONS.iconSizeLarge}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="subject"
        options={{
          title: "Subjects",
          tabBarIcon: ({ color }) => (
            <FontAwesome5
              name="database"
              size={DIMENSIONS.iconSizeLarge}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="answer"
        options={{
          title: "Answers",
          tabBarIcon: ({ color }) => (
            <Entypo
              name="message"
              size={DIMENSIONS.iconSizeLarge}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
