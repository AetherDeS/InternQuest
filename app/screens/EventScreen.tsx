import React from 'react';
import { StyleSheet, StatusBar, Text, View, Image, ScrollView, ActivityIndicator } from 'react-native';
import { useState, useEffect } from 'react';
import MasonryList from '@react-native-seoul/masonry-list';
import HeaderLogo from '../components/HeaderLogo';
import axios from 'axios';

// Палитра
import { ayuDark } from '@/app/colors/colors';
const { primary1, primary2, accent1, accent_gr1, accent_gr2 } = ayuDark;

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
      setError('Не удалось загрузить данные, уже чиним.');
    } finally {
      setLoading(false); // Загрузка завершена
    }
  };

  useEffect(() => {
    // Загружаем данные при монтировании компонента
    fetchData();

    // Устанавливаем интервал для обновления данных каждые 10 секунд
    const intervalId = setInterval(() => {
      console.log('Обновление данных...');
      fetchData();
    }, 60000); // 10 секунд

    // Очищаем интервал при размонтировании компонента
    return () => clearInterval(intervalId);
  }, []);

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
    <View style={{backgroundColor: primary1}}>
      <HeaderLogo />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <MasonryList
          data={data} // Используем динамические данные
          keyExtractor={(item) => (item as Item).id} // Явное преобразование типа
          renderItem={renderItem}
          numColumns={2}
          contentContainerStyle={styles.masonryContainer}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
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