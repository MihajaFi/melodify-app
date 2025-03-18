import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert, Dimensions } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Audio } from 'expo-av';
import { useMusicStore } from '../store';
import { styles } from '@/style/musicPlayer.style';

const { width } = Dimensions.get("window");

interface Track {
  id: string;
  uri: string;
  filename: string;
}

export const MusicPlayer: React.FC<{ tracks: Track[] }> = ({ tracks }) => {
  const { currentTrack, setTrack, isPlaying, togglePlay, sound, playNext, playPrev } = useMusicStore();

  const [containerWidth, setContainerWidth] = useState(width - 100);
  
  const playSound = async (track: Track) => {
    if (sound) {
      await sound.unloadAsync();
    }
    const { sound: newSound } = await Audio.Sound.createAsync(
      { uri: track.uri },
      { shouldPlay: true }
    );
    setTrack(track, newSound);
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
        <View style={styles.footer} onLayout={(event) => setContainerWidth(event.nativeEvent.layout.width - 100)}>
          <View style={styles.iconContainer}>
            <Ionicons name="musical-notes" size={24} color="black" style={styles.icon} />
            <TouchableOpacity onPress={showMetadata}>
              <Ionicons name="ellipsis-vertical" size={14} color="black" style={styles.icon} />
            </TouchableOpacity>
          </View>
          <View style={[styles.nowPlayingContainer, { width: containerWidth }]}>
            <Text style={styles.nowPlaying} numberOfLines={1}>
              {currentTrack.filename}
            </Text>
          </View>
          <View style={styles.controls}>
            <TouchableOpacity onPress={() => playPrev(tracks)}>
              <Ionicons name="play-back" size={32} color="black" />
            </TouchableOpacity>
            <TouchableOpacity onPress={togglePlay}>
              <Ionicons name={isPlaying ? "pause" : "play"} size={32} color="black" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => playNext(tracks)}>
              <Ionicons name="play-forward" size={32} color="black" />
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};
