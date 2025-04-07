import React from 'react';
import { StyleSheet, StatusBar, Text, View, Image, ScrollView, ActivityIndicator, Pressable, Dimensions } from 'react-native';
import { useState, useEffect, useCallback } from 'react';
import MasonryList from '@react-native-seoul/masonry-list';
import HeaderLogo from '../components/HeaderLogo';
import axios from 'axios';
import { useFocusEffect } from '@react-navigation/native'; // Импортируем useFocusEffect
import ThemedText from '../components/ThemedText';
import Modal from '../modal/eventModal';
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
  // Функция для загрузки данных
  const fetchData = async () => {
    try {
      const response = await axios.get<Item[]>('http://77.239.115.153/internapi.php?table=events');
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

  const renderItem = ({ item, i }: { item: unknown; i: number }) => {
    const typedItem = item as Item; // Преобразуем тип item из unknown в Item
    return (
      <View style={[styles.item]}>
        <Image source={{ uri: typedItem.image }} style={styles.image} />
        <Text style={styles.date}>{typedItem.date}</Text>
        <Text style={styles.description}>{typedItem.title}</Text>
      </View>
    );
  };

  return (
    <View style={{ backgroundColor: primary1 }}>
      <HeaderLogo />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Pressable onPress={() => setModalOpen(true)}>
          <MasonryList
            data={data} // Используем динамические данные
            keyExtractor={(item) => (item as Item).id} // Явное преобразование типа
            renderItem={renderItem}
            numColumns={2}
            contentContainerStyle={styles.masonryContainer}
          />
          <Modal
            isOpen={modalOpen}>
            <View style={styles.modal}>
              <Pressable onPress={() => {
                setModalOpen(false)
              }}>
                <View>
                  <View style={styles.dragIndicator} />
                </View>
              </Pressable>
              <View>
                <ThemedText type="modalTitle"></ThemedText>
              </View>
            </View>
          </Modal>
        </Pressable>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  modal: {
    alignSelf: 'center',
    width: Dimensions.get('window').width + 2,
    height: height - 100,
    marginTop: 66,
    backgroundColor: primary2,
    borderWidth: 1,
    borderTopColor: '#fff',
    borderRightColor: '#fff',
    borderLeftColor: '#fff',
    borderBottomColor: primary2,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    alignItems: 'center',

  },
  dragIndicator: {
    width: 50,
    height: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
    marginTop: -4,
    marginBottom: 4,
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 10,
    paddingTop: 0,
    backgroundColor: primary1,
  },
  masonryContainer: {
    paddingBottom: 40,
  },
  item: {
    padding: 5,
    paddingBottom: 10,
    margin: 5,
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
    fontSize: 22,
    wordWrap: 'wrap',
  },
});

export default App;