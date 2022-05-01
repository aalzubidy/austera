import { createStackNavigator } from '@react-navigation/stack';
import Login from '../Screens/Authentication/Login';
import Register from '../Screens/Authentication/Register';

const AuthStackNav = createStackNavigator();

const AuthNavigation = () => {
  return (
    <AuthStackNav.Navigator>
      <AuthStackNav.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />
      <AuthStackNav.Screen
        name="Register"
        component={Register}
        options={{ title: 'New Account' }}
      />
    </AuthStackNav.Navigator>
  );
}

export default AuthNavigation;
