import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert, Dimensions } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Audio } from 'expo-av';
import { useMusicStore } from '../store';
import { styles } from '@/style/musicPlayer.style';
import { useNavigation } from '@react-navigation/native'; 
import { RootStackParamList } from '../types'; 
import { StackNavigationProp } from '@react-navigation/stack';

const { width } = Dimensions.get("window");

interface Track {
  id: string;
  uri: string;
  filename: string;
}

type PlayerScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Player'>;

export const MusicPlayer: React.FC<{ tracks: Track[] }> = ({ tracks }) => {
  const { currentTrack, setTrack, isPlaying, togglePlay, sound, playNext, playPrev } = useMusicStore();
  const [containerWidth, setContainerWidth] = useState(width - 100);
  const navigation = useNavigation<PlayerScreenNavigationProp>();
  // Configuration de l'audio en arrière-plan
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

  const playSound = async (track: Track) => {
    if (sound) {
      await sound.unloadAsync(); // Unload previous sound if exists
    }

    const { sound: newSound } = await Audio.Sound.createAsync(
      { uri: track.uri },
      { shouldPlay: true }
    );
    setTrack(track, newSound); // Set new track and sound object
  };

  const showMetadata = () => {
    if (currentTrack) {
      Alert.alert(
        "Track Metadata",
        `Filename: ${currentTrack.filename}\nURI: ${currentTrack.uri}`,
        [{ text: "OK" }]
      );
    }
  };

  const goToPlayerScreen = () => {
    navigation.navigate('Player', { tracks });  // Passez les tracks en tant que paramètre
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={tracks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.trackItem} onPress={() => playSound(item)}>
            <View style={styles.trackItemContent}>
              <MaterialCommunityIcons name="music-note-eighth" size={24} color="black" style={styles.icon} />
              <Text style={styles.trackText}>{item.filename}</Text>
              <TouchableOpacity onPress={showMetadata}>
                <Ionicons name="ellipsis-vertical" size={14} color="black" style={styles.icon} />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        )}
      />
      {currentTrack && (
        <TouchableOpacity onPress={goToPlayerScreen}>
          <View style={styles.footer} onLayout={(event) => setContainerWidth(event.nativeEvent.layout.width - 100)}>
            <View style={styles.iconContainer}>
              <Ionicons name="musical-notes" size={24} color="white" style={styles.icon} />
            </View>
            <View style={[styles.nowPlayingContainer, { width: containerWidth }]}>
              <Text style={[styles.nowPlaying, { color: 'white' }]} numberOfLines={1}>
                {currentTrack.filename}
              </Text>
            </View>
            <View style={styles.controls}>
              <TouchableOpacity onPress={() => playPrev(tracks)}>
                <Ionicons name="play-back" size={32} color="white" />
              </TouchableOpacity>
              <TouchableOpacity onPress={togglePlay}>
                <Ionicons name={isPlaying ? "pause" : "play"} size={32} color="white" />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => playNext(tracks)}>
                <Ionicons name="play-forward" size={32} color="white" />
              </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={showMetadata}>
              <Ionicons name="ellipsis-vertical" size={30} color="white" style={styles.icon} />
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      )}
    </View>
  );
};
