import React from 'react';
import { View, Button } from 'react-native';
import { Form } from "@/app/components/FormNews";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useNavigation } from 'expo-router';

const Tab = createBottomTabNavigator();

// Screens
import HomeScreen from '../screens/HomeScreen';
import NewsScreen from '../screens/NewsScreen';
import EventScreen from '../screens/EventScreen';


export default function Navigation() {
    return (
        <View>
            <Tab.Screen name='Home' component={HomeScreen}/>
            <Tab.Screen name='News' component={NewsScreen}/>
            <Tab.Screen name='Event' component={EventScreen}/>
        </View>
    );
}