import { Dimensions, StyleSheet } from "react-native";
const { height, width } = Dimensions.get("screen");
import fontStyle from 'app/config/styles';
const cardElevation = 5;
const FONT_BOLD = fontStyle.fonts.FONT_BOLD;
const FONT_REGULAR = fontStyle.fonts.FONT_REGULAR;

const styles = StyleSheet.create({
    container: {
        width: width,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
    },
    linearGradient: {
        flex: 1,
        paddingLeft: 15,
        paddingRight: 15,
        borderRadius: 50,
        // height:100
    },
    genderLinearGradient: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'row',
        height: 30,
        width: 70,
        borderRadius: 20
    },
    genderTextView: {
        width: 70, flexDirection: 'row', alignItems: 'center', height: 30, borderRadius: 20, margin: 3
    },
    genderTextStyle: {
        textAlign: 'center', width: "100%", fontSize: 14
    },
    containerStyle: {
        justifyContent: 'center',
        bottom: 70,
        alignSelf: 'center',
        width: width,
        overflow: 'hidden',
        height: width / 2,
    },
    selectView: {
        backgroundColor: 'transparent',
    },
    input: {
        borderColor: "#d2d2d2", borderWidth: 1, borderRadius: 50, margin: 5, height: 50,
    },
    inputStyle: {
        width: Dimensions.get('window').width * .90,
    },
    center: {
        width: Dimensions.get('window').width,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textInput: {
        fontFamily: FONT_REGULAR,
        fontSize: 18,
        flex: 9,
        paddingLeft: 25,
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
    iconStyle: {
        flex: 1,
        height: 30,
        width: 30,
        marginRight: 10,
        resizeMode: 'contain',
    },
    checkBoxView: { marginHorizontal: 20, height: 30, width: 30 },
    textStyle: {
        fontFamily: FONT_REGULAR,
        fontSize: 18,
        flex: 9,
        paddingLeft: 25,
    },
    headerBGImage: { width: "180%", left: -140, top: -130 },
    headerText: { alignSelf: 'center', color: '#fff', fontSize: 16, fontWeight: 'bold' },
    headerView: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center', flexDirection: 'row' },
    headerImageView: { position: 'absolute', alignSelf: 'center', left: 10 },
    headerImage: { width: 20, height: 20, },
    contentView: { width: "100%", marginTop: -80 },
    genderView: { flexDirection: 'row', right: 20, position: 'absolute', alignItems: 'center' },
    buttonStyle: {
        alignItems: 'center',
        flexDirection: 'row',
        height: 40,
        width: width * 0.9,
        borderRadius: 30
    },
    buttonTextStyle: {
        fontFamily: FONT_BOLD,
        textAlign: 'center', color: '#fff', width: "100%", fontSize: 18,
        textAlignVertical: 'center',
        // paddingTop: Platform.OS == "ios" ? 8 : 0
    },
    alreadyRegisterView: { justifyContent: 'center', alignItems: 'center', marginTop: 30 },
    alredyRegistrationText: { fontFamily: FONT_BOLD, fontSize: 16, color: "#000", position: 'absolute', bottom: 10 },
    // alreadtRegisterText: { fontSize: 16, color: "#000" },
    loginText: { fontWeight: 'bold', fontSize: 16, color: '#3992B3' },
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
    imagew: {
        width: Dimensions.get('window').width * .95,
        height: 50,
    }
});

export default styles;