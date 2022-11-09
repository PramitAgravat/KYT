import { Dimensions, StyleSheet, Platform } from "react-native";
const { height, width } = Dimensions.get("screen");
import fontStyle from 'app/config/styles';
const FONT_BOLD = fontStyle.fonts.FONT_BOLD;
const FONT_REGULAR = fontStyle.fonts.FONT_REGULAR;

var styles = StyleSheet.create({
    pickerView: { borderWidth: 2, borderColor: '#d2d2d2', borderRadius: 50, marginHorizontal: 10, margin: 5, height: 50, justifyContent: 'center' },
    pickerPlaceHolderText: { paddingLeft: 25, fontSize: 16, fontFamily: FONT_REGULAR },
    input: {
       // borderColor: "#d2d2d2",
        borderWidth: 1,
        borderRadius: 50,
        margin: 5, height: 50, justifyContent: 'center',
    },
    buttonStyle: {
        alignItems: 'center',
        flexDirection: 'row',
        height: 40,
        width: width * 0.9,
        borderRadius: 30
    },
    buttonTextStyle: {
        fontFamily: FONT_BOLD, textAlign: 'center', color: '#fff', width: "100%", fontSize: 18,
        textAlignVertical: 'center',
        // paddingTop: Platform.OS == "ios" ? 8 : 0
    },
    lottie: {
        width: 100,
        height: 100
    }
});

export default styles;
