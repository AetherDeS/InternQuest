import { Text, type TextProps, StyleSheet } from 'react-native';
import { useThemeColor } from '@/app/hooks/useThemeColor';

// Цвета
import {ayuDark} from '@/app/colors/colors';
const {primary1, primary2, accent1, accent_gr1, accent_gr2} = ayuDark;

export type ThemedTextProps = TextProps & {
    lightColor?: string;
    darkColor?: string;
    type?: 'default' | 'title' | 'appTitle' | 'newsCardDate' | 'newsCardTitle' | 'newsCardDefinition' | 'newsCardLink' | 'jobTitle' | 'jobPrice' | 'jobOrgGeo';
};

function ThemedText({
    style,
    lightColor,
    darkColor,
    type = 'default',
    ...rest
}: ThemedTextProps) {
    const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');

    return (
        <Text
            style={[
                { color }, 
                type === 'appTitle' ? styles.appTitle : undefined,
                // -- Типы для страницы с новостями -- 
                type === 'newsCardDate' ? styles.newsCardDate : undefined,
                type === 'newsCardTitle' ? styles.newsCardTitle : undefined,
                type === 'newsCardDefinition' ? styles.newsCardDefinition : undefined,
                type === 'newsCardLink' ? styles.newsCardLink : undefined,
                // -- Типы для страницы с работой -- 
                type === 'jobTitle' ? styles.jobTitle : undefined,
                type === 'jobPrice' ? styles.jobPrice : undefined,
                type === 'jobOrgGeo' ? styles.jobOrgGeo : undefined,
                style,
            ]}
            {...rest}
        />
    );
}

const styles = StyleSheet.create({
    default: {
        fontFamily: 'Comfortaa',
        fontSize: 16,
        lineHeight: 4,
        color: '#f1FFF1F'
    },
    title: {
        fontFamily: 'Comfortaa',
        fontSize: 20,
        fontWeight: 'regular',
        lineHeight: 24,
        color: '#f1FFF1F',
        textAlign: 'center',

        marginBottom: 10
    },
    appTitle: {
        fontFamily: 'Comfortaa',
        fontSize: 24,
        color: "#fff",
        
    },
    newsCardDate: {
        fontFamily: 'Comfortaa',
        fontSize: 14,
        lineHeight: 16,
        color: accent1,

        textShadowColor: "rgba(36, 36, 36, 0.67)",
        textShadowOffset: {width: 1, height: 1},
        textShadowRadius: 2,
    },
    newsCardTitle: {
        fontFamily: 'Comfortaa',
        fontSize: 20,
        lineHeight: 27,
        color: '#fff',

    },
    newsCardDefinition: {
        fontFamily: 'Comfortaa',
        fontSize: 10,
        color: "#fff",
    },
    newsCardLink: {
        fontFamily: 'Comfortaa',
        fontSize: 24,
        color: accent1,

        textShadowColor: "rgba(36, 36, 36, 0.67)",
        textShadowOffset: {width: 0, height: 0},
        textShadowRadius: 4,
    },
    jobTitle: {
        fontFamily: 'Comfortaa',
        fontSize: 20,
        color: '#fff',
    },
    jobPrice: {
        fontFamily: 'Comfortaa',
        fontSize: 20,
        color: '#F5C89B',
    },
    jobOrgGeo: {
        fontFamily: 'Comfortaa',
        fontSize: 16,
        color: '#fff',
    },

});

export default ThemedText;