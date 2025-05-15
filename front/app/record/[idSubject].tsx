

import { useRoute } from "@react-navigation/native";
import { Button, Text, View } from "react-native";
import { Subject } from "../../models";
import { useLocalSearchParams } from "expo-router";
import { SubjectCard } from "../../components";
import { Audio } from "expo-av";
import React, { useState } from "react";

const RecordingScreen = () => {
  const route = useRoute();
  const { subject } = useLocalSearchParams();
  const parsedSubject: Subject = JSON.parse(subject as string);

 

  console.log(parsedSubject); // Use it normally now

  return (
    <View>
      <SubjectCard small={true} description={parsedSubject.description} />
     
    </View>
  );
};

export default RecordingScreen;
