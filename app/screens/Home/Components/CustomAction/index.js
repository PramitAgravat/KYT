import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import fontStyle from 'app/config/styles';
const FONT_BOLD = fontStyle.fonts.FONT_BOLD;
const FONT_REGULAR = fontStyle.fonts.FONT_REGULAR;

const styles = StyleSheet.create({
    container: {
        zIndex: 5,
        backgroundColor: '#ffffff',
        borderRadius: 24,
        borderWidth: 1,
        borderColor: '#662e00',
        minHeight: 20,
        paddingTop: 8,
        paddingRight: 16,
        paddingBottom: 8,
        paddingLeft: 16,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center'
    },
    text: {
        letterSpacing: 1,
        fontFamily: FONT_REGULAR,
        color: '#000', fontSize: 16
    }
});

export default class CustomAction extends React.Component {
    render() {
        const { text, icon, bgIcon } = this.props;
        return (
            <View style={{ flexDirection: 'row' }}>
                <View style={styles.container}>
                    <Text style={styles.text}>{text}</Text>
                </View>
                <View style={{ justifyContent: 'center', marginLeft: 10 }}>
                    {/* <Image source={bgIcon} style={{ height: 40, width: 40, marginLeft: 10 }} resizeMode={"contain"} /> */}
                    {/* <Image source={icon} style={{ height: 40, width: 40, marginLeft: 10 }} resizeMode={"contain"} /> */}
                    <Image source={bgIcon} style={{ height: 45, width: 45, }} resizeMode={"contain"} />
                    <Image source={icon} style={{ height: 30, width: 35, alignSelf: 'center', position: 'absolute', }} resizeMode={"contain"} />
                </View>
            </View>
        );
    }
}
