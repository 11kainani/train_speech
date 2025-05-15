

import { useRoute } from "@react-navigation/native";
import { Button, Text, View, StyleSheet } from "react-native";
import { Subject } from "../../models";
import { useLocalSearchParams } from "expo-router";
import { RecordPlayer, SubjectCard } from "../../components";
import { Audio } from "expo-av";
import React, { useState } from "react";

const RecordingScreen = () => {
  const route = useRoute();
  const { subject } = useLocalSearchParams();
  const parsedSubject: Subject = JSON.parse(subject as string);

 

  console.log(parsedSubject); // Use it normally now

  return (
    <View style={styles.container}>
      <SubjectCard small={true} description={parsedSubject.description} />
      <RecordPlayer />
     
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex:1,
  }, 
})

export default RecordingScreen;
