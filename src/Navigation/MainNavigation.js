import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { bootstrapColors } from '../Configs/colorConfigs';

import HomeStack from './MainNavigationStacks/HomeStack';
import SearchStack from './MainNavigationStacks/SearchStack';
import ContactsStack from './MainNavigationStacks/ContactsStack';
import ProfileStack from './MainNavigationStacks/ProfileStack';

const Tab = createBottomTabNavigator();

const MainNavigation = () => {
  return (
    <Tab.Navigator initialRouteName="ProfileStack"
      backBehavior='history'
      screenOptions={{
        tabBarShowLabel: false,
        tabBarActiveTintColor: bootstrapColors.primary,
        tabBarInactiveTintColor: bootstrapColors.black,
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
          headerShown: false,
          tabBarIcon: ({ color }) => (<MaterialCommunityIcons name="newspaper" color={color} size={36} />),
        }}
      />
      <Tab.Screen
        name="SearchStack"
        component={SearchStack}
        options={{
          title: 'Find People',
          headerShown: false,
          tabBarIcon: ({ color }) => (<MaterialCommunityIcons name="magnify" color={color} size={36} />),
        }}
      />
      <Tab.Screen
        name="ContactsStack"
        component={ContactsStack}
        options={{
          title: 'Connections',
          headerShown: false,
          tabBarIcon: ({ color }) => (<MaterialCommunityIcons name="account-group" color={color} size={36} />),
        }}
      />
      <Tab.Screen
        name="ProfileStack"
        component={ProfileStack}
        options={{
          title: 'Profile',
          headerShown: false,
          tabBarIcon: ({ color }) => (<MaterialCommunityIcons name="emoticon-outline" color={color} size={36} />),
        }}
      />
    </Tab.Navigator>
  )
};

export default MainNavigation;
