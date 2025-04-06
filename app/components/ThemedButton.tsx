import React from "react";
import { View, Text } from "react-native";

// Палитра
import {ayuDark} from '@/app/colors/colors';
const {primary1, primary2, accent1, accent_gr1, accent_gr2} = ayuDark;

interface ThemedButtonProps {
    title: string;
}

const ThemedButton: React.FC<ThemedButtonProps> =({title}) => {
    return(
        <View style={{width: '86%', height: 44, backgroundColor: accent1, alignSelf: 'center', borderRadius: 20,justifyContent: 'center',marginBottom: 8,}}>
            <Text style={{fontFamily: 'Comfortaa', fontSize: 24, textAlign: 'center', marginTop: -4,}}>{title}</Text>
        </View>
    )
}

export default ThemedButton;