import React, { useEffect, useState } from "react";

import { View, Text, Button } from "react-native";
import { SevenDaysList } from "../../../components";

import { useAnswerStore, useSubjectStore } from "../../../stores";
export default function Home() {
  const { fetchAnswers } = useAnswerStore();
  const { fetchSubjects, fetchAnsweredSubjects } = useSubjectStore();

  useEffect(() => {
    fetchSubjects();
    fetchAnswers();
    fetchAnsweredSubjects();
  }, []);

  return (
    <View>
      <SevenDaysList />
      <Text>Home Tab</Text>
    </View>
  );
}
