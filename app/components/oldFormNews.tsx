import React from 'react';
import { StyleSheet, View, Text } from "react-native";

import ThemedText from "@/app/components/ThemedText";
import NewsBanner from "@/app/components/NewsBanner";

// Палитра
import { ayuDark } from '@/app/colors/colors';
const { primary1, primary2, accent1, accent_gr1, accent_gr2 } = ayuDark;
// OPTIMIZE: Переписать функцию, чтобы передавать текст, а не писать вручную 
/* export function Form(date: string, time: string, title: string, def: string, imgSrc: string){  <-- Переделать в пропсы
    return (
        <View style={styles.container}>
            <View style={styles.form}>
                <ThemedText type='title'>{date}</ThemedText>  <-- Сделать нормальную подстановку
                <ThemedText type='default'>{time}</ThemedText>   <-- Сделать нормальную подстановку
            </View>
        </View>
    );
}*/
// TODO: - Реализовать шапку с датой и временем Как в примере ниже 
/* <View styles={{justifyContent: "SpaceBetween"}}>
     <ThemedText type='date'>14 Января</ThemedText>
     <ThemedText type='date'>11:00</ThemedText>    
  </View>*/
// TODO: - Перенести полный шаблон блока новостей
/**
 * заголовок  <!-- DONE -->
 * описание   <!-- DONE -->
 * ссылка с баннером -> отдельный компонент -> NewsBannerView
 */
//TODO: - Компонент NewsBannerView имеет следующий прототип
/**
 * <View>
 *   <Image></Image>
 *   <ThemedText>Читать далее</ThemedText>
 * </View>
 * 
 */

function Form() {
    return (
        <View style={styles.container}>
            <View style={styles.formHeader}>
                <ThemedText type='newsCardDate'>19 Февраля </ThemedText>
                <ThemedText type='newsCardDate'>11:00</ThemedText>
            </View>
            <View style={styles.form}>
                <ThemedText type='newsCardTitle'>Новая работа о "X" работодателя</ThemedText>
                <ThemedText type="newsCardDefinition">На нашей площадке появился новый работодатель. Надеемся что наше сотрудничество продлится как можно дольше. В этой статье вы узнаете. . . </ThemedText>
                <NewsBanner></NewsBanner>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '94%',
        flexDirection: 'column',
        alignSelf: 'center',
        marginBottom: 8,
    },
    form: {
        width: '100%',
        height: 'auto',
        paddingRight: 14,
        paddingLeft: 14,
        paddingTop: 12,
        paddingBottom: 12,
        borderRadius: 20,
        borderTopEndRadius: 0,
        backgroundColor: primary2,
        gap: 4,
        alignSelf: 'center',
        marginBottom: 10,
    },
    formHeader: {
        width: 140,
        padding: 8,

        backgroundColor: "#302f33",
        flexDirection: 'row',
        justifyContent: 'center',
        alignSelf: 'flex-end',

        // Border
        borderRadius: 20,
        borderBottomEndRadius: 0,
        borderBottomStartRadius: 0,

    },
});

export default Form;
