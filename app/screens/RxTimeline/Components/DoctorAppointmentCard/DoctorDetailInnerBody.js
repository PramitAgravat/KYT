import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Text } from 'native-base';
import React from "react";
import fontStyle from 'app/config/styles';
const FONT_BOLD = fontStyle.fonts.FONT_BOLD;
const FONT_REGULAR = fontStyle.fonts.FONT_REGULAR;

const cardElevation = 4;
const styles = StyleSheet.create({
    childContainer: { flexDirection: 'row' },
    titleText: { fontFamily: FONT_BOLD, fontSize: 14, color: "#999898", },
    contentText: { fontFamily: FONT_REGULAR, fontSize: 12, color: "#999898" },
    imageContainer: { justifyContent: 'center', alignItems: 'center', margin: 5 },
    imageBG: { width: 40, height: 75 },
    icon: { position: 'absolute', width: 30, height: 30 },
    contentView: {
        // borderRadius: 5, flexDirection: "row", alignSelf: 'center', borderColor: "#d2d2d2", width: "90%", height: 100, borderWidth: 1, alignItems: "center",
        width: "90%",
        marginVertical: 2,
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5,
        alignItems: "center", flexDirection: "row", alignSelf: 'center',
        // borderColor: "#f5f5f5",
        // borderWidth: 1,
        backgroundColor: "#fff",
        height: "100%",
        //only android
        elevation: cardElevation,
        flex: 1,
        //only iOs
        shadowOpacity: 0.5, //only works if backgroundColor defined
        shadowRadius: cardElevation, //shadow fuzzyness
        shadowOffset: { width: 1, height: cardElevation },
    },
    profile: { backgroundColor: "transparent", height: 50, width: 50, alignSelf: 'center', margin: 5 }
});

const DoctorDetailInnerBody = ({ onPress }) => {
    return (
        <TouchableOpacity style={[styles.contentView]} onPress={onPress}>
            <Text>Edit Button</Text>
        </TouchableOpacity>
    )
}

export default DoctorDetailInnerBody;
