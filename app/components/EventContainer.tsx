import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

// Определяем типы для пропсов
interface CustomComponentProps {
  imagePath: string; // Путь до изображения
  dateText: string;  // Текст для даты
  description: string; // Текст для описания
}

const EventContainer: React.FC<CustomComponentProps> = ({ imagePath, dateText, description }) => {
  return (
    <View style={styles.container}>
        <Image
          source={{ uri: imagePath }} // Используем путь до изображения из пропсов
          style={styles.image}
        />
        <Text style={styles.dateText}>{dateText}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    top: 42,
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '40%',
    minHeight: 50,
    backgroundColor: '#444',
    padding: 5,
    paddingBottom: 10,

    borderRadius: 20,
  },
  image: {
    width: '96%',
    height: 103,

    borderRadius: 20,
  },
  dateText: {
    paddingTop: 5,
    lineHeight: 16,
    fontSize: 14,
    color: '#F5C89B',
    fontFamily: 'Comfortaa',
  },
  description: {
    fontSize: 16,
    color: '#F1FFFA',
    fontFamily: 'Comfortaa'
  },
});

export default EventContainer;
