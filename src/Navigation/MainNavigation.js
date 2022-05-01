import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useContext } from 'react/cjs/react.development';
import { AuthContext } from '../Contexts/AuthContext';

import HomeStack from './MainNavigationStacks/HomeStack';
import SearchStack from './MainNavigationStacks/SearchStack';
import ContactsStack from './MainNavigationStacks/ContactsStack';
import ProfileStack from './MainNavigationStacks/ProfileStack';

const Tab = createBottomTabNavigator();

const MainNavigation = () => {
  const { user } = useContext(AuthContext);

  return (
    <Tab.Navigator initialRouteName="HomeStack"
      backBehavior='history'
      screenOptions={{
        tabBarShowLabel: false,
        tabBarActiveTintColor: '#0194F6',
        tabBarInactiveTintColor: 'black',
        tabBarStyle: {
          height: 60,
          marginBottom: -20,
        }
      }}>
      <Tab.Screen
        name="HomeStack"
        component={HomeStack}
        options={{
          title: 'Feed',
          headerShown: true,
          tabBarIcon: ({ color }) => (<MaterialCommunityIcons name="newspaper" color={color} size={36} />),
        }}
      />
      <Tab.Screen
        name="SearchStack"
        component={SearchStack}
        options={{
          title: 'Find People',
          headerShown: true,
          tabBarIcon: ({ color }) => (<MaterialCommunityIcons name="magnify" color={color} size={36} />),
        }}
      />
      <Tab.Screen
        name="ContactsStack"
        component={ContactsStack}
        options={{
          title: 'Connections',
          headerShown: true,
          tabBarIcon: ({ color }) => (<MaterialCommunityIcons name="account-group" color={color} size={36} />),
        }}
      />
      <Tab.Screen
        name="ProfileStack"
        component={ProfileStack}
        options={{
          title: user && user.username || 'Profile',
          headerShown: true,
          tabBarIcon: ({ color }) => (<MaterialCommunityIcons name="emoticon-outline" color={color} size={36} />),
        }}
      />
    </Tab.Navigator>
  )
};

export default MainNavigation;
