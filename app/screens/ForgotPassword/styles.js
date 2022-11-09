import {Dimensions, StyleSheet} from "react-native";
const cardElevation = 5;
import fontStyle from 'app/config/styles';
const { height, width } = Dimensions.get("screen");
const FONT_BOLD = fontStyle.fonts.FONT_BOLD;
const FONT_REGULAR = fontStyle.fonts.FONT_REGULAR;

const styles = StyleSheet.create({
    containerStyle: {
        // flex:0.2,
        justifyContent: 'center',
        bottom: 70,
        alignSelf: 'center',
        width: width,
        overflow: 'hidden',
        height: width / 2,
        // backgroundColor: '#d2d2d2',
    },
    otpInput: { borderColor: "#d2d2d2", width: 50, borderWidth: 1, borderRadius: 50, height: 50, },
    input: {
        borderColor: "#d2d2d2", borderWidth: 1, borderRadius: 50, margin: 5, height: 50, justifyContent: 'center',
    },
    TextInputContainer: {
        borderRadius: 50,
        flexDirection: 'row',
        width: Dimensions.get('window').width * .95,
        alignItems: 'center',
        // justifyContent: 'center',
        marginHorizontal: 10,
        marginVertical: 5,
        borderColor: "#d2d2d2",
        borderWidth: 0.5,
        height: 50,
        backgroundColor: "#fff",

        //only android
        elevation: cardElevation,

        //only iOs
        shadowOpacity: 0.5, //only works if backgroundColor defined
        shadowRadius: cardElevation, //shadow fuzzyness
        shadowOffset: { width: 1, height: cardElevation },
    },
    errorBox: {
        borderColor: 'red'
    },
    placeHolderText:{
        fontFamily: FONT_REGULAR,
        fontSize: 18
    },
    textInputStyle:{ fontFamily: FONT_REGULAR, fontSize: 18, paddingLeft: 25, flex: 1 },
    errorText: {
        left: 20,
        color: 'red'
    },
    lottie: {
        width: 100,
        height: 100
    },
});

export default styles;
