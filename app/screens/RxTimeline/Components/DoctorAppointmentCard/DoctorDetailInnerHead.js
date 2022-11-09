import React from 'react';

import {
    View,
    StyleSheet
} from 'react-native';

import { Text } from "native-base";
import fontStyle from 'app/config/styles';
const FONT_BOLD = fontStyle.fonts.FONT_BOLD;


const cardElevation = 5;

const styles = StyleSheet.create({
    titleText: { fontFamily: FONT_BOLD, fontSize: 14, color: "#000", },
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
        height: 150,
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

export default ({ onPress }) => (
    <View style={styles.contentView}>

        <View style={{ left: 10, flex: 1, flexWrap: 'wrap' }}>
            <View style={styles.childContainer}>
                <Text style={styles.titleText}>
                    Doctor Name :
                </Text>
                <Text style={styles.contentText}>
                    Shrenik shah123
                </Text>
            </View>
            <View style={styles.childContainer}>
                <Text style={styles.titleText}>
                    Appointment Date :
                </Text>
                <Text style={styles.contentText}>
                    24/4/2019
                </Text>
            </View>
            <View style={styles.childContainer}>
                <Text style={styles.titleText}>
                    Hospital Name :
                </Text>
                <Text style={styles.contentText}>
                    Creative Hustlers
                </Text>
            </View>

        </View>
    </View>
);
