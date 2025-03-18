import React, { useState, useEffect } from "react";
import { View, TouchableOpacity, Text, Dimensions, Alert, Modal, TextInput } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Slider from "@react-native-community/slider";
import { Audio } from "expo-av";
import { useMusicStore } from "../store";
import { MaterialIcons } from "@expo/vector-icons";
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
  const [modalVisible, setModalVisible] = useState(false); // State for modal visibility
  const [playlistName, setPlaylistName] = useState(""); // State for playlist name input
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
    if (playlistName.trim() === "") {
      Alert.alert("Erreur", "Veuillez entrer un nom pour la playlist.");
    } else {
      createPlaylist(playlistName); // Crée la playlist avec le nom saisi
      Alert.alert("Playlist créée", `Votre playlist "${playlistName}" a été créée!`, [
        { text: "OK", onPress: () => navigation.navigate("Playlist") }, // Redirige vers l'écran Playlist
      ]);
      setModalVisible(false); // Close the modal
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
      <View style={{ alignItems: "center", marginTop: 20 }}>
        <TouchableOpacity
          style={{ padding: 10, borderRadius: 10, flexDirection: "row", alignItems: "center" }}
          onPress={() => setModalVisible(true)} // Show modal on button press
        >
          <MaterialIcons name="playlist-add" size={24} color="white" />
          <Text style={{ color: "white", marginLeft: 10 }}>Créer une Playlist</Text>
        </TouchableOpacity>
      </View>

      {/* Modal for entering playlist name */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
          <View style={{ backgroundColor: "white", padding: 20, borderRadius: 10, width: width - 40 }}>
            <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 10 }}>Nom de la Playlist</Text>
            <TextInput
              value={playlistName}
              onChangeText={setPlaylistName}
              placeholder="Entrez le nom de la playlist"
              style={{
                height: 40,
                borderColor: "gray",
                borderWidth: 1,
                borderRadius: 5,
                marginBottom: 20,
                paddingLeft: 10,
              }}
            />
            <TouchableOpacity
              style={{ backgroundColor: 'hsla(0, 90.50%, 67.10%, 0.50)', padding: 10, borderRadius: 10 }}
              onPress={handleCreatePlaylist}
            >
              <Text style={{ color: "white", textAlign: "center" }}>Créer</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ marginTop: 10, padding: 10 }}
              onPress={() => setModalVisible(false)} // Close the modal
            >
              <Text style={{ textAlign: "center" }}>Annuler</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};
