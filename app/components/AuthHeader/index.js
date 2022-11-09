import { Image, TouchableOpacity, View, Platform } from "react-native";
import images from "app/config/images";
import { Text } from "native-base";
import React from "react";
import GS from "../../config/GlobalStyle"

const AuthHeader = ({ title, navigateTo }) => {
    const handlePress = () => {
        navigateTo()
    }
    return (
        <View style={GS.containerStyle}>
            <Image source={images.login.background} style={GS.backgroundImage} resizeMode={"contain"} />
            <View style={GS.headerView}>
                <TouchableOpacity
                    style={GS.leftArrow}
                    onPress={navigateTo}>
                    <Image source={images.login.left_arrow} style={{ width: 20, height: 20, top: Platform.OS === 'ios' ? -5 : 0 }} resizeMode={"cover"} />
                </TouchableOpacity>
                <Text style={GS.hederText}>
                    {title.toUpperCase()}
                </Text>
            </View>
        </View>
    );
};

export default AuthHeader;
