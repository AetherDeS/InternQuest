import React, { useState } from 'react';
import { Pressable, View, Text, Image, StyleSheet, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import ThemedText from './ThemedText';
import Modal from '../modal/CustomModal';
// Палитра
import { ayuDark } from '@/app/colors/colors';
const { primary1, primary2, accent1, accent_gr1, accent_gr2 } = ayuDark;

interface NewsContainerProps {
  text: string;
  img: string;
  description?: string; // Добавляем описание новости
  datetime?: string; // Добавляем дату и время новости
}

function NewsContainer({ text, img, description, datetime }: NewsContainerProps) {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <Pressable style={styles.container} onPress={() => setModalOpen(true)}>
      <Image
        source={{ uri: img }} // Используем путь до изображения из пропсов
        style={styles.banner}
      />
      <LinearGradient colors={['#ffffff00', '#000000']} style={styles.vinette}>
        <ThemedText type="newsTitle" style={styles.bannerTitle}>{text}</ThemedText>
      </LinearGradient>
      <Modal isOpen={modalOpen} animation='fade'>
        <View style={styles.modal}>
          <Image source={{ uri: img }} style={styles.modalBanner} />
          <Pressable onPress={() => setModalOpen(false)}>
            <View style={styles.dragIndicator} />
          </Pressable>
          <ThemedText type="modalTitleEventsNews">{text}</ThemedText>
          <ThemedText style={styles.modalDescription}>{description || 'Описание отсутствует'}</ThemedText>
          <ThemedText style={styles.modalDatetime}>{datetime || 'Дата не указана'}</ThemedText>
        </View>
      </Modal>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    width: "90%",
    height: 180,
    marginBottom: 20,
  },
  banner: {
    flex: 1,
    width: "auto",
    height: "auto",
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    borderBottomRightRadius: 40,
    borderBottomLeftRadius: 0,
  },
  bannerTitle: {
    position: "absolute",
    bottom: 0,
    left: 0,
    marginLeft: 12,
    marginBottom: 12,
  },
  vinette: {
    position: "absolute",
    width: '100%',
    height: "100%",
    opacity: .74,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    borderBottomRightRadius: 40,
    borderBottomLeftRadius: 0,
  },
  modal: {
    alignSelf: 'center',
    width: Dimensions.get('window').width + 2,
    height: Dimensions.get('window').height - 100,
    marginTop: 66,
    backgroundColor: primary2,
    borderWidth: 1,
    borderTopColor: '#fff',
    borderRightColor: '#fff',
    borderLeftColor: '#fff',
    borderBottomColor: primary2,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 0,
    alignItems: 'center',
  },
  modalBanner: {
    position: "absolute",
    width: "100%",
    height: 190,
    borderRadius: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0,
  },
  dragIndicator: {
    width: 50,
    height: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
    marginTop: 8,
    marginBottom: 4,
  },
  modalDescription: {
    marginTop: 10,
    fontSize: 16,
    color: primary1,
  },
  modalDatetime: {
    marginTop: 4,
    fontSize: 14,
    color: accent1,
  },
});

export default NewsContainer;