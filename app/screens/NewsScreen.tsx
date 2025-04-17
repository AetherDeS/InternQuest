import React from 'react';
import { ScrollView, View, Text, StatusBar } from 'react-native';
import HeaderAppTitle from '../components/HeaderLogo';
import ThemedText from '../components/ThemedText';
import NewsContainer from '../components/NewsContainer';
import MasonryList from '@react-native-seoul/masonry-list';
import { useEffect } from 'react';
import { useState } from 'react';
import { db } from '../components/firConfig';
import { onValue, ref, } from 'firebase/database';
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
  const [newsData, setNewsData] = useState<News | null>(null);

  useEffect(() => {
    const newsRef = ref(db, "internDatabase/news");
    onValue(newsRef, (snapshot) => {
      const data = snapshot.val();
      setNewsData(data);
    });
  }, []);
  console.log(newsData);
  console.log(typeof(newsData));

  const newsArray: News[] = newsData ? Object.values(newsData) : [];

  if (!newsData) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Loading event data...</Text>
      </View>                                                                                                                             
    )
  }

  return (
    <View style={{ width: '100%', height: '100%', backgroundColor: '#29272B' }}>
      <StatusBar barStyle="light-content" backgroundColor={primary1} />
      <HeaderAppTitle />
      <ScrollView>
        <MasonryList
          data={newsArray}
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

        <View>
          <Text>{newsData.title}</Text>
        </View>
      </ScrollView>
    </View>
  );
}

export default NewsScreen;