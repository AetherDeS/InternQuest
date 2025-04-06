import React from 'react';
import {View, Text, Image} from 'react-native';

export default function HeaderAppTitle(){
    return (
        <View style={{flexDirection: 'row', justifyContent: 'center', height: 40, marginBottom: 4,}}>
            <Image
            source={require('@/assets/images/logo.png')}
            style={{width: 36, height: 30, marginTop: 4,}}/>
            <Text style={{fontFamily: 'Comfortaa', fontSize: 24, marginLeft: 6, marginTop: 2, color: "#fff", height: 40}}>InternQuest</Text>
        </View>
    );
};
