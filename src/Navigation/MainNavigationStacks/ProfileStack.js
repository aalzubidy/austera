import { createStackNavigator } from '@react-navigation/stack';
import Account from '../../Screens/Account';

const ProfileStackNav = createStackNavigator();

const ProfileStack = () => {
  return (
    <ProfileStackNav.Navigator initialRouteName='Account' >
      <ProfileStackNav.Screen
        name="Account"
        component={Account}
        options={{
          headerShown: false,
          title: 'Profile'
        }}
      />
    </ProfileStackNav.Navigator>
  );
}

export default ProfileStack;
