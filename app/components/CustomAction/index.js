import React from 'react';
import { View, Text, Image } from 'react-native';
import styles from './styles';

const CustomAction = ({ text, icon, bgIcon }) => {
    return (
        <View style={{ flexDirection: 'row' }}>
            <View style={styles.container}>
                <Text style={styles.text}>{text}</Text>
            </View>
            <View style={{ justifyContent: 'center', marginHorizontal: 20 }}>
                {/* <Image source={bgIcon} style={{ height: 40, width: 40, marginLeft: 10 }} resizeMode={"contain"} /> */}
                {/* <Image source={icon} style={{ height: 40, width: 40, marginLeft: 10 }} resizeMode={"contain"} /> */}
                {bgIcon != undefined ? <Image source={bgIcon} style={{ height: 40, width: 40, }} resizeMode={"contain"} /> : null}
                <Image source={icon} style={{ height: 30, width: 35, alignSelf: 'center', position: 'absolute', }} resizeMode={"contain"} />
            </View>
        </View>
    );
}

export default CustomAction;
