import React from 'react';

import {
    View,
    StyleSheet, Image, TouchableOpacity
} from 'react-native';

import images from "app/config/images";
import { Text } from "native-base";

import fontStyle from 'app/config/styles';
const FONT_BOLD = fontStyle.fonts.FONT_BOLD;
const FONT_REGULAR = fontStyle.fonts.FONT_REGULAR;
import Moment from 'moment';
const cardElevation = 5;

const styles = StyleSheet.create({
    imageContainer: { justifyContent: 'center', alignItems: 'center', margin: 5 },
    imageBG: { width: 40, height: 75 },
    icon: { position: 'absolute', width: 30, height: 30 },
    contentView: {
        // borderRadius: 5, flexDirection: "row", alignSelf: 'center', borderColor: "#d2d2d2", width: "90%", height: 100, borderWidth: 1, alignItems: "center",
        width: "90%",
        //marginVertical: 5,
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
        alignItems: "center", flexDirection: "row", alignSelf: 'center',
        // borderColor: "#f5f5f5",
        // borderWidth: 1,
        height: 100,
        backgroundColor: "#fff",

        //only android
        elevation: cardElevation,

        //only iOs
        shadowOpacity: 0.5, //only works if backgroundColor defined
        shadowRadius: cardElevation, //shadow fuzzyness
        shadowOffset: { width: 1, height: cardElevation },
    },
    profile: { backgroundColor: "transparent", height: 40, width: 40, alignSelf: 'center', margin: 5 }
});

export default ({ onPress, data }) => {
    let imageName = null;
    let mood = null;
    let color = null;

    switch (data.feeling_type) {
        case 1:
            imageName = images.feeling.feel_1;
            mood = 'Extremely Dissatisfied';
            color = '#F17B7C';
            break;
        case 2:
            imageName = images.feeling.feel_2;
            mood = 'Dissatisfied';
            color = '#FCAA21';
            break;
        case 3:
            imageName = images.feeling.feel_3;
            mood = 'Neutral';
            color = '#FDCC02';
            break;
        case 4:
            imageName = images.feeling.feel_4;
            mood = 'Satisfied';
            color = '#8CD3D3';
            break;
        case 5:
            imageName = images.feeling.feel_5;
            mood = 'Extremely Satisfied';
            color = '#7FC9A0';
            break;
        default:
            imageName = images.feeling.feel_3;
            mood = 'Neutral';
            color = '#FDCC02';
    }

    return (
        <View style={styles.contentView}>
            <View style={{ height: "100%", width: 10, flexDirection: 'row', backgroundColor: color, borderTopLeftRadius: 5 }} />
            <View style={{ flex: 1, flexDirection: 'row' }}>
                <View style={{ flex: 3, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                    <Image
                        source={{ uri: data.medicine_type.image_url }}
                        // source={images.timeline.feeling}
                        style={styles.profile} resizeMode={"contain"} />
                    <View style={{ left: 10, flex: 0.9 }}>
                        <Text style={{ fontSize: 15, fontFamily: FONT_BOLD, color: '#47A0AB' }}>
                            {data.medicine_name}
                        </Text>
                        <Text style={{ fontSize: 15, fontFamily: FONT_REGULAR }}>
                            <Text style={{ fontSize: 15, fontFamily: FONT_BOLD, color: '#47A0AB' }}>{data.dosage}</Text>
                            {" Doses"}
                        </Text>
                        <Text style={{ fontFamily: FONT_REGULAR, fontSize: 15 }}>
                            {"Start: " + Moment(data.pill_start_at).format('DD-MM-YYYY')}
                        </Text>
                    </View>
                </View>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} >
                    <TouchableOpacity style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} onPress={onPress}>
                        <Image style={{ width: 25, height: 25 }} source={require('../../../../assets/images/arrow-up-sign-to-navigate.png')} />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
};
