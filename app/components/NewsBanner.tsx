import React from 'react';
import { StyleSheet, View, Button, Text, Image } from 'react-native';
import ThemedText from './ThemedText';
// Палитра
import {ayuDark} from '@/app/colors/colors';
const {primary1, primary2, accent1, accent_gr1, accent_gr2} = ayuDark;

function NewsBanner() {
    return (
        <View style={style.container}>
            <Image
                style={style.banner}
                source={require("@/assets/images/NewsBannerImage1.png")}
                resizeMode='cover'
                blurRadius={5}
            />
            <ThemedText type='newsCardLink'>Читать больше</ThemedText>
        </View>
    );
};

const style = StyleSheet.create({
    container: {
        width: 'auto',
        height: 100,
        borderWidth: 2,
        borderRadius: 20,
        borderColor: accent1,

        justifyContent: 'center',
        alignItems: 'center',
    },
    banner: {
        position: 'absolute',
        width:'100%',
        height: 96,
        borderRadius: 20,
    }
});

export default NewsBanner;