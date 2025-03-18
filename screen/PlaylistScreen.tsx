import React, { useState } from "react";
import { View, Text, TouchableOpacity, FlatList, Modal, TextInput, Alert } from "react-native";
import { useMusicStore } from "../store";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from '@react-navigation/native'; 
import { RootStackParamList } from '../types'; 
import { StackNavigationProp } from '@react-navigation/stack';
import { styles } from "@/style/playlist.style";

type DetailNavigationProp = StackNavigationProp<RootStackParamList, 'Detail'>;

export const PlaylistScreen: React.FC = () => {
  const { playlists, createPlaylist } = useMusicStore();
  const [showAddPlaylistModal, setShowAddPlaylistModal] = useState(false);
  const [newPlaylistName, setNewPlaylistName] = useState("");
  const navigation = useNavigation<DetailNavigationProp>();

  const handleAddPlaylist = () => {
    if (newPlaylistName.trim()) {
      createPlaylist(newPlaylistName);
      setNewPlaylistName("");
      setShowAddPlaylistModal(false);
    } else {
      Alert.alert('Erreur', 'Veuillez entrer un nom pour la playlist.');
    }
  };

  return (
    <View style={styles.container}>
      {/* Bouton d'ajout de playlist */}
      <TouchableOpacity
        style={styles.addPlaylistCard}
        onPress={() => setShowAddPlaylistModal(true)}
      >
        <Ionicons name="add-circle-outline" size={24} color="white" />
        <Text style={styles.addPlaylistText}>Ajouter une Playlist</Text>
      </TouchableOpacity>

      {/* Liste des playlists */}
      <FlatList
        data={playlists}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.playlistItem}
            onPress={() => {
              // Naviguer vers l'écran Detail et passer uniquement le nom de la playlist
              navigation.navigate('Detail', { 
                playlistName: item.name, // Passer uniquement le nom de la playlist
              });
            }}
          >
            <View style={styles.iconFrame}>
              <MaterialCommunityIcons name="bookmark-music" size={24} color="black" />
            </View>
            <Text style={styles.playlistName}>{item.name}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.name}
      />

      {/* Modal pour ajouter une nouvelle playlist */}
      <Modal
        visible={showAddPlaylistModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowAddPlaylistModal(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Entrez le nom de la nouvelle playlist</Text>
            <TextInput
              style={styles.input}
              placeholder="Nom de la playlist"
              value={newPlaylistName}
              onChangeText={setNewPlaylistName}
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity style={styles.modalButton} onPress={handleAddPlaylist}>
                <Text style={styles.modalButtonText}>Ajouter</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setShowAddPlaylistModal(false)}
              >
                <Text style={styles.modalButtonText}>Annuler</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};
