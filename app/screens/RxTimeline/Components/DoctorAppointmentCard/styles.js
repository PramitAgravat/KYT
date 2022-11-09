import { Dimensions, StyleSheet } from "react-native";
const cardElevation = 5;
import fontStyle from 'app/config/styles';
const FONT_BOLD = fontStyle.fonts.FONT_BOLD;
const FONT_REGULAR = fontStyle.fonts.FONT_REGULAR;


const styles = StyleSheet.create({
    title: { fontFamily: FONT_BOLD, fontSize: 15 },
    content: { fontFamily: FONT_REGULAR, fontSize: 12, color: "#999898" },
    imageContainer: { justifyContent: 'center', alignItems: 'center', margin: 5 },
    imageBG: { width: 55, height: 75 },
    icon: { position: 'absolute', width: 40, height: 40 },
    contentView: {
        // borderRadius: 5, flexDirection: "row", alignSelf: 'center', borderColor: "#d2d2d2", width: "90%", height: 100, borderWidth: 1, alignItems: "center",
        width: "90%",
        //marginVertical: 5,
        borderRadius: 5,
        alignItems: "center", flexDirection: "row", alignSelf: 'center',
        // borderColor: "#f5f5f5",
        // borderWidth: 1,
        height: 100,
        backgroundColor: "#fff",

        //only android
        elevation: cardElevation,

        //only iOs
        shadowOpacity: 0.5, //only works if backgroundColor defined
        shadowRadius: cardElevation, //shadow fuzzyness
        shadowOffset: { width: 1, height: cardElevation },
    }
});

export default styles;
