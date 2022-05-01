import { createStackNavigator } from '@react-navigation/stack';
import Feed from '../../Screens/Feed';

const HomeStackNav = createStackNavigator();

const HomeStack = () => {
  return (
    <HomeStackNav.Navigator initialRouteName='Feed' >
      <HomeStackNav.Screen
        name="Feed"
        component={Feed}
        options={{
          headerShown: false,
          title: 'Feed'
        }}
      />
    </HomeStackNav.Navigator>
  );
}

export default HomeStack;
