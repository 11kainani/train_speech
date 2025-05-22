import { AudioPlayer } from "expo-audio";
import { useState, useRef, useEffect } from "react";

const usePlaybackController = (player: AudioPlayer) => {
  const [isPaused, setIsPaused] = useState(true);
  const [position, setPosition] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!isPaused) {
      intervalRef.current = setInterval(() => {
        setPosition(player.currentTime ?? 0);
      }, 100);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPaused, player.currentTime]);

  const playPause = () => {
    if (player.playing) {
      player.pause();
      setIsPaused(true);
    } else {
      player.play();
      setIsPaused(false);
    }
  };

  const seek = async (offset: number) => {
    const newPosition = Math.max(Math.min(player.currentTime + offset, player.duration), 0);
    await player.seekTo(newPosition);
    setPosition(newPosition);
  };

  const stop = async () => {
    await player.seekTo(0);
    player.pause();
    setIsPaused(true);
    setPosition(0);
  };

  return {
    isPaused,
    position,
    playPause,
    seek,
    stop,
  };
};
