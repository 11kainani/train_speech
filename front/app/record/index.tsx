import { View, Text, StyleSheet } from "react-native";
import { IconButton, SubjectCard } from "../../components";
import React, { useEffect, useState } from "react";
import { useSubjects } from "../../hook";
import { Entypo, Ionicons } from "@expo/vector-icons";
import { COLORS, DIMENSIONS } from "../../utils";
import { Subject } from "../../models";
import { useRouter } from "expo-router";

export default function Record() {
  const defaultDescription =
    "Click shuffle (red) button to view a description !";
  const [isLoading, setLoading] = useState(true);
  const { data, setData } = useSubjects(setLoading);
  const [randomDescription, setRandomDescription] =
    useState<string>(defaultDescription);
  const [allIds, setAllIds] = useState<string[]>([]);
  const [usedIds, setUsedIds] = useState<Set<string>>(new Set());
  const [validDescription, setValidDescription] = useState(true);
  const router = useRouter();

  const handleRandomizeSubject = () => {
    const availableIds = allIds.filter((id) => !usedIds.has(id));
    if (availableIds.length === 0) {
      setUsedIds(new Set());
      setRandomDescription(defaultDescription);
      setValidDescription(false);
      return;
    }

    setValidDescription(true);

    const selectedId =
      availableIds[Math.floor(Math.random() * availableIds.length)];
    setUsedIds((prev) => {
      const updated = new Set(prev);
      updated.add(selectedId);
      return updated;
    });

    const subject = data.find(
      (subject: Subject) => subject.idSubject === selectedId
    );
    setRandomDescription(subject?.description ?? "No description available");
  };

  const handleSelectSubject = () => {
    
    const subject = data.find(
      (subject: Subject) => subject.description === randomDescription
    );
    console.log(subject);
    if (subject) {
      router.push({
        pathname: "record/[idSubject]",
        params: { subject: JSON.stringify(subject) }, // must be serializable
      });
    }
  };

  useEffect(() => {
    if (data.length > 0) {
      setAllIds(data.map((subject: Subject) => subject.idSubject));
      setUsedIds(new Set());
      handleRandomizeSubject();
    } else {
      setRandomDescription(
        "You have no subject, Go to Subject to create some !"
      );
    }
  }, [data]);

  useEffect(() => {
    const invalidDescriptions = [
      "No description available",
      defaultDescription,
      "",
    ];
    setValidDescription(!invalidDescriptions.includes(randomDescription));
  }, [randomDescription]);

  return (
    <View style={styles.container}>
      <SubjectCard description={randomDescription} />
      <View style={styles.horizontalDisposition}>
        <IconButton
          backgroundColor={COLORS.red}
          onPress={handleRandomizeSubject}
          icon={
            <Entypo
              name="shuffle"
              size={DIMENSIONS.iconSizeXLarge}
              color={COLORS.background}
            />
          }
        />
        <IconButton
          disable={!validDescription}
          onPress={handleSelectSubject}
          icon={
            <Entypo
              name="check"
              size={DIMENSIONS.iconSizeXLarge}
              color={COLORS.background}
            />
          }
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-evenly",
    alignItems: "center",
    paddingVertical: DIMENSIONS.paddingLarge,
    backgroundColor: COLORS.backgroundBlur,
  },
  horizontalDisposition: {
    flexDirection: "row",
    justifyContent: "center",
    alignContent: "flex-end",
  },
});

