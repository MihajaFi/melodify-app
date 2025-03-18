import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { PlayerControls } from "../components";
import { useMusicStore } from "../store";
import { RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "../types";
import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons"; 
import { styles } from "@/style/PlayerScreen.style";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from '@react-navigation/stack'; 

// Définir le type de route pour PlayerScreen
type PlayerScreenRouteProp = RouteProp<RootStackParamList, "Player">;

interface PlayerScreenProps {
  route: PlayerScreenRouteProp; 
}

export const PlayerScreen: React.FC<PlayerScreenProps> = ({ route }) => {
  const { currentTrack } = useMusicStore();
  const { tracks } = route.params; 

  const navigation = useNavigation<StackNavigationProp<RootStackParamList, 'Home'>>();

  // Fonction pour gérer le retour à la page d'accueil
  const handleGoHome = () => {
    navigation.navigate('Home'); 
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        onPress={handleGoHome} 
        style={{
          position: "absolute", 
          top: 10,  
          left: 20, 
          zIndex: 1, 
        }}
      >
        <MaterialCommunityIcons name="keyboard-backspace" size={40} color="white"/>
      </TouchableOpacity>

      <View style={styles.albumArtContainer}>
        <Ionicons name="musical-notes-outline" style={styles.albumIcon} />
      </View>
      {currentTrack ? (
        <>
          <Text style={styles.trackTitle}>
            Now Playing: {currentTrack.filename}
          </Text>
          <PlayerControls tracks={tracks} />
        </>
      ) : (
        <View></View>
      )}
    </View>
  );
};
