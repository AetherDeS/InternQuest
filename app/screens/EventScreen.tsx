import React from 'react';
import { StyleSheet, StatusBar, Text, View, Image, ScrollView, ActivityIndicator, Pressable, Dimensions } from 'react-native';
import { useState, useEffect, useCallback } from 'react';
import MasonryList from '@react-native-seoul/masonry-list';
import HeaderLogo from '../components/HeaderLogo';
import EventContainer from '../components/EventContainer';
import { db } from '../components/firConfig';
import { onValue, ref } from 'firebase/database';
import { ayuDark } from '@/app/colors/colors';


const { primary1, primary2, accent1 } = ayuDark;
const { height } = Dimensions.get('window');

type Event = {
  id: string;
  specialization: string;
  date: string;
  title: string;
  description: string;
  org_title: string;
  address: string;
  link_to_form: string;
  image: string;
};

const App = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [eventsData, setEventsData] = useState<Record<string, Event> | null>(null); // Изменено: ожидаем объект или null

  useEffect(() => {
    const eventsRef = ref(db, "internDatabase/events");
    onValue(eventsRef, (snapshot) => {
      const data = snapshot.val();
      if (data && typeof data === 'object') { // Проверка типа данных
        setEventsData(data as Record<string, Event>);  // Преобразование типа
      } else {
        console.error("Неожиданный формат данных из Firebase:", data);
        setEventsData(null); // Устанавливаем в null в случае ошибки
      }
    });
  }, []);

  const eventsArray: Event[] = eventsData ? Object.values(eventsData) : [];

  if (!eventsData) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Loading event data...</Text>
      </View>
    );
  }

  return (
    <View style={{ backgroundColor: primary1, height: "100%", }}>
      <HeaderLogo />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <MasonryList
          data={eventsArray}
          keyExtractor={(item) => item.id}
          numColumns={2}
          contentContainerStyle={styles.masonryContainer}
          renderItem={({ item }: { item: unknown }) => {
            const events = item as Event; // Явное приведение типа
            return (
              <EventContainer
                id={events.id}
                date={events.date}
                title={events.title}
                description={events.description}
                org_title={events.org_title}
                address={events.address}
                image={events.image}
                link_to_form={events.link_to_form}
              />
            );
          }}
        />
      </ScrollView>
    </View>
  );
};

// ... стили без изменений ..
const styles = StyleSheet.create({
  modal: {
    alignSelf: 'center',
    width: Dimensions.get('window').width + 2,
    height: Dimensions.get('window').height - 40,
    marginTop: 66,
    backgroundColor: primary2,
    borderWidth: 1,
    borderTopColor: '#fff',
    borderRightColor: '#fff',
    borderLeftColor: '#fff',
    borderBottomColor: primary2,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
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
    alignSelf: 'center',
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
    fontFamily: 'Comfortaa',
    color: '#F5C89B',
    alignSelf: 'center',
    fontSize: 22,
    paddingTop: 4,
  },
  modalDate: {
    fontFamily: 'Comfortaa',
    color: '#F5C89B',
    alignSelf: 'center',
    fontSize: 22,
  },
  description: {
    fontFamily: 'Comfortaa',
    color: '#fff',
    fontSize: 20,
    marginStart: 6,
    marginEnd: 6,
  },
  modalDescription: {
    fontFamily: 'Comfortaa',
    width: 'auto',
    color: '#fff',
    fontSize: 18,
    marginTop: 0,
    marginBottom: 4,
  },
  modalText: {
    color: '#fff',
    fontSize: 16,
    marginVertical: 4,
  },
  modalOrg: {
    fontFamily: 'Comfortaa',
    marginTop: 2,
    color: "#fff",
    fontSize: 16,
  },
  modalAddress: {
    fontFamily: 'Comfortaa',
    marginTop: 2,
    color: "#fff",
    fontSize: 16,
  },
});

export default App;
