import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, FlatList, Modal } from "react-native";
import { useMusicStore } from "../store";
import * as MediaLibrary from 'expo-media-library';
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from '@react-navigation/native'; 
import { RootStackParamList } from '../types'; 
import { StackNavigationProp } from '@react-navigation/stack';
import { styles } from "@/style/playlistDetail.style";

interface Track {
  id: string;
  uri: string;
  filename: string;
}

type PlayerScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Playlist'>;

export const PlaylistDetailScreen: React.FC<{ route: any }> = ({ route }) => {
  const navigation = useNavigation<PlayerScreenNavigationProp>();
  const { playlistName } = route.params;
  const { playlists, addTrackToPlaylist } = useMusicStore();

  const [showAddTrackModal, setShowAddTrackModal] = useState(false);
  const [tracks, setTracks] = useState<Track[]>([]);
  const [selectedTracks, setSelectedTracks] = useState<Set<string>>(new Set());

  const playlist = playlists.find((p) => p.name === playlistName);

  useEffect(() => {
    (async () => {
      const { status } = await MediaLibrary.requestPermissionsAsync();
      if (status === 'granted') {
        const media = await MediaLibrary.getAssetsAsync({ mediaType: 'audio' });
        setTracks(media.assets as Track[]);
      }
    })();
  }, []);

  const toggleSelectTrack = (track: Track) => {
    setSelectedTracks((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(track.id)) {
        newSet.delete(track.id);
      } else {
        newSet.add(track.id);
      }
      return newSet;
    });
  };

  const handleAddTracksToPlaylist = () => {
    if (playlist) {
      const tracksToAdd = tracks.filter((track) => selectedTracks.has(track.id));
      tracksToAdd.forEach((track) => addTrackToPlaylist(playlist.name, track));
      setShowAddTrackModal(false);
      setSelectedTracks(new Set());
    }
  };


  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#F5A9B8" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Mon Melodify : {playlistName}</Text>
      </View>

      {/* Display existing tracks in the playlist */}
      <FlatList
        data={playlist?.tracks || []}
        renderItem={({ item }) => (
          <View style={styles.trackItem}>
            <View style={styles.iconFrame}>
              <MaterialCommunityIcons name="music-note" size={24} color="black" />
            </View>
            <Text style={styles.trackName}>{item.filename}</Text>
          </View>
        )}
        keyExtractor={(item) => item.id}
      />

      <TouchableOpacity style={styles.addTrackButton} onPress={() => setShowAddTrackModal(true)}>
        <Ionicons name="add-circle-outline" size={24} color="white" />
        <Text style={styles.addTrackText}>Ajouter des morceaux</Text>
      </TouchableOpacity>

      {/* Modal to add tracks */}
      <Modal
        visible={showAddTrackModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowAddTrackModal(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Sélectionnez des morceaux</Text>
            <FlatList
              data={tracks}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[styles.trackItem, selectedTracks.has(item.id) && styles.selectedTrack]}
                  onPress={() => toggleSelectTrack(item)}
                >
                  <View style={styles.iconFrame}>
                    <MaterialCommunityIcons name="bookmark-music" size={24} color="black" />
                  </View>
                  <Text style={styles.trackName}>{item.filename}</Text>
                </TouchableOpacity>
              )}
              keyExtractor={(item) => item.id}
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity style={styles.modalButton} onPress={handleAddTracksToPlaylist}>
                <Text style={styles.modalButtonText}>Ajouter</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.modalButton, styles.cancelButton]} onPress={() => setShowAddTrackModal(false)}>
                <Text style={styles.modalButtonText}>Annuler</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};
