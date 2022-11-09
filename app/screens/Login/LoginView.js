import React from 'react';
import { Container, Content, Text } from 'native-base';
import { Dimensions, Image, TextInput, TouchableOpacity, View, SafeAreaView } from 'react-native';
import IconTextInput from 'app/components/IconTextInput';
import styles from './styles';
import images from 'app/config/images';
import { navigateToForgotPassword, navigateToVideo, navigateToRegister, navigateToHomeandReset } from 'app/navigation/NavigationHelpers';
import LinearGradient from 'react-native-linear-gradient';
import validate from 'app/lib/validation_wrapper';
import GuestHeader from 'app/components/GuestHeader';
import AnimatedLoader from 'react-native-animated-loader';
import AsyncStorage from '@react-native-community/async-storage';
import SuccessModal from 'app/components/SuccessModal';
const { height, width } = Dimensions.get("screen");
var show = images.login.show;
var hide = images.login.hide;

export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "Login Success",
            body: "Thank you for being part of this novel healthcare data sharing initiative in India. 25 KYT points have been added to your KYT wallet",
            isVisible: false,
            passswordHide: true,
            color: '#5EB9AA',
            username: '',
            password: '',
            visible: false,
            loginError: []
        };
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        const newProps = this.props;
        if (prevState.visible !== newProps.loader) {
            this.setState({ visible: newProps.loader })
        }
        if (prevProps.loginError !== newProps.loginError) {
            if (newProps.loginError.length && Object.keys(newProps.loginError.response).length) {
                // if (newProps.loginError.length > 0) {

                for (let key in newProps.loginError.response) {
                    if (!newProps.loginError.response.hasOwnProperty(key)) continue;
                    let v = newProps.loginError.response[key];
                    let k = key + 'Error';
                    let state = {};
                    state[k] = v;
                    this.setState(state)

                }
            }
        }
        if (prevProps.loginSuccess != newProps.loginSuccess) {
            console.log("loginSuccess DATA IS--->", this.props.loginSuccess.msg)
            this.setState({
                title: "Login Success",
                body: this.props.loginSuccess.msg,
                isVisible: true
            })
        }
    }

    _loginClick = async () => {
        // this.setState({ isVisible: true })
        const usernameError = await validate('username', this.state.username);
        const passwordError = await validate('password', this.state.password);
        let fcmToken = await AsyncStorage.getItem('fcmToken');
        this.setState({
            usernameError: usernameError,
            passwordError: passwordError
        })

        if (!usernameError && !passwordError) {
            /*this.setState({
                visible: true
            });*/
            // navigateToHome();
            console.log('fcmToken', fcmToken);
            let params = {
                username: this.state.username,
                password: this.state.password,
                firebase_token: fcmToken
            }
            this.props.onLogin(params);
        }
    }

    onClose() {
        navigateToHomeandReset()
        this.setState({
            isVisible: false,
            title: '',
            body: ''
        })
    }
    renderImage = () => {
        var imgSource = this.state.passswordHide ? hide : show;
        return (
            <Image source={imgSource} style={{ width: 30, height: 30 }} resizeMode={"cover"} />
        );
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                {/* <SuccessModal title={this.state.title} body={this.state.body} isVisible={this.state.isVisible} onClose={() => this.onClose()} backDropClose={true} swipeClose={true} /> */}
                <AnimatedLoader
                    visible={this.state.visible}
                    overlayColor="rgba(255,255,255,0.75)"
                    animationStyle={styles.lottie}
                    speed={1}
                    source={require('app/assets/json/data.json')}
                />
                <Container>
                    <GuestHeader title={'LOGIN'} navigateTo={navigateToVideo} />

                    <Content>
                        <IconTextInput
                            ref={input => (this.username = input)}
                            placeholder={"Mobile Number"}
                            placeholderStyle={styles.placeHolderText}
                            returnKeyType='next'
                            maxLength={10}
                            keyboardType='phone-pad'
                            onChangeText={(username) => this.setState({ username: username.trim() })}
                            value={this.state.username}
                            inputStyle={styles.input}
                            onBlur={() => {
                                this.setState({
                                    usernameError: validate('username', this.state.username),
                                })
                            }}
                            error={this.state.usernameError}
                        />
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
                                    {this.renderImage()}
                                    {/* <Image source={hide} style={{ width: 30, height: 30 }} resizeMode={"cover"} /> */}
                                </TouchableOpacity>
                            </View>
                            {this.state.passwordError ? <Text style={styles.errorText}>{this.state.passwordError}</Text> : null}
                        </View>
                        <TouchableOpacity
                            style={styles.forgotPasswordView}
                            onPress={() => navigateToForgotPassword()}>
                            <Text style={styles.forgotPasswordText}>
                                Forget Password ?
                        </Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={{ marginVertical: 30, alignItems: 'center' }} onPress={this._loginClick}>
                            <LinearGradient
                                start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                                colors={['#64B7A0', '#3992B2']} style={styles.buttonStyle}>
                                <Text style={styles.buttonTextStyle}>
                                    SUBMIT
                            </Text>
                            </LinearGradient>
                        </TouchableOpacity>
                        <View style={styles.alreadyLoginView}>
                            <Text style={styles.alreadyLoginText}>
                                Don't have an account?
                        <Text onPress={() => navigateToRegister()} style={styles.registrationText}>
                                    {" " + "SignUp"}
                                </Text>
                            </Text>
                        </View>
                        {/* <TouchableOpacity
                        onPress={this._loginClick}
                        style={styles.submitButtonView}>
                        <Image source={images.login.rd_rectangle} style={styles.submitButtonBGImage} resizeMode={"contain"} />
                        <Text style={styles.submitButtonText}>
                            SUBMIT
                        </Text>
                    </TouchableOpacity> */}
                    </Content>
                </Container>
            </SafeAreaView>
        );
    }
}
