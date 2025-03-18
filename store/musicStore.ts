import { create } from 'zustand';
import { Audio } from 'expo-av';

interface Track {
  id: string;
  uri: string;
  filename: string;
}

interface MusicStore {
  currentTrack: Track | null;
  isPlaying: boolean;
  sound: Audio.Sound | null;
  setTrack: (track: Track, newSound: Audio.Sound) => void;
  togglePlay: () => Promise<void>;
  playNext: (tracks: Track[]) => void;
  playPrev: (tracks: Track[]) => void;
}

export const useMusicStore = create<MusicStore>((set) => ({
  currentTrack: null,
  isPlaying: false,
  sound: null,
  setTrack: (track, newSound) => set({ currentTrack: track, sound: newSound, isPlaying: true }),
  togglePlay: async () => {
    const { sound, isPlaying } = useMusicStore.getState();
    if (sound) {
      if (isPlaying) {
        await sound.pauseAsync();
      } else {
        await sound.playAsync();
      }
      useMusicStore.setState({ isPlaying: !isPlaying });
    }
  },
  playNext: (tracks) => {
    const { currentTrack, sound, setTrack } = useMusicStore.getState();
    if (!currentTrack) return;
    const currentIndex = tracks.findIndex(track => track.id === currentTrack.id);
    const nextTrack = tracks[currentIndex + 1] || tracks[0];
    if (sound) sound.unloadAsync();
    Audio.Sound.createAsync({ uri: nextTrack.uri }, { shouldPlay: true }).then(({ sound: newSound }) => {
      setTrack(nextTrack, newSound);
    });
  },
  playPrev: (tracks) => {
    const { currentTrack, sound, setTrack } = useMusicStore.getState();
    if (!currentTrack) return;
    const currentIndex = tracks.findIndex(track => track.id === currentTrack.id);
    const prevTrack = tracks[currentIndex - 1] || tracks[tracks.length - 1];
    if (sound) sound.unloadAsync();
    Audio.Sound.createAsync({ uri: prevTrack.uri }, { shouldPlay: true }).then(({ sound: newSound }) => {
      setTrack(prevTrack, newSound);
    });
  },
}));

