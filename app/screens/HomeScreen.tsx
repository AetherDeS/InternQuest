import React from 'react';
import { ScrollView, View, Text, StatusBar } from 'react-native';
import HeaderAppTitle from '../components/HeaderLogo';
import ThemedText from '../components/ThemedText';
import JobContainer from '../components/JobContainer';
import MasonryList from '@react-native-seoul/masonry-list';
import { db } from '../components/firConfig';
import { onValue, ref } from 'firebase/database';
import { useState, useEffect } from 'react';

import { useSelector } from 'react-redux';
import { RootState } from '../constants/store';
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
  const [VacanciesData, setVacanciesData] = useState<Vacancy | null>(null);
  const choosenSpec = useSelector((state: RootState) => state.choosenSpec);


  useEffect(() => {
    const eventsRef = ref(db, "internDatabase/vacancies");
    onValue(eventsRef, (snapshot) => {
      const data = snapshot.val();
      if (data && typeof data === 'object') { // Проверка типа данных
        setVacanciesData(data as Vacancy);  // Преобразование типа
      } else {
        console.error("Неожиданный формат данных из Firebase:", data);
        setVacanciesData(null); // Устанавливаем в null в случае ошибки
      }
    });
  }, []);

  const VacanciesArray: Vacancy[] = VacanciesData ? Object.values(VacanciesData) : [];

  if (!VacanciesData) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Загрузка из базы</Text>
      </View>
    );
  }

  const filteredVacancies: Vacancy[] =
  choosenSpec !== "" 
    ? VacanciesArray.filter(event => event.specialization === choosenSpec) 
    : VacanciesArray; // Если choosenSpec пусто, выводятся все события.

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
      <ScrollView contentContainerStyle={{marginTop: -4,}}>
        <MasonryList
          data={filteredVacancies}
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