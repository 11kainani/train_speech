import React, { useEffect, useState } from "react";

import { View, Text, Button } from "react-native";
import { Calander } from "../../../components";
export default function Home() {
 
  return (
    <View>
      <Calander />
      <Text>Home Tab</Text>
     
    </View>
  );
}
