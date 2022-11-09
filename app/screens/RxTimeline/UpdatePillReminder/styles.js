import { Dimensions, StyleSheet } from "react-native";
const cardElevation = 5;
const { height, width } = Dimensions.get("screen");
import fontStyle from 'app/config/styles';
const FONT_BOLD = fontStyle.fonts.FONT_BOLD;
const FONT_REGULAR = fontStyle.fonts.FONT_REGULAR;
const styles = StyleSheet.create({
    containerStyle: {
        // flex:0.2,
        justifyContent: 'center',
        bottom: 70,
        alignSelf: 'center',
        width: width,
        overflow: 'hidden',
        height: width / 2,
        // backgroundColor: '#d2d2d2',
    },
    placeholderStyle: { color: "#439EAD", fontFamily: FONT_REGULAR, fontSize: 16, },
    textInputStyle: { fontFamily: FONT_BOLD, fontSize: 16, color: "#d2d2d2", borderWidth: 2, borderColor: '#9CE1E5', borderRadius: 50, width: Dimensions.get('window').width * .80, height: 40, paddingLeft: 25 },
    input: {
        borderColor: "#d2d2d2", borderWidth: 1, borderRadius: 50, margin: 5, height: 50, justifyContent: 'center',
    },
    TextInputContainer: {
        borderRadius: 50,
        flexDirection: 'row',
        width: Dimensions.get('window').width * .80,
        alignItems: 'center',
        // justifyContent: 'center',
        // marginHorizontal: 10,
        marginVertical: 5,
        borderColor: "#d2d2d2",
        borderWidth: 0.5,
        height: 50,
        backgroundColor: "#fff",

        //only android
        elevation: cardElevation,

        //only iOs
        shadowOpacity: 0.5, //only works if backgroundColor defined
        shadowRadius: cardElevation, //shadow fuzzyness
        shadowOffset: { width: 1, height: cardElevation },
    },
    genderLinearGradient: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'row',
        height: 40,
        width: 50,
        // paddingLeft: 15,
        // paddingRight: 15,
        borderRadius: 20
    },
    genderTextView: {
        width: 70, flexDirection: 'row', alignItems: 'center', height: 30, borderRadius: 20, margin: 3
    },
    genderTextStyle: {
        textAlign: 'center', color: '#CCCACB', width: "100%", fontSize: 14
    },

    saveReminderButtonView: { justifyContent: 'center', alignItems: 'center', margin: 20 },

    saveReminderButtonText: {
        // position: 'absolute',
        fontSize: 15,
        textAlign: 'center',
        alignSelf: 'center',
        color: '#fff',
        fontWeight: 'bold',
        backgroundColor: 'transparent',
    },
    // headerBGImage: { width: "180%", left: -140, top: -130 },
    // headerView: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center', flexDirection: 'row' },
    // leftArrow: { position: 'absolute', alignSelf: 'center', left: 10 },
    // headerText: { alignSelf: 'center', color: '#fff', fontSize: 16, fontWeight: 'bold' },
    mainContentView: { width: "100%", marginTop: -80, alignSelf: 'center' },

    contentView: {
        marginTop: 20,
        width: width * .85,
        margin: 5,
        borderColor: "#d2d2d2",
        borderWidth: 0.5,
        // height: 180,
        backgroundColor: "#fff",
        borderRadius: 10,
        //only android
        elevation: cardElevation,

        //only iOs
        shadowOpacity: 0.5, //only works if backgroundColor defined
        shadowRadius: cardElevation, //shadow fuzzyness
        shadowOffset: { width: 1, height: cardElevation },
    },
    medicineColorTextTile: { marginVertical: 10, fontFamily: FONT_BOLD, fontSize: 16, left: 5 },
    colors: { marginRight: 5, marginVertical: 5, height: 20, width: 20, borderRadius: 20 },
    pillReminderView: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', margin: 5 },
    pillReminderText: { fontFamily: FONT_BOLD, fontSize: 16, top: 5 },
    atView: { borderWidth: 2, borderColor: '#9CE1E5', borderRadius: 50, width: Dimensions.get('window').width * .35, height: 40, justifyContent: 'center', },
    at: {
        fontFamily: FONT_BOLD, fontSize: 16, color: "#439EAD", textAlign: 'center',
        textAlignVertical: 'center',
        // paddingTop: Platform.OS == "ios" ? 8 : 0 
    },
    reminderView: { flexDirection: 'row', height: 30 },
    buttonStyle: {
        alignItems: 'center',
        flexDirection: 'row',
        height: 50,
        width: width * 0.8,
        borderRadius: 30
    },
    reFillReminderText: { fontFamily: FONT_BOLD, fontSize: 16, color: "#439EAD", borderWidth: 2, borderColor: '#9CE1E5', borderRadius: 50, width: Dimensions.get('window').width * .35, height: 40, },
    buttonTextStyle: {
        fontFamily: FONT_BOLD, textAlign: 'center', color: '#fff', width: "100%", fontSize: 18,
        //  paddingTop: Platform.OS == "ios" ? 8 : 0 
        textAlignVertical: 'center',
    },
    textStyle: {
        fontSize: 14,
        flex: 9,
        color: "#000"
    },
    scheduleText: { margin: 10, fontFamily: FONT_REGULAR, fontSize: 16, color: "#439EAD" },
    pickerView: { borderWidth: 2, borderColor: '#9CE1E5', borderRadius: 50, margin: 5, height: 40, justifyContent: 'center' },
    pickerPlaceHolderText: { paddingLeft: 25, fontSize: 16, fontFamily: FONT_REGULAR },
    errorText: {
        left: 20,
        color: 'red'
    },
    errorBox: {
        borderColor: 'red'
    },
    lottie: {
        width: 100,
        height: 100
    },
});

export default styles;
