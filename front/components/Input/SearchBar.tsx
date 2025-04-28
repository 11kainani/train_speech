
import React, { useState, useEffect } from "react";
import { View, TextInput, StyleSheet, TouchableOpacity } from "react-native";
import { DIMENSIONS, COLORS } from "../../utils";
import { Ionicons } from "@expo/vector-icons";

interface SearchBarProps {
    value: string; 
    onChangeText: (text: string) => void; 
    placeholder?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({value, onChangeText, placeholder = "Search.."}) => {

    
    const [text, setText] = useState(""); // State to hold the text input value
    const [debouncedText, setDebouncedText] = useState(""); // State to hold debounced value
  
    useEffect(() => {
      const timer = setTimeout(() => {
        setDebouncedText(text); 
        onChangeText(text); 
      }, 300);
      return () => clearTimeout(timer); 
    }, [text]);

    const handleClear = () => {
        setText("");
    };

    return (
        <View style={styles.container}>
          <Ionicons name="search" size={DIMENSIONS.iconSize} color={COLORS.primary} style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder={placeholder}
            placeholderTextColor={COLORS.textSecondary}
            value={text}
            onChangeText={setText}
          />
          {text.length > 0 && (
        <TouchableOpacity onPress={handleClear}>
          <Ionicons name="close-circle" size={DIMENSIONS.iconSize} color={COLORS.error} />
        </TouchableOpacity>
      )}
        </View>
      );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: COLORS.secondary,
        borderRadius: DIMENSIONS.radius,
        paddingHorizontal: DIMENSIONS.padding,
        height: DIMENSIONS.responsiveHeight(5),
        width: "90%",
        alignSelf: "center",
        marginVertical: DIMENSIONS.marginSmall,
      },
      icon: {
        marginRight: 10,
      },
      input: {
        flex: 1,
        color: COLORS.textPrimary,
        fontSize: DIMENSIONS.font,
      },
})

export default SearchBar;
