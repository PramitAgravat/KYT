import React, { Component } from 'react';
import { Text, TouchableOpacity, View, Image, Dimensions } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import styles from './styles'
import ModalBox from 'react-native-modalbox';
import images from 'app/config/images';
const { width } = Dimensions.get("screen");
const SuccessModal = ({ title, body, isVisible, onClose, backDropClose, swipeClose }) => {
    console.log("Success Modal 1", title);
    console.log("Success Modal 2", body);
    console.log("Success Modal 3", isVisible);
    return <ModalBox
        style={{ height: 200, width: "80%", backgroundColor: "#fff", borderRadius: 15 }}
        position={"center"}
        // style={{ height: 250, width: "90%", borderRadius: 15, justifyContent: 'center', alignSelf: 'center' }}
        // position={"center"}
        backdropPressToClose={backDropClose} swipeToClose={swipeClose} isOpen=
        {isVisible}>
        <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1, margin: 10 }}>
            <Image source={images.icons.success} style={{
                width: width * .10,
                height: width * .10
            }} resizeMode={"center"} />
            <Text style={styles.titleText}>
                {title}
            </Text>
            <Text style={styles.contentText}>
                {body}
            </Text>
            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                <TouchableOpacity style={{ margin: 5, alignItems: 'center' }}
                    onPress={() => onClose(1)}>
                    <LinearGradient
                        start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                        colors={['#64B7A0', '#3992B2']} style={styles.navigationButtonStyle}>
                        <Text style={styles.navigationButtonTextStyle}>
                            Okay
                        </Text>
                    </LinearGradient>
                </TouchableOpacity>
            </View>
        </View>
    </ModalBox>
}

export default SuccessModal;
