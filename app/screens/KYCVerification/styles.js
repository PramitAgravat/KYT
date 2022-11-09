import { Dimensions, StyleSheet, Platform } from "react-native";
const { height, width } = Dimensions.get("screen");
import fontStyle from 'app/config/styles';
const FONT_BOLD = fontStyle.fonts.FONT_BOLD;
const FONT_REGULAR = fontStyle.fonts.FONT_REGULAR;
const cardElevation = 5;
var styles = StyleSheet.create({
    errorBox: {
        borderColor: 'red'
    },
    errorText: {
        left: 20,
        color: 'red'
    },
    titleTextStyle: { fontSize: 13, fontFamily: FONT_BOLD, color: "#808080" },
    placeHolderText: {
        fontFamily: FONT_REGULAR,
        fontSize: 18
    },
    textInputStyle: { fontFamily: FONT_REGULAR, fontSize: 18, paddingLeft: 25, flex: 1 },
    TextInputContainer: {
        fontFamily: FONT_BOLD,
        borderRadius: 50,
        flexDirection: 'row',
        width: width * .90,
        alignItems: 'center',
        // justifyContent: 'center',
        marginHorizontal: 10,
        marginVertical: 5,
        borderColor: "#d2d2d2",
        borderWidth: 0.5,
        height: 50,
        backgroundColor: "#fff",

        //only android
        /*elevation: cardElevation,

        //only iOs
        shadowOpacity: 0.5, //only works if backgroundColor defined
        shadowRadius: cardElevation, //shadow fuzzyness
        shadowOffset: { width: 1, height: cardElevation },*/
    },
    textStyle: {
        fontFamily: FONT_REGULAR,
        fontSize: 18,
        flex: 9,
        paddingLeft: 25,
    },
    addressTextInputStyle: {
        textAlignVertical: 'top',
        fontFamily: FONT_REGULAR, fontSize: 15,
        // color: "#439EAD",
        borderWidth: 1, borderColor: '#9CE1E5', borderRadius: 10, width: Dimensions.get('window').width * .90, height: 80,
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
        //  paddingTop: Platform.OS == "ios" ? 8 : 0
        textAlignVertical: 'center',
    },
    editImage: { backgroundColor: "transparent", height: 20, width: 20, alignSelf: 'center', justifyContent: 'center', right: 5, bottom: 5 },
    lottie: {
        width: 100,
        height: 100
    },
});

export default styles;
