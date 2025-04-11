import React from 'react';
import { ScrollView, View, Text, StatusBar } from 'react-native';
import axios from 'axios';
import { useFocusEffect } from '@react-navigation/native'; // Импортируем useFocusEffect
import HeaderAppTitle from '../components/HeaderLogo';
import ThemedText from '../components/ThemedText';
import NewsContainer from '../components/NewsContainer';
import MasonryList from '@react-native-seoul/masonry-list';
// Палитра
import { ayuDark } from '@/app/colors/colors';
const { primary1, primary2 } = ayuDark;

// Интерфейс для данных из базы
interface News {
  id: number;
  title: string;
  datetime: string;
  description: string;
  image: string;
}

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);

  // Получаем день, месяц, год, часы и минуты
  const day = String(date.getDate()).padStart(2, '0'); // День с ведущим нулём
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Месяц с ведущим нулём
  const year = date.getFullYear(); // Год
  const hours = String(date.getHours()).padStart(2, '0'); // Часы
  const minutes = String(date.getMinutes()).padStart(2, '0'); // Минуты

  // Возвращаем отформатированную строку
  return `${day}.${month}.${year} ${hours}:${minutes}`;
};

function NewsScreen() {
  const [data, setData] = React.useState<News[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  // Функция для загрузки данных из базы
  const fetchData = async () => {
    try {
      const response = await axios.get<News[]>('http://77.239.115.153:3000/api/news');
      if (!Array.isArray(response.data)) {
        throw new Error('Некорректные данные с сервера');
      }
      setData(response.data);
    } catch (err) {
      console.error('Ошибка при запросе:', err);
      setError(`Не удалось загрузить данные, уже чиним.\n${err}`);
    } finally {
      setLoading(false);
    }
  };

  // Используем useFocusEffect для загрузки данных при фокусировке экрана
  useFocusEffect(
    React.useCallback(() => {
      console.log('Экран новостей в фокусе. Загружаем данные...');
      fetchData(); // Вызываем функцию загрузки данных
      return () => {
        console.log('Экран новостей потерял фокус.');
      };
    }, [])
  );

  if (loading) {
    return <Text>Загрузка...</Text>;
  }

  if (error) {
    return <Text>{error}</Text>;
  }

  return (
    <View style={{ width: '100%', height: '100%', backgroundColor: '#29272B' }}>
      <StatusBar barStyle="light-content" backgroundColor={primary1} />
      <HeaderAppTitle />
      <ScrollView>
        <MasonryList
          data={data}
          keyExtractor={(item) => item.id.toString()}
          numColumns={1}
          contentContainerStyle={{}}
          renderItem={({ item }: { item: unknown }) => {
            const news = item as News; // Явное приведение типа
            return (
              <NewsContainer
                text={news.title}
                img={news.image}
                description={news.description}
                datetime={formatDate(news.datetime)}
              />
            );
          }}
        />
      </ScrollView>
    </View>
  );
}

export default NewsScreen;