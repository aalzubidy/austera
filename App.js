import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { Provider as PaperProvider } from 'react-native-paper';
import { AlertsProvider } from './src/Contexts/AlertsContext';
import { AuthProvider } from './src/Contexts/AuthContext';
import NavigationHandler from './src/Navigation/NavigationHandler';

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <AlertsProvider>
          <AuthProvider>
            <NavigationHandler />
          </AuthProvider>
        </AlertsProvider>
      </NavigationContainer>
    </PaperProvider>
  );
}

