// RecordScreen.js

import React, {useState} from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import PanelButton from '../components/Button/PanelButton';
import { responsiveHeight, responsiveWidth } from '../utils/responsive';
import ScreenContainer from '../components/Display/screenContainer';
import { COLORS } from '../utils/colors';

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
  },
  selectedPanel: {
    backgroundColor: COLORS.selection,

  }
})


const RecordScreen = () => {

  const [selectedTitle, setSelectedTitle] = useState(null);

  const titleSelection = (title) => setSelectedTitle(title);

  const [readTitle, subjectTitle, questionTitle] = ["Reading Prompt","New Subject","Random Question" ];
  
  const panels = [<PanelButton key="1" title = {readTitle} style={[horizontalPanel.panel, selectedTitle == readTitle && horizontalPanel.selectedPanel] } pressAction={() => titleSelection(readTitle)} />,
    <PanelButton key="2" title = {subjectTitle}  style={[horizontalPanel.panel, selectedTitle == subjectTitle && horizontalPanel.selectedPanel] }  pressAction={() => {titleSelection(subjectTitle)}} />,
    <PanelButton key="3" title = {questionTitle}  style={[horizontalPanel.panel, selectedTitle == questionTitle && horizontalPanel.selectedPanel] }  pressAction={() => titleSelection(questionTitle)}/> ];


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
