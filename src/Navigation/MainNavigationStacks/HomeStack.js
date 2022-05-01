import { createStackNavigator } from '@react-navigation/stack';
import Feed from '../../Screens/Feed';
import { TouchableOpacity } from 'react-native';
import { Avatar } from 'react-native-paper';
import { StyleSheet } from 'react-native';

const HomeStackNav = createStackNavigator();

const HomeStack = ({ navigation }) => {
  return (
    <HomeStackNav.Navigator initialRouteName='Feed' >
      <HomeStackNav.Screen
        name="Feed"
        component={Feed}
        options={{
          headerShown: true,
          title: 'Feed',
          headerRight: () => (
            <TouchableOpacity onPress={() => navigation.navigate('AccountSettings')}>
              <Avatar.Icon icon="camera" size={50} style={styles.cameraButton} color='#0194F6' />
            </TouchableOpacity>
          )
        }}
      />
    </HomeStackNav.Navigator>
  );
}

export default HomeStack;

const styles = StyleSheet.create({
  cameraButton: {
    backgroundColor: 'white',
    marginRight: 10,
  }
});
