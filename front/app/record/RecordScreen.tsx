// RecordScreen.js

import React, {useState} from 'react';
import { View, Text, Button, StyleSheet, SafeAreaView } from 'react-native';
import PanelButton from '../../components/Button/PanelButton';
import { responsiveHeight, responsiveWidth } from '../../utils/dimensions';
import { COLORS } from '../../utils/colors';
import { Colors } from 'react-native/Libraries/NewAppScreen';

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
    backgroundColor: COLORS.accent,

  }, 
})

const styles = StyleSheet.create({ 
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})

const RecordScreen = ({navigation}) => {

  const [selectedTitle, setSelectedTitle] = useState(null);

  const titleSelection = (title) => setSelectedTitle(title);

  const [readTitle, subjectTitle, questionTitle] = ["Reading Prompt","New Subject","Random Question" ];
  
  const panels = [<PanelButton key="1" title = {readTitle} style={[horizontalPanel.panel, selectedTitle == readTitle && horizontalPanel.selectedPanel] } onPress={() => titleSelection(readTitle)} />,
    <PanelButton key="2" title = {subjectTitle}  style={[horizontalPanel.panel, selectedTitle == subjectTitle && horizontalPanel.selectedPanel] }  onPress={() => {titleSelection(subjectTitle)}} />,
    <PanelButton key="3" title = {questionTitle}  style={[horizontalPanel.panel, selectedTitle == questionTitle && horizontalPanel.selectedPanel] }  onPress={() => titleSelection(questionTitle)}/> ];


  return (
    <SafeAreaView style={styles.container}>
      <View style={horizontalPanel.horizontalContainer}>
        {panels}
      </View>
      
      <PanelButton title={"START"} onPress={() => navigation.navigate('Record Settings',{source: selectedTitle})} /> 
      

    </SafeAreaView>
  );
};



export default RecordScreen;
