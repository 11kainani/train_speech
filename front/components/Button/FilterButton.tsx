import React from 'react';
import { TouchableOpacity, View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, DIMENSIONS } from '../../utils';

/**
 * @component FilterButton
 * @description A reusable filter button with a filter icon.
 * @param {Function} onPress - Function to call when the button is pressed
 * @returns {JSX.Element}
 */

interface FilterButtonProps {
    onPress: ()=> void,
}
const FilterButton: React.FC<FilterButtonProps> = ({ onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.filterButton}>
        <Ionicons
          name="filter"
          size={DIMENSIONS.iconSize}
          color={COLORS.primary}
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  filterButton: {
    flex: 1,
    backgroundColor: COLORS.cardBackground,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: DIMENSIONS.marginSmall,
    borderRadius: DIMENSIONS.border * 2,
    paddingHorizontal: DIMENSIONS.paddingSmall,
  },
});

export default FilterButton;