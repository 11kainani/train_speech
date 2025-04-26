import { TouchableOpacity, StyleSheet, View, Text } from "react-native";
import { COLORS, DIMENSIONS as DIM } from "../../utils";

interface SmallConfirmButtonProps {
    title : string; 
    style?: object;
    onPress?: () => void;
}

const SmallConfirmButton: React.FC<SmallConfirmButtonProps> = ({title, style, onPress}) => {


    return (
        <TouchableOpacity 
        style = {[styles.container, style]}>
            <View>
                <Text 
                style = {[styles.text, style]}>{title}</Text>
            </View>
        </TouchableOpacity>
    );

}



const styles = StyleSheet.create({
    container : {
        backgroundColor: COLORS.primary,
        padding: DIM.paddingSmall,
        margin: DIM.marginSmall,
        borderRadius: DIM.radiusSmall,
    },

    text: {
        textTransform: "uppercase",
        color: COLORS.textOnPrimary,
        fontSize: DIM.font,
    }
})

export default SmallConfirmButton; 