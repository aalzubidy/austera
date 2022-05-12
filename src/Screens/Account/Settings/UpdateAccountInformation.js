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

const UpdateAccountInformation = () => {
  // Settings
  const { token } = useContext(AuthContext);
  const { alertMsg } = useContext(AlertsContext);
  const [loading, setLoading] = useState(false);

  // Handle form input
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [mobile, setMobile] = useState('');

  // Get user's information from backend
  const getUserInformation = async () => {
    try {
      setLoading(true);
      const { data } = await API.profiles.getProfileInformation(token);

      if (data) {
        setUsername(data.username || '');
        setEmail(data.email || '');
        setFirstName(data.firstname || '');
        setLastName(data.lastname || '');
        setMobile(data.mobile || '');
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      alertMsg('error', 'Could not get user information', null, 2000);
    }
  }

  // Update user information
  const updateUserInformation = async () => {
    try {
      alertMsg('info', 'Please wait, processing request', null, 1000);
      setLoading(true);
      const { data } = await API.profiles.updateProfileInformation({ username, email, firstName, lastName, mobile }, token);

      if (data) {
        alertMsg('success', 'Information updated successfully', null, 2000);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      alertMsg('error', 'Could not get user information', error, 2000);
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

      <Button compact color={bootstrapColors.primary} icon='pencil' onPress={updateUserInformation} disabled={loading}>Update Information</Button>
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
