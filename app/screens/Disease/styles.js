import { Dimensions, StyleSheet } from 'react-native';
const { height, width } = Dimensions.get("screen");
const cardElevation = 5;
import fontStyle from 'app/config/styles';
const FONT_BOLD = fontStyle.fonts.FONT_BOLD;
const FONT_REGULAR = fontStyle.fonts.FONT_REGULAR;

const styles = StyleSheet.create({
    containerStyle: {
        // flex:0.2,
        justifyContent: 'center',
        bottom: 20,
        alignSelf: 'center',
        width: width,
        overflow: 'hidden',
        height: width / 2,
        // backgroundColor: '#d2d2d2',
    },
    backgroundImage: { width: "170%", left: "-30%", top: "-85%" },
    headerView: { position: 'absolute', top: -100, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center', flexDirection: 'row' },
    leftArrow: { position: 'absolute', left: 20 },
    menuButtonStyle: { width: 20, height: 20, },
    hederText: { fontFamily: FONT_BOLD, alignSelf: 'center', color: '#fff', fontSize: 18, },
    // diseasesView: { flexDirection: 'row', justifyContent: 'center' },
    mainContainer: {
        marginTop: -80,
        // flex: 1,
        height: width * 0.5,
        // height: 150,
        justifyContent: 'center'
    },
    childContainer: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', flex: 1 },
    flatListView: { alignItems: 'center' },
    diseasesView: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        height: width * 0.09,
        // width: width * 0.45,
        borderRadius: width * 0.10,
    },
    diseasesText: { marginHorizontal: 10, color: "#fff", fontSize: 14, fontFamily: FONT_BOLD, lineHeight: 14 * 1 },
    // Menu Style
    mainView: { margin: 10, flexDirection: 'row', alignItems: 'center' },
    imageContainer: { justifyContent: 'center', alignItems: 'center', marginHorizontal: 5 },
    imageBG: { width: 40, height: 40 },
    icon: { position: 'absolute', width: 25, height: 30 },
    textStyle: { color: "#000", fontFamily: FONT_BOLD, marginLeft: 30, textAlign: 'center' },
    buttonStyle: {
        alignItems: 'center',
        flexDirection: 'row',
        height: 50,
        width: width * 0.8,
        borderRadius: 30
    },
    buttonTextStyle: {
        fontFamily: FONT_BOLD, textAlign: 'center', color: '#fff', width: "100%", fontSize: 18,
        textAlignVertical: 'center',
        // paddingTop: Platform.OS == "ios" ? 8 : 0
    },
    selectedImage: { opacity: 0.4 },
    input: {
        width: '98%', borderColor: "#d2d2d2", borderWidth: 1, borderRadius: 50,
        // justifyContent: 'center',
    },
    btn: {
        margin: 2,
        padding: 2,
        backgroundColor: "aqua",
    },
    btnDisable: {
        margin: 2,
        padding: 2,
        backgroundColor: "gray",
    },
    btnText: {
        margin: 2,
        padding: 2,
    },
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

    tabs: {
        flexDirection: 'row',
    },
    tab: {
        flex: 1,
        height: 30,
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    tabTitle: {
        color: '#EEE',
    },
    tabTitleActive: {
        fontWeight: '700',
        color: '#FFF',
    },
    footer: {
        width,
        height: 50,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        paddingHorizontal: 10,
        paddingVertical: 5,
    },
    footerButton: {
        flexDirection: 'row',
        marginLeft: 15,
    },
    footerText: {
        fontSize: 16,
        color: '#FFF',
        textAlign: 'center',
    },
    modalContainer: {
        flex: 1,
        // backgroundColor:"#000",
        backgroundColor: "rgba(49,49,49, 0.7)",
        justifyContent: "center",
        alignItems: "center",
    },
    modalView: {
        justifyContent: 'center',
        alignItems: 'center',
        // margin:50,
        marginTop: 30,
        marginBottom: 50,
        backgroundColor: "#fff",
        borderRadius: 40,
        width: 330,
        // padding: 10,

        // borderColor: "black",
        // borderWidth: StyleSheet.hairlineWidth
    },
    placeholderStyle: { color: "#439EAD", fontFamily: FONT_REGULAR, fontSize: 16, },
    textInputStyle: { fontFamily: FONT_BOLD, fontSize: 16, color: "#439EAD", borderWidth: 2, borderColor: '#9CE1E5', borderRadius: 50, width: Dimensions.get('window').width * .80, height: 40, paddingLeft: 25, paddingVertical: 0, marginVertical: 20 },
});

export default styles;
