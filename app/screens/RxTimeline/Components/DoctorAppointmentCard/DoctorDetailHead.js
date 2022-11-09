import React from 'react';

import {
    View,
    StyleSheet, Image,
    TouchableOpacity
} from 'react-native';
import { default as Moment, default as moment } from 'moment';
import images from "app/config/images";
import { Text } from "native-base";
import fontStyle from 'app/config/styles';
const FONT_BOLD = fontStyle.fonts.FONT_BOLD;
const FONT_REGULAR = fontStyle.fonts.FONT_REGULAR;


const cardElevation = 5;

const styles = StyleSheet.create({
    titleText: { fontSize: 15, },
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
    profile: { backgroundColor: "transparent", height: 50, width: 50, alignSelf: 'center', margin: 5 }
});

export default ({ onPress, data }) => (
    console.log("Data --> ", data),
    <View style={[styles.contentView]} >
        <View style={{ height: "100%", width: 10, flexDirection: 'row', backgroundColor: "#48A1AB", borderTopLeftRadius: 5, borderBottomLeftRadius: 5 }} />
        <View style={{ flex: 1, flexDirection: 'row' }}>
            <View style={{ flex: 3, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                <View style={styles.imageContainer}>
                    <Image source={images.timeline.roundBG} style={styles.imageBG} resizeMode={"contain"} />
                    <Image source={images.timeline.doctor} style={styles.icon} resizeMode={"contain"} />
                </View>
                <View style={{ left: 10, flex: 0.9 }}>
                    {/* <Text> */}
                    {/* <Text style={styles.titleText}>Appointment with</Text>{" "} */}
                    <Text style={[styles.titleText, { color: '#47A0AB', fontFamily: FONT_BOLD }]} numberOfLines={2}>{"Dr. " + data.doctor_name}</Text>
                    <Text style={[styles.titleText, { fontFamily: FONT_REGULAR }]}>{" at "}
                        <Text style={[styles.titleText, { fontFamily: FONT_BOLD, color: '#47A0AB' }]}>{data.appointment_time}</Text>
                        {" for "}
                        <Text style={[styles.titleText, { fontFamily: FONT_BOLD, color: '#47A0AB' }]}>{data.disease}</Text></Text>
                    {/* <Text style={[styles.titleText, { color: '#47A0AB' }]}>{data.appointment_time}</Text>
                        <Text style={styles.titleText}>{" for " + data.disease}</Text> */}
                    {/* </Text> */}
                </View>
            </View>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} >
                <TouchableOpacity style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} onPress={onPress}>
                    <Image style={{ width: 25, height: 25 }} source={require('../../../../assets/images/arrow-up-sign-to-navigate.png')} />
                </TouchableOpacity>
            </View>
        </View>
    </View>
);
