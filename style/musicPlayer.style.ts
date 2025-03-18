import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  trackItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: '#eee',
    padding: 10,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '25%',  // Controls space between the two icons
  },
  icon: {
    marginLeft: 10,
  },
  nowPlayingContainer: {
    overflow: 'hidden',
    flex: 1,
  },
  nowPlaying: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '30%',
  },
  coverImage: {
    width: 50,
    height: 50,
    borderRadius: 10,
    marginTop: 10,
    marginBottom: 10,
  },
  metadataText: {
    fontSize: 14,
    color: 'gray',
    padding: 10,
  },
  trackItemContent: {
    flexDirection: 'row', // Pour aligner horizontalement
    alignItems: 'center', // Pour centrer l'icône et le texte
  },
  trackText: {
    marginLeft: 10, // Espacement entre l'icône et le texte
    fontSize: 16, // Taille du texte
    color: 'black', // Couleur du texte
  },
});
