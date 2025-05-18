import React, { useEffect, useState } from "react";
import { Audio } from "expo-av";
import { View, Text, Button } from "react-native";
export default function Home() {
  const [sound, setSound] = useState<Audio.Sound | undefined>();

  
  useEffect(() => {
  return sound
    ? () => {
        sound.unloadAsync();
      }
    : undefined;
}, [sound]);

async function stopSound() {
  try {
    if (sound) {
      await sound.stopAsync();
    }
  } catch (error) {
    console.error("Failed to stop the sound", error);
  }
}
  async function playSound() {
    try {
      const { sound } = await Audio.Sound.createAsync(
        require("../assets/wavwarehouse.mp3")
      );
      setSound(sound);
      await sound.playAsync();
    } catch (error) {
      console.error(error, "No Sound");
    }
  }
  return (
    <View>
      <Text>Home Tab</Text>
      <Button title="Play Sound" onPress={playSound} />
      <Button title="Stop Sound" onPress={stopSound} />
    </View>
  );
}
