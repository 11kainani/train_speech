import { Stack } from "expo-router";
import { DIMENSIONS } from "../../utils";

export default function RecordStack() {
  return (
    <Stack
      screenOptions={{
        headerTitleAlign: "center",
        headerTitleStyle: {
          fontSize: DIMENSIONS.fontLarge,
        },
      }}
    />
  );
}
