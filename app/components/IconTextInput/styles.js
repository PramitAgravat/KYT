import {Dimensions, StyleSheet} from "react-native";
const cardElevation = 5;
import fontStyle from 'app/config/styles';
const FONT_BOLD = fontStyle.fonts.FONT_BOLD;
const FONT_REGULAR = fontStyle.fonts.FONT_REGULAR;

const styles = StyleSheet.create({
    center: {
        backgroundColor:"#000",
        width: Dimensions.get('window').width,
        justifyContent: 'center',
        alignItems: 'center',
    },
    TextInputContainer: {
        flexDirection: 'row',
        width: Dimensions.get('window').width * .95,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 1,
        borderColor: "#d2d2d2",
        alignSelf: 'center',
        //borderWidth: 0.5,
        height: 50,
        backgroundColor: "#fff",

        //only android
        elevation: cardElevation,

        //only iOs
        shadowOpacity: 0.5, //only works if backgroundColor defined
        shadowRadius: cardElevation, //shadow fuzzyness
        shadowOffset: { width: 1, height: cardElevation },
    },
    iconStyle: {
        flex: 1,
        height: 30,
        width: 30,
        marginRight: 10,
        resizeMode: 'contain',
    },
    TextInputStyle: {
        fontFamily: FONT_REGULAR,
        fontSize:18,
        flex: 9,
        paddingLeft: 25,
    },
    errorText:{
        left:20,
        color:'red'
    },
    errorBox:{
        borderColor: 'red'
    }
});

export default styles;
