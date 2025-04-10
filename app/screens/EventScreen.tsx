import React from 'react';
import { StyleSheet, StatusBar, Text, View, Image, ScrollView, ActivityIndicator, Pressable, Dimensions } from 'react-native';
import { useState, useEffect, useCallback } from 'react';
import MasonryList from '@react-native-seoul/masonry-list';
import HeaderLogo from '../components/HeaderLogo';
import axios from 'axios';
import { useFocusEffect } from '@react-navigation/native'; // Импортируем useFocusEffect
import ThemedText from '../components/ThemedText';
import Modal from '../modal/CustomModal';
// Палитра
import { ayuDark } from '@/app/colors/colors';
const { primary1, primary2, accent1, accent_gr1, accent_gr2 } = ayuDark;
const { height } = Dimensions.get('window');

type Item = {
  id: string;
  image: string;
  date: string;
  title: string;
};

const App = () => {
  const [data, setData] = useState<Item[]>([]); // Состояние для хранения данных
  const [loading, setLoading] = useState(true); // Состояние загрузки
  const [error, setError] = useState<string | null>(null); // Состояние ошибки
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null); // ID выбранного элемента

  // Функция для загрузки данных
  const fetchData = async () => {
    try {
      const response = await axios.get<Item[]>('http://77.239.115.153:3000/api/events');
      console.log('Данные с сервера:', response.data);

      // Проверяем, что данные являются массивом
      if (!Array.isArray(response.data)) {
        throw new Error('Некорректные данные с сервера');
      }

      // Обновляем данные в состоянии
      setData(response.data);
    } catch (err) {
      console.error('Ошибка при запросе:', err);
      setError(`Не удалось загрузить данные, уже чиним.\n${err}`);
    } finally {
      setLoading(false); // Загрузка завершена
    }
  };

  // Используем useFocusEffect для выполнения запроса при фокусировке экрана
  useFocusEffect(
    useCallback(() => {
      console.log('Экран в фокусе. Загружаем данные...');
      fetchData(); // Вызываем функцию загрузки данных

      // Очищаем ресурсы, если необходимо
      return () => {
        console.log('Экран потерял фокус.');
      };
    }, [])
  );

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (error) {
    return <Text>{error}</Text>;
  }

  // Функция для обработки нажатия на элемент
  const handleItemPress = (id: string) => {
    setSelectedItemId(id); // Сохраняем ID выбранного элемента
    setModalOpen(true); // Открываем модальное окно
  };

  const renderItem = ({ item, i }: { item: unknown; i: number }) => {
    const typedItem = item as Item; // Преобразуем тип item из unknown в Item
    return (
      <Pressable onPress={() => handleItemPress(typedItem.id)}> {/* Добавляем обработчик нажатия */}
        <View style={[styles.item]}>
          <Image source={{ uri: typedItem.image }} style={styles.image} />
          <Text style={styles.date}>{typedItem.date}</Text>
          <Text style={styles.description}>{typedItem.title}</Text>
        </View>
      </Pressable>
    );
  };

  // Найти выбранный элемент по ID
  const selectedItem = data.find((item) => item.id === selectedItemId);

  return (
    <View style={{ backgroundColor: primary1, height: "100%", }}>
      <HeaderLogo />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <MasonryList
          data={data} // Используем динамические данные
          keyExtractor={(item) => (item as Item).id} // Явное преобразование типа
          renderItem={renderItem}
          numColumns={2}
          contentContainerStyle={styles.masonryContainer}
        />
        <Modal isOpen={modalOpen}>
            {selectedItem && (
          <View style={styles.modal}>
                <Image source={{uri: selectedItem.image}} style={styles.modalBanner}/>
                    <Pressable onPress={() => {setModalOpen(false)}}>
                            <View style={styles.dragIndicator} />
                    </Pressable>
                    <ThemedText type="modalTitleEventsNews">{selectedItem.title}</ThemedText>
              </View>
            )}
        </Modal>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
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
  scrollContainer: {
    flexGrow: 1,
    padding: 10,
    paddingTop: 0,
    backgroundColor: primary1,
  },
  masonryContainer: {
    paddingBottom: 10,
  },
  item: {
    padding: 0,
    paddingBottom: 10,
    margin: 4,
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: '#38373C',
    elevation: 3,
    height: 'auto',
  },
  image: {
    alignSelf: 'center',
    width: '100%',
    height: 114,
    borderRadius: 20,
  },
  date: {
    color: '#F5C89B',
    textAlign: 'center',
    fontSize: 22,
    paddingTop: 4,
  },
  description: {
    color: '#fff',
    fontSize: 20,
    wordWrap: 'wrap',
    marginTop: 0,
    margin: 5,
  },
});

export default App;