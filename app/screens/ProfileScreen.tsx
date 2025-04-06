import React from 'react';
import { ScrollView, View, Text, TextProps, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// Палитра
import {ayuDark} from '@/app/colors/colors';
import HeaderLogo from '@/app/components/HeaderLogo';
import { Header } from 'react-native/Libraries/NewAppScreen';
const {primary1, primary2, accent1, accent_gr1, accent_gr2} = ayuDark;


const Tab = createBottomTabNavigator();

export default function ProfileScreen() {
    return (
        <View style={styles.body}>
            <HeaderLogo/>
        </View>
    );
}

const styles = StyleSheet.create({
    body: {
        backgroundColor: primary1,
        height: "100%",
    }
});