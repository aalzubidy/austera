import { View, Text, Animated, TouchableOpacity } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { StyleSheet } from 'react-native';
import { useContext, useState } from 'react/cjs/react.development';
import { AlertsContext } from '../../contexts/AlertsContext';
import publicIP from 'react-native-public-ip';

const Register = ({ navigation }) => {
  // Settings
  const { alertMsg } = useContext(AlertsContext);
  const [registerLoading, setRegisterLoading] = useState(false);

  // Handle form input
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');

  return (
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
        secureTextEntry
        right={<TextInput.Icon name="eye" />}
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

      <Button style={styles.registerButton} mode="contained" onPress={async () => console.log(await publicIP())} loading={registerLoading} >Join Now</Button>
    </View>
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
