import { Dimensions, Platform, StyleSheet } from "react-native";
const { width, height } = Dimensions.get("screen");
import fontStyle from 'app/config/styles';
const FONT_BOLD = fontStyle.fonts.FONT_BOLD;
const FONT_REGULAR = fontStyle.fonts.FONT_REGULAR;
const styles = StyleSheet.create(
    {
        // buttonStyle: {
        //     alignItems: 'center',
        //     flexDirection: 'row',
        //     height: 40,
        //     width: width * 0.7,
        //     borderRadius: 30
        // },
        // buttonTextStyle: {
        //     fontFamily: FONT_BOLD, textAlign: 'center', color: '#fff', width: "100%", fontSize: 18,
        //     textAlignVertical: 'center',
        //     //  paddingTop: Platform.OS == "ios" ? 8 : 0
        // },
        buttonStyle: {
            alignItems: 'center',
            flexDirection: 'row',
            height: 35,
            width: width * 0.4,
            borderRadius: 30
        },
        buttonTextStyle: {
            fontFamily: FONT_REGULAR, textAlign: 'center', color: '#fff', width: "100%", fontSize: 15,
            textAlignVertical: 'center',
            // paddingTop: Platform.OS == "ios" ? 8 : 0
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
        pickerView: { borderWidth: 1, borderColor: "#d2d2d2", borderRadius: 50, margin: 20, width: "100%", alignSelf: 'center' },
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
        genderLinearGradient: {
            justifyContent: 'center',
            // margin: 10,
            alignItems: 'center',
            flexDirection: 'row',
            height: 40,
            width: 130,
            borderRadius: 20
        },
        applyButtonView: { justifyContent: 'center', alignItems: 'center', margin: 20 },
        applyButtonBGImage: { flex: 0.5, height: 40, width: 220, justifyContent: 'center', alignItems: 'center' },
        applyButtonText: {
            // position: 'absolute',
            fontSize: 16,
            textAlign: 'center',
            alignSelf: 'center',
            color: '#fff',
            fontFamily: FONT_BOLD,
            backgroundColor: 'transparent',
        },
        alertDialogButtons: { flexDirection: 'row', justifyContent: 'center', width: "100%" },
        cancelButton: { backgroundColor: "#343434", height: 40, width: 130, borderRadius: 40, justifyContent: 'center', alignItems: 'center', alignSelf: 'center' },
    });
export default styles;
