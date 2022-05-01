import { createStackNavigator } from '@react-navigation/stack';
import ListContacts from '../../Screens/ListContacts';

const ContactsStackNav = createStackNavigator();

const ContactsStack = () => {
  return (
    <ContactsStackNav.Navigator initialRouteName='ListContacts' >
      <ContactsStackNav.Screen
        name="ListContacts"
        component={ListContacts}
        options={{
          headerShown: false,
          title: 'Contacts'
        }}
      />
    </ContactsStackNav.Navigator>
  );
}

export default ContactsStack;
