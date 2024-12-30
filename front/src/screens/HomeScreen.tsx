// HomeScreen.js

import React from 'react';
import { View, Text, SafeAreaView, StyleSheet } from 'react-native';
import ScreenContainer from '../components/Display/ScreenContainer';
import { COLORS } from '../utils';

const HomeScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text>Home! Sweet Home</Text>
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  container: {

    backgroundColor: COLORS.backgroundDark,

  },
})
export default HomeScreen;
