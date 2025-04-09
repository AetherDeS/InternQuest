import React from 'react';
import { View, StyleSheet, ScrollView, StatusBar, } from 'react-native';
import HeaderAppTitle from '../components/HeaderLogo';

import NewsContainer from '../components/NewsContainer';

// Палитра
import { ayuDark } from '@/app/colors/colors';
const { primary1, primary2, accent1, accent_gr1, accent_gr2 } = ayuDark;

export default function NewsScreen() {
  return (
    <View style={{ backgroundColor: primary1, height: '100%' }}>
      <HeaderAppTitle />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <NewsContainer img="https://i.pinimg.com/originals/c0/61/32/c06132e0636071dbcb84017394ad3cbd.jpg" text="Открыт набор на стажировку в IT-компанию Y. Стажировка оплачивается"/>
        <NewsContainer img="https://i.pinimg.com/736x/3e/f0/0a/3ef00a2fbb65635a26b8bd2f133bb7db.jpg" text="Открыт набор на стажировку в IT-компанию Y. Стажировка оплачивается"/>
        <NewsContainer img="https://i.pinimg.com/736x/03/08/a8/0308a8c5354a1af9154d78bfa9a1c120.jpg" text="Открыт набор на стажировку в IT-компанию Y. Стажировка оплачивается"/>
        <NewsContainer img="https://i.pinimg.com/736x/99/b1/1e/99b11e43c726f808c6d15578ef4429bb.jpg" text="Открыт набор на стажировку в IT-компанию Y. Стажировка оплачивается"/>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    gap: 20,
  }
})