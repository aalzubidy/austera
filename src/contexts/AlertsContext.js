import { createContext, useState } from "react/cjs/react.development";
import { Snackbar } from 'react-native-paper';
import { Text, StyleSheet } from 'react-native';

export const AlertsContext = createContext();

export function AlertsProvider(props) {
  const [alertItem, setAlertItem] = useState('');
  const [open, setOpen] = useState(false);

  const alertMsg = (type, title = '', errorObject = {}, ms = 6000) => {
    console.log({
      type,
      title,
      errorObject,
    });
    setAlertItem({
      ms,
      type,
      title,
    });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setAlertItem('');
  };

  return (
    <AlertsContext.Provider value={{ alertMsg }}>
      {props.children}
      {
        alertItem && (alertItem.title || alertItem.description) ? <Snackbar
          visible={open}
          duration={alertItem.ms}
          onDismiss={handleClose}
          action={{
            label: 'X',
            onPress: handleClose,
          }}
          style={styles[alertItem.type]}
        >
          <Text>{alertItem.title}</Text>
        </Snackbar> : <Text></Text>
      }
    </AlertsContext.Provider>
  )
}

const styles = StyleSheet.create({
  error: {
    backgroundColor: '#D32F2F',
  },
  warning: {
    backgroundColor: '#ED6C02',
  },
  info: {
    backgroundColor: '#0288D1',
  },
  success: {
    backgroundColor: '#2E7D32',
  },
});
