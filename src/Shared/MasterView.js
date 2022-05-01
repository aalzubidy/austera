import { KeyboardAvoidingView, Platform, Keyboard, TouchableWithoutFeedback } from 'react-native';

const MasterView = (props) => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        {props.children}
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  )
};

export default MasterView;
