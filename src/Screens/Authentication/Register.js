import { View, Text } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { StyleSheet } from 'react-native';
import { useContext, useState } from 'react/cjs/react.development';
import { AlertsContext } from '../../Contexts/AlertsContext';
import { AuthActionsContext } from '../../Contexts/AuthContext';
import MasterView from '../../Shared/MasterView';

const Register = ({ navigation }) => {
  // Settings
  const { alertMsg } = useContext(AlertsContext);
  const [registerLoading, setRegisterLoading] = useState(false);
  const authActions = useContext(AuthActionsContext);
  const [hidePassword, setHidePassword] = useState(true);

  // Handle form input
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');

  // Handle registeration
  const handleRegister = async () => {
    try {
      setRegisterLoading(true);

      let results = '';
      results = await authActions.registerUser(email, password, username);
      if (results) {
        setRegisterLoading(false);
        alertMsg('success', 'User registered successfully, check your email to confirm account!');
        setTimeout(() => {
          navigation.navigate('Login');
        }, 2000);
      }
    } catch (error) {
      alertMsg('error', `Could not register new user :( ${error.message}`);
      setRegisterLoading(false);
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

        <TextInput style={styles.textFields}
          placeholder='Username'
          value={username}
          onChangeText={text => setUsername(text)}
          mode='outlined'
          activeOutlineColor='#657386'
        />

        <Button style={styles.registerButton} mode="contained" onPress={handleRegister} loading={registerLoading} >Join Now</Button>
      </View>
    </MasterView>
  )
};

export default Register;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    backgroundColor: '#FEFEFF',
    justifyContent: 'center',
    alignContent: 'center',
    height: '100%',
  },
  appName: {
    alignSelf: 'center',
    marginBottom: '10%',
    marginTop: '-30%',
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
  registerButton: {
    marginLeft: 16,
    marginRight: 16,
    marginTop: 20,
    backgroundColor: '#0194F6'
  },
});
