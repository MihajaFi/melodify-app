import React, { useEffect, useRef, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Animated, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
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

  const scrollX = useRef(new Animated.Value(0)).current;
  const [textWidth, setTextWidth] = useState(0);
  const [containerWidth, setContainerWidth] = useState(width - 100);

  useEffect(() => {
    if (currentTrack && textWidth > containerWidth) {
      scrollX.setValue(0);
      Animated.loop(
        Animated.sequence([ 
          Animated.timing(scrollX, {
            toValue: -(textWidth - containerWidth),
            duration: 7000,
            useNativeDriver: true,
          }),
          Animated.timing(scrollX, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true,
          }),
        ])
      ).start();
    }
  }, [currentTrack, textWidth, containerWidth]);

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
        <View style={styles.footer} onLayout={(event) => setContainerWidth(event.nativeEvent.layout.width - 100)}>
          <Ionicons name="musical-notes" size={24} color="black" style={styles.icon} />
          <View style={[styles.nowPlayingContainer, { width: containerWidth }]}>
            <Animated.Text
              style={[styles.nowPlaying, { transform: [{ translateX: scrollX }] }]}
              numberOfLines={1}
              onLayout={(event) => setTextWidth(event.nativeEvent.layout.width)}
            >
              {currentTrack.filename}
            </Animated.Text>
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
