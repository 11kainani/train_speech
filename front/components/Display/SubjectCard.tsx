import React from "react";
import { View, StyleSheet , Text} from "react-native";
import { COLORS, DIMENSIONS } from "../../utils";

interface SubjectCardProps {
    description: string;
}

const SubjectCard: React.FC<SubjectCardProps> = ({description}) => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>{description}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignSelf: "center",
        height: "70%",
        width: "90%",
        backgroundColor: COLORS.cardBackground,
        padding: DIMENSIONS.paddingLarge,
        margin: DIMENSIONS.marginLarge,
        justifyContent: "center",
        
    },

    text : {
        fontSize: DIMENSIONS.fontLarge, 
        fontWeight: "bold",
        textAlign : "center",
        
    },

});

export default SubjectCard;