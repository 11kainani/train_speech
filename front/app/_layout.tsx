import { Tabs } from "expo-router";

export default function Layout() {
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen name="home" options={{ title: "Home" }} />
      <Tabs.Screen name="record" options={{ title: "Record" }} />
      <Tabs.Screen name="subject" options={{ title: "Subjects" }} />
      <Tabs.Screen name="answer" options={{ title: "Answers" }} />
    </Tabs>
  );
}