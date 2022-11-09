import React, { Component } from 'react';
import { Text, View, Linking, TouchableOpacity, Share, StyleSheet, Dimensions, TextInput } from 'react-native';
import fontStyle from 'app/config/styles';
const FONT_REGULAR = fontStyle.fonts.FONT_REGULAR;
const FONT_BOLD = fontStyle.fonts.FONT_BOLD;
import AuthHeader from "app/components/AuthHeader";
import SafeArea from 'app/components/SafeAreaView';
import { navigateToWallet } from "app/navigation/NavigationHelpers";
import LinearGradient from 'react-native-linear-gradient';
import validate from "app/lib/validation_wrapper";
import AnimatedLoader from "react-native-animated-loader";
import SuccessModal from 'app/components/SuccessModal';
export default class RedeemPoint extends Component {
    constructor(props) {
        super(props)
        this.state = ({
            visible: false,
            title: 'REDEEM POINT',
            walletBalance: [],
            redeemPoint: 0,
            redeemPointError: null,
            successTitle: 'Congratulations!',
            successBody: 'Your Reward will be in your PAYTM wallet within 24 hours',
            isVisibleSuccess: false,
            reedemPointData: false
        })
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const newProps = this.props;
        if (prevState.reedemPointData !== newProps.reedemPointData) {
            // console.log("Balance-->", JSON.stringify(newProps.reedemPointData));
            // this.setState({
            // walletBalance: true,
            // walletBalance: newProps.walletBalance,
            // })
            this.setState({
                isVisibleSuccess: true,
                reedemPointData: newProps.reedemPointData
            });
        }
        if (prevState.visible !== newProps.loader) {
            console.log('newProps.loader', newProps.loader);
            this.setState({ visible: newProps.loader })
        }
    }

    redeemPoint = async () => {
        if (this.state.redeemPoint > 0) {
            const redeemPointError = await validate('redeemPoint', this.state.redeemPoint);
            this.setState({
                redeemPointError: redeemPointError
            })
            if (!redeemPointError) {
                const param = {
                    wallet_points: this.state.redeemPoint
                }
                this.props.redeemPoint(param)
            }
        }
        else {
            alert("Please Enter Redeem Point")
        }
    }
    onClose() {
        this.setState({
            isVisibleSuccess: false
        });
        this.props.navigation.navigate('Wallet')
    }
    render() {
        return (
            <SafeArea>
                <SuccessModal
                    title={this.state.successTitle}
                    body={this.state.successBody}
                    isVisible={this.state.isVisibleSuccess}
                    onClose={() => this.onClose()}
                    backDropClose={true}
                    swipeClose={true}
                />
                <AnimatedLoader
                    visible={this.state.visible}
                    overlayColor="rgba(255,255,255,0.75)"
                    animationStyle={styles.lottie}
                    speed={1}
                    source={require('app/assets/json/data.json')}
                />
                <AuthHeader title={this.state.title} navigateTo={navigateToWallet} />
                <View style={styles.contentView}>
                    <Text style={styles.contentTextStyle}>
                        Kindly enter how many KYT points you would like to redeem. You can redeem minimum of 100 KYT points. 1 KYT = 1 INR.
                    </Text>
                </View>
                <View style={styles.textView}>
                    <Text style={{ fontFamily: FONT_REGULAR }}>
                        Enter Redeem Point
                    </Text>
                    <TextInput
                        underlineColorAndroid='transparent'
                        keyboardType={'numeric'}
                        placeholder={"200"}
                        style={styles.textInputStyle}
                        onChangeText={(text) => this.setState({ redeemPoint: text })}
                        returnKeyType='done'
                        onBlur={() => {
                            this.setState({
                                redeemPointError: validate('redeemPoint', this.state.redeemPointError),
                            })
                        }}
                    />
                </View>
                <TouchableOpacity style={{ marginTop: "20%", alignItems: 'center' }}
                    onPress={() => this.redeemPoint()}>
                    <LinearGradient
                        start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                        colors={['#64B7A0', '#3992B2']} style={styles.buttonStyle}>
                        <Text style={styles.buttonTextStyle}>
                            REDEEM POINTS
                        </Text>
                    </LinearGradient>
                </TouchableOpacity>
            </SafeArea>
        )
    }
}

const styles = StyleSheet.create({
    lottie: {
        width: 100,
        height: 100
    },
    contentView: {
        top: -60, justifyContent: 'center', alignSelf: 'center', margin: 10
    },
    contentTextStyle: { textAlign: 'center', fontFamily: FONT_REGULAR, },
    textView: { justifyContent: 'center', alignItems: 'center' },
    textInputStyle: {
        top: 20,
        color: "#000",
        textAlign: 'center',
        fontFamily: FONT_REGULAR, fontSize: 15,
        borderWidth: 1,
        borderColor: '#9CE1E5',
        borderRadius: 10, width: Dimensions.get('window').width * .20, height: 40,
    },
    buttonTextStyle: {
        fontFamily: FONT_BOLD, textAlign: 'center', color: '#fff', width: "100%", fontSize: 18,
        textAlignVertical: 'center',
        // paddingTop: Platform.OS == "ios" ? 8 : 0
    },
    buttonStyle: {
        // top: 100,
        alignItems: 'center',
        flexDirection: 'row',
        height: 40,
        width: Dimensions.get('window').width * 0.6,
        borderRadius: 30
    },
})
