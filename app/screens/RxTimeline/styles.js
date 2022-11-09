import { Dimensions, StyleSheet } from "react-native";
const { height, width } = Dimensions.get("screen");
const cardElevation = 5;
import fontStyle from 'app/config/styles';
const FONT_BOLD = fontStyle.fonts.FONT_BOLD;
const FONT_REGULAR = fontStyle.fonts.FONT_REGULAR;

const styles = StyleSheet.create({
    genderLinearGradient: {
        justifyContent: 'center',
        // margin: 10,
        alignItems: 'center',
        flexDirection: 'row',
        height: 40,
        width: 130,
        borderRadius: 20
    },
    imageContainer: { justifyContent: 'center', alignItems: 'center', margin: 5 },
    imageBG: { width: 40, height: 75 },
    icon: { position: 'absolute', width: 30, height: 30 },
    contentView: {
        // borderRadius: 5, flexDirection: "row", alignSelf: 'center', borderColor: "#d2d2d2", width: "90%", height: 100, borderWidth: 1, alignItems: "center",
        width: "90%",
        marginVertical: 5,
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
    },
    TextInputContainer: {
        flex: 1,
        borderRadius: 50,
        flexDirection: 'row',
        // width: width * .70,
        alignItems: 'center',
        // justifyContent: 'center',
        // marginHorizontal: 10,
        marginVertical: 5,
        borderColor: "#d2d2d2",
        borderWidth: 0.5,
        height: 40,
        backgroundColor: "#fff",

        //only android
        elevation: cardElevation,

        //only iOs
        shadowOpacity: 0.5, //only works if backgroundColor defined
        shadowRadius: cardElevation, //shadow fuzzyness
        shadowOffset: { width: 1, height: cardElevation },
    },
    profile: { backgroundColor: "transparent", height: 50, width: 50, alignSelf: 'center', margin: 5 },
    containerStyle: {
        justifyContent: 'center',
        bottom: 20,
        alignSelf: 'center',
        width: width,
        overflow: 'hidden',
        height: width / 2,
        // backgroundColor: '#d2d2d2',
    },
    backgroundImage: { width: "170%", left: "-30%", top: "-85%" },
    headerView: { position: 'absolute', top: -100, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center', flexDirection: 'row' },
    leftArrow: { position: 'absolute', left: 20 },
    leftArrowImg: { width: 20, height: 20, },
    hederText: { alignSelf: 'center', color: '#fff', fontSize: 18, fontFamily: FONT_BOLD },
    // Apply Button
    applyButtonView: { justifyContent: 'center', alignItems: 'center', margin: 20 },
    applyButtonBGImage: { height: 40, width: 220, position: 'absolute', margin: 20 },
    applyButtonText: {
        // position: 'absolute',
        fontSize: 16,
        textAlign: 'center',
        alignSelf: 'center',
        color: '#fff',
        fontFamily: FONT_BOLD,
        backgroundColor: 'transparent',
    },
    onPressMenu: { position: 'absolute', right: 20 },
    filterImg: { width: 25, height: 25, },
    calendarView: { zIndex: 1, top: 0, position: 'absolute', flex: 1 },
    scrollView: { marginTop: ("-20%") },
    titleDateView: { marginLeft: 20, flexDirection: 'row', alignItems: 'center' },
    titleDateText: { color: '#53C3C8', fontSize: 18, fontFamily: FONT_BOLD },
    downArrowImage: { width: 20, height: 20, marginLeft: 5 },

    //Alert Dialog
    filterByText: { fontFamily: FONT_BOLD, color: "#388B9D" },
    diseaseTypeText: { fontFamily: FONT_BOLD, color: "#000", marginTop: 10, },
    pickerDownArrow: { height: 20, width: 20, marginLeft: -90 },
    alertDialogButtons: { flexDirection: 'row', justifyContent: 'space-between', marginVertical: 10 },
    cancelButton: { backgroundColor: "#343434", height: 40, width: 130, borderRadius: 40, justifyContent: 'center' },
    dividerView: { height: 1, backgroundColor: "#d2d2d2", width: "100%", marginVertical: 10, left: 20 },
    lottie: {
        width: 100,
        height: 100
    },

});

export default styles;
