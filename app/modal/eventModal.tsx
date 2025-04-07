import {
  Modal as RNModal,
  ModalProps,
  KeyboardAvoidingView,
  View,
  Text,
  Platform,
} from 'react-native';

type PROPS = ModalProps & {
  isOpen: boolean;
  withInput?: boolean;
}

const Modal = ({ isOpen, withInput, children, ...rest }: PROPS) => {
  const content = withInput ? (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
    { children }
    </KeyboardAvoidingView >
  ) : (
    <View>
      {children}
    </View>
  )
return (
  <RNModal
    visible={isOpen}
    transparent
    animationType='slide'
    statusBarTranslucent
    {...rest}>
    {content}
  </RNModal>
)
}

export default Modal;