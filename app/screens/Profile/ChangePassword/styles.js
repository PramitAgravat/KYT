import { Dimensions, StyleSheet } from 'react-native';
import fontStyle from 'app/config/styles';
const { height, width } = Dimensions.get("screen");
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
        marginTop: 50,
        height: 50,
        flex: 1,
        justifyContent: 'center',
        paddingLeft: 15,
        paddingRight: 15,
        borderRadius: 50
    },
    buttonText: {
        fontWeight: 'bold',
        fontSize: 18,
        // fontFamily: 'Gill Sans',
        textAlign: 'center',
        margin: 10,
        color: '#ffffff',
        backgroundColor: 'transparent',
    },
    semiCircle: {
        width: "100%",
        height: 100,
        // borderTopRightRadius: 50,
        // borderBottomRightRadius: 50,
        borderBottomRightRadius: 1000,
        borderBottomLeftRadius: 1000,
        backgroundColor: "#d2d2d2",
        justifyContent: 'center',
        alignItems: 'center',
    },
    wave: {
        // borderWidth: StyleSheet.hairlineWidth,
        transform: [{ rotate: '180deg' }],
        width: 1000,
        // height: 300,
        aspectRatio: 1,
        overflow: 'hidden',
        backgroundColor: 'white',
    },
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
    backgroundImage: { width: "180%", left: -140, top: -130 },
    headerView: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center', flexDirection: 'row' },
    leftArrow: { position: 'absolute', alignSelf: 'center', left: 10 },
    hederText: { alignSelf: 'center', color: '#fff', fontSize: 16, fontWeight: 'bold' },
    sliderContainerStyle: {
        borderRadius: width,
        height: width * 2,
        width: width * 2,
        marginLeft: -(width / 2),
        position: 'absolute',
        overflow: 'hidden',
        bottom: 10,
    },
    input: {
        fontFamily: FONT_BOLD,
        borderColor: "#d2d2d2", borderWidth: 1, borderRadius: 50, margin: 5, height: 50, justifyContent: 'center',
    },
    placeHolderText: {
        fontFamily: FONT_REGULAR,
        fontSize: 18
    },
    textInputStyle: { fontFamily: FONT_REGULAR, fontSize: 18, paddingLeft: 25, flex: 1 },
    TextInputContainer: {
        fontFamily: FONT_BOLD,
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
    menuButtonStyle: { width: 20, height: 20, right: -10, marginTop: 10 },

    forgotPasswordText: {
        marginVertical: 5,
        fontFamily: FONT_REGULAR,
        color: '#C2C0C0',
        fontSize: 18,
    },

    // submitButtonView: {
    //     marginVertical: 50, flexDirection: 'row',
    //     justifyContent: 'center', alignItems: 'center', flex: 1
    // },
    // submitButtonBGImage: { width: 100, height: 40, position: 'absolute' },
    // submitButtonText: {
    //     fontFamily: 'MyriadPro-Bold', fontSize: 16,
    //     textAlign: 'center',
    //     alignSelf: 'center',
    //     color: '#fff',
    //     backgroundColor: 'transparent',
    // },
    forgotPasswordView: { flex: 1, top: 5, alignItems: 'flex-end', marginRight: 20 },
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
    buttonStyle: {
        alignItems: 'center',
        flexDirection: 'row',
        height: 50,
        width: width * 0.9,
        borderRadius: 30
    },
    buttonTextStyle: { fontFamily: FONT_BOLD, textAlign: 'center', color: '#fff', width: "100%", fontSize: 18, textAlignVertical: 'center', },
    alreadyLoginView: { justifyContent: 'center', alignItems: 'center', marginTop: 30 },
    alreadyLoginText: { fontFamily: FONT_BOLD, fontSize: 16, color: "#000", position: 'absolute', bottom: 10 },
    registrationText: { fontWeight: 'bold', fontSize: 16, color: '#3992B3' },
});
export default styles;
