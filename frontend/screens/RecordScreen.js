// RecordScreen.js

import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import PanelButton from '../components/Button/PanelButton';
import { responsiveHeight, responsiveWidth } from '../utils/responsive';
import ScreenContainer from '../components/Display/screenContainer';

const horizontalPanel = StyleSheet.create({
  horizontalContainer: 
  {
    flexDirection: 'row', 
    padding: 10,
    margin: 20,
  },
  panel: {
    margin: 5,
    height: responsiveHeight(20), 
    width: responsiveWidth(26),
  }
})
  const panels = [<PanelButton key="1" title = "Reading Prompt" style={horizontalPanel.panel}  />,
    <PanelButton key="2" title = "New Subject"  style={horizontalPanel.panel}/>,
    <PanelButton key="3" title = "Random Question"  style={horizontalPanel.panel}/>,];

const RecordScreen = () => {



  return (
    <ScreenContainer>
      <View style={horizontalPanel.horizontalContainer}>
        {panels}
      </View>
      
      <Button 
        onPress={() => {
          console.log("check");
        }}
        title = "Start"
      />

      

    </ScreenContainer>
  );
};



export default RecordScreen;
