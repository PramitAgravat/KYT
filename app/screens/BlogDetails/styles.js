import { Dimensions, StyleSheet, Platform } from "react-native";
const { width } = Dimensions.get("screen");
import fontStyle from 'app/config/styles';
const FONT_BOLD = fontStyle.fonts.FONT_BOLD;
const FONT_REGULAR = fontStyle.fonts.FONT_REGULAR;

const styles = StyleSheet.create({
    header: { flexDirection: 'row', backgroundColor: "#009688", height: 50, justifyContent: 'center' },
    blogImage: { width: "100%", height: 250 },
    leftArrow: { flex: 0.8, alignSelf: 'center', left: -20 },
    leftArrowImage: { width: 20, height: 20, top: 0 },
    headerTitleText: {
        left: -20,
        flex: 0.7,
        // paddingTop: Platform.OS === "ios" ? 5 : 0,
        textAlignVertical: 'center',
        fontFamily: FONT_BOLD,
        fontSize: 18,
        // alignItems: 'center',
        alignSelf: 'center',
        color: "#fff"
    },
    blogDetailTitle: { fontFamily: FONT_BOLD, fontSize: 18, marginVertical: 3 },
    blogDetailContent: { fontFamily: FONT_REGULAR, fontSize: 16, marginVertical: 3 },
    blogDetailDate: { fontFamily: FONT_BOLD, fontSize: 16 },
    moreImageContiner: { flex: 0.3, right: 15, width: 30, position: 'absolute', alignSelf: 'center' },
    moreButtonStyle: { width: 25, height: 20, },

});

export default styles;
