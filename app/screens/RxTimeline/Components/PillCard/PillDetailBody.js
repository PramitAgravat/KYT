import fontStyle from 'app/config/styles';
import { navigateToUpdatePillReminder } from "app/navigation/NavigationHelpers";
import { Text } from 'native-base';
import React from "react";
import { Alert, FlatList, Image, StyleSheet, TouchableOpacity, View } from 'react-native';
const cardElevation = 4;
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

const PillDetailBody = ({ onPress, data, onPillDelete }) => {
    /*const onPressEdit = (onPressEdit) => {
        onPress(onPressEdit)
    }*/
    const navigateTo = (navigateTo, data) => {
        onPress(navigateTo, data)
    }
    const deleteRecord = (data) => {
        Alert.alert(
            'Are you sure you want to delete this medicine reminder?',
            '',
            [
                { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
                { text: 'Delete', onPress: () => onPillDelete(data), style: 'destructive' },
            ],
            { cancelable: false }
        )
    }
    let color = null;
    let time = (data.time).split(',');
    inADay = () => {
        switch (time.length) {
            case 1:
                return (<Text style={{ fontSize: 15, fontFamily: FONT_BOLD, color: '#47A0AB' }}>
                    Once daily
                </Text>)
            case 2:
                return (<Text style={{ fontSize: 15, fontFamily: FONT_BOLD, color: '#47A0AB' }}>
                    Twice daily
                    </Text>)
            case 3:
                return (<Text style={{ fontSize: 15, fontFamily: FONT_BOLD, color: '#47A0AB' }}>
                    3 Times daily
                    </Text>)
            case 4:
                return (<Text style={{ fontSize: 15, fontFamily: FONT_BOLD, color: '#47A0AB' }}>
                    4 Times daily
                    </Text>)
        }
    }

    return (
        <View style={[styles.contentView]} >
            <View style={{ height: "100%", width: 10, flexDirection: 'row', backgroundColor: "#FDCC02", borderBottomLeftRadius: 5 }} />
            <View style={{ left: 10, flex: 0.9, }}>
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
                    <View style={{ width: '80%', justifyContent: 'center', flex: 1 }}>
                        <View style={styles.childContainer}>
                            <View style={{ flex: 1, flexDirection: 'column' }}>
                                <View style={{}}>
                                    {
                                        this.inADay()
                                    }
                                </View>
                                {
                                    <FlatList
                                        style={{ margin: 5 }}
                                        listKey={(item, index) => index.toString()}
                                        data={time}
                                        numColumns={2}
                                        renderItem={({ item, index }) =>
                                            <View style={{ marginRight: 30 }}>
                                                <Text style={{ fontFamily: FONT_REGULAR, fontSize: 15 }} key={index}>
                                                    {item}
                                                </Text>
                                            </View>
                                        }
                                        keyExtractor={(item, index) => index}
                                    />
                                }
                            </View>
                        </View>
                    </View>

                    <View style={{ width: '20%', justifyContent: 'center', alignItems: 'center', alignSelf: 'flex-end', height: '100%' }} >
                        <TouchableOpacity style={{ flex: 1, marginTop: 5, marginLeft: 10 }}
                            onPress={() => navigateTo(navigateToUpdatePillReminder, data.pill_reminder_id)}
                        >
                            <Image style={{ zIndex: 999, width: 25, height: 25 }} source={require('../../../../assets/images/pencil.png')} />
                        </TouchableOpacity>
                        <TouchableOpacity style={{ flex: 1, marginLeft: 10, marginTop: 5 }}
                            onPress={() => deleteRecord(data)}
                        >
                            <Image style={{ zIndex: 999, width: 25, height: 25 }} source={require('../../../../assets/images/trash-can.png')} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    )
}


export default PillDetailBody;
