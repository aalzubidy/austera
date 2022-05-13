import { View, Text, Image, Platform, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import MasterView from '../../Shared/MasterView';
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
import ProfilePicture from './ProfilePicture';

const Account = ({ navigation }) => {
  // Settings
  const { user, token } = useContext(AuthContext);
  const { alertMsg } = useContext(AlertsContext);

  return (
    <MasterView>
      <View style={styles.accountSection}>
        <ProfilePicture navigation={navigation} />

        <View style={styles.profileInfoSection}>
          <Text style={styles.profileInfoText}>{user && user.username ? user.username : ''}</Text>
          <Text style={styles.profileInfoText}>{user && user.fullname ? user.fullname : ''}</Text>
        </View>
      </View>
    </MasterView>
  )
}

export default Account;

const styles = StyleSheet.create({
  accountSection: {
    backgroundColor: 'white',
  },
  profileInfoSection: {
    paddingTop: 20,
    alignItems: 'center',
  },
  profileInfoText: {
    fontWeight: 'bold',
    fontSize: 18,
    marginTop: 3,
  }
});
