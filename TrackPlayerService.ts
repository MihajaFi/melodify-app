// trackPlayerService.ts
import TrackPlayer from 'react-native-track-player';

// Initialisation et configuration du lecteur audio
export const setupTrackPlayer = async (tracks: any[]) => {
  try {
    await TrackPlayer.setupPlayer();
    await TrackPlayer.add(tracks.map((track) => ({
      id: track.id,
      url: track.uri,
      title: track.filename,
    })));
  } catch (error) {
    console.error('Erreur lors de l\'initialisation de TrackPlayer:', error);
  }
};

export const addTrackPlayerEventListeners = () => {
  TrackPlayer.addEventListener('remote-play' as any, () => {
    TrackPlayer.play();
  });

  TrackPlayer.addEventListener('remote-pause' as any, () => {
    TrackPlayer.pause();
  });

  TrackPlayer.addEventListener('remote-next' as any, () => {
    TrackPlayer.skipToNext();
  });

  TrackPlayer.addEventListener('remote-previous' as any, () => {
    TrackPlayer.skipToPrevious();
  });

  TrackPlayer.addEventListener('remote-stop' as any, () => {
    TrackPlayer.stop();
  });
};


// Fonction pour détruire le lecteur lorsque l'écran est déchargé
export const destroyTrackPlayer = async () => {
  try {
    await (TrackPlayer as any).destroy();
  } catch (error) {
    console.error('Erreur lors de la destruction de TrackPlayer:', error);
  }
};

