import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginLeft: 10,
  },
  trackItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    marginBottom: 10,
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
    minHeight: 40,
  },
  trackName: {
    fontSize: 12,
    color: '#000',
  },
  addTrackButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    marginTop: 20,
    backgroundColor: "#F5A9B8",
    borderRadius: 10,
    justifyContent: 'center',
  },
  iconFrame: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: "#F5A9B8",
    borderRadius: 20,
    marginRight: 10,
  },
  addTrackText: {
    color: "white",
    marginLeft: 10,
    fontSize: 18,
  },
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContainer: {
    width: 270,
    height: 300,
    padding: 10,
    backgroundColor: "white",
    borderRadius: 10,
  },
  modalTitle: {
    marginBottom: 5,
    fontSize: 16,
    fontWeight: 'bold',
  },
  selectedTrack: {
    backgroundColor: "#F5A9B8",
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
  },
  modalButton: {
    backgroundColor: "#F5A9B8",
    padding: 8,
    borderRadius: 5,
    width: '48%',
    alignItems: 'center',
  },
  modalButtonText: {
    color: 'white',
    fontSize: 14,
  },
  cancelButton: {
    backgroundColor: "#F5A9B8",
  },
});
