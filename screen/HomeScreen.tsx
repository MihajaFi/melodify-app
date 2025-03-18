import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import * as MediaLibrary from 'expo-media-library';
import { MusicPlayer } from '../components';

interface Track {
  id: string;
  uri: string;
  filename: string;
}

export const HomeScreen: React.FC = () => {
  const [tracks, setTracks] = useState<Track[]>([]);

  useEffect(() => {
    (async () => {
      const { status } = await MediaLibrary.requestPermissionsAsync();
      if (status === 'granted') {
        const media = await MediaLibrary.getAssetsAsync({ mediaType: 'audio' });
        setTracks(media.assets as Track[]);
      }
    })();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <MusicPlayer tracks={tracks} />
    </View>
  );
};

