import { View, StyleSheet, Text, InteractionManager } from "react-native";
import { useRouter } from "expo-router";
import { Entypo, Feather } from "@expo/vector-icons";
import * as FileSystem from "expo-file-system";

import { IconButton, PanelButton, SmallConfirmButton } from "../Button";
import { COLORS, DIMENSIONS, secondsToFormat } from "../../utils";
import { useRecordAudio } from "../../hook";
import { Subject } from "../../models";

const RECORD_DIR = FileSystem.documentDirectory + "recording/";
const MAX_RECORD_TIME = 300;

interface MediaRecorderProps {
  subject: Subject;
  onRelease: () => void;
}

/**
 * MediaRecorder component for handling audio recording logic.
 * Displays record timer, record/pause/play buttons, and cancel/save actions.
 */
const MediaRecorder: React.FC<MediaRecorderProps> = ({
  subject,
  onRelease,
}) => {
  const {
    recordTimer,
    isRecording,
    isPaused,
    clearIntervalIfNeeded,
    setRecordTimer,
    handleRecord,
    stopRecording,
  } = useRecordAudio(subject);

  const router = useRouter();

  /**
   * Handle cancel button press.
   * Stops recording, resets timer, and navigates back to /record.
   */
  const handleCancel = async () => {
    clearIntervalIfNeeded();
    setRecordTimer(0);
    await stopRecording();
    //TODO Update AnswerList 
    InteractionManager.runAfterInteractions(() => {
      router.replace("/record");
    });
  };

  const handleAudioRecord = async () => {
    await stopRecording();
    onRelease();
  };
  /**
   * Renders the appropriate record button icon based on recording state.
   */
  const renderRecordIcon = () => {
    if (!isRecording) {
      return (
        <Entypo
          name="controller-record"
          size={DIMENSIONS.iconSizeXLarge}
          color={COLORS.red}
        />
      );
    }

    return (
      <Feather
        name={isPaused ? "play-circle" : "pause"}
        size={DIMENSIONS.iconSizeXLarge}
        color={COLORS.secondary}
      />
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.recordTime}>
        {secondsToFormat(recordTimer)} / {secondsToFormat(MAX_RECORD_TIME)}
      </Text>

      <IconButton
        backgroundColor={isRecording ? COLORS.primary : COLORS.red}
        onPress={handleRecord}
        icon={renderRecordIcon()}
      />

      <View style={styles.horizontal}>
        <PanelButton
          title="Save"
          disabled={!isRecording}
          style={styles.save}
          onPress={handleAudioRecord}
        />
        <SmallConfirmButton
          title="Cancel"
          style={styles.deleteText}
          onPress={handleCancel}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "45%",
    width: "100%",
    backgroundColor: COLORS.secondary,
    padding: DIMENSIONS.paddingLarge,
    justifyContent: "space-between",
    alignItems: "center",
  },
  recordTime: {
    fontSize: DIMENSIONS.fontXLarge,
    fontWeight: "bold",
  },
  horizontal: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    position: "relative",
  },
  save: {},
  deleteText: {
    position: "absolute",
    right: 25,
    backgroundColor: COLORS.red,
  },
});

export default MediaRecorder;
