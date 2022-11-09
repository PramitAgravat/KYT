import { Dimensions, StyleSheet } from "react-native";
const cardElevation = 5;
const { height, width } = Dimensions.get("screen");
import fontStyle from 'app/config/styles';
const FONT_BOLD = fontStyle.fonts.FONT_BOLD;
const FONT_REGULAR = fontStyle.fonts.FONT_REGULAR;

var styles = StyleSheet.create({
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
    input: {
        borderColor: "#d2d2d2", borderWidth: 1, borderRadius: 50, margin: 5, height: 50, justifyContent: 'center',
    },
    TextInputContainer: {
        borderRadius: 50,
        flexDirection: 'row',
        width: Dimensions.get('window').width * .95,
        alignItems: 'center',
        // justifyContent: 'center',
        marginHorizontal: 10,
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
    headerBGImage: { width: "180%", left: -140, top: -130 },
    headerView: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center', flexDirection: 'row' },
    leftArrow: { position: 'absolute', alignSelf: 'center', left: 10 },
    headerText: { alignSelf: 'center', color: '#fff', fontSize: 16, fontWeight: 'bold' },
    contentView: { width: "100%", marginTop: -80 },
    buttonStyle: {
        alignItems: 'center',
        flexDirection: 'row',
        height: 50,
        width: width * 0.9,
        borderRadius: 30
    },
    // { borderWidth: 2, borderColor: '#d2d2d2', borderRadius: 50, marginHorizontal: 10, margin: 5, height: 50, justifyContent: 'center' }}>
    pickerView: { borderWidth: 2, borderColor: '#d2d2d2', borderRadius: 50, marginHorizontal: 10, margin: 5, height: 50, justifyContent: 'center' },
    pickerPlaceHolderText: { paddingLeft: 25, fontSize: 16, fontFamily: FONT_REGULAR },
    // pickerView: { borderWidth: 2, borderColor: '#d2d2d2', borderRadius: 50, marginHorizontal: 10, margin: 5, height: 50, justifyContent: 'center' },
    // pickerPlaceHolderText: { paddingLeft: 25, fontSize: 16, fontFamily: FONT_REGULAR },
    buttonTextStyle: {
        fontFamily: FONT_BOLD, textAlign: 'center', color: '#fff', width: "100%", fontSize: 18,
        textAlignVertical: 'center',
        // paddingTop: Platform.OS == "ios" ? 8 : 0
    },
});

export default styles;
