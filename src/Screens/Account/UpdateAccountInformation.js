import { View, Text, Image, Platform, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import MasterView from '../../Shared/MasterView';
import { Avatar, Button, TextInput, Divider } from 'react-native-paper';
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
import ProfilePicture from './ProfilePicture';

const UpdateAccountInformation = () => {
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
      const { data } = await API.profiles.getProfileInformation(token);

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
      <Text style={styles.title}>Update My Information</Text>

      <TextInput style={styles.textFields}
        placeholder='Username'
        value={username}
        onChangeText={text => setUsername(text)}
        mode='outlined'
        activeOutlineColor='#657386'
      />

      <TextInput style={styles.textFields}
        placeholder='Email'
        value={email}
        onChangeText={text => setEmail(text)}
        mode='outlined'
        activeOutlineColor='#657386'
      />

      <TextInput style={styles.textFields}
        placeholder='First name'
        value={firstName}
        onChangeText={text => setFirstName(text)}
        mode='outlined'
        activeOutlineColor='#657386'
      />

      <TextInput style={styles.textFields}
        placeholder='Last name'
        value={lastName}
        onChangeText={text => setLastName(text)}
        mode='outlined'
        activeOutlineColor='#657386'
      />

      <TextInput style={styles.textFields}
        placeholder='Mobile'
        value={mobile}
        onChangeText={text => setMobile(text)}
        mode='outlined'
        activeOutlineColor='#657386'
      />

      <Button compact color={bootstrapColors.primary} icon='pencil' onPress={() => { console.log('Clicked') }}>Update Information</Button>

      <Divider style={styles.divider} />

      <Text style={styles.title}>Change My Password</Text>

      <TextInput style={styles.textFields}
        placeholder='Current Password'
        value={oldPassword}
        onChangeText={text => setOldPassword(text)}
        secureTextEntry={hideOldPassword}
        right={<TextInput.Icon name="eye" onPress={() => { setHideOldPassword(!hideOldPassword) }} />}
        mode='outlined'
        activeOutlineColor='#657386'
      />

      <TextInput style={styles.textFields}
        placeholder='New Password'
        value={newPassword}
        onChangeText={text => setNewPassword(text)}
        secureTextEntry={hideNewPassword}
        right={<TextInput.Icon name="eye" onPress={() => { setHideNewPassword(!hideNewPassword) }} />}
        mode='outlined'
        activeOutlineColor='#657386'
      />

      <Button compact color={bootstrapColors.primary} icon='content-save' onPress={() => { console.log('Clicked') }}>Change Password</Button>

      <Divider style={styles.divider} />
      <Text style={styles.title}>Delete Account</Text>

      <TextInput style={styles.textFields}
        placeholder='Current Password'
        value={currentPassword}
        onChangeText={text => setCurrentPassword(text)}
        secureTextEntry={hideCurrentPassword}
        right={<TextInput.Icon name="eye" onPress={() => { setHideCurrentPassword(!hideCurrentPassword) }} />}
        mode='outlined'
        activeOutlineColor='#657386'
      />

      <Button compact color={bootstrapColors.danger} style={{ marginTop: 20, marginBottom: 6 }} icon='delete' onPress={() => { console.log('Clicked') }} mode='contained' >DANGER: Delete Account</Button>
    </View>
  )
};

export default UpdateAccountInformation;

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
