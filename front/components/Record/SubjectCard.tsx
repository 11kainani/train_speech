import React from "react";
import { View, StyleSheet , Text} from "react-native";
import { COLORS, DIMENSIONS } from "../../utils";

interface SubjectCardProps {
    description: string;
    small? : boolean,
}

const SubjectCard: React.FC<SubjectCardProps> = ({description, small=false}) => {
    return (
        <View style={[ styles.base,small ? styles.smallContainer : styles.container]}>
            <Text style={styles.text}>{description}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    base: {
        alignSelf: "center",
        width: "90%",
        backgroundColor: COLORS.cardBackground,
        padding: DIMENSIONS.paddingLarge,
        margin: DIMENSIONS.marginLarge,
        justifyContent: "center",
        borderRadius: DIMENSIONS.radius,
    
    },
    container: {
        height: "70%",        
    },

    smallContainer: {
        height: "30%",
    },

    text : {
        fontSize: DIMENSIONS.fontLarge, 
        fontWeight: "bold",
        textAlign : "center",
        
    },

});

export default SubjectCard;