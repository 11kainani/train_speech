import { View, StyleSheet, ActivityIndicator } from "react-native";
import { IconButton, SubjectCard } from "../../../components";
import React, { useEffect, useState } from "react";
import { Entypo } from "@expo/vector-icons";
import { COLORS, DIMENSIONS } from "../../../utils";
import { Subject } from "../../../models";
import { useRouter } from "expo-router";
import { useSubjectStore } from "../../../stores";

export default function Record() {
  const defaultDescription =
    "Click shuffle (red) button to view a description !";
  const {subjects , isLoading} = useSubjectStore();

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

    const subject = subjects.find(
      (subject: Subject) => subject.idSubject === selectedId
    );
    setRandomDescription(subject?.description ?? "No description available");
  };

  const handleSelectSubject = () => {
    const subject = subjects.find(
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
  if (subjects.length > 0) {
      setAllIds(subjects.map((subject: Subject) => subject.idSubject));
      setUsedIds(new Set());
      handleRandomizeSubject();
    } else {
      setRandomDescription(
       subjects ? "You have no subject, Go to Subject to create some !" : "Click shuffle (red) button to view a description !"
      );
    }

  }, [subjects]);

 

  return (
    <View style={styles.page}>
      {isLoading ? (<ActivityIndicator/> ): (<View style={styles.container}>
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
            disabled={!validDescription}
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
      </View>)}
      
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex:1,
  },
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
