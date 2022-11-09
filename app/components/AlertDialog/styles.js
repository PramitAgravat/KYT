import {StyleSheet} from "react-native";


const styles = StyleSheet.create({
    scrollModal: {

    },
    modalContainer: {
        flex: 1,
        // backgroundColor:"#000",
        backgroundColor: "rgba(49,49,49, 0.7)",
        // justifyContent: "center",
        alignItems: "center",
    },
    modalView: {
        // margin:50,
        marginTop: 30,
        backgroundColor: "#fff",
        borderRadius: 10,
        width: 330,
        padding: 10,

        // borderColor: "black",
        // borderWidth: StyleSheet.hairlineWidth
    },
    checkBox: {
        marginBottom: 10
    },
    checkBoxText: {
        marginLeft: 4,
        alignSelf: "center",
        fontSize: 15,
        justifyContent: "center"
    },
    titleText: {
        fontSize: 17,
        fontWeight: "600",
        padding: 15,
        alignSelf: "center"
    },
    msgTextStyle: {
        fontSize: 15,
        textAlign: "center",
        color: '#355c7d',
        fontWeight: 'bold'
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "flex-end",
        borderColor: "gray",
        // borderTopWidth: StyleSheet.hairlineWidth
    },
    buttonText: {
        fontSize: 17
    },
    button: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 5,
        marginVertical: 10,
        borderColor: "gray",
    }
});

export default styles;