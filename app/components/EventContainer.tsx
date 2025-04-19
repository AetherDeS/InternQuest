import React, { useState } from 'react';
import { Pressable, View, Text, Image, StyleSheet, Dimensions } from 'react-native';
import ThemedText from './ThemedText';
import Modal from '../modal/CustomModal';
import EventButton from './EventButton';

// Палитра
import { ayuDark } from '@/app/colors/colors';
const { primary1, primary2, accent1, accent_gr1, accent_gr2 } = ayuDark;

interface EventContainerProps {
    id: string;
    date: string;
    title: string;
    description: string;
    org_title: string;
    address: string;
    link_to_form: string;
    image: string;
}

function EventContainer({ id, date, title, description, org_title, address, image }: EventContainerProps) {
    const [modalOpen, setModalOpen] = useState(false);

    return (
        <View>
            <Pressable onPress={() => setModalOpen(true)}>
                <View style={[styles.item]}>
                    <Image source={{ uri: image }} style={styles.image} />
                    <Text style={styles.date}>{date}</Text>
                    <Text style={styles.description}>{title}</Text>
                </View>
            </Pressable>
            <Modal isOpen={modalOpen}>
                <View style={styles.modal}>
                    <Image source={{ uri: image }} style={styles.modalBanner} />
                    <Pressable onPress={() => setModalOpen(false)}>
                        <View style={styles.dragIndicator} />
                    </Pressable>
                    <ThemedText type="modalTitleEventsNews" style={{ textAlign: 'center' }}>{title}</ThemedText>
                    <Text style={styles.modalDate}>{date}</Text>
                    <View style={{ marginStart: 20, marginEnd: 10, }}>
                        <Text style={styles.modalDescription}>{description || 'Описание отсутствует'}</Text>
                        <View style={{ width: 'auto', backgroundColor: accent1, height: 1, borderRadius: 2, marginTop: 4, marginBottom: 4, }}></View>
                        <Text style={styles.modalOrg}>{org_title || 'Организация не указана'}</Text>
                        <Text style={styles.modalAddress}>{address || 'Адрес не указан'}</Text>
                    </View>
                    <EventButton />
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    modal: {
        alignSelf: 'center',
        width: Dimensions.get('window').width + 2,
        height: Dimensions.get('window').height - 40,
        marginTop: 66,
        backgroundColor: primary2,
        borderWidth: 1,
        borderTopColor: '#fff',
        borderRightColor: '#fff',
        borderLeftColor: '#fff',
        borderBottomColor: primary2,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    modalBanner: {
        position: "absolute",
        width: "100%",
        height: 190,
        borderRadius: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        borderBottomRightRadius: 0,
        borderBottomLeftRadius: 0,
    },
    dragIndicator: {
        width: 50,
        height: 10,
        backgroundColor: '#fff',
        borderRadius: 5,
        marginTop: 8,
        marginBottom: 4,
        alignSelf: 'center',
    },
    scrollContainer: {
        flexGrow: 1,
        padding: 10,
        paddingTop: 0,
        backgroundColor: primary1,
    },
    masonryContainer: {
        paddingBottom: 10,
    },
    item: {
        padding: 0,
        paddingBottom: 10,
        margin: 4,
        borderRadius: 20,
        overflow: 'hidden',
        backgroundColor: '#38373C',
        elevation: 3,
        height: 'auto',
    },
    image: {
        alignSelf: 'center',
        width: '100%',
        height: 114,
        borderRadius: 20,
    },
    date: {
        fontFamily: 'Comfortaa',
        color: '#F5C89B',
        alignSelf: 'center',
        fontSize: 22,
        paddingTop: 4,
    },
    modalDate: {
        fontFamily: 'Comfortaa',
        color: '#F5C89B',
        alignSelf: 'center',
        fontSize: 22,
    },
    description: {
        fontFamily: 'Comfortaa',
        color: '#fff',
        fontSize: 20,
        marginStart: 6,
        marginEnd: 6,
    },
    modalDescription: {
        fontFamily: 'Comfortaa',
        width: 'auto',
        color: '#fff',
        fontSize: 18,
        marginTop: 0,
        marginBottom: 4,
    },
    modalText: {
        color: '#fff',
        fontSize: 16,
        marginVertical: 4,
    },
    modalOrg: {
        fontFamily: 'Comfortaa',
        marginTop: 2,
        color: "#fff",
        fontSize: 16,
    },
    modalAddress: {
        fontFamily: 'Comfortaa',
        marginTop: 2,
        color: "#fff",
        fontSize: 16,
    },
});

export default EventContainer;