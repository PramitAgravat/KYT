import { Dimensions, StyleSheet } from "react-native";
const cardElevation = 5;
const { height, width } = Dimensions.get("screen");
const AVATAR_SIZE = 100;
const ROW_HEIGHT = 50;
import fontStyle from 'app/config/styles';
const FONT_BOLD = fontStyle.fonts.FONT_BOLD;
const FONT_REGULAR = fontStyle.fonts.FONT_REGULAR;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black'
    },
    background: {
        top: "-35%",
        left: "-40%",
        width: "190%",
        height: "110%"
    },
    stickyHeader: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: "#4EA6A8"
    },
    stickySectionText: {
        color: 'white',
        fontSize: 20,
    },
    parallaxHeader: {
        alignItems: 'center',
        flex: 1,
        flexDirection: 'column',
        paddingTop: 5
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: AVATAR_SIZE / 2
    },
    row: {
        overflow: 'hidden',
        paddingHorizontal: 10,
        backgroundColor: 'white',
        justifyContent: 'center'
    },
    rowText: {
        fontSize: 20
    },
    contentView: {
        alignItems: 'center',
        flexDirection: "row",
        width: width * .90,
        margin: 5,
        borderColor: "#d2d2d2",
        borderWidth: 0.5,
        height: width * 0.15,
        backgroundColor: "#fff",

        //only android
        elevation: cardElevation,

        //only iOs
        shadowOpacity: 0.5, //only works if backgroundColor defined
        shadowRadius: cardElevation, //shadow fuzzyness
        shadowOffset: { width: 1, height: cardElevation },
    },
    walletImage: { width: width * .30, height: width * .25 },
    headerView: { position: 'absolute', top: -20, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center' },
    leftArrow: { position: 'absolute', alignSelf: 'center', left: 10 },
    hederText: { fontFamily: FONT_BOLD, alignSelf: 'center', color: '#fff', },
    infoImage: { width: 20, height: 20, },
    redeemPointsButtonView: { justifyContent: 'center', alignItems: 'center', margin: 20 },

    redeemPointsButtonText: {
        fontSize: 15,
        textAlign: 'center',
        alignSelf: 'center',
        color: '#fff',
        fontWeight: 'bold',
        backgroundColor: 'transparent',
    },
    buttonStyle: {
        alignItems: 'center',
        flexDirection: 'row',
        height: 40,
        width: width * 0.9,
        borderRadius: 30
    },
    titleTextStyle: { fontFamily: FONT_BOLD, fontSize: 16 },
    contentTextStyle: { fontFamily: FONT_REGULAR, fontSize: 16 },
    buttonTextStyle: {
        fontFamily: FONT_BOLD, textAlign: 'center', color: '#fff', width: "100%", fontSize: 18,
        textAlignVertical: 'center',
        // paddingTop: Platform.OS == "ios" ? 8 : 0 
    },
    titleTextView: { fontFamily: FONT_BOLD, color: "#439EAD", margin: 5, fontSize: 18 },
    flatListView: { backgroundColor: 'transparent', marginBottom: 5 },
    trophyImage: { width: width * 0.1, height: width * 0.1, flex: 0.2 },
    // titleTextStyle: { fontWeight: 'bold', fontSize: 16, color: "#000" },
    dateTimeTextStyle: { fontFamily: FONT_REGULAR, color: "#5B5B5B", fontSize: 12, },
    amountTextStyle: { fontFamily: FONT_REGULAR, flex: 0.2, color: "#5FB3A2" },
    infoAlertTitle: { fontFamily: FONT_BOLD, fontSize: 18, alignSelf: 'center' },
    infoAlertContent: { fontFamily: FONT_REGULAR, fontSize: 14, marginVertical: 5 },


    modalContainer: {
        flex: 1,
        // backgroundColor:"#000",
        backgroundColor: "rgba(49,49,49, 0.7)",
        justifyContent: "center",
        alignItems: "center",
    },
    modalView: {
        // margin:50,
        marginTop: 30,
        marginBottom: 50,
        backgroundColor: "#fff",
        borderRadius: 10,
        width: 330,
        padding: 10,

        // borderColor: "black",
        // borderWidth: StyleSheet.hairlineWidth
    },
    scrollModal: {

    },
});

export default styles;
