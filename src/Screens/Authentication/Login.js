import { View, Text, TouchableOpacity, Linking } from 'react-native';
import { Button, TextInput, Divider } from 'react-native-paper';
import { StyleSheet } from 'react-native';
import { useContext, useState } from 'react/cjs/react.development';
import { AlertsContext } from '../../Contexts/AlertsContext';
import { AuthActionsContext } from '../../Contexts/AuthContext';
import MasterView from '../../Shared/MasterView';

const Login = ({ navigation }) => {
  // Settings
  const { alertMsg } = useContext(AlertsContext);
  const [registerLoading, setRegisterLoading] = useState(false);
  const authActions = useContext(AuthActionsContext);
  const [hidePassword, setHidePassword] = useState(true);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);

  // Handle registeration
  const handleLogin = async () => {
    try {
      setLoginLoading(true);

      let results = '';
      results = await authActions.login(email, password);
    } catch (error) {
      alertMsg('error', `Could not login :( ${error.message}`);
      setLoginLoading(false);
    }
  };

  return (
    <MasterView>
      <View style={styles.container}>
        <Text style={styles.appName}>Austera</Text>

        <TextInput style={styles.textFields}
          placeholder='Email'
          value={email}
          onChangeText={text => setEmail(text)}
          mode='outlined'
          activeOutlineColor='#657386'
        />

        <TextInput style={styles.textFields}
          placeholder='Password'
          value={password}
          onChangeText={text => setPassword(text)}
          secureTextEntry={hidePassword}
          right={<TextInput.Icon name="eye" onPress={() => { setHidePassword(!hidePassword) }} />}
          mode='outlined'
          activeOutlineColor='#657386'
        />

        <TouchableOpacity
          onPress={() => console.log('pressed')}>
          <Text style={styles.forgotPassword}>Forgot Password ?</Text>
        </TouchableOpacity>

        <Button style={styles.loginButton} icon="login" mode="contained" onPress={handleLogin} loading={loginLoading} >Login</Button>

        <Divider style={styles.divider} />

        <TouchableOpacity
          onPress={() => navigation.navigate('Register')}>
          <Text style={styles.joinText}>Don't have an account yet? <Text style={styles.textLink}>Join Now!</Text></Text>
        </TouchableOpacity>

        <View style={{ position: 'absolute', left: 0, right: 0, bottom: 0 }}>
          <Text style={styles.joinText}>An application by <Text style={styles.textLink} onPress={() => Linking.openURL('https://aalzubidy.com')}>aalzubidy</Text></Text>
        </View>
      </View>
    </MasterView>
  )
};

export default Login;

const styles = StyleSheet.create({
  container: {
    // borderWidth: 1,
    // borderColor: 'red',
    // borderStyle: 'solid',

    display: 'flex',
    backgroundColor: '#FEFEFF',
    justifyContent: 'center',
    alignContent: 'center',
    height: '100%',
  },
  appName: {
    alignSelf: 'center',
    marginBottom: '20%',
    fontSize: 40,
    fontWeight: 'bold',
    letterSpacing: 4,
  },
  textFields: {
    marginLeft: 16,
    marginRight: 16,
    marginBottom: 20,
    backgroundColor: '#FAFBFB',
  },
  loginButton: {
    marginLeft: 16,
    marginRight: 16,
    marginTop: 20,
    backgroundColor: '#0194F6'
  },
  divider: {
    marginTop: 40,
    marginBottom: 10,
    marginLeft: 16,
    marginRight: 16,
  },
  joinText: {
    marginTop: 10,
    alignSelf: 'center',
    fontSize: 16,
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    color: '#0194F6',
    marginRight: 16,
  },
  textLink: {
    color: '#0194F6',
  }
});
