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
  animation?: "fade" | "slide";
}

const Modal = ({ animation = "slide", isOpen, withInput, children, ...rest }: PROPS) => {
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
    animationType={animation}
    statusBarTranslucent
    {...rest}>
    {content}
  </RNModal>
)
}

export default Modal;