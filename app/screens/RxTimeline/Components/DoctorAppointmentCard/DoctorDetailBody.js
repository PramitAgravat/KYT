import { View, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import { Text } from 'native-base';
import React from "react";
import fontStyle from 'app/config/styles';
import images from '../../../../config/images';
const FONT_BOLD = fontStyle.fonts.FONT_BOLD;
const FONT_REGULAR = fontStyle.fonts.FONT_REGULAR;
import { navigateToUpdateDoctorAppointment } from "app/navigation/NavigationHelpers";
const cardElevation = 4;
const styles = StyleSheet.create({
    childContainer: { flexDirection: 'column', top: 5 },
    titleText: { fontFamily: FONT_REGULAR, fontSize: 12, right: 2, color: '#47A0AB' },
    contentText: { fontFamily: FONT_REGULAR, fontSize: 15 },
    imageContainer: { justifyContent: 'center', alignItems: 'center', margin: 5 },
    imageBG: { width: 40, height: 75 },
    icon: { position: 'absolute', width: 30, height: 30 },
    contentView: {
        // borderRadius: 5, flexDirection: "row", alignSelf: 'center', borderColor: "#d2d2d2", width: "90%", height: 100, borderWidth: 1, alignItems: "center",
        width: "90%",
        marginVertical: 2,
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5,
        alignItems: "center", flexDirection: "row", alignSelf: 'center',
        // borderColor: "#f5f5f5",
        // borderWidth: 1,
        backgroundColor: "#fff",
        height: "100%",
        //only android
        elevation: cardElevation,
        flex: 1,
        //only iOs
        shadowOpacity: 0.5, //only works if backgroundColor defined
        shadowRadius: cardElevation, //shadow fuzzyness
        shadowOffset: { width: 1, height: cardElevation },
    },
    profile: { backgroundColor: "transparent", height: 50, width: 50, alignSelf: 'center', margin: 5 }
});

const DoctorDetailBody = ({ onPress, data, onDelete }) => {
    const navigateTo = (navigateTo, data) => {
        onPress(navigateTo, data)
    }
    const onDeleteData = (data) => {
        Alert.alert(
            'Are you sure you want to delete this?',
            '',
            [
                { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
                { text: 'Delete', onPress: () => onDelete(data), style: 'destructive' },
            ],
            { cancelable: false }
        )
    }
    return (
        <View style={[styles.contentView]} >
            <View style={{height: "100%", width: 10, flexDirection: 'row', backgroundColor: "#48A1AB", borderBottomLeftRadius: 5 }} />
            <View style={{ left: 10, flex: 0.9, }}>
                <View style={{ flex: 1, flexDirection: 'row', width: '100%' }}>
                    <View style={{ width: '80%', flex: 1 }}>
                        <View style={styles.childContainer}>
                            <View style={{ flexDirection: 'column' }}>
                                <Text style={{ fontFamily: FONT_BOLD, color: '#47A0AB', fontSize: 15 }}>
                                    Location:
                                </Text>
                                <Text style={styles.contentText}>
                                    {data.hospital_name},
                                </Text>
                                <Text style={styles.contentText}>
                                    {data.hospital_city}
                                </Text>
                            </View>
                        </View>
                    </View>

                    <View style={{ width: '20%', justifyContent: 'center', alignItems: 'center', alignSelf: 'flex-end', height: '100%' }} >
                        <TouchableOpacity style={{ flex: 1, marginTop: 5, marginLeft: 10 }}
                            onPress={() => navigateTo(navigateToUpdateDoctorAppointment, data.doctor_id)}>
                            <Image style={{ zIndex: 999, width: 25, height: 25 }} source={require('../../../../assets/images/pencil.png')} />
                        </TouchableOpacity>
                        <TouchableOpacity style={{ flex: 1, marginLeft: 10, marginTop: 5 }}
                            onPress={() => onDeleteData(data)}>
                            <Image style={{ zIndex: 999, width: 25, height: 25 }} source={require('../../../../assets/images/trash-can.png')} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
        // <View style={[styles.contentView]} >
        //     <View style={{ width: 10, flexDirection: 'row', backgroundColor: "#48A1AB", borderTopLeftRadius: 5, borderBottomLeftRadius: 5 }} />
        //     <View style={{ left: 10, flex: 0.9 }}>
        //         <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
        //             <View style={{ width: '80%', justifyContent: 'center', flex: 1 }}>
        //                 <View style={styles.childContainer}>
        //                     <Text style={{ color: '#47A0AB' }}>
        //                         Location:
        //                     </Text>
        //                     <Text style={styles.contentText}>
        //                         {data.hospital_name},
        //                     </Text>
        //                     <Text style={styles.contentText}>
        //                         {data.hospital_city}
        //                     </Text>
        //                 </View>
        //             </View>

        //             <View style={{ width: '20%', justifyContent: 'center', alignItems: 'center', alignSelf: 'flex-end', height: '100%' }} >
        //                 <TouchableOpacity style={{ flex: 1, marginTop: 15, marginLeft: 10 }}
        //                     onPress={() => navigateTo(navigateToUpdateDoctorAppointment, data.doctor_id)}>
        //                     <Image style={{ zIndex: 999, width: 25, height: 25 }} source={images.rxTimeline.pencil} />
        //                 </TouchableOpacity>
        //                 <TouchableOpacity style={{ flex: 1, marginLeft: 10, marginTop: 5 }}
        //                     onPress={() => onDeleteData(data)}>
        //                     {/* // onPress={() => alert("Are your sure to delete this record!")}> */}
        //                     <Image style={{ zIndex: 999, width: 25, height: 25 }} source={images.rxTimeline.trash_can} />
        //                 </TouchableOpacity>
        //             </View>
        //         </View>
        //     </View>
        // </View>
    )
}


export default DoctorDetailBody;
