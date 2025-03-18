import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  addPlaylistCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    marginBottom: 20,
    backgroundColor: "#F5A9B8", // Couleur rose pâle
    borderRadius: 10,
    shadowColor: "#000", // Ombre légère pour un effet carte
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5, // Ombre pour Android
  },
  addPlaylistText: {
    color: "white",
    marginLeft: 10,
    fontSize: 18,
  },
  playlistItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    marginBottom: 10,
    backgroundColor: "#f0f0f0", // Couleur de fond gris clair pour les cartes des playlists
    borderRadius: 10,
    shadowColor: "#000", // Ombre légère pour un effet carte
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5, // Ombre pour Android
  },
  iconFrame: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: "#F5A9B8", // Bordure autour de l'icône
    borderRadius: 20,
    marginRight: 10,
  },
  playlistName: {
    fontSize: 18,
  },
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContainer: {
    width: 300,
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
  },
  modalTitle: {
    marginBottom: 10,
    fontSize: 18,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 15,
    paddingLeft: 10,
    borderRadius: 5,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalButton: {
    backgroundColor: "#F5A9B8", // Couleur rose pâle
    padding: 10,
    borderRadius: 5,
    width: '48%', // Laisser de l'espace entre les deux boutons
    alignItems: 'center',
  },
  modalButtonText: {
    color: 'white',
    fontSize: 16,
  },
  cancelButton: {
    backgroundColor:  "#F5A9B8", // Couleur rose plus pâle pour le bouton annuler
  },
});
