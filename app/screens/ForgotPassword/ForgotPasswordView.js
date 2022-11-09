import { Container, Content, Text, Toast } from 'native-base';
import React from 'react';
import { Image, TouchableOpacity, View, TextInput, SafeAreaView, Platform, } from 'react-native';
import IconTextInput from 'app/components/IconTextInput';
import styles from './styles';
import images from 'app/config/images';
import { navigateToLogin } from "app/navigation/NavigationHelpers";
import GuestHeader from "app/components/GuestHeader";
import validate from 'app/lib/validation_wrapper';
import OtpInputs from 'react-native-otp-inputs';
import Api from 'app/api';
import ApiConstants from 'app/api/ApiConstants';
import AnimatedLoader from 'react-native-animated-loader';
import fontStyle from 'app/config/styles';
const FONT_BOLD = fontStyle.fonts.FONT_BOLD;
const FONT_REGULAR = fontStyle.fonts.FONT_REGULAR;

var show = images.login.show;
var hide = images.login.hide;

export default class ForgotPassword extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            timer: 15,
            phone: '',
            phoneError: '',
            step: 1,
            passwordHide: true,
            color: '#5EB9AA',
            email: '',
            passswordHide: true,
            confirmPasswordHide: true,
            password: '',
            confirmPassword: '',
            passwordError: '',
            confirmPasswordError: '',
            otp: null,
            otpError: '',
            visible: false,
            timeOut: false,
            isResendOtp:false,
            timeCount : 30
        };
    }

    componentDidMount() {
        this.interval = setInterval(
            () => this.setState((prevState) => ({ timer: prevState.timer - 1 })),
            1000
        );
        this.setState({ timeOut: true })
    }

    componentDidUpdate() {
        if (this.state.timer === 1) {
            console.log("Timer", this.state.timer)
            // this.setState({ timeOut: true })
            clearInterval(this.interval);
        }
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    countdown = () =>{
        if (this.state.timeCount == 0) {
            clearTimeout(this.timerId);
            //doSomething();
            this.setState({
                timeCount :  30,
                isResendOtp:true
            });
        } else {
            this.setState({
                timeCount :  this.state.timeCount - 1
            });
            console.log('ssd',this.state.timeCount);

        }
    }
    renderSwitch = (param) => {
        switch (param) {
            case 1:
                return (this._renderPhoneNumberView())
                break;
            case 2:
                return (this._renderOTPValidtion())
                break;
            case 3:
                return (this._renderEnterNewPassword())
                break;
            default:
                return this.props.navigation.navigate("Login");
        }
    }

    _renderOTPValidtion = () => {
        return (
            <View>
                <Text style={{ top: 10, margin: 5, fontFamily: FONT_BOLD, alignItems: 'center', textAlign: 'center', }}>Enter OTP</Text>
                <Text style={{ top: 10, margin: 5, alignItems: 'center', textAlign: 'center', fontFamily: FONT_REGULAR }}>Enter the 4-digit code sent to you at</Text>
                <Text style={{ margin: 5, textAlign: 'center', fontFamily: FONT_REGULAR, }}>{"+91  " + this.state.phone}</Text>
                <View style={{ margin: 10, height: 150 }}>
                    <OtpInputs
                        handleChange={code => this.setState({ otp: code })}
                        numberOfInputs={4}
                        placeholder={'0'}
                    />
                    {this.state.otpError ? <Text style={styles.errorText}>{this.state.otpError}</Text> : null}
                    {this.state.isResendOtp ? <TouchableOpacity onPress={() =>  this.otpRequest(1)}>
                        <Text style={{ alignSelf: 'center', fontFamily: FONT_BOLD , fontSize: 13 }}>
                            Resend OTP
                        </Text>
                    </TouchableOpacity> : <Text style={{ alignSelf: 'center', color: '#C2C0C0', fontSize: 13 }}>
                        Resend OTP in {this.state.timeCount} sec
                    </Text>}
                </View>
            </View>
        )
    }

    _renderEnterNewPassword = () => {
        return (
            <View>
                <View style={[styles.TextInputContainer, { flexDirection: 'row', flex: 1 }, this.state.passwordError ? styles.errorBox : null]}>
                    <TextInput
                        style={styles.textInputStyle}
                        secureTextEntry={this.state.passswordHide}
                        placeholder={"Password"}
                        placeholderStyle={styles.placeHolderText}
                        onChangeText={(text) => this.setState({ password: text.trim() })}
                        value={this.state.password}
                        onBlur={() => {
                            this.setState({
                                passwordError: validate('password', this.state.password),
                            })
                        }}
                        error={this.state.passwordError}
                    />
                    <TouchableOpacity
                        onPress={() => this.setState({ passswordHide: !this.state.passswordHide })}
                        style={{ position: 'absolute', right: 10 }}>
                        <Image source={this.state.passswordHide ? hide : show} style={{ width: 30, height: 30 }} resizeMode={"cover"} />
                    </TouchableOpacity>
                </View>
                <View style={[styles.TextInputContainer, { flexDirection: 'row', flex: 1 }, this.state.confirmPasswordError ? styles.errorBox : null]}>
                    <TextInput
                        style={styles.textInputStyle}
                        secureTextEntry={this.state.confirmPasswordHide}
                        placeholder={"Confirm password"}
                        placeholderStyle={styles.placeHolderText}
                        onChangeText={(text) => this.setState({ confirmPassword: text.trim() })}
                        value={this.state.confirmPassword}
                        onBlur={() => {
                            this.setState({
                                confirmPasswordError: validate('confirmPassword', this.state.confirmPasswordError),
                            })
                        }}
                        error={this.state.confirmPasswordError}
                    />
                    <TouchableOpacity
                        onPress={() => this.setState({ confirmPasswordHide: !this.state.confirmPasswordHide })}
                        style={{ position: 'absolute', right: 10 }}>
                        <Image source={this.state.confirmPasswordHide ? hide : show} style={{ width: 30, height: 30 }} resizeMode={"cover"} />
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    _renderPhoneNumberView = () => {
        return (
            <IconTextInput
                ref={input => (this.phone = input)}
                placeholder={"Phone no. (10 digits)"}
                onChangeText={(text) => this.setState({ phone: text.trim() })}
                value={this.state.phone}
                maxLength={10}
                keyboardType='phone-pad'
                inputStyle={styles.input}
                onBlur={() => {
                    this.setState({
                        phoneError: validate('phone', this.state.phone),
                    })
                }}
                error={this.state.phoneError}
            />

            // <IconTextInput
            //     ref={input => (this.email = input)}
            //     placeholder={"Email ID"}
            //     returnKeyType='next'
            //     submitSubscriber={() => this.password.textInput.focus()}
            //     onChangeText={(input) => this.setState({ email: input })}
            //     // value={this.props.name}
            //     inputStyle={styles.input}
            // />
        )
    }

    onSubmit = async (step) => {
        switch (step) {
            case 1:
                return this.otpRequest(step)
                break;
            case 2:
                return this.checkOtp(step)
                break;
            case 3:
                return (this.resetPassword(step))
                break;
            default:
                return null;
        }
    }

    otpRequest = async (step) => {
        console.log("Forgot Password OTP Request");
        // const phoneError = await validate('phone', this.state.phone);
        // this.setState({
        //     phoneError: phoneError,
        // })
        // if (!phoneError) {
        //     let param = {
        //         phone: this.state.phone,
        //     }
        //     this.props.sendOtp(param);
        //     await this.setState({ step: step + 1 })
        // }

        const phoneError = await validate('phone', this.state.phone);
        this.setState({
            phoneError: phoneError,
        })
        if (!phoneError) {
            this.setState({
                visible: true,
            })
            let data = {
                phone: this.state.phone,
            }
            await Api(ApiConstants.RESET, data, 'post').then(res => {
                if (res.data.status) {
                    console.log("Send OTP Success", res)
                    this.setState({
                        visible: true,
                        timer: 15,
                        isResendOtp:false,
                        timeCount : 30,
                        step: step + 1
                    })
                    this.timerId = setInterval(this.countdown, 1000);
                } else {
                    Toast.show({
                        text: res.data.message,
                        buttonText: "Okay",
                        duration: 3000,
                        type: "danger"
                    });
                }
            }).catch(err => {
                console.log('err', err);
                Toast.show({
                    text: 'NetWork Issue Try Again Letter',
                    buttonText: "Okay",
                    duration: 3000,
                    type: "danger"
                })
            });
            this.setState({ visible: false })
        }
    }

    checkOtp = async (step) => {
        const otpError = await validate('otp', this.state.otp);
        this.setState({
            otpError: otpError,
        })
        if (!otpError) {
            this.setState({
                visible: true,
                timer: 15
            })
            let data = {
                phone: this.state.phone,
                otp: this.state.otp
            }
            await Api(ApiConstants.CHECK_OTP, data, 'post').then(res => {
                if (res.data.status) {
                    console.log("CHECK OTP Success", res)
                    this.setState({ step: step + 1 })
                } else {
                    Toast.show({
                        text: res.data.message,
                        buttonText: "Okay",
                        duration: 3000,
                        type: "danger"
                    });
                }
            }).catch(err => {
                console.log('err', err);
                Toast.show({
                    text: 'NetWork Issue Try Again Letter',
                    buttonText: "Okay",
                    duration: 3000,
                    type: "danger"
                })
            });
            this.setState({ visible: false })
        }
    }

    resetPassword = async () => {
        const passwordError = await validate('password', this.state.password);
        const confirmPasswordError = await validate('confirmPassword', this.state.confirmPassword);
        this.setState({
            passwordError: passwordError,
            confirmPasswordError: confirmPasswordError,
        })
        if (!this.state.passwordError && !this.state.confirmPasswordError) {
            this.setState({
                visible: true,
            })
            let data = {
                phone: this.state.phone,
                password: this.state.password,
                confirm_password: this.state.confirmPassword
            }
            await Api(ApiConstants.FORGET_PASSWORD, data, 'post').then(res => {
                if (res.data.status) {
                    navigateToLogin()
                } else {
                    Toast.show({
                        text: res.data.message,
                        buttonText: "Okay",
                        duration: 3000,
                        type: "danger"
                    });
                }
            }).catch(err => {
                console.log('err', err);
                Toast.show({
                    text: 'NetWork Issue Try Again Letter',
                    buttonText: "Okay",
                    duration: 3000,
                    type: "danger"
                })
            });
            this.setState({ visible: false })
        }
    }

    render() {
        console.log("Forgot Password Steps", this.state.step)
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <AnimatedLoader
                    visible={this.state.visible}
                    overlayColor="rgba(255,255,255,0.75)"
                    animationStyle={styles.lottie}
                    speed={1}
                    source={require('app/assets/json/data.json')}
                />
                <GuestHeader title={'FORGET PASSWORD'} navigateTo={navigateToLogin} />
                <Content style={{}}>
                    {this.renderSwitch(this.state.step)}
                    <View style={{ marginVertical: 50, flexDirection: 'row', flex: 1, justifyContent: 'center' }}>
                        <TouchableOpacity
                            onPress={() => this.onSubmit(this.state.step)}
                            // onPress={() => this.state.step != 3 ? this.setState({ step: (this.state.step) + 1 }) : this.props.navigation.navigate("Login")}
                            style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
                            <Image source={images.forgotPassword.rd_rectangle} style={{ width: 100, height: 40, position: 'absolute' }} resizeMode={"contain"} />
                            <Text style={{
                                // position: 'absolute',
                                fontSize: 15,
                                textAlign: 'center',
                                alignSelf: 'center',
                                color: '#fff',
                                fontWeight: 'bold',
                                backgroundColor: 'transparent',
                            }}>
                                SUBMIT
                                </Text>
                        </TouchableOpacity>
                    </View>
                </Content>
                {/* </Container> */}
            </SafeAreaView>
        );
    }
}
