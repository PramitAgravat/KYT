import { Dimensions, StyleSheet } from "react-native";
const cardElevation = 5;
import fontStyle from 'app/config/styles';
const FONT_BOLD = fontStyle.fonts.FONT_BOLD;
const FONT_REGULAR = fontStyle.fonts.FONT_REGULAR;
const { width } = Dimensions.get("screen");
const styles = StyleSheet.create({
    titleText: {
        margin: 5,
        textAlign: 'center',
        fontSize: 16,
        fontFamily: FONT_BOLD
    },
    contentText: {
        textAlign: 'center',
        fontSize: 14,
        fontFamily: FONT_REGULAR
    },
    navigationButtonStyle: {
        alignItems: 'center',
        flexDirection: 'row',
        height: 30,
        width: width * 0.3,
        borderRadius: 30
    },
    navigationButtonTextStyle: {
        fontFamily: FONT_BOLD, textAlign: 'center', color: '#fff', width: "100%", fontSize: 13,
        textAlignVertical: 'center',
        // paddingTop: Platform.OS == "ios" ? 8 : 0
    },

});

export default styles;
