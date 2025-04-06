import React from 'react';
import { ScrollView, View, Text, TextProps, StatusBar } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HeaderAppTitle from '../components/HeaderLogo';
import ThemedText from '../components/ThemedText';
import JobContainer from '../components/JobContainer';
import MasonryList from '@react-native-seoul/masonry-list';

import ModalScreenInfo from '../modal/eventModal';

// Палитра
import {ayuDark} from '@/app/colors/colors';
const {primary1, primary2, accent1, accent_gr1, accent_gr2} = ayuDark;

const Tab = createBottomTabNavigator();

type Item = {
  jobId: number,
  jobTitle: string,
  jobPrice: string,
  jobOrganization: string,
  jobGeolocation: string,
  jobSpecialization: string,
  jobType: string,
}


function HomeScreen() {

  return (
    <View style={{ width: '100%', height: '100%', backgroundColor: '#29272B' }}>
      <StatusBar barStyle="light-content" backgroundColor={primary1}/>
      <HeaderAppTitle />
      <ScrollView>
        <JobContainer
          jobTitle="Администратор базы данных поликлиники"
          jobPrice="2 000₽ неделю"
          jobOrg="ООО Поликлиника"
          jobGeo="Р-н Перово"
          jobSpec="Programmer"
          jobType='PartTimeJob' />
          <JobContainer
          jobTitle="Python-разработчик"
          jobPrice="40 000₽ в месяц"
          jobOrg="CodeWave"
          jobGeo="улица Новоалексеевская, 26"
          jobSpec="Programmer"
          jobType='Job' />
          <JobContainer
          jobTitle="Frontend разработчик(стажер)"
          jobPrice=""
          jobOrg="IntraVision"
          jobGeo="Москва"
          jobSpec="Programmer"
          jobType='Internship' />
          <JobContainer
          jobTitle="Frontend-разработчик (практика)"
          jobPrice=""
          jobOrg="ООО Поликлиника"
          jobGeo="Р-н Перово"
          jobSpec="Programmer"
          jobType='Practice' />
          <JobContainer
          jobTitle="Администратор базы данных поликлиники"
          jobPrice="2 000₽ неделю"
          jobOrg="ООО Поликлиника"
          jobGeo="Р-н Перово"
          jobSpec="Programmer"
          jobType='PartTimeJob' />
          <JobContainer
          jobTitle="Администратор базы данных поликлиники"
          jobPrice="2 000₽ неделю"
          jobOrg="ООО Поликлиника"
          jobGeo="Р-н Перово"
          jobSpec="Programmer"
          jobType='PartTimeJob' />
          <JobContainer
          jobTitle="Администратор базы данных поликлиники"
          jobPrice="2 000₽ неделю"
          jobOrg="ООО Поликлиника"
          jobGeo="Р-н Перово"
          jobSpec="Programmer"
          jobType='PartTimeJob' />
          {/* <ModalScreenInfo></ModalScreenInfo> */}
      </ScrollView>
    </View>
  );
}
export default HomeScreen;