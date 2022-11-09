import { Image, TouchableOpacity, View } from 'react-native';
import { Text } from 'native-base';
import React from "react";
import images from 'app/config/images';
import styles from './styles';
import fontStyle from 'app/config/styles';
const FONT_BOLD = fontStyle.fonts.FONT_BOLD;
const PillCard = ({ onPress,data }) => {
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
        <View style={[styles.contentView]}>
            <View style={{ height: "100%", width: 10, flexDirection: 'row', backgroundColor: color, borderTopLeftRadius: 5 }} />
            <View style={{ flex: 1, flexDirection: 'row' }}>
                <View style={{ flex: 1, flexDirection: 'row' }}>
                    <View style={{ flex: 3, justifyContent: 'center', flexDirection: 'row', alignItems: 'center' }}>
                        <Image source={{uri:data.medicine_type.image_url}} style={styles.profile} resizeMode={"contain"} />
                        <View style={{ left: 10, flex: 0.9 }}>
                            <Text style={{ fontFamily: FONT_BOLD,fontSize: 15 }}>
                                Reminder For {data.medicine_name}
                            </Text>
                        </View>
                    </View>
                    <TouchableOpacity style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} onPress={onPress}>
                        <Image style={{ zIndex: 999, width: 25, height: 25 }} source={require('../../../../assets/images/arrow-down-sign-to-navigate.png')} />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

export default PillCard;
