import React from "react";
import { View, Text } from "react-native";

const RecordSettings = ({route}) =>  {
    const { source } = route.params;
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>{source}</Text>
      </View>
    );
  }
  
  export default RecordSettings;