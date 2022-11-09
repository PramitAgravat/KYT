import { Dimensions, StyleSheet } from "react-native";
const { height, width } = Dimensions.get("screen");
import fontStyle from 'app/config/styles';
const FONT_BOLD = fontStyle.fonts.FONT_BOLD;
const FONT_REGULAR = fontStyle.fonts.FONT_REGULAR;

var styles = StyleSheet.create({
    containerStyle: {
        // flex:0.2,
        justifyContent: 'center',
        bottom: 10,
        alignSelf: 'center',
        width: width,
        overflow: 'hidden',
        height: width / 2,
        // backgroundColor: '#d2d2d2',
    },
    backgroundImage: { width: "170%", left: "-30%", top: "-85%" },
    headerView: { position: 'absolute', top: -100, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center', flexDirection: 'row' },
    // backgroundImage: { width: "180%", left: -140, top: -130 },
    // headerView: { position: 'absolute', top: -70, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center', flexDirection: 'row' },
    leftArrow: { position: 'absolute', alignSelf: 'center', left: 20 },
    hederText: { alignSelf: 'center', color: '#fff', fontSize: 16, fontWeight: 'bold' },
    // width: Dimensions.get('window').width * .90,
    imageBackground: { width: width * .30, height: 130, justifyContent: 'flex-end', padding: 10, marginHorizontal: 3, },
    menuButtonStyle: { width: 20, height: 20, }
});

export default styles;
