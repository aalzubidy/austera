import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Avatar, Button } from 'react-native-paper';
import { AuthContext } from '../../Contexts/AuthContext';
import { AlertsContext } from '../../Contexts/AlertsContext';
import { useContext, useEffect, useState } from 'react/cjs/react.development';
import FlipComponent from 'react-native-flip-component';
import { Camera } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import * as FileSystem from 'expo-file-system';
import * as ImagePicker from 'expo-image-picker';
import API from '../../API';
import mime from "mime";
import { AUSTERA_BASE_URL } from '../../Configs/generalConfigs';
import { bootstrapColors } from '../../Configs/colorConfigs';

const ProfilePicture = ({ navigation }) => {
  // Settings
  const { user, token } = useContext(AuthContext);
  const { alertMsg } = useContext(AlertsContext);

  // Handle user profile picture
  const [userAvatarUrl, setUserAvatarUrl] = useState(false);

  // Handle if profile picture flipped to show buttons or to show profile picture
  const [avatarFlipped, setAvatarFlipped] = useState(false);

  // Handle waiting for camera gallery permissions and then save the file on the device
  const saveFile = async (fileUri) => {
    const { granted } = await Camera.requestCameraPermissionsAsync();
    if (granted) {
      await MediaLibrary.requestPermissionsAsync();
      const asset = await MediaLibrary.createAssetAsync(fileUri)
      await MediaLibrary.createAlbumAsync("Austera-Download", asset, false);
      alertMsg('success', 'Photo downloaded successfully!', null, 500);
    }
  }

  // Download the file from the backend server to the device
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

  // Upload a new user profile picture from the device to the backend
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

      const { data } = await API.account.updateAvatar(formData, token, { headers: { 'Content-Type': 'multipart/form-data' } });

      if (data) {
        getUserAvatar();
        alertMsg('success', 'Profile photo updated successfully!', null, 2000);
      }
    } catch (error) {
      alertMsg('error', 'Could not update photo', error, 2000);
    }
  }

  // Check if an image url is reachable and set the userAvatarUrl
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
        console.log('could not find image, nothing to worry about reverting to default icon');
        setUserAvatarUrl(null);
      });
  };

  // Get user's profile image url avatar_url from backend
  const getUserAvatar = async () => {
    try {
      const { data } = await API.account.getAvatar(token);

      if (data?.avatarUrl) {
        checkImageURL(`${AUSTERA_BASE_URL}${data.avatarUrl}`)
      }
    } catch (error) {
      console.log('no profile image');
    }
  }

  useEffect(() => {
    getUserAvatar();
  }, [user]);

  return (
    <View>
      <FlipComponent
        isFlipped={avatarFlipped}

        containerStyles={styles.profilePictureSection}

        frontView={
          <View>
            <TouchableOpacity onPress={() => setAvatarFlipped(!avatarFlipped)}>
              {userAvatarUrl ? <Avatar.Image size={130} source={{ uri: `${userAvatarUrl}` }} /> : <Avatar.Icon size={130} icon='account' />}
            </TouchableOpacity>
          </View>
        }

        backView={
          <View>
            <Button compact color={bootstrapColors.primary} icon='download' onPress={() => { downloadFile(userAvatarUrl) }}>Download Photo</Button>
            <Button compact color={bootstrapColors.primary} icon='upload' onPress={() => { uploadAvatar() }}>New Profile Photo</Button>
            <Button compact color={bootstrapColors.primary} icon='cog' onPress={() => { navigation.navigate('AccountSettings') }}>Settings</Button>
            <Button compact color={bootstrapColors.primary} icon='keyboard-backspace' onPress={() => setAvatarFlipped(!avatarFlipped)}>Return</Button>
          </View>
        }
      />
    </View>
  );
};

export default ProfilePicture;

const styles = StyleSheet.create({
  profilePictureSection: {
    alignItems: 'center'
  }
});
