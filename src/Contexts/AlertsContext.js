import { createContext, useState } from "react/cjs/react.development";
import { Snackbar } from 'react-native-paper';
import { Text } from 'react-native';
import { bootstrapColors } from "../Configs/colorConfigs";

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
          style={{ backgroundColor: bootstrapColors[alertItem.type] }}
        >
          <Text>{alertItem.title}</Text>
        </Snackbar> : <Text></Text>
      }
    </AlertsContext.Provider>
  )
}
