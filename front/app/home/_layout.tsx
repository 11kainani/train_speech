import { Stack } from "expo-router";
import { DIMENSIONS } from "../../utils";

export default function HomeStack() {
  return <Stack
  screenOptions={
    {
      headerTitleAlign: "center",
      headerTitleStyle: {
        fontSize: DIMENSIONS.fontLarge,
        
      }
    }
    
  }
  />;
}