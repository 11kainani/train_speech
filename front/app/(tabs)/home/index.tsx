import React, { useEffect, useState } from "react";

import { View, Text, Button } from "react-native";
import { SevenDaysList } from "../../../components";

import { useAnswerStore, useSubjectStore } from "../../../stores";
export default function Home() {
  const { fetchAnswers } = useAnswerStore();
  const { fetchSubjects } = useSubjectStore();

  useEffect(() => {
    fetchSubjects();
    fetchAnswers();
  }, []);

  return (
    <View>
      <SevenDaysList />
      <Text>Home Tab</Text>
    </View>
  );
}
