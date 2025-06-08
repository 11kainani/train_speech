import React, { useEffect, useState } from "react";

import { View, Text, Button } from "react-native";
import { SevenDaysList } from "../../../components";
export default function Home() {
 
  return (
    <View>
      <SevenDaysList />
      <Text>Home Tab</Text>
     
    </View>
  );
}
