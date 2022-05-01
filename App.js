import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { Provider as PaperProvider } from 'react-native-paper';
import { LogBox } from 'react-native';
import { useEffect } from 'react/cjs/react.development';
import { AlertsProvider } from './src/Contexts/AlertsContext';
import { AuthProvider } from './src/Contexts/AuthContext';
import NavigationHandler from './src/Navigation/NavigationHandler';

export default function App() {
  useEffect(() => {
    LogBox.ignoreLogs(['Setting a timer']);
  }, []);

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

