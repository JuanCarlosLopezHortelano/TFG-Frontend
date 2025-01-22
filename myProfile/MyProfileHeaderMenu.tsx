import { 
    StyleSheet, 
    Text, 
    View, 
    Image, 
    ScrollView, 
    Pressable,
    Dimensions,
    Modal,
  } from 'react-native';
import React, {useState, useContext} from 'react';
import { AuthContext } from '../app/_layout'; // Ajusta la ruta si tu context está en otro archivo


 export default function MyProfileHeaderMenu() {
    const [menuVisible, setMenuVisible] = useState(false);
    const { signOut } = useContext(AuthContext);
  
    function handleSignOut() {
      setMenuVisible(false);
      signOut();
    }
  
    const styles = StyleSheet.create({
      overlayContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
      },
      menuItem: {
        backgroundColor: 'white',
        padding: 10,
        margin: 5,
        borderRadius: 5,
      },
    });

    return (
      <>
        <Pressable style={{ marginRight: 10 }} onPress={() => setMenuVisible(!menuVisible)}>
          <Text style={{ fontSize: 20 }}>⋮</Text>
        </Pressable>
  
        {menuVisible && (
          <View style={styles.overlayContainer}>
            {/* Tu menú con opciones */}
            <Pressable style={styles.menuItem} onPress={handleSignOut}>
              <Text style={{ color: 'red' }}>Cerrar Sesión</Text>
            </Pressable>
            {/* etc. */}
          </View>
        )}
      </>
    );
  }
  