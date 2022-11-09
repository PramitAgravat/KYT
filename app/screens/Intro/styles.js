import { Dimensions, StyleSheet } from "react-native";
const { height, width } = Dimensions.get("screen");
import fontStyle from 'app/config/styles';
const INTRO_SCREEN_FONT= fontStyle.fonts.INTRO_SCREEN_FONT;
const FONT_BOLD = fontStyle.fonts.FONT_BOLD;
const FONT_REGULAR = fontStyle.fonts.FONT_REGULAR;

const styles = StyleSheet.create({
    intoScreenImage: { height: width * 0.7, width: width * 0.7, alignSelf: "center" },
    title: {
        fontSize: 22,
        color: '#333333',
        letterSpacing: 1,
        backgroundColor: 'transparent',
        fontFamily: FONT_BOLD,
        textAlign: 'center',
        // marginTop:35,
        // margin: 15,
        // marginTop: width * 0.1,
        // marginVertical: width * 0.1,
        marginBottom: 20,
        marginHorizontal: 25
    },
    waveContainer: { height: 50, flex: 0.2 },
    wave: {
        transform: [{ rotate: '180deg' }],
        width: 1000,
        aspectRatio: 1,
        overflow: 'hidden',
        backgroundColor: 'white',
    },
    container: {
        width: width,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
    },
    buttonView:
        { backgroundColor: "#d2d2d2", height: 50 },
    buttonImage: { width: width * 1.5, height: 80, left: -40 },
    buttonText: {
        position: 'absolute',
        bottom: 5,
        fontSize: 20,
        textAlign: 'center',
        alignSelf: 'center',
        color: '#fff',
        fontWeight: 'bold',
    }
});

export default styles;

