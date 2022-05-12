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
import UpdateAccountInformation from './UpdateAccountInformation';

const AccountSettings = ({ navigation }) => {
  return (
    <MasterView>
      <ScrollView style={styles.accountInformationSection}>
        <UpdateAccountInformation />
      </ScrollView>
    </MasterView>
  )
}

export default AccountSettings;

const styles = StyleSheet.create({
  accountInformationSection: {
    backgroundColor: 'white',
    width: '100%',
    height: '100%',

    // borderWidth: 1,
    // borderColor: 'red',
    // borderStyle: 'solid',
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