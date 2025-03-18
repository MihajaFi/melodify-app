import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, FlatList, Modal, TextInput, Button, Alert } from "react-native";
import { useMusicStore } from "../store";
import { Ionicons } from "@expo/vector-icons";
import * as MediaLibrary from 'expo-media-library';

interface Track {
  id: string;
  uri: string;
  filename: string;
}

export const PlaylistScreen: React.FC = () => {
  const { playlists, addTrackToPlaylist } = useMusicStore();
  const [selectedPlaylist, setSelectedPlaylist] = useState<any | null>(null);
  const [showAddTrackModal, setShowAddTrackModal] = useState(false);
  const [tracks, setTracks] = useState<Track[]>([]); // Liste des morceaux
  const [selectedTrack, setSelectedTrack] = useState<Track | null>(null); // Morceau sélectionné

  useEffect(() => {
    (async () => {
      const { status } = await MediaLibrary.requestPermissionsAsync();
      if (status === 'granted') {
        const media = await MediaLibrary.getAssetsAsync({ mediaType: 'audio' });
        setTracks(media.assets as Track[]); // Récupérer les morceaux de musique
      }
    })();
  }, []);

  const handleAddTrackToPlaylist = () => {
    if (selectedPlaylist && selectedTrack) {
      addTrackToPlaylist(selectedPlaylist.name, selectedTrack);
      setShowAddTrackModal(false);
      Alert.alert('Morceau ajouté', `Le morceau "${selectedTrack.filename}" a été ajouté à la playlist.`);
    }
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>Mes Playlists</Text>
      
      <FlatList
        data={playlists}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={{ padding: 15, marginBottom: 10, backgroundColor: "#f0f0f0", borderRadius: 10 }}
            onPress={() => setSelectedPlaylist(item)}
          >
            <Text style={{ fontSize: 18 }}>{item.name}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.name}
      />
      
      {selectedPlaylist && (
        <View style={{ marginTop: 20 }}>
          <Text style={{ fontSize: 18 }}>Playlist: {selectedPlaylist.name}</Text>
          <TouchableOpacity
            style={{ marginTop: 10, padding: 10, backgroundColor: "#1DB954", borderRadius: 10 }}
            onPress={() => setShowAddTrackModal(true)}
          >
            <Text style={{ color: "white", textAlign: "center" }}>Ajouter un morceau</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Modal pour ajouter un morceau */}
      <Modal
        visible={showAddTrackModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowAddTrackModal(false)}
      >
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "rgba(0,0,0,0.5)" }}>
          <View style={{ width: 300, padding: 20, backgroundColor: "white", borderRadius: 10 }}>
            <Text style={{ marginBottom: 10 }}>Sélectionner un morceau</Text>
            
            <FlatList
              data={tracks}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={{ padding: 10, marginBottom: 10, backgroundColor: "#f0f0f0", borderRadius: 10 }}
                  onPress={() => setSelectedTrack(item)} // Sélectionner un morceau
                >
                  <Text>{item.filename}</Text>
                </TouchableOpacity>
              )}
              keyExtractor={(item) => item.id}
            />

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
              <Button title="Ajouter" onPress={handleAddTrackToPlaylist} />
              <Button title="Annuler" onPress={() => setShowAddTrackModal(false)} />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};
