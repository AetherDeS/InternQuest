import React from 'react';
import { View, ScrollView, StatusBar, } from 'react-native';
import HeaderAppTitle from '../components/HeaderLogo';

import OldNewsCard from "@/app/components/oldFormNews";
// Палитра
import { ayuDark } from '@/app/colors/colors';

const { primary1, primary2, accent1, accent_gr1, accent_gr2 } = ayuDark;

export default function NewsScreen() {
  return (
    <View style={{ backgroundColor: primary1, height: '100%' }}>
      <HeaderAppTitle />
      <ScrollView contentContainerStyle={{justifyContent: 'center'}}>
        <OldNewsCard></OldNewsCard>
        <OldNewsCard></OldNewsCard>
        <OldNewsCard></OldNewsCard>
        <OldNewsCard></OldNewsCard>
      </ScrollView>
    </View>
  );
}