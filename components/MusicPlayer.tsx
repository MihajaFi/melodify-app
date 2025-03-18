// MusicPlayer.tsx
import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Audio } from 'expo-av';
import { useMusicStore } from '../store';
import { useNavigation } from '@react-navigation/native';  // Utilisation de la navigation
import { RootStackParamList } from '../types';  // Importer RootStackParamList
import { StackNavigationProp } from '@react-navigation/stack';

interface Track {
  id: string;
  uri: string;
  filename: string;
}

type PlayerScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Player'>;

export const MusicPlayer: React.FC<{ tracks: Track[] }> = ({ tracks }) => {
  const { currentTrack, setTrack, isPlaying, togglePlay, sound, playNext, playPrev } = useMusicStore();
  const navigation = useNavigation<PlayerScreenNavigationProp>();  // Hook de navigation

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
            <Text>{item.filename}</Text>
          </TouchableOpacity>
        )}
      />
      {currentTrack && (
        <TouchableOpacity onPress={goToPlayerScreen}>
          <View style={styles.footer}>
            <Text style={styles.nowPlaying}>Now Playing: {currentTrack.filename}</Text>
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
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  trackItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: '#eee',
    padding: 10,
    alignItems: 'center',
  },
  nowPlaying: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '80%',
    marginTop: 10,
  },
  goToPlayer: {
    color: '#1DB954',
    marginTop: 20,
    fontSize: 16,
  },
});
