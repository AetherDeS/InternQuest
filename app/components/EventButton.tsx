import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
// Палитра
import { ayuDark } from '@/app/colors/colors';
import { withDecay } from 'react-native-reanimated';
const { accent1, accent_gr1, accent_gr2 } = ayuDark;


function EventButton() {
    return (
        <Pressable style={{ width: '100%', position: 'absolute', bottom: 12, }}>
            <LinearGradient colors={[accent_gr1, accent_gr2]} start={{x:0, y:1}} end={{x:1, y:0}} style={styles.container}>
                <Text style={styles.btnText}>Участвовать</Text>
            </LinearGradient>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    container: {
        width: 'auto',
        height: 'auto',
        backgroundColor: accent1,
        borderRadius: 20,
        marginStart: 10,
        marginEnd: 10,
    },
    btnText: {
        width: 'auto',
        fontSize: 20,
        lineHeight: 20,
        fontFamily: "Comfortaa",
        color: '2F2E32',
        alignSelf: 'center',
        justifyContent: 'center',
        paddingTop: 12,
        padding: 10,
    }
})

export default EventButton;