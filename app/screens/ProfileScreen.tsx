import React from 'react';
import { ScrollView, View, Text, StyleSheet, Pressable, Button } from 'react-native';
import { useState, useEffect} from 'react';
import Icon from "react-native-vector-icons/Ionicons";
import NewsScreen from './NewsScreen';
import Modal from '../modal/CustomModal';
import { getDatabase, ref, onValue } from "firebase/database";
import { db } from "../components/firConfig";   
// Палитра
import { ayuDark } from '@/app/colors/colors';
import HeaderLogo from '@/app/components/HeaderLogo';
const { primary1, primary2, accent1, accent_gr1, accent_gr2 } = ayuDark;

export default function ProfileScreen() {
    const [activeIcon, setActiveIcon] = useState<string | null>(null); // Состояние для отслеживания активной иконки
    const [choosenSpec, setChoosenSpec] = useState("");
    const [modalOpen, setModalOpen] = useState(false);

    const handleSpecSelect = (spec: string) => {
        setChoosenSpec(spec); // Устанавливаем выбранную специальность
        setModalOpen(false);  // Закрываем модальное окно
    };
    

    return (
        <View style={styles.body}>
            <HeaderLogo />
            <View style={styles.infoContainer}>
                <Text style={styles.infoText}>
                    Ваше направление{' '}
                    <Text style={styles.highlightedText}>{choosenSpec}</Text>
                </Text>
                <View style={{ flexDirection: 'row', gap: 6, }}>
                    <Pressable onPress={() => setModalOpen(true)} style={styles.button}>
                        <Text style={styles.buttonText}>Выбрать направление</Text>
                    </Pressable>
                    <Pressable onPress={() => handleSpecSelect('')} style={styles.button}>
                        <Text style={styles.buttonText}>Сбросить</Text>
                    </Pressable>
                </View>
            </View>
            <Modal isOpen={modalOpen} animation='fade'>
                {/* Центрируем модальное окно */}
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Pressable onPress={() => handleSpecSelect("Мастер по ремонту и обслуживанию автомобилей")} style={styles.specButton}>
                            <Text style={styles.specButtonText}>Мастер по ремонту и обслуживанию автомобилей</Text>
                        </Pressable>
                        <Pressable onPress={() => handleSpecSelect("Мастер столярно-плотничных, паркетных и стекольных работ")} style={styles.specButton}>
                            <Text style={styles.specButtonText}>Мастер столярно-плотничных, паркетных и стекольных работ</Text>
                        </Pressable>
                        <Pressable onPress={() => handleSpecSelect("Сварщик")} style={styles.specButton}>
                            <Text style={styles.specButtonText}>Сварщик</Text>
                        </Pressable>
                        <Pressable onPress={() => handleSpecSelect("Графический дизайн")} style={styles.specButton}>
                            <Text style={styles.specButtonText}>Графический дизайн</Text>
                        </Pressable>
                        <Pressable onPress={() => handleSpecSelect("Информационные системы и программирование")} style={styles.specButton}>
                            <Text style={styles.specButtonText}>Информационные системы и программирование</Text>
                        </Pressable>
                        <Pressable onPress={() => setModalOpen(false)} style={styles.closeButton}>
                            <Text style={styles.closeButtonText}>Закрыть</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
            <View>
        </View>
        </View>
    );
}

const styles = StyleSheet.create({
    body: {
        backgroundColor: primary1,
        height: "100%",
        flex: 1, // Добавляем flex для корректного центрирования
    },
    infoContainer: {
        width: '94%',
        backgroundColor: primary2,
        padding: 8,
        borderRadius: 20,
        alignSelf: 'center',
        marginTop: 20,
    },
    infoText: {
        fontFamily: 'Comfortaa',
        fontSize: 20,
        color: '#fff',
        marginBottom: 8,
        marginHorizontal: 6,
    },
    highlightedText: {
        color: accent1,
        fontSize: 20,
    },
    button: {
        flex: 1, 
        padding: 8, 
        backgroundColor: accent1, 
        borderRadius: 20, 
        alignItems: 'center', 
        justifyContent: 'center',
        alignContent: 'center',
    },
    buttonText: {
        width: 'auto',
        fontFamily: 'Comfortaa',
        fontSize: 18,
    },
    modalContainer: {
        flex: 0, // Занимает весь экран
        height: '100%',
        justifyContent: 'center', // Центрируем по вертикали
        alignItems: 'center', // Центрируем по горизонтали
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Полупрозрачный фон
    },
    modalContent: {
        width: '80%', // Ширина модального окна
        padding: 20,
        backgroundColor: primary2,
        borderRadius: 20,
        alignItems: 'center',
    },
    closeButton: {
        width: '100%',
        marginTop: 10,
        padding: 10,
        backgroundColor: '#fff',
        borderRadius: 10,
    },
    closeButtonText: {
        alignSelf: 'center',
        fontFamily: 'Comfortaa',
        color: primary1,
        fontSize: 16,
    },
    specButton: {
        width: '100%',
        marginTop: 10,
        padding: 10,
        backgroundColor: accent1,
        borderRadius: 10,
    },
    specButtonText: {
        fontFamily: 'Comfortaa',
        color: primary1,
        fontSize: 16,
    },
});