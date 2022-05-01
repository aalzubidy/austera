import { createStackNavigator } from '@react-navigation/stack';
import { Text } from 'react-native-paper';
import { useEffect, useState, useContext } from 'react/cjs/react.development';
import { AuthContext, AuthActionsContext } from '../Contexts/AuthContext';
import Login from '../Screens/Authentication/Login';
import Register from '../Screens/Authentication/Register';

const AuthStackNav = createStackNavigator();

function AuthStack() {
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

const NavigationHandler = () => {
  // Authorization
  const authActions = useContext(AuthActionsContext);
  const { token } = useContext(AuthContext);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    let isMounted = true;

    // Check if there is a refresh token in the cookies
    if (!token && isMounted) {
      authActions.renewToken().then((results) => {
        if (results) {
          setAuthenticated(true);
        }
      }).catch((e) => {
        console.log('No refresh token stored, all good, you don\'t need to do anything about it');
        setAuthenticated(false);
        return true;
      })
    } else if (isMounted && token) {
      setAuthenticated(true);
    }

    return () => isMounted = false;
  }, [token])

  return (
    authenticated ? <Text>Hi, it's authenticated!</Text> : <AuthStack />
  )
}

export default NavigationHandler;