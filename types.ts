// types.ts
export type RootStackParamList = {
  Home: undefined;  // Pas de paramètres pour l'écran Home
  Player: { tracks: Track[] };  // PlayerScreen attend un paramètre 'tracks' de type Track[]
};

export type Track = {
  id: string;
  uri: string;
  filename: string;
};
