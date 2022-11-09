import { View, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import { Text } from 'native-base';
import React from "react";
const cardElevation = 4;
import fontStyle from 'app/config/styles';
import images from '../../../../config/images';
const FONT_BOLD = fontStyle.fonts.FONT_BOLD;
const FONT_REGULAR = fontStyle.fonts.FONT_REGULAR;
const FONT_RALEWAY_REGULAR = fontStyle.fonts.FONT_RALEWAY_REGULAR;

const styles = StyleSheet.create({
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
    profile: { backgroundColor: "transparent", height: 50, width: 50, alignSelf: 'center', margin: 5 },
    childContainer: { flex: 1, flexDirection: 'column', top: 5 },
});

const HowFeelDetailBody = ({ onPress, data, onHowFeelDelete }) => {
    const onPressEdit = (onPressEdit) => {
        onPress(onPressEdit)
    }
    const deleteRecord = (data) => {
        Alert.alert(
            'Are you sure you want to delete this?',
            '',
            [
                { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
                { text: 'Delete', onPress: () => onHowFeelDelete(data), style: 'destructive' },
            ],
            { cancelable: false }
        )
    }
    let imageName = null;
    let mood = null;
    let color = null;

    switch (data.feeling_type) {
        case 1:
            imageName = images.feeling.feel_1;
            mood = 'Extremely Dissatisfied';
            color = '#F17B7C';
            break;
        case 2:
            imageName = images.feeling.feel_2;
            mood = 'Dissatisfied';
            color = '#FCAA21';
            break;
        case 3:
            imageName = images.feeling.feel_3;
            mood = 'Neutral';
            color = '#FDCC02';
            break;
        case 4:
            imageName = images.feeling.feel_4;
            mood = 'Satisfied';
            color = '#8CD3D3';
            break;
        case 5:
            imageName = images.feeling.feel_5;
            mood = 'Extremely Satisfied';
            color = '#7FC9A0';
            break;
        default:
            imageName = images.feeling.feel_3;
            mood = 'Neutral';
            color = '#FDCC02';
    }
    return (
        <View style={[styles.contentView]} >
            <View style={{ height: "100%", width: 10, flexDirection: 'row', backgroundColor: color, borderBottomLeftRadius: 5 }} />
            <View style={{ left: 10, flex: 0.9 }}>
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
                    <View style={{ width: '80%', justifyContent: 'center', flex: 1 }}>
                        <View style={styles.childContainer}>
                            <Text style={{ fontSize: 15, fontFamily: FONT_BOLD, color: '#47A0AB' }}>
                                Symptoms:
                            </Text>
                            <Text numberOfLines={4} style={{ fontSize: 12, alignItems: 'center', justifyContent: 'center' }}>
                                {data.comment}
                            </Text>
                        </View>
                    </View>

                    {/* <View style={{ width: '20%', justifyContent: 'center', alignItems: 'center', alignSelf: 'flex-end', height: '100%' }} >
                        <TouchableOpacity style={{ flex: 1, marginTop: 15, marginLeft: 10 }}
                            onPress={() => onPressEdit(data)}
                        >
                            <Image style={{ zIndex: 999, width: 25, height: 25 }} source={require('../../../../assets/images/pencil.png')} />
                        </TouchableOpacity>
                        <TouchableOpacity style={{ flex: 1, marginLeft: 10, marginTop: 5 }}
                            onPress={() => deleteRecord(data)}
                        >
                            <Image style={{ zIndex: 999, width: 25, height: 25 }} source={require('../../../../assets/images/trash-can.png')} />
                        </TouchableOpacity>
                    </View> */}
                    <View style={{ width: '20%', justifyContent: 'center', alignItems: 'center', alignSelf: 'flex-end', height: '100%' }} >
                        <TouchableOpacity style={{ flex: 1, marginTop: 5, marginLeft: 10 }}
                            onPress={() => onPressEdit(data)}>
                            <Image style={{ zIndex: 999, width: 25, height: 25 }} source={require('../../../../assets/images/pencil.png')} />
                        </TouchableOpacity>
                        <TouchableOpacity style={{ flex: 1, marginLeft: 10, marginTop: 5 }}
                            onPress={() => deleteRecord(data)}>
                            <Image style={{ zIndex: 999, width: 25, height: 25 }} source={require('../../../../assets/images/trash-can.png')} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    )
}


export default HowFeelDetailBody;
