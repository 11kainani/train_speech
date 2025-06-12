import React, { useEffect, useState } from "react";

import { View, Text, Button } from "react-native";
import { SevenDaysList } from "../../../components";

import { useAnswerStore, useSubjectStore } from "../../../stores";
import { RecentSubjects } from "../../../components/Home";
export default function Home() {
  const { fetchAnswers } = useAnswerStore();
  const { subjects , fetchSubjects, fetchAnsweredSubjects } = useSubjectStore();

  useEffect(() => {
    fetchSubjects();
    fetchAnswers();
    fetchAnsweredSubjects();
  }, []);

  return (
    <View>
      <SevenDaysList />
      <RecentSubjects subjects={subjects} />
      <Text>Home Tab</Text>
    </View>
  );
}
