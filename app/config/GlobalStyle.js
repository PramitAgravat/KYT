// import { Dimensions, StyleSheet } from 'react-native';
// const { width } = Dimensions.get("screen");
// import fontStyle from 'app/config/styles';
// const FONT_BOLD = fontStyle.fonts.FONT_BOLD;

// export default StyleSheet.create({
//     containerStyle: {
//         // flex:0.2,
//         justifyContent: 'center',
//         bottom: 10,
//         alignSelf: 'center',
//         width: width,
//         // overflow: 'hidden',
//         height: width / 2,
//         // backgroundColor: '#d2d2d2',
//     },
//     backgroundImage: { width: "170%", left: "-30%", top: "-85%" },
//     // backgroundImage: { width: "180%", left: -140, top: -130 },
//     headerView: { position: 'absolute', top: -100, left: 0, right: 0, bottom: 0, justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row' },
//     leftArrow: { left: 20, },
//     leftArrowImg: { width: 20, height: 20, },
//     hederText: { flex: 1, fontFamily: FONT_BOLD, alignSelf: 'center', color: '#fff', fontSize: 18, textAlignVertical: 'center', textAlign: 'center' },
//     menuButtonStyle: { width: 20, height: 20 },
//     rightImage: { right: 20, padding: 10 }
// })

import { Dimensions, StyleSheet } from 'react-native';
const { width } = Dimensions.get("screen");
import fontStyle from 'app/config/styles';
const FONT_BOLD = fontStyle.fonts.FONT_BOLD;

export default StyleSheet.create({
    containerStyle: {
        // flex:0.2,
        justifyContent: 'center',
        bottom: 10,
        alignSelf: 'center',
        width: width,
        // overflow: 'hidden',
        height: width / 2,
        // backgroundColor: '#d2d2d2',
    },
    backgroundImage: { width: "170%", left: "-30%", top: "-85%" },
    // backgroundImage: { width: "180%", left: -140, top: -130 },
    headerView: { position: 'absolute', top: -100, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center', flexDirection: 'row' },
    leftArrow: { position: 'absolute', left: 20, padding: 10, },
    leftArrowImg: { width: 20, height: 20, },
    hederText: { fontFamily: FONT_BOLD,  color: '#fff', fontSize: 18,  textAlign: 'center' },
    menuButtonStyle: { width: 20, height: 20 },
    rightImage: { position: 'absolute', right: 20, padding: 10 }
})
