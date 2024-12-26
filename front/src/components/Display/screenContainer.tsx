import React from 'react';
import { View, StyleSheet } from 'react-native';
import { COLORS } from '../../utils/colors';

const ScreenContainer = ({ children }) => {
  return <View style={styles.container}>{children}</View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center' ,
    backgroundColor: COLORS.backgroundDark, 
  },
});

export default ScreenContainer;
