import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: 'hsla(0, 72.00%, 62.20%, 0.50)', 
  },
  albumArtContainer: {
    width: 250,
    height: 250,
    borderRadius: 20,
    backgroundColor:'hsla(0, 50.00%, 65.50%, 0.50)', 
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 30,
  },
  albumIcon: {
    fontSize: 100,
    color: '#fff',
  },
  trackTitle: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  play:{
    backgroundColor: 'hsla(0, 46.20%, 94.90%, 0.50)', 
  }
});
