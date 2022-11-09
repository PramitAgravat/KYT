import React, { Component } from 'react';
import { Text, View, Linking, TouchableOpacity, Share, StyleSheet, Dimensions } from 'react-native';
import fontStyle from 'app/config/styles';
const FONT_REGULAR = fontStyle.fonts.FONT_REGULAR;
const FONT_BOLD = fontStyle.fonts.FONT_BOLD;
import AuthHeader from "app/components/AuthHeader";
import SafeArea from 'app/components/SafeAreaView';
import { navigateToProfile } from "app/navigation/NavigationHelpers";
import LinearGradient from 'react-native-linear-gradient';
const { height, width } = Dimensions.get("screen");
export default class ReferralCode extends Component {
    constructor(props) {
        super(props)
        this.state = ({
            unique_code: this.props.userProfile.unique_code,
            title: 'Refer & earn'
        })
    }
    ShareMessage = () => {
        Share.share(
            {
                message: "Make money while you share and manage your health records. Sign up on KYT app with my code  " + this.state.unique_code + " and get rewarded! \nDownload the app here: https://play.google.com/store/apps/details?id=com.thekyt"
                // title: 'Referral Code',
                // message: this.state.unique_code + "\n\n" + "is your KYT Referral Code. Use this code while registering as a new KYT App user: " + "\nhttps://play.google.com/store/apps/details?id=com.thekyt",
                // message:  this.state.unique_code + " is your KYT Referral Code. Use this code while registering as a new KYT App user.",
            }).then(result => console.log(result)).catch(errorMsg => console.log(errorMsg));
    }
    goBack() {
        this.props.navigation.goBack()
    }
    render() {
        return (
            <SafeArea>
                <AuthHeader title={this.state.title} navigateTo={() => this.goBack()} />
                <View style={styles.contentTextView}>
                    <Text style={styles.contentTextStyle}>
                        Share this below code with your Friends & Family members, earn exciting rewards of 25 KYT Points on every successful referral.
                    </Text>
                </View>

                <View style={styles.titleTextView}>
                    <Text style={{ fontFamily: FONT_REGULAR }}>
                        YOUR REFERRAL CODE
                    </Text>
                    <View style={styles.uniqueCodeTextView}>
                        <Text
                            selectable
                            style={styles.uniqueCodeText}>
                            {this.state.unique_code}
                        </Text>
                    </View>
                </View>
                <TouchableOpacity style={{ marginVertical: 10, alignItems: 'center' }} onPress={() => this.ShareMessage()}>
                    <LinearGradient
                        start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                        colors={['#64B7A0', '#3992B2']} style={styles.buttonStyle}>
                        <Text style={styles.buttonTextStyle}>
                            SHARE
                        </Text>
                    </LinearGradient>
                </TouchableOpacity>
            </SafeArea>
        )
    }
}

var styles = StyleSheet.create({
    contentTextView: { top: -60, justifyContent: 'center', alignSelf: 'center', margin: 10 },
    contentTextStyle: { textAlign: 'center', fontFamily: FONT_REGULAR, },
    titleTextView: { justifyContent: 'center', alignItems: 'center' },
    uniqueCodeTextView: { marginVertical: 20, borderColor: "red", borderWidth: 1, height: 45, width: "50%", borderRadius: 5 },
    uniqueCodeText: { fontSize: 20, color: '#439EAD', fontFamily: FONT_BOLD, flex: 1, textAlign: 'center', textAlignVertical: 'center' },
    buttonStyle: {
        alignItems: 'center',
        flexDirection: 'row',
        height: 40,
        width: width * 0.5,
        borderRadius: 30
    },
    buttonTextStyle: {
        fontFamily: FONT_BOLD, textAlign: 'center', color: '#fff', width: "100%", fontSize: 18,
        textAlignVertical: 'center',
        // paddingTop: Platform.OS == "ios" ? 8 : 0
    },
});
