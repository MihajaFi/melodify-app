// PlayerScreen.tsx
import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { PlayerControls } from "../components"; // Importer le contrôleur de lecture
import { useMusicStore } from "../store";
import { RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "../types"; // Assurez-vous que le fichier types.ts existe
import { Ionicons } from "@expo/vector-icons";

// Définir le type de route pour PlayerScreen
type PlayerScreenRouteProp = RouteProp<RootStackParamList, "Player">;

interface PlayerScreenProps {
  route: PlayerScreenRouteProp; // Passer route comme prop
}

export const PlayerScreen: React.FC<PlayerScreenProps> = ({ route }) => {
  const { currentTrack } = useMusicStore();
  const { tracks } = route.params; // Récupérer 'tracks' à partir des paramètres de route

  return (
    <View
      style={{
        flex: 1,
        padding: 20,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#232526",
      }}
    >
      <View
        style={{
          width: 250,
          height: 250,
          borderRadius: 20,
          backgroundColor: "#444",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: 30,
        }}
      >
        <Ionicons name="musical-notes-outline" size={100} color="#fff" />
      </View>
      {currentTrack ? (
        <>
          <Text
            style={{
              color: "white",
              fontSize: 24,
              fontWeight: "bold",
              marginBottom: 8,
            }}
          >
            Now Playing: {currentTrack.filename}
          </Text>
          <PlayerControls tracks={tracks} />
         
        </>
      ) : (
        <View>
          
        </View>
      )}
    </View>
  );
};
