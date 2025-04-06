import React from 'react';
import { ScrollView, View, Text, TextProps } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HeaderLogo from '@/app/components/HeaderLogo';
import ThemedButton from '../components/ThemedButton';

// Палитра
import {ayuDark} from '@/app/colors/colors';
const {primary1, primary2, accent1, accent_gr1, accent_gr2} = ayuDark;

const Tab = createBottomTabNavigator();

export default function HelpScreen() {
    return (
        <View style={{backgroundColor: primary1, height: '100%'}}>
            <HeaderLogo/>
            <Text style={{fontFamily: 'Comfortaa', fontSize: 24, color: '#fff', marginLeft: 20, marginBottom: 12,}}>Для работодателя</Text>
            <ThemedButton title="Пройти опрос"/>
            <ThemedButton title="Набрать практикантов"/>
            <ThemedButton title="Направления"/>
            <ThemedButton title="Подготовка"/>
            <ThemedButton title="Свяжиетсь с нами"/>
        </View>
    );
}