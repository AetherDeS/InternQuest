import React from "react";
import { View, Text, Button, ScrollView, TextProps, StyleSheet, Pressable, Dimensions } from 'react-native';
import ThemedText from "./ThemedText";
import Animated, { useSharedValue, useAnimatedStyle, withSpring, } from 'react-native-reanimated';
import {
    PanGestureHandler,
    GestureHandlerRootView,
    GestureEvent,
    HandlerStateChangeEvent,
    PanGestureHandlerEventPayload,
} from 'react-native-gesture-handler';
// Палитра
import { ayuDark } from '@/app/colors/colors';

const { primary1, primary2, accent1, accent_gr1, accent_gr2 } = ayuDark;
const { height } = Dimensions.get('window');

/**
 * Программист - Programmer
 * Столяр - carpenter
 * Сварщик - welder
 * Автомеханик - carMechanic
 * Дизайнер - Designer */

interface JobContainerProps {
    jobTitle: string;
    jobPrice: string;
    jobOrg: string;
    jobGeo: string;
    jobSpec?: 'Programmer' | 'Designer' | 'CarMechanic' | 'Welder' | 'Carpenter';
    jobType?: 'Job' | 'Practice' | 'Internship' | 'PartTimeJob' | 'Default';
}
export type JobTagProps = TextProps & {
    type?: 'Programmer' | 'Designer' | 'CarMechanic' | 'Welder' | 'Carpenter' | 'Job' | 'Practice' | 'Internship' | 'PartTimeJob' | 'Default';
}
// Маппинг типа на текст и иконку
const jobTypeMap = {
    Default: { label: '', icon: '' },
    Programmer: { label: 'Программист', icon: '💻' },
    Designer: { label: 'Дизайнер', icon: '🎨' },
    CarMechanic: { label: 'Автомеханик', icon: '🔧' },
    Welder: { label: 'Сварщик', icon: '🔥' },
    Carpenter: { label: 'Столяр', icon: '🔨' },
    Job: { label: 'Работа', icon: '' },
    Practice: { label: 'Практика', icon: '' },
    Internship: { label: 'Стажировка', icon: '' },
    PartTimeJob: { label: 'Подработка', icon: '' },
};

// Компонент JobTag
export function JobTag({ type }: JobTagProps) {
    // Получаем текст и иконку из маппинга
    const { label, icon } = jobTypeMap[type || 'Default']; // Используем 'Default' по умолчанию

    return (
        <View style={[
            // Specialization Icon Style
            type === 'Programmer' ? styles.specContainer : undefined,
            type === 'Designer' ? styles.specContainer : undefined,
            type === 'CarMechanic' ? styles.specContainer : undefined,
            type === 'Welder' ? styles.specContainer : undefined,
            type === 'Carpenter' ? styles.specContainer : undefined,
            // Job Icon Style
            type === 'Job' ? [styles.jobContainer, { backgroundColor: '#A4F59B' }] : undefined,
            type === 'Practice' ? [styles.jobContainer, { backgroundColor: '#B49BF5' }] : undefined,
            type === 'Internship' ? [styles.jobContainer, { backgroundColor: '#B49BF5' }] : undefined,
            type === 'PartTimeJob' ? [styles.jobContainer, { backgroundColor: '#A4F59B' }] : undefined,
        ]}>
            <Text style={styles.title}>{label}</Text>
            <Text style={[
                // Specialization Icon Style
                type === 'Programmer' ? styles.specIcon : undefined,
                type === 'Designer' ? styles.specIcon : undefined,
                type === 'CarMechanic' ? styles.specIcon : undefined,
                type === 'Welder' ? styles.specIcon : undefined,
                type === 'Carpenter' ? styles.specIcon : undefined,
                // Job Icon Style
                type === 'Job' ? [styles.jobIcon, { backgroundColor: '#A4F59B' }] : undefined,
                type === 'Practice' ? [styles.jobIcon, { backgroundColor: '#A4F59B' }] : undefined,
                type === 'Internship' ? [styles.jobIcon] : undefined,
                type === 'PartTimeJob' ? [styles.jobIcon] : undefined,
            ]}>{icon}</Text>
        </View>
    );
}

// Норм цвет тож тёмныйrgb(156, 140, 180)
const JobContainer: React.FC<JobContainerProps> = ({
    jobTitle, jobPrice, jobOrg, jobGeo, jobSpec, jobType
}) => {
    const handlePress = () => {

    }
    return (
        <Pressable onPress={handlePress}>
            <View style={{ width: '94%', height: 'auto', paddingTop: 4, padding: 14, paddingBottom: 8, marginBottom: 14, borderRadius: 20, backgroundColor: primary2, alignSelf: 'center', }}>
                <ThemedText type='jobTitle'>{jobTitle || 'не указано'}</ThemedText>
                <ThemedText style={{ marginTop: -4, marginBottom: 4 }} type='jobPrice'>{jobPrice || 'доход не указан'}</ThemedText>
                <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginBottom: 2 }}>
                    <JobTag type={jobSpec} />
                    <JobTag type={jobType} />
                </View>
                <ThemedText type='jobOrgGeo'>{jobOrg || 'название не указано'}</ThemedText>
                <ThemedText type='jobOrgGeo'>{jobGeo || 'местоположение не указано'}</ThemedText>
            </View>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    specContainer: {
        width: 'auto',
        height: 'auto',
        padding: 6,
        flexDirection: 'row',
        backgroundColor: accent1,
        borderRadius: 20,
        alignContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontFamily: 'Comfortaa',
        fontSize: 16,
        color: primary1,
    },
    specIcon: {
        fontSize: 18
    },
    jobContainer: {
        width: 'auto',
        height: 'auto',
        padding: 6,
        flexDirection: 'row',
        borderRadius: 20,
        alignContent: 'center',
        alignItems: 'center',
    },
    jobIcon: {
        display: 'none',
    },
});

export default JobContainer;

