import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Answer } from "../../models";
import { IconButton } from "../Button";
import { Feather, FontAwesome6, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { COLORS, DIMENSIONS } from "../../utils";

interface AudioPlayerProps{
    answer?: Answer
}

const  AudioPlayer: React.FC<AudioPlayerProps> = ({answer}) => {

    const [isPaused, setIsPaused] = useState(false);

    const handlePlayTrigger = () => {
        setIsPaused((prev) => !prev);
    }

    const renderPausePlayButton = () => {
        if(isPaused)
        {
            return <Ionicons name="pause" size={DIMENSIONS.iconSize} color={COLORS.background} />;
        }

        return <Feather name="play-circle" size={DIMENSIONS.iconSize} color={COLORS.background} /> ;
    } 
    return(
        <View style={styles.container}>
            
            <View style={styles.mediaButton}>
                <IconButton small={true} icon={<MaterialIcons name="replay-5" size={DIMENSIONS.iconSize} color={COLORS.background} />}/>
                <IconButton small={true}  icon={renderPausePlayButton()}  onPress={handlePlayTrigger}/>
                <IconButton small={true}  icon={<MaterialIcons name="forward-5" size={DIMENSIONS.iconSize} color={COLORS.background} />}  />
                

            </View>
        </View>
    );

} 

const styles = StyleSheet.create({
    container : 
    {
        margin: DIMENSIONS.marginSmall,
        width: "100%",
        alignSelf: "center",
    },

    mediaButton: {
        alignSelf: "center",
        flexDirection: "row",
    },
});

export default AudioPlayer; 