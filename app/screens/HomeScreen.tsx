import React from 'react';
import { ScrollView, View, Text, StatusBar } from 'react-native';
import axios from 'axios';
import { useFocusEffect } from '@react-navigation/native'; // Импортируем useFocusEffect
import HeaderAppTitle from '../components/HeaderLogo';
import ThemedText from '../components/ThemedText';
import JobContainer from '../components/JobContainer';
import MasonryList from '@react-native-seoul/masonry-list';
// Палитра
import { ayuDark } from '@/app/colors/colors';
const { primary1, primary2 } = ayuDark;

// Интерфейс для данных из базы
interface Vacancy {
  id: number;
  specialization: string;
  title: string;
  price: string;
  job_type: string;
  org_title: string;
  address: string;
  description: string;
  email: string;
  phone_number: string;
}

function HomeScreen() {
  const [data, setData] = React.useState<Vacancy[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  // Функция для загрузки данных из базы
  const fetchData = async () => {
    try {
      const response = await axios.get<Vacancy[]>('http://77.239.115.153:3000/api/vacancies');
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
      console.log('Экран в фокусе. Загружаем данные...');
      fetchData(); // Вызываем функцию загрузки данных
      return () => {
        console.log('Экран потерял фокус.');
      };
    }, [])
  );

  if (loading) {
    return <Text>Загрузка...</Text>;
  }

  if (error) {
    return <Text>{error}</Text>;
  }

  // Функция для маппинга специализации
  const mapSpecialization = (specialization: string) => {
    switch (specialization.toLowerCase()) {
      case 'программист':
        return 'Programmer';
      case 'дизайнер':
        return 'Designer';
      case 'автомеханик':
        return 'CarMechanic';
      case 'сварщик':
        return 'Welder';
      case 'столяр':
        return 'Carpenter';
      default:
        return undefined; // Возвращаем undefined, если специализация не найдена
    }
  };

  // Функция для маппинга типа работы
  const mapJobType = (jobType: string) => {
    switch (jobType.toLowerCase()) {
      case 'работа':
        return 'Job';
      case 'практика':
        return 'Practice';
      case 'стажировка':
        return 'Internship';
      case 'подработка':
        return 'PartTimeJob';
      default:
        return undefined; // Возвращаем undefined, если тип работы не найден
    }
  };

  return (
    <View style={{ width: '100%', height: '100%', backgroundColor: '#29272B' }}>
      <StatusBar barStyle="light-content" backgroundColor={primary1} />
      <HeaderAppTitle />
      <ScrollView>
        <MasonryList
          data={data}
          keyExtractor={(item) => item.id.toString()}
          numColumns={1}
          contentContainerStyle={{ padding: 10 }}
          renderItem={({ item }: { item: unknown }) => {
            const vacancy = item as Vacancy; // Явное приведение типа
            return (
              <JobContainer
                jobId={vacancy.id} // Передаем id вакансии
                jobTitle={vacancy.title}
                jobPrice={vacancy.price || 'доход не указан'}
                jobOrg={vacancy.org_title}
                jobGeo={vacancy.address}
                jobSpec={mapSpecialization(vacancy.specialization)}
                jobType={mapJobType(vacancy.job_type)}
                jobDescription={vacancy.description} // Передаем описание
                jobEmail={vacancy.email} // Передаем email
                jobPhone={vacancy.phone_number} // Передаем телефон
              />
            );
          }}
        />
      </ScrollView>
    </View>
  );
}

export default HomeScreen;