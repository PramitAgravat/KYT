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
        backgroundColor: 'transparent'
    },
    leftArrow: { alignSelf: 'center', marginHorizontal: 20, },
    hederText: { fontFamily: FONT_BOLD, alignSelf: 'center', color: '#fff', fontSize: 20, },
    mainContentView: { width: "100%", marginTop: -80, alignSelf: 'center' },
    contentView: {
        alignItems: 'center',
        flexDirection: "row",
        width: width * .90,
        margin: 5,
        borderColor: "#d2d2d2",
        borderWidth: 0.5,
        height: width * 0.25,
        backgroundColor: "#fff",

        //only android
        elevation: cardElevation,

        //only iOs
        shadowOpacity: 0.5, //only works if backgroundColor defined
        shadowRadius: cardElevation, //shadow fuzzyness
        shadowOffset: { width: 1, height: cardElevation },
    },
    titleTextStyle: { fontFamily: FONT_BOLD, fontSize: 16 },
    trophyImage: { width: width * 0.1, height: width * 0.1, flex: 0.2 },
    // titleTextStyle: { fontWeight: 'bold', fontSize: 16, color: "#000" },
    dateTimeTextStyle: { fontFamily: FONT_REGULAR, color: "#5B5B5B", fontSize: 12, },
    stickyHeader: {
        height: 50,
        width: "100%",
        // justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: "#4EA6A8"
    },
    stickySectionText: {
        color: 'white',
        fontSize: 20,
    },
});
export default styles;
