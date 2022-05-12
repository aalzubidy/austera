import { createStackNavigator } from '@react-navigation/stack';
import { Avatar } from 'react-native-paper';
import { useContext } from 'react/cjs/react.development';
import { StyleSheet } from 'react-native';
import { AuthContext } from '../../Contexts/AuthContext';
import Account from '../../Screens/Account/Account';
import AccountSettings from '../../Screens/AccountSettings';
import { TouchableOpacity } from 'react-native';

const ProfileStackNav = createStackNavigator();

const ProfileStack = ({ navigation }) => {
  const { user } = useContext(AuthContext);

  return (
    <ProfileStackNav.Navigator initialRouteName='Account' >
      <ProfileStackNav.Screen
        name="Account"
        component={Account}
        options={{
          headerShown: true,
          title: 'My Profile',
          // title: user && user.username || 'Profile',
          // headerRight: () => (
          //   <TouchableOpacity onPress={() => navigation.navigate('AccountSettings')}>
          //     <Avatar.Icon icon="cog" size={50} style={styles.searchButton} color='#0194F6' />
          //   </TouchableOpacity>
          // )
        }}
      />
      <ProfileStackNav.Screen
        name="AccountSettings"
        component={AccountSettings}
        options={{
          headerShown: true,
          title: 'Account Settings',
        }}
      />
    </ProfileStackNav.Navigator>
  );
}

export default ProfileStack;

const styles = StyleSheet.create({
  searchButton: {
    backgroundColor: 'white',
    marginRight: 10,
  }
});