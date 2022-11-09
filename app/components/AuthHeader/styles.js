import { Dimensions, StyleSheet } from 'react-native';
const { width } = Dimensions.get("screen");
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
    // backgroundImage: { width: "180%", left: -140, top: -130 },
    headerView: { position: 'absolute', top: -100, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center', flexDirection: 'row' },
    leftArrow: { position: 'absolute', left: 20 },
    leftArrowImg: { width: 20, height: 20, },
    hederText: { fontFamily: FONT_BOLD, alignSelf: 'center', color: '#fff', fontSize: 18, textAlignVertical: 'center', },

    // headerView: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center', flexDirection: 'row' },
    // leftArrow: { position: 'absolute', alignSelf: 'center', left: 20 },
    menuButtonStyle: { width: 20, height: 20, top: -5 },
});
export default styles;
