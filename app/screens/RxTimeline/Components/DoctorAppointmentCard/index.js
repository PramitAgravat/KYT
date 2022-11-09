import { Image, View, TouchableOpacity } from 'react-native';
import { Text } from 'native-base';
import React from "react";
import images from 'app/config/images';
import styles from './styles';

const DoctorAppointmentCard = ({ onPress,data }) => {
    return (
        <View style={[styles.contentView]}>
            <View style={{height: "100%",  width: 10, flexDirection: 'row', backgroundColor: "#48A1AB", borderTopLeftRadius: 5, borderBottomLeftRadius: 5 }} />
            {/* <View style={styles.imageContainer}>
                <Image source={images.timeline.roundBG} style={styles.imageBG} resizeMode={"contain"} />
                <Image source={images.timeline.doctor} style={styles.icon} resizeMode={"contain"} />
            </View>
            <View style={{ left: 10, flex: 0.9 }}>
                <View style={{flex: 1, flexDirection: 'row'}}>
                    <View style={{flex: 3, justifyContent: 'center'}}>
                        <Text style={styles.title}>
                            Appointment with Dr. Krunal Raval
                        </Text>
                    </View>
                    <TouchableOpacity style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}  onPress={onPress}>
                        <Image style={{zIndex: 999, width: 25, height: 25}} source={require('../../../../assets/images/arrow-down-sign-to-navigate.png')}/>
                    </TouchableOpacity>
                </View>
            </View> */}

            <View style={{ flex: 1, flexDirection: 'row' }}>
                <View style={{ flex: 3, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                    <View style={styles.imageContainer}>
                        <Image source={images.timeline.roundBG} style={styles.imageBG} resizeMode={"contain"} />
                        <Image source={images.timeline.doctor} style={styles.icon} resizeMode={"contain"} />
                    </View>
                    <View style={{ left: 10, flex: 0.9 }}>
                        <Text style={styles.title} numberOfLines={2}>
                            Appointment with {data.doctor_name}
                        </Text>
                    </View>
                </View>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} >
                    <TouchableOpacity style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} onPress={onPress}>
                        <Image style={{ width: 25, height: 25 }} source={require('../../../../assets/images/arrow-down-sign-to-navigate.png')} />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

export default DoctorAppointmentCard;
