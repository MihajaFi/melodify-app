import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  // Container de l'écran principal
  container: {
    flex: 1,
  },
  // Style de l'en-tête
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
    backgroundColor: 'hsla(0, 37.80%, 61.60%, 0.50)',
    borderTopWidth: 0,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  headerIcons: {
    flexDirection: 'row',
  },
  iconButton: {
    marginRight: 20,
  },
  // Style du Tab Navigator
  tabBarStyle: {
    backgroundColor: 'hsla(0, 92.20%, 84.90%, 0.50)',
    borderTopWidth: 0,
  },
  // Centrer les éléments
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  // Style pour les items de la liste
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E1E1E', 
    paddingVertical: 4, 
    paddingHorizontal: 16, 
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5, 
    paddingLeft: 16,   
    paddingRight: 16,  
    marginTop:2,
  },
  // Style pour l'élément de couverture (image ou icône)
  cover: {
    width: 60,  
    height: 60,  
    borderRadius: 8, 
    marginRight: 16, 
    backgroundColor: '#666', 
    justifyContent: 'center',
    alignItems: 'center',
  },
  // Style pour les informations de l'élément (titre, artiste, etc.)
  info: {
    flex: 1, 
  },
  title: {
    fontSize: 16,  
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  artist: {
    fontSize: 12,  
    color: '#B3B3B3',
  },
  // Styles pour la modale
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(199, 198, 198, 0.5)', 
  },
  modalContent: {
    backgroundColor: '#FFF',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'flex-start',  
    position: 'relative', 
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'left',  
    width: '100%',
  },
  detailsContainer: {
    width: '100%',
    marginBottom: 20,
  },
  detailsText: {
    fontSize: 14,
    marginVertical: 5,
    textAlign: 'left',
    width: '100%',
  },
  closeButton: {
    position: 'absolute', 
    top: 10, 
    right: 10,  
    backgroundColor: '#333',  
    padding: 5,
    borderRadius: 50,
  },
});