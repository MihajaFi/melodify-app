import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { useMusicStore } from '../store';

export const PlayerScreen: React.FC = () => {
  const navigation = useNavigation();
  const { currentTrack, isPlaying, togglePlay, playNext, playPrev } = useMusicStore();

  if (!currentTrack) return null;

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.closeButton}>
        <Ionicons name="close" size={32} color="black" />
      </TouchableOpacity>
      <Text style={styles.title}>{currentTrack.filename}</Text>
      <View style={styles.controls}>
      <TouchableOpacity onPress={() => playPrev([])}> 
          <Ionicons name="play-back" size={40} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={togglePlay}>
          <Ionicons name={isPlaying ? 'pause' : 'play'} size={40} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => playNext([])}> 
          <Ionicons name="play-forward" size={40} color="black" />
        </TouchableOpacity>
      </View> 
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  closeButton: {
    position: 'absolute',
    top: 40,
    right: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '80%',
    marginTop: 20,
  },
});

 
