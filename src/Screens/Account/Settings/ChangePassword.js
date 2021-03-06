import { View, Text, Image, Platform, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import MasterView from '../../../Shared/MasterView';
import { Avatar, Button, TextInput, Divider } from 'react-native-paper';
import { AuthContext } from '../../../Contexts/AuthContext';
import { AlertsContext } from '../../../Contexts/AlertsContext';
import { useContext, useEffect, useState } from 'react/cjs/react.development';
import FlipComponent from 'react-native-flip-component';
import { Camera } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import * as FileSystem from 'expo-file-system';
import * as ImagePicker from 'expo-image-picker';
import API from '../../../API';
import mime from "mime";
import { AUSTERA_BASE_URL } from '../../../Configs/generalConfigs';
import { bootstrapColors } from '../../../Configs/colorConfigs';

const ChangePassword = () => {
  // Settings
  const { token } = useContext(AuthContext);
  const { alertMsg } = useContext(AlertsContext);

  // Handle form input
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [mobile, setMobile] = useState('');

  // Handle password input
  const [hideOldPassword, setHideOldPassword] = useState(true);
  const [oldPassword, setOldPassword] = useState('');

  const [hideNewPassword, setHideNewPassword] = useState(true);
  const [newPassword, setNewPassword] = useState('');

  const [hideCurrentPassword, setHideCurrentPassword] = useState(true);
  const [currentPassword, setCurrentPassword] = useState('');

  // Get user's information from backend
  const getUserInformation = async () => {
    try {
      // const { data } = await API.profiles.getProfileInformation(token);
      const data = {};

      if (data) {
        setUsername(data.username || '');
        setEmail(data.email || '');
        setFirstName(data.firstname || '');
        setLastName(data.lastname || '');
        setMobile(data.mobile || '');
      }
    } catch (error) {
      alertMsg('error', 'Could not get user information', null, 2000);
    }
  }

  useEffect(() => {
    getUserInformation();
  }, [token]);

  return (
    <View style={styles.updateAccountInfo}>
      <Text style={styles.title}>Change My Password</Text>

      <TextInput style={styles.textFields}
        placeholder='Current Password'
        value={oldPassword}
        onChangeText={text => setOldPassword(text)}
        secureTextEntry={hideOldPassword}
        right={<TextInput.Icon name="eye" onPress={() => { setHideOldPassword(!hideOldPassword) }} />}
        activeUnderlineColor={bootstrapColors.secondary}
        dense
      />

      <TextInput style={styles.textFields}
        placeholder='New Password'
        value={newPassword}
        onChangeText={text => setNewPassword(text)}
        secureTextEntry={hideNewPassword}
        right={<TextInput.Icon name="eye" onPress={() => { setHideNewPassword(!hideNewPassword) }} />}
        activeUnderlineColor={bootstrapColors.secondary}
        dense
      />

      <Button compact color={bootstrapColors.primary} icon='content-save' onPress={() => { console.log('Clicked') }}>Change Password</Button>
    </View>
  )
};

export default ChangePassword;

const styles = StyleSheet.create({
  updateAccountInfo: {
    // width: '100%',
    margin: 6,
    padding: 6,
  },
  title: {
    alignSelf: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  textFields: {
    marginTop: 6,
    backgroundColor: bootstrapColors.light
  },
  divider: {
    marginTop: 40,
    marginBottom: 20,
    marginLeft: 16,
    marginRight: 16,
  },
  profileInfoSection: {
    paddingTop: 20,
    alignItems: 'center',
  },
  profileInfoText: {
    fontWeight: 'bold',
    fontSize: 20
  }
});
