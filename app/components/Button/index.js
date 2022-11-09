import React, { Component } from 'react';
import { View, Text, Dimensions } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import styles from './styles';
const { height, width } = Dimensions.get("screen");
export default class Button extends Component {
    render() {
        return (
            <LinearGradient
                start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                colors={['#64B7A0', '#3992B2']} style={{
                    alignItems: 'center',
                    flexDirection: 'row',
                    height: 40,
                    width: width * 0.9,
                    borderRadius: 30
                }}>
                <Text style={styles.buttonTextStyle}>
                    SUBMIT
                </Text>
            </LinearGradient>
            // <View>
            //     <Text> Button </Text>
            // </View>
        );
    }
}
