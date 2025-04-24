import React from 'react';
import { View, Text, SafeAreaView, StyleSheet } from 'react-native';
import { COLORS } from '../../utils/colors';

const Answers = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text>Home!Sweet Home</Text>
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  container: {

    backgroundColor: COLORS.background,

  },
})
export default Answers;
