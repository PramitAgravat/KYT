import { StyleSheet, Dimensions, Platform } from "react-native";
const { height, width } = Dimensions.get("screen");
import fontStyle from 'app/config/styles';
const FONT_BOLD = fontStyle.fonts.FONT_BOLD;
const FONT_REGULAR = fontStyle.fonts.FONT_REGULAR;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    fullScreen: {
        height: width * 0.50,
        width: "90%",
        borderRadius: 10,
        alignItems: 'center',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    },
    controls: {
        backgroundColor: '#fff',
        borderRadius: 5,
        position: 'absolute',
        bottom: 20,
        left: 20,
        right: 20,
    },
    progress: {
        flex: 1,
        flexDirection: 'row',
        borderRadius: 3,
        overflow: 'hidden',
    },
    innerProgressCompleted: {
        height: 20,
        backgroundColor: '#fff',
    },
    innerProgressRemaining: {
        height: 20,
        backgroundColor: '#2C2C2C',
    },
    generalControls: {
        flex: 1,
        flexDirection: 'row',
        borderRadius: 4,
        overflow: 'hidden',
        paddingBottom: 10,
    },
    rateControl: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    volumeControl: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    resizeModeControl: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    controlOption: {
        alignSelf: 'center',
        fontSize: 11,
        color: 'white',
        paddingLeft: 2,
        paddingRight: 2,
        lineHeight: 12,
    },
    videoTitleText: {
        flexWrap: 'wrap',
        marginVertical: 30,
        textAlign: 'center', 
        marginHorizontal: 40, fontSize: 18,
        color: '#333333',
        letterSpacing: 1,
        fontFamily: FONT_BOLD,
    },
    buttonStyle: {
        alignItems: 'center',
        flexDirection: 'row',
        height: 50,
        width: width * 0.9,
        borderRadius: 30
    },
    buttonTextStyle: {
        fontFamily: FONT_BOLD, textAlign: 'center', color: '#fff', width: "100%", fontSize: 18,
        textAlignVertical: 'center',
        // paddingTop: Platform.OS == "ios" ? 5 : 0 
    },
    alredyRegistrationText: { fontFamily: FONT_BOLD, fontSize: 16, color: "#000", position: 'absolute', bottom: 20 },
});

export default styles;
