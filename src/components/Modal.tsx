import React from 'react';
import {
  Modal as RNModal,
  ModalProps,
  KeyboardAvoidingView,
  View,
  StyleSheet,
} from 'react-native';

type PROPS = ModalProps & {
  isOpen: boolean;
  withInput?: boolean;
};

export const CustomModal = ({isOpen, withInput, children, ...rest}: PROPS) => {
  const styles = StyleSheet.create({
    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
    },
    modalContent: {
      width: 'auto', // Adjust the width of the modal as desired
      backgroundColor: 'white',
      padding: 20,
      height: 'auto',
      borderRadius: 10,
      alignItems: 'center', // Center content horizontally
    },
  });

  const content = (
    <View style={styles.modalContainer}>
      <View style={styles.modalContent}>{children}</View>
    </View>
  );

  return (
    <RNModal
      visible={isOpen}
      transparent
      animationType="slide"
      statusBarTranslucent
      {...rest}>
      {content}
    </RNModal>
  );
};
