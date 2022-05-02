import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import MasterView from '../Shared/MasterView';
import { Avatar, Button } from 'react-native-paper';
import { AuthContext } from '../Contexts/AuthContext';
import { AlertsContext } from '../Contexts/AlertsContext';
import { useContext, useEffect, useState } from 'react/cjs/react.development';
import FlipComponent from 'react-native-flip-component';
import { Camera } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import * as FileSystem from 'expo-file-system';

const Account = ({ navigation }) => {
  const { user } = useContext(AuthContext);
  const { alertMsg } = useContext(AlertsContext);

  const [avatarFound, setAvatarFound] = useState(false);
  const [avatarFlipped, setAvatarFlipped] = useState(false);

  const userAvatarUrl = 'https://www.aalzubidy.com/img/ahmed-wa.jpg';

  const checkImageURL = (imageUrl) => {
    fetch(imageUrl)
      .then((res) => {
        if (res.status == 200) {
          setAvatarFound(true);
        } else {
          setAvatarFound(false);
        }
      })
      .catch((err) => {
        setAvatarFound(false);
      });
  };

  const saveFile = async (fileUri) => {
    const { granted } = await Camera.requestCameraPermissionsAsync();
    if (granted) {
      await MediaLibrary.requestPermissionsAsync();
      const asset = await MediaLibrary.createAssetAsync(fileUri)
      await MediaLibrary.createAlbumAsync("Austera-Download", asset, false);
      alertMsg('success', 'Photo downloaded successfully!', null, 500);
    }
  }

  const downloadFile = (uri) => {
    const fileName = uri.match(/(?!.*\/).+/)[0];
    let fileUri = FileSystem.documentDirectory + fileName;
    FileSystem.downloadAsync(uri, fileUri)
      .then(({ uri }) => {
        saveFile(uri);
      })
      .catch(error => {
        console.error(error);
      })
  }

  useEffect(() => {
    checkImageURL(userAvatarUrl);
  }, [userAvatarUrl]);

  return (
    <MasterView>
      <View style={styles.profileDetailsSection}>

        <FlipComponent
          isFlipped={avatarFlipped}
          frontView={
            <View>
              <TouchableOpacity onPress={() => setAvatarFlipped(!avatarFlipped)}>
                {avatarFound ? <Avatar.Image size={140} source={{ uri: `${userAvatarUrl}` }} /> : <Avatar.Icon size={140} icon='account' />}
              </TouchableOpacity>
            </View>
          }
          backView={
            <View>
              <Button icon='upload'>Upload</Button>
              <Button icon='download' onPress={() => { downloadFile(userAvatarUrl) }}>Download</Button>
              <Button icon='keyboard-backspace' onPress={() => setAvatarFlipped(!avatarFlipped)}>Return</Button>
            </View>
          }
        />

        <Text>{user && user.username ? user.username : ''}</Text>
        <Text>{user && user.fullname ? user.fullname : ''}</Text>

      </View>
    </MasterView>
  )
}

export default Account;

const styles = StyleSheet.create({
  profileDetailsSection: {
    backgroundColor: 'white',
    paddingTop: 10,
    alignItems: 'center',
  },
});
