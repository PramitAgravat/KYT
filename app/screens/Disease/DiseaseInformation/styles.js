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
        width: width,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent'
    },
    mainContentView: { width: "100%", marginTop: -80, alignSelf: 'center' },
    childContainer: { flexDirection: 'row', flex: 1 },
    firstComponentView: { margin: 5 },
    diseasesView: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        height: 30,
        // width: width * 0.45,
        borderRadius: 30
    },
    diseasesText: { margin: 10, color: "#fff", fontSize: 14, fontFamily: FONT_BOLD, },
    mainTitleTextStyle: { fontSize: 15, fontFamily: TITLE_TEXT },
    contentView: {
        width: Dimensions.get('window').width * .95,
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
    mainContainer: {
        marginTop: 10,
        // flex: 1,
        height: width * 0.4,
        justifyContent: 'center'
    },
    buttonStyle: {
        alignItems: 'center',
        flexDirection: 'row',
        height: 40,
        width: width * 0.6,
        borderRadius: 30
    },
    buttonTextStyle: {
        fontFamily: FONT_BOLD, textAlign: 'center', color: '#fff', width: "100%", fontSize: 18,
        textAlignVertical: 'center',
        // paddingTop: Platform.OS == "ios" ? 8 : 0
    },
    lottie: {
        width: 100,
        height: 100
    },
});

export default styles
