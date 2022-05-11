import { View, Text, Image, Platform, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import MasterView from '../Shared/MasterView';
import { Avatar, Button } from 'react-native-paper';
import { AuthContext } from '../Contexts/AuthContext';
import { AlertsContext } from '../Contexts/AlertsContext';
import { useContext, useEffect, useState } from 'react/cjs/react.development';
import FlipComponent from 'react-native-flip-component';
import { Camera } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import * as FileSystem from 'expo-file-system';
import * as ImagePicker from 'expo-image-picker';
import API from '../API';
import mime from "mime";

const baseURL = 'http://192.168.0.155:3030';

const Account = ({ navigation }) => {
  const { user, token } = useContext(AuthContext);
  const { alertMsg } = useContext(AlertsContext);

  const [userAvatarUrl, setUserAvatarUrl] = useState(false);
  const [avatarFlipped, setAvatarFlipped] = useState(false);

  const checkImageURL = (imageUrl) => {
    if (!imageUrl) {
      setUserAvatarUrl(null);
      return;
    }

    fetch(imageUrl)
      .then((res) => {
        if (res.status == 200) {
          setUserAvatarUrl(imageUrl);
        } else {
          setUserAvatarUrl(null);
        }
      })
      .catch((err) => {
        setUserAvatarUrl(null);
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

  const uploadAvatar = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        // mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsMultipleSelection: false,
        allowsEditing: true,
        // aspect: [4, 3],
        quality: 0.5,
      });

      const uri = result.uri || null;

      if (!result.cancelled && !uri) {
        return true;
      }

      const formData = new FormData();
      formData.append('avatar', {
        uri,
        type: mime.getType(uri),
        name: uri.split("/").pop()
      });

      const { data } = await API.profiles.updateProfilePicture(formData, token, { headers: { 'Content-Type': 'multipart/form-data' } });

      if (data) {
        getUserAvatar();
        alertMsg('success', 'Profile photo updated successfully!', null, 2000);
      }
    } catch (error) {
      alertMsg('error', 'Could not update photo', error, 2000);
    }
  }

  const getUserAvatar = async () => {
    try {
      const { data } = await API.profiles.getProfilePicture(token);
      console.log(data);
      if (data) {
        checkImageURL(`${baseURL}${data}`)
      }
    } catch (error) {
      console.log('no profile image');
    }
  }

  useEffect(() => {
    getUserAvatar();
  }, [user]);

  return (
    <MasterView>
      <View style={styles.profileDetailsSection}>

        <FlipComponent
          isFlipped={avatarFlipped}
          frontView={
            <View>
              <TouchableOpacity onPress={() => setAvatarFlipped(!avatarFlipped)}>
                {userAvatarUrl ? <Avatar.Image size={140} source={{ uri: `${userAvatarUrl}` }} /> : <Avatar.Icon size={140} icon='account' />}
              </TouchableOpacity>
            </View>
          }
          backView={
            <View>
              <Button icon='upload' onPress={() => { uploadAvatar() }}>New Photo</Button>
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
