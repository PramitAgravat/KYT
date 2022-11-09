import { Dimensions, StyleSheet } from "react-native";
const AVATAR_SIZE = 100;
const ROW_HEIGHT = 50;
const PARALLAX_HEADER_HEIGHT = 220;
const cardElevation = 5;
const { height, width } = Dimensions.get("window");
import fontStyle from 'app/config/styles';
const FONT_BOLD = fontStyle.fonts.FONT_BOLD;
const FONT_REGULAR = fontStyle.fonts.FONT_REGULAR;
const TITLE_TEXT = fontStyle.fonts.TITLE_TEXT;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black'
    },
    background: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: window.width,
        height: PARALLAX_HEADER_HEIGHT
    },
    stickySection: {
        alignItems: 'center',
        // height: STICKY_HEADER_HEIGHT,
        // width: 300,
        left: 10,
        justifyContent: 'center'
    },
    stickySectionText: {
        color: 'white',
        fontSize: 20,
        margin: 10
    },
    fixedSection: {
        position: 'absolute',
        bottom: 10,
        right: 10
    },
    fixedSectionText: {
        color: '#999',
        fontSize: 20
    },
    parallaxHeader: {
        // alignItems: 'center',
        // flex: 1,
        flexDirection: 'column',
        paddingTop: 5
    },
    avatar: {
        alignItems: 'center',
        // marginBottom: 10,
        borderRadius: AVATAR_SIZE / 2
    },
    profileTitle: {
        // textAlign: 'center',
        // flex: 1,
        fontFamily: TITLE_TEXT,
        color: 'white',
        fontSize: 18,
        paddingVertical: 5,
    },
    userName: {
        textAlign: 'center',
        fontFamily: FONT_BOLD,
        color: 'white',
        fontSize: 18,
        // paddingVertical: 5,
    },
    row: {
        overflow: 'hidden',
        paddingHorizontal: 10,
        height: ROW_HEIGHT,
        backgroundColor: 'white',
        borderColor: '#ccc',
        borderBottomWidth: 1,
        justifyContent: 'center'
    },
    rowText: {
        fontSize: 20
    },
    saveReminderButtonText: {
        justifyContent: 'center',
        // flex: 1,
        // position: 'absolute',
        fontSize: 15,
        // left: -30,
        // alignSelf: 'center',
        color: '#fff',
        fontWeight: 'bold',
        backgroundColor: 'transparent',
    },
    saveReminderButtonView: {
        justifyContent: 'center',
        backgroundColor: "#d2d2d2", width: "100%", height: 60
    },
    containerStyle: {
        justifyContent: 'center',
        alignSelf: 'center',
        width: width,
        overflow: 'hidden',
        height: width / 2,
        // backgroundColor: '#d2d2d2',
    },
    mainContentView: { width: "100%", alignSelf: 'center' },

    backgroundImage: { width: "190%", left: "-55%", top: "-65%" },
    headerView: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center' },
    profileView: { justifyContent: 'center', alignSelf: 'center', height: (150 * 0.75), width: (150 * 0.75), backgroundColor: "#efeeee", borderRadius: 150, marginVertical: 0 },
    profile: { backgroundColor: "transparent", height: (150 * 0.75), width: (150 * 0.75), alignSelf: 'center', },
    photoTappedStyle: { position: 'absolute', right: 5, bottom: 5 },
    whiteBGImage: { backgroundColor: "transparent", height: 30, width: 30, alignSelf: 'center', justifyContent: 'center', },
    editImage: { backgroundColor: "transparent", height: 20, width: 20, alignSelf: 'center', justifyContent: 'center', right: 5, bottom: 5 },
    headerEditImage: { backgroundColor: "transparent", height: 20, width: 20, alignSelf: 'center', justifyContent: 'center', right: 15, bottom: 5 },
    contentView: {
        // alignItems: 'center',
        width: Dimensions.get('window').width * .90,
        margin: 5,
        borderColor: "#d2d2d2",
        borderWidth: 0.5,
        // height: 180,
        backgroundColor: "#fff",

        //only android
        elevation: cardElevation,

        //only iOs
        shadowOpacity: 0.5, //only works if backgroundColor defined
        shadowRadius: cardElevation, //shadow fuzzyness
        shadowOffset: { width: 1, height: cardElevation },
    },
    sendMeAlertContainer: { justifyContent: 'center', width: "90%", height: 60 },
    alertView: { flexDirection: 'row', height: 30, right: 10, position: 'absolute' },
    genderLinearGradient: {
        // flex: 1,
        alignItems: 'center',
        flexDirection: 'row',
        height: 30,
        width: 50,
        // paddingLeft: 15,
        // paddingRight: 15,
        borderRadius: 20
    },
    genderTextView: {
        width: 70, flexDirection: 'row', alignItems: 'center', height: 30, borderRadius: 20, margin: 3
    },
    genderTextStyle: {
        fontWeight: 'bold',
        textAlign: 'center', color: '#CCCACB', width: "100%", fontSize: 14
    },
    dividerView: { marginVertical: 5, height: 1, width: "100%", backgroundColor: "#898989" },
    // First Component
    firstComponentView: { margin: 10 },
    mainTitleTextStyle: { fontSize: 15, fontFamily: TITLE_TEXT },
    imageBackground: { width: width * .25, height: 100, padding: 5, justifyContent: 'center', },
    titleTextStyle: { fontSize: 13, fontFamily: FONT_REGULAR, color: "#808080" },
    addressTextInputStyle: {
        width: Dimensions.get('window').width * .65,
        textAlignVertical: 'top',
        fontFamily: FONT_REGULAR, fontSize: 13,
        // color: "#439EAD",
        // borderWidth: 1, borderColor: '#9CE1E5', borderRadius: 10, width: Dimensions.get('window').width * .80, height: 60,
    },
    textInputStyle: {
        left: 10,
        fontFamily: FONT_REGULAR, fontSize: 13,
        borderWidth: 1, borderColor: '#9CE1E5', borderRadius: 10, width: Dimensions.get('window').width * .55, height: 40,
    },
    cardNumberTextInputStyle: {
        padding: 0, margin: 0,
        alignItems: 'center',
        fontFamily: FONT_REGULAR, fontSize: 15,
        height: 30,
    },

    /*
         fontFamily: 'MyriadPro-Bold', fontSize: 16, color: "#439EAD", left: 10,
       borderWidth: 1, borderColor: '#9CE1E5', borderRadius: 10, width: Dimensions.get('window').width * .50, height: 40,
    */
    childContainer: { flexDirection: "row", alignItems: 'center', margin: 5 },
    detailsTextStyle: { color: "#898989" },

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


    buttonContainer: {
        alignSelf: 'center',
        justifyContent: 'center',
        width: "90%", height: 60
    },

    buttonBackgroundImage: { width: "100%", position: 'absolute', height: 50 },
    buttonContent: { width: "100%", flexDirection: 'row', alignItems: 'center' },
    buttonText: { fontFamily: FONT_BOLD, color: "#333", left: 15, },
    buttonImg: { width: 25, right: 15, position: 'absolute' },
    modalContainer: {
        marginVertical: 10,
        flex: 1,
        // backgroundColor:"#000",
        backgroundColor: "rgba(49,49,49, 0.7)",
        justifyContent: "center",
        alignItems: "center",
    },
    modalView: {
        // margin:50,
        marginTop: 30,
        marginBottom: 0,
        // backgroundColor: "#fff",
        borderRadius: 10,
        // width: 330,
        marginHorizontal: 10,
        // padding: 10,

        // borderColor: "black",
        // borderWidth: StyleSheet.hairlineWidth
    },
    scrollModal: {

    },
    lottie: {
        width: 100,
        height: 100
    },
    applyButtonText: {
        // position: 'absolute',
        fontSize: 16,
        textAlign: 'center',
        alignSelf: 'center',
        color: '#fff',
        fontFamily: FONT_BOLD,
        backgroundColor: 'transparent',
    },
    cancelButton: { backgroundColor: "#343434", height: 35, width: 130, borderRadius: 40, justifyContent: 'center', marginVertical: 10, alignItems: 'center', alignSelf: 'center' },
});

export default styles
