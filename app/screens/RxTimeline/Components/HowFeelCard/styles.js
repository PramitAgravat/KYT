import {Dimensions, StyleSheet} from "react-native";
const { height, width } = Dimensions.get("screen");
const cardElevation = 5;

const styles = StyleSheet.create({
    contentView: {
         // borderRadius: 5, flexDirection: "row", alignSelf: 'center', borderColor: "#d2d2d2", width: "90%", height: 100, borderWidth: 1, alignItems: "center",
         width: "90%",
         //marginVertical: 5,
         borderTopLeftRadius: 5,
         borderTopRightRadius: 5,
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
    profile: { backgroundColor: "transparent", height: 50, width: 50, alignSelf: 'center', margin: 5 }
});

export default styles;
