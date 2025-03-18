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
});
