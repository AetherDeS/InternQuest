import { View, Text, Image } from 'react-native';
import Icon from "react-native-vector-icons/Ionicons";

// Палитра
import { ayuDark } from '@/app/colors/colors';
const { primary1, primary2, accent1, accent_gr1, accent_gr2 } = ayuDark;

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
const Tab = createBottomTabNavigator();


// Импорты экранов
import HomeScreen from './screens/HomeScreen';
import EventScreen from './screens/EventScreen';
import NewsScreen from './screens/NewsScreen';
import ProfileScreen from './screens/ProfileScreen';

export default function MyStack() {
  return (
    <Tab.Navigator initialRouteName="Home" screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: primary2,
          borderTopWidth: 0,
          height: 60, 
        },
        tabBarShowLabel: false,
        tabBarLabelPosition: 'beside-icon',
        tabBarLabelStyle: {
          display: 'none',
        }, 
      }}
    >
      {/* Главный экран */}
      <Tab.Screen name="Home" component={HomeScreen} options={{
          tabBarIcon: ({ focused }) => (
            <View style={{ height: 30 }}>
              <Icon name="search-outline" size={30} color={focused ? accent1 : '#A1A0A0'} />
            </View>
          ),
        }}
      />

      {/* События */}
      <Tab.Screen
        name="Events"
        component={EventScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={{ height: 30 }}>
              <Icon
                name="calendar-outline"
                size={30}
                color={focused ? accent1 : '#A1A0A0'}
              />
            </View>
          ),
        }}
      />

      {/* Новости */}
      <Tab.Screen
        name="News"
        component={NewsScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={{ height: 30 }}>
              <Icon
                name="chatbubbles-outline"
                size={30}
                color={focused ? accent1 : '#A1A0A0'}
              />
            </View>
          ),
        }}
      />

      {/* Профиль */}
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={{ height: 30 }}>
              <Icon
                name="person-outline"
                size={30}
                color={focused ? accent1 : '#A1A0A0'}
              />
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
}