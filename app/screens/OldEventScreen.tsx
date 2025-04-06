import React from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import { Form } from "@/app/components/FormNews";
import HeaderAppTitle from '../components/HeaderLogo';
import EventContainer from '../components/EventContainer';
import HeaderLogo from '@/app/components/HeaderLogo'
const custom_image = '@/app/assets/images/NewsBannerImage.png'

export default function EventScreen() {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#000'}}>
      <View>
        <HeaderLogo></HeaderLogo>
        <ScrollView style={style.scroll} horizontal={false} showsHorizontalScrollIndicator={false}>
          <EventContainer imagePath='https://i.pinimg.com/736x/b4/2c/93/b42c93bd23c1e967ff97a8b9d012134b.jpg' dateText='21.02.2025' description="Встреча с выпускниками 'X' вуза. Из истории Из истории Из истории "></EventContainer>
          <EventContainer imagePath='https://i.pinimg.com/736x/b4/2c/93/b42c93bd23c1e967ff97a8b9d012134b.jpg' dateText='21.02.2025' description="Встреча с выпускниками 'X' вуза. Из истории Из истории Из истории "></EventContainer>
          <EventContainer imagePath='https://i.pinimg.com/736x/b4/2c/93/b42c93bd23c1e967ff97a8b9d012134b.jpg' dateText='21.02.2025' description="Встреча с выпускниками 'X' вуза. Из истории Из истории Из истории "></EventContainer>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const style = StyleSheet.create({
  main: {
    flexDirection: 'column',
  },
  scroll: {
    height: '100%',
  }
});