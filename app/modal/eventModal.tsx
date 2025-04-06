import React, { useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';

const { height } = Dimensions.get('window');

function ModalScreenInfo() {
  const translateY = useSharedValue(height); // Начальное положение за пределами экрана
  const isOpen = useRef(false);

  const openModal = () => {
    if (!isOpen.current) {
      translateY.value = withSpring(0); // Плавное открытие
      isOpen.current = true;
    }
  };

  const closeModal = () => {
    translateY.value = withSpring(height); // Плавное закрытие
    isOpen.current = false;
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  return (
    <View style={styles.container}>
      {/* Кнопка для открытия модального окна */}
      <TouchableOpacity onPress={openModal} style={styles.openButton}>
        <Text style={styles.openButtonText}>Открыть модальное окно</Text>
      </TouchableOpacity>

      {/* Модальное окно */}
      <Animated.View style={[styles.modal, animatedStyle]}>
        {/* Drag Indicator с обработкой нажатия */}
        <TouchableOpacity
          style={styles.dragIndicator}
          onPress={closeModal} // Закрытие модального окна при нажатии
        />
        <Text style={styles.text}>Нажмите на индикатор, чтобы закрыть</Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  openButton: {
    padding: 15,
    backgroundColor: '#A4F59B',
    borderRadius: 10,
  },
  openButtonText: {
    fontSize: 18,
    color: '#333',
  },
  modal: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: Dimensions.get('window').height * 0.4,
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    alignItems: 'center',
  },
  dragIndicator: {
    width: 50,
    height: 5,
    backgroundColor: '#ccc',
    borderRadius: 5,
    marginBottom: 10,
  },
  text: {
    fontSize: 18,
    color: '#333',
  },
});

export default ModalScreenInfo;