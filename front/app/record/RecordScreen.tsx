import { View, Text, StyleSheet } from "react-native";
import { IconButton, SubjectCard } from "../../components";
import React, { useEffect, useState } from "react";
import { useSubjects } from "../../hook";
import { Entypo, Ionicons } from "@expo/vector-icons";
import { COLORS, DIMENSIONS } from "../../utils";
import { Subject } from "../../models";

export default function Record() {
  const [isLoading, setLoading] = useState(true);
  const { data, setData } = useSubjects(setLoading);
  const [randomDescription, setRandomDescription] = useState<string>("");

  const [allIds, setAllIds] = useState<string[]>([]);
  const [usedIds, setUsedIds] = useState<Set<string>>(new Set());
  const [validDescription, setValidDescription] = useState(true);

  const handleRandomizeSubject = () => {
    console.log(validDescription);
    const availableIds = allIds.filter((id) => !usedIds.has(id));
   
    if (availableIds.length === 0) {
      console.log("recharge of list");
      setUsedIds(new Set());
      setRandomDescription("Click shuffle (red) button to view a description");
      setValidDescription(false);
      return;
    }

    setValidDescription(true);
    
  
   
    const selectedId = availableIds[Math.floor(Math.random() * availableIds.length)];
    console.log("selected: ", selectedId);
    setUsedIds((prev) => {
      const updated = new Set(prev);
      updated.add(selectedId);
      return updated;
    });
  
    const subject = data.find((subject: Subject) => subject.idSubject === selectedId);
    setRandomDescription(subject?.description ?? "No description available");
  };

  useEffect(() => {
    if (data.length > 0) {
      setAllIds(data.map((subject: Subject) => subject.idSubject));
      setUsedIds(new Set());
    }
  }, [data]);

  useEffect(() => {
    const invalidDescriptions = ["No description available","Click shuffle (red) button to view a description",""];
    setValidDescription(!invalidDescriptions.includes(randomDescription));
  }, [randomDescription])

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
  },
  horizontalDisposition: {
    flexDirection: "row",
    justifyContent: "center",
    alignContent: "flex-end",
  },
});
