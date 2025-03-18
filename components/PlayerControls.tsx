import React, { useState, useEffect } from "react";
import { View, TouchableOpacity, Text, Dimensions, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Slider from "@react-native-community/slider";
import { Audio } from "expo-av";
import { useMusicStore } from "../store";
import { useNavigation } from "@react-navigation/native"; // Importez useNavigation
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types';

const { width } = Dimensions.get("window");

interface Track {
  id: string;
  uri: string;
  filename: string;
}
type PlaylistScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Playlist'>;

export const PlayerControls: React.FC<{ tracks: Track[] }> = ({ tracks }) => {
  const { sound, isPlaying, togglePlay, playNext, playPrev, currentTrack, createPlaylist } = useMusicStore();
  const [position, setPosition] = useState(0);
  const [duration, setDuration] = useState(1);
  const navigation = useNavigation<PlaylistScreenNavigationProp>(); // Utilisez useNavigation pour la navigation

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

  const handleCreatePlaylist = () => {
    const playlistName = `Playlist ${Date.now()}`; // Crée un nom unique pour la playlist
    createPlaylist(playlistName); // Crée une playlist avec le nom généré
    Alert.alert("Playlist créée", `Votre playlist "${playlistName}" a été créée!`, [
      { text: "OK", onPress: () => navigation.navigate("Playlist") }, // Redirige vers l'écran Playlist
    ]);
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
          style={{ backgroundColor: "#1DB954", padding: 20, borderRadius: 50 }}
          onPress={async () => togglePlay()}
        >
          <Ionicons name={isPlaying ? "pause" : "play"} size={40} color="white" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => playNext(tracks)} style={{ marginHorizontal: 20 }}>
          <Ionicons name="play-skip-forward-outline" size={40} color="white" />
        </TouchableOpacity>
      </View>
      <View style={{ alignItems: "center", marginTop: 20 }}>
        <TouchableOpacity
          style={{ backgroundColor: "#1DB954", padding: 10, borderRadius: 10 }}
          onPress={handleCreatePlaylist} // Fonction pour créer la playlist
        >
          <Text style={{ color: "white" }}>Créer une Playlist</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
