import { Dimensions, Platform, StyleSheet } from "react-native";
const { width, height } = Dimensions.get("screen");
import fontStyle from 'app/config/styles';
const FONT_BOLD = fontStyle.fonts.FONT_BOLD;
const FONT_REGULAR = fontStyle.fonts.FONT_REGULAR;
const styles = StyleSheet.create(
    {
        buttonStyle: {
            alignItems: 'center',
            flexDirection: 'row',
            height: 40,
            width: width * 0.7,
            borderRadius: 30
        },
        buttonTextStyle: {
            fontFamily: FONT_BOLD, textAlign: 'center', color: '#fff', width: "100%", fontSize: 18,
            textAlignVertical: 'center',
            //  paddingTop: Platform.OS == "ios" ? 8 : 0
        },
        modalContainer: {
            flex: 1,
            backgroundColor: "#fff",
            // backgroundColor: "rgba(49,49,49, 0.7)",
            justifyContent: "center",
            alignItems: "center",
        },
        modalView: {
            // margin:50,
            // marginTop: 30,
            // marginBottom: 50,
            backgroundColor: "#fff",
            borderRadius: 10,
            width: 330,
            padding: 10,

            // borderColor: "black",
            // borderWidth: StyleSheet.hairlineWidth
        },
        pickerView: { borderWidth: 1, borderColor: "#d2d2d2", borderRadius: 50, marginVertical: 10 },
        pickerPlaceHolderText: { paddingLeft: 25, fontSize: 14, fontFamily: FONT_REGULAR },
        datePickerView: { justifyContent: 'center', borderColor: "#d2d2d2", width: "100%", borderWidth: 1, borderRadius: 50, height: 40, alignItems: 'center' },
        lottie: {
            width: 100,
            height: 100
        },
        errorText: {
            left: 20,
            color: 'red'
        },
        errorBox: {
            borderColor: 'red'
        },

        // Comment Box Container
        commentContainerView: { margin: 5, },
        personName: {
            fontSize: 12, color: '#484848',
            fontFamily: "Lemonada-Regular"
        },
        titleText: { fontFamily: "Lemonada-Bold", fontSize: 16, color: "#46C1D0" },
        descriptionText: { fontFamily: FONT_REGULAR, fontSize: 14, textAlign: 'center', color: "#484848" },
        ratingView: { marginTop: 5 },
        textInputStyle: {
            fontFamily: "Lemonada-Bold",
            padding: 5, textAlignVertical: 'top',
            //  height: 100,
            borderColor: '#A1DCE4', borderWidth: 1, borderRadius: 5
        },
    });
export default styles;
