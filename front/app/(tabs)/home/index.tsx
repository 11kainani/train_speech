import React, { useEffect, useState } from "react";

import { View, FlatList, StyleSheet } from "react-native";
import { SevenDaysList } from "../../../components";
import { useAnswerStore, useSubjectStore } from "../../../stores";
import { RecentAnswers, RecentSubjects } from "../../../components/Home";

export default function Home() {
  const { answers, fetchAnswers } = useAnswerStore();
  const { subjects, fetchSubjects, fetchAnsweredSubjects } = useSubjectStore();

  useEffect(() => {
    fetchSubjects();
    fetchAnswers();
    fetchAnsweredSubjects();
  }, []);

  return (
    <FlatList
      data={[]} 
      renderItem={null}
      keyExtractor={(_, index) => index.toString()}
      ListHeaderComponent={
        <View style={styles.container}>
          <View style={{ maxHeight: "10%" }}>
            <SevenDaysList />
          </View>

          <RecentSubjects subjects={subjects} />
          <RecentAnswers answers={answers} />
        </View>
      }
    />
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 40,
  },
});
