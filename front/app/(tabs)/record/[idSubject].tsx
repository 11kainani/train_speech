

import { useRoute } from "@react-navigation/native";
import { Button, Text, View, StyleSheet } from "react-native";
import { Subject } from "../../../models";
import { useLocalSearchParams } from "expo-router";
import { MediaRecorder, SubjectCard } from "../../../components";
import React, { useState } from "react";
import { useAudioPlayer } from 'expo-audio';
import { COLORS } from "../../../utils";

const audioSource = require('../../../assets/wavwarehouse.mp3');

const RecordingScreen = () => {
  const route = useRoute();
  const { subject } = useLocalSearchParams();
  const parsedSubject: Subject = JSON.parse(subject as string);



  console.log(parsedSubject); // Use it normally now

  return (
    <View style={styles.container}>
      <SubjectCard small={true} description={parsedSubject.description} />
       
      <MediaRecorder subject={parsedSubject}  />
     
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: COLORS.background,
    justifyContent: "space-between",
  }, 
})

export default RecordingScreen;
