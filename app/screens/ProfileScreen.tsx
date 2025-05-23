import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Pressable, Button } from 'react-native';

import HeaderLogo from '@/app/components/HeaderLogo';
import Modal from '../modal/CustomModal';
import { useDispatch, useSelector } from 'react-redux';
import { setChoosenSpec, RootState } from '../constants/store';

// Палитра
import { ayuDark } from '@/app/colors/colors';
const { primary1, primary2, accent1, accent_gr1, accent_gr2 } = ayuDark;

export default function ProfileScreen() {
    const dispatch = useDispatch();
    const [modalOpen, setModalOpen] = useState(false);
    const choosenSpec = useSelector((state: RootState) => state.choosenSpec);
    const [choosenSpecLabel, setChoosenSpecLabel] = useState("");

    const handleSpecSelect = (NewsSpec: string, specLabel: string) => {
        dispatch(setChoosenSpec(NewsSpec)); // Устанавливаем выбранную специальность
        setModalOpen(false);  // Закрываем модальное окно
        setChoosenSpecLabel(specLabel);
    };


    return (
        <View style={styles.body}>
            <HeaderLogo />
            <View style={styles.infoContainer}>
                <Text style={styles.infoText}>
                    Ваше направление{' '}
                    <Text style={styles.highlightedText}>{choosenSpecLabel || " "}</Text>
                </Text>
                <View style={{ flexDirection: 'row', gap: 6, }}>
                    <Pressable onPress={() => setModalOpen(true)} style={styles.button}>
                        <Text style={styles.buttonText}>Выбрать направление</Text>
                    </Pressable>
                    <Pressable onPress={() => handleSpecSelect("", "")} style={styles.button}>
                        <Text style={styles.buttonText}>Сбросить</Text>
                    </Pressable>
                </View>
            </View>
            <Modal isOpen={modalOpen} animation='fade'>
                {/* Центрируем модальное окно */}
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Pressable onPress={() => handleSpecSelect("Автомеханик", "Мастер по ремонту и обслуживанию автомобилей")} style={styles.specButton}>
                            <Text style={styles.specButtonText}>Мастер по ремонту и обслуживанию автомобилей</Text>
                        </Pressable>
                        <Pressable onPress={() => handleSpecSelect("Столяр", "Мастер столярно-плотничных, паркетных и стекольных работ")} style={styles.specButton}>
                            <Text style={styles.specButtonText}>Мастер столярно-плотничных, паркетных и стекольных работ</Text>
                        </Pressable>
                        <Pressable onPress={() => handleSpecSelect("Сварщик", "Сварщик")} style={styles.specButton}>
                            <Text style={styles.specButtonText}>Сварщик</Text>
                        </Pressable>
                        <Pressable onPress={() => handleSpecSelect("Дизайнер", "Графический дизайн")} style={styles.specButton}>
                            <Text style={styles.specButtonText}>Графический дизайн</Text>
                        </Pressable>
                        <Pressable onPress={() => handleSpecSelect("Программист", "Информационные системы и программирование")} style={styles.specButton}>
                            <Text style={styles.specButtonText}>Информационные системы и программирование</Text>
                        </Pressable>
                        <Pressable onPress={() => setModalOpen(false)} style={styles.closeButton}>
                            <Text style={styles.closeButtonText}>Закрыть</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal> 
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
        width: '92%',
        backgroundColor: primary2,
        padding: 8,
        borderRadius: 20,
        alignSelf: 'center',
        marginTop: 6,
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