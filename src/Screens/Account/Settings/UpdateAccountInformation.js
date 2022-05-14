import { View, Text, Image, Platform, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import MasterView from '../../../Shared/MasterView';
import { Avatar, Button, TextInput, Divider } from 'react-native-paper';
import { AuthContext, AuthActionsContext } from '../../../Contexts/AuthContext';
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
  const { token, user } = useContext(AuthContext);
  const { getUser } = useContext(AuthActionsContext);
  const { alertMsg } = useContext(AlertsContext);
  const [loading, setLoading] = useState(false);

  // Handle form input
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [fullname, setFullname] = useState('');
  const [mobile, setMobile] = useState('');

  // Get user's information from backend
  const setAccountInformation = async () => {
    try {
      setLoading(true);
      if (user) {
        setUsername(user.username || '');
        setEmail(user.email || '');
        setFullname(user.fullname || '');
        setMobile(user.mobile || '');
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      alertMsg('error', 'Could not set user account information', null, 2000);
    }
  }

  // Update user information
  const updateUserInformation = async () => {
    try {
      alertMsg('info', 'Please wait, processing request', null, 1000);
      const { data } = await API.account.updateInformation({ username, email, fullname, mobile }, token);

      if (data) {
        await getUser();
        alertMsg('success', 'Information updated successfully', null, 2000);
      }
    } catch (error) {
      alertMsg('error', 'Could not get user information', error, 2000);
    }
  }

  useEffect(() => {
    setAccountInformation();
  }, [user]);

  return (
    <View style={styles.updateAccountInfo}>
      <Text style={styles.title}>Update My Information</Text>

      <TextInput style={styles.textFields}
        placeholder='Username'
        value={username}
        onChangeText={text => setUsername(text)}
        activeUnderlineColor={bootstrapColors.secondary}
        // mode='outlined'
        dense
      />

      <TextInput style={styles.textFields}
        placeholder='Email'
        value={email}
        onChangeText={text => setEmail(text)}
        activeUnderlineColor={bootstrapColors.secondary}
        // mode='outlined'
        dense
      />

      <TextInput style={styles.textFields}
        placeholder='Full name'
        value={fullname}
        onChangeText={text => setFullname(text)}
        activeUnderlineColor={bootstrapColors.secondary}
        // mode='outlined'
        dense
      />

      <TextInput style={styles.textFields}
        placeholder='Mobile'
        value={mobile}
        onChangeText={text => setMobile(text)}
        activeUnderlineColor={bootstrapColors.secondary}
        // mode='outlined'
        dense
      />

      <Button compact color={bootstrapColors.primary} icon='content-save' onPress={updateUserInformation} disabled={loading}>Update Information</Button>
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
  textFields: {
    marginTop: 6,
    backgroundColor: bootstrapColors.light
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
