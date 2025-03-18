import React, { useState } from "react";
import { View, Text, TouchableOpacity, FlatList, Modal, TextInput } from "react-native";
import { useMusicStore } from "../store";
import { Ionicons } from "@expo/vector-icons";

export const PlaylistDetailScreen: React.FC<{ route: any }> = ({ route }) => {
  const { playlistName } = route.params;
  const { playlists, addTrackToPlaylist } = useMusicStore();
  
  const [showAddTrackModal, setShowAddTrackModal] = useState(false);
  const [trackId, setTrackId] = useState("");
  const [trackUri, setTrackUri] = useState("");
  const [trackFilename, setTrackFilename] = useState("");

  const playlist = playlists.find((p) => p.name === playlistName);

  const handleAddTrackToPlaylist = () => {
    if (trackId && trackUri && trackFilename) {
      addTrackToPlaylist(playlistName, { id: trackId, uri: trackUri, filename: trackFilename });
      setShowAddTrackModal(false);
    }
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>Playlist: {playlist?.name}</Text>

      <FlatList
        data={playlist?.tracks || []}
        renderItem={({ item }) => (
          <View
            style={{
              padding: 15,
              marginBottom: 10,
              backgroundColor: "#f0f0f0",
              borderRadius: 10,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text style={{ fontSize: 18 }}>{item.filename}</Text>
          </View>
        )}
        keyExtractor={(item) => item.id}
      />

      <TouchableOpacity
        style={{ marginTop: 20, padding: 15, backgroundColor: "#1DB954", borderRadius: 10 }}
        onPress={() => setShowAddTrackModal(true)}
      >
        <Text style={{ color: "white", textAlign: "center", fontSize: 18 }}>Ajouter un morceau</Text>
      </TouchableOpacity>

      {/* Modal pour ajouter un morceau */}
      <Modal
        visible={showAddTrackModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowAddTrackModal(false)}
      >
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "rgba(0,0,0,0.5)" }}>
          <View style={{ width: 300, padding: 20, backgroundColor: "white", borderRadius: 10 }}>
            <Text style={{ marginBottom: 10 }}>Ajouter un morceau à la Playlist</Text>
            <TextInput
              value={trackId}
              onChangeText={setTrackId}
              style={{ borderBottomWidth: 1, marginBottom: 10, padding: 10 }}
              placeholder="ID du morceau"
            />
            <TextInput
              value={trackUri}
              onChangeText={setTrackUri}
              style={{ borderBottomWidth: 1, marginBottom: 10, padding: 10 }}
              placeholder="URI du morceau"
            />
            <TextInput
              value={trackFilename}
              onChangeText={setTrackFilename}
              style={{ borderBottomWidth: 1, marginBottom: 20, padding: 10 }}
              placeholder="Nom du fichier"
            />
            <TouchableOpacity
              onPress={handleAddTrackToPlaylist}
              style={{ backgroundColor: "#1DB954", padding: 10, borderRadius: 10 }}
            >
              <Text style={{ color: "white", textAlign: "center" }}>Ajouter</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};
