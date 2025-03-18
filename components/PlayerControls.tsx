import React, { useState, useEffect } from "react";
import { View, TouchableOpacity, Text, Dimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Slider from "@react-native-community/slider";
import { Audio } from 'expo-av';  // Ensure Audio is imported
import { useMusicStore } from "../store";

const { width } = Dimensions.get("window");

interface Track {
  id: string;
  uri: string;
  filename: string;
}

export const PlayerControls: React.FC<{ tracks: Track[] }> = ({ tracks }) => {
  const { sound, isPlaying, togglePlay, playNext, playPrev, currentTrack } = useMusicStore();
  const [position, setPosition] = useState(0);
  const [duration, setDuration] = useState(1);

  useEffect(() => {
    const configureAudioBackground = async () => {
      try {
        await Audio.setAudioModeAsync({
          playsInSilentModeIOS: true,
          allowsRecordingIOS: false,
          staysActiveInBackground: true,
        });
        console.log("Audio en arrière-plan activé");
      } catch (error) {
        console.log("Erreur lors de la configuration de l'audio en arrière-plan:", error);
      }
    };

    configureAudioBackground();

    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, [sound]);

  useEffect(() => {
    if (sound) {
      const updateStatus = async () => {
        const status = await sound.getStatusAsync();
        if (status.isLoaded) {
          setDuration(status.durationMillis || 1);
          setPosition(status.positionMillis || 0);
        }
      };
      const interval = setInterval(updateStatus, 1000);
      return () => clearInterval(interval);
    }
  }, [sound]);

  const seekTo = async (value: number) => {
    if (sound) {
      await sound.setPositionAsync(value);
      setPosition(value);
    }
  };

  return (
    <View>
      <Slider
        style={{ width: width - 40, height: 40 }}
        minimumValue={0}
        maximumValue={duration}
        value={position}
        onValueChange={setPosition}
        onSlidingComplete={seekTo}
      />
      <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-around", marginTop: 10 }}>
        <TouchableOpacity onPress={() => playPrev(tracks)} style={{ marginHorizontal: 20 }}>
          <Ionicons name="play-skip-back-outline" size={40} color="white" />
        </TouchableOpacity>
        <TouchableOpacity
          style={{ padding: 20, borderRadius: 50 }}
          onPress={async () => togglePlay()}
        >
          <Ionicons name={isPlaying ? "pause" : "play"} size={40} color="white" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => playNext(tracks)} style={{ marginHorizontal: 20 }}>
          <Ionicons name="play-skip-forward-outline" size={40} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};
