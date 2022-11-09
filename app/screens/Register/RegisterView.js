import React, { Component } from 'react';
import Moment from 'moment';
import { Container, Content, Picker, Text, Toast } from 'native-base';
import { Image, TouchableOpacity, View, TextInput, Alert, SafeAreaView, Dimensions, ScrollView, Modal, Platform, Linking, BackHandler } from 'react-native';
import SubmitButton from '../../components/Button/index';
import LinearGradient from 'react-native-linear-gradient';
import DateTimePicker from "react-native-modal-datetime-picker";
import IconTextInput from "app/components/IconTextInput";
import images from 'app/config/images';
import { navigateToVideo, navigateToLogin } from "app/navigation/NavigationHelpers";
import OtpInputs from 'react-native-otp-inputs';
const { height, width } = Dimensions.get("screen");
const show = images.login.show;
const hide = images.login.hide;
import validate from 'app/lib/validation_wrapper';
import styles from './styles';
import fontStyle from 'app/config/styles';
const FONT_BOLD = fontStyle.fonts.FONT_BOLD;
const FONT_REGULAR = fontStyle.fonts.FONT_REGULAR;

import GuestHeader from "app/components/GuestHeader";
import AnimatedLoader from 'react-native-animated-loader';
export default class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            registrationData: '',
            isChecked: false,
            modalVisible: false,
            otpModalVisible: false,
            passswordHide: true,
            profileType: [],
            DateOfBirth: 'Date Of Birth',
            name: '',
            nameError: '',
            phone: '',
            phoneError: '',
            dob: '',
            dobError: '',
            gender: 0, //0=>male,1=>female
            profile_type_id: '',
            profileTypeError: '',
            email: '',
            emailError: '',
            otp: null,
            otpError: '',
            password: '',
            passwordError: '',
            refeeralCode: '',
            loading: false,
            visible: false,
            isResendOtp: false,
            timeCount: 30
        };
        this._isMounted = false;
        // this.back_Button_Press = this.back_Button_Press.bind(this);


    }
    componentWillMount() {

        BackHandler.addEventListener('hardwareBackPress', this.back_Button_Press);
    }

    componentWillUnmount() {

        BackHandler.removeEventListener('hardwareBackPress', this.back_Button_Press);
    }
    back_Button_Press = () => {
        clearTimeout(this.timerId);
        // Put your own code here, which you want to exexute on back button press.
        this.props.openOtp(false);
        this.props.navigation.goBack(null);
        // Return true to enable back button over ride.
        return true;
    }
    componentWillUnmount() {
        this._isMounted = false;
    }
    componentDidMount() {
        this._isMounted = true;
        // this.props.getProfileType();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const newProps = this.props;
        /*if(oldProps.profileType !== newProps.profileType) {
            this.setState({ profileType:this.props.profileType})
        }*/
        if (prevState.visible !== newProps.loader) {
            console.log('newProps.loader', newProps.loader);
            this.setState({ visible: newProps.loader })
        }
        if (prevState.otpModalVisible !== newProps.open_otp) {
            this.setState({ otpModalVisible: newProps.open_otp })
        }
        if (prevProps.registerError !== newProps.registerError) {
            if (Object.keys(newProps.registerError.response).length) {
                for (let key in newProps.registerError.response) {
                    if (!newProps.registerError.response.hasOwnProperty(key)) continue;
                    let v = newProps.registerError.response[key];
                    let k = key + 'Error';
                    let state = {};
                    state[k] = v;
                    this.setState(state)

                }
            }
            /*this.setState({
                visible: !this.state.visible
            });*/
        }
    }
    countdown = () => {
        if (this.state.timeCount == 0) {
            clearTimeout(this.timerId);
            //doSomething();
            this.setState({
                timeCount: 30,
                isResendOtp: true
            });
        } else {
            this.setState({
                timeCount: this.state.timeCount - 1
            });
            console.log('ssd', this.state.timeCount);

        }
    }
    toggleModal(checked, visible) {
        this.setState({ isChecked: checked, modalVisible: visible });
    }
    _checkPayTm = async () => {
        const nameError = await validate('name', this.state.name);
        const phoneError = await validate('phone', this.state.phone);
        const dobError = await validate('dob', this.state.dob);
        const emailError = await validate('email', this.state.email);
        const passwordError = await validate('password', this.state.password);
        const profileTypeError = await validate('profile_type_id', this.state.profile_type_id);
        this.setState({
            nameError: nameError,
            phoneError: phoneError,
            emailError: emailError,
            passwordError: passwordError,
            dobError: dobError,
            profileTypeError: profileTypeError
        })

        if (!nameError && !emailError && !passwordError && !phoneError && !dobError) {
            let _this = this;
            this.state.isChecked ?
                _this._registerClick()
                :
                alert("Check Terms And Conditions")
            // let _this = this;
            // Alert.alert(
            //     'Confirmation',
            //     'Please ensure this phone number (' + _this.state.phone + ') is linked to your PAYTM account to redeem cash rewards',
            //     [
            //         { text: 'Change Number', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
            //         { text: 'OK', onPress: () => _this._registerClick(), style: 'destructive' },
            //     ],
            //     { cancelable: false }
            // )
        }
    }
    _registerClick = async () => {
        // alert("TEST")
        const nameError = await validate('name', this.state.name);
        const phoneError = await validate('phone', this.state.phone);
        const dobError = await validate('dob', this.state.dob);
        const emailError = await validate('email', this.state.email);
        const passwordError = await validate('password', this.state.password);
        const profileTypeError = await validate('profile_type_id', this.state.profile_type_id);
        this.setState({
            nameError: nameError,
            phoneError: phoneError,
            emailError: emailError,
            passwordError: passwordError,
            dobError: dobError,
            profileTypeError: profileTypeError
        })

        if (!nameError && !emailError && !passwordError && !phoneError && !dobError) {
            /*this.setState({
                visible: true
            });*/
            let params = {
                name: this.state.name,
                email: this.state.email,
                password: this.state.password,
                phone: this.state.phone,
                dob: this.state.dob,
                gender: this.state.gender,
                otp: this.state.otp,
                referral_code: this.state.refeeralCode
            }
            //this.state.isChecked ? this.setState({ otpModalVisible: true }) :
            /*this.setState({
                registrationData: params
            })*/
            if (this.state.isChecked) {
                this.setState({
                    isResendOtp: false,
                    timeCount: 30
                })
                this.timerId = setInterval(this.countdown, 1000);
                Alert.alert(
                    'Confirmation',
                    'Please ensure this phone number (' + this.state.phone + ') is linked to your PAYTM account to redeem cash rewards',
                    [
                        { text: 'Change Number', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
                        { text: 'OK', onPress: () => this.props.sendOtp(params), style: 'destructive' },
                    ],
                    { cancelable: false }
                )
                // this.props.sendOtp(params);
            } else {
                alert("Check Terms And Conditions")
            }

        }


    }
    converPT = (size) => {
        var temp = size * 0.75;
        return (temp);
    }
    showDateTimePicker = () => {
        this.setState({ isDateTimePickerVisible: true });
    };

    hideDateTimePicker = () => {
        this.setState({ isDateTimePickerVisible: false });
    };

    handleDatePicked = date => {
        const NewDate = Moment(date).format('DD-MM-YYYY')
        const NewDOB = Moment(date).format('YYYY-MM-DD')
        this.setState({ DateOfBirth: NewDate })
        this.setState({ dob: NewDOB });
        this.setState({
            dobError: validate('dob', this.state.dob)
        })
        this.hideDateTimePicker();
    };

    renderImage = () => {
        var imgSource = this.state.passswordHide ? hide : show;
        return (
            <Image source={imgSource} style={{ width: 30, height: 30 }} resizeMode={"cover"} />
        );
    }

    otpVarification = async () => {
        console.log("Registration DATA 1", this.state.registrationData)

        //this.setState({ otpModalVisible: false })
        const nameError = await validate('name', this.state.name);
        const phoneError = await validate('phone', this.state.phone);
        const dobError = await validate('dob', this.state.dob);
        const emailError = await validate('email', this.state.email);
        const passwordError = await validate('password', this.state.password);
        const profileTypeError = await validate('profile_type_id', this.state.profile_type_id);
        const otpError = await validate('otp', this.state.otp);
        this.setState({
            nameError: nameError,
            phoneError: phoneError,
            emailError: emailError,
            passwordError: passwordError,
            dobError: dobError,
            profileTypeError: profileTypeError,
            otpError: otpError
        })

        if (!nameError && !emailError && !passwordError && !phoneError && !dobError && !otpError) {
            let params = {
                name: this.state.name,
                email: this.state.email,
                password: this.state.password,
                phone: this.state.phone,
                dob: this.state.dob,
                gender: this.state.gender,
                otp: this.state.otp,
                referral_code: this.state.refeeralCode
            }
            if (this.state.isChecked) {
                this.props.register(params);
            } else {
                alert("Check Terms And Conditions")
            }
        }
    }

    privacyPolicy = () => {
        Linking.openURL("https://thekyt.in/privacy-policy/")
    }

    render() {
        const { visible } = this.state;

        return (
            <SafeAreaView style={styles.container}>
                <AnimatedLoader
                    visible={visible}
                    overlayColor="rgba(255,255,255,0.75)"
                    animationStyle={styles.lottie}
                    speed={1}
                    source={require('app/assets/json/data.json')}
                />
                <Modal animationType={"slide"} transparent={false}
                    visible={this.state.modalVisible}
                    transparent={true}
                    onRequestClose={() => this.toggleModal(!this.state.modalVisible)}>
                    <View style={{
                        flex: 1,
                        backgroundColor: "rgba(49,49,49, 0.7)",
                        alignItems: "center"
                    }}>
                        <View style={{
                            borderRadius: 30,
                            marginHorizontal: 10,
                            marginVertical: 30,
                            flex: 1,
                            justifyContent: 'center',
                            // backgroundColor:"#000",
                            backgroundColor: "#fff",
                            // justifyContent: "center",
                            alignItems: "center",
                        }}>
                            <View style={{ margin: 10 }}>
                                <Text style={{ fontSize: 16, color: "#000", alignSelf: 'center', marginVertical: 10 }}>
                                    Terms & Conditions
                                </Text>
                                <ScrollView>
                                    <Text style={{ margin: 10, fontSize: 14, alignSelf: 'center', color: "#333333", textAlign: 'center' }}>
                                        Dexium Technologies Private Limited (the "Company") respects your privacy and we acknowledge that you have certain rights related to any personal and medical data we collect from you and we have certain obligations in respect of the same. The Company supports the local privacy laws, and has procedures in place to meet the requirements of those laws. The Privacy Policy (hereinafter referred to as "the policy") provided hereinafter is in respect to our use and protection of any personal information/data you provide to us through our mobile application. The Company is the sole owner of the mobile application named as KYT or "Know Your Treatment" (hereinafter referred to as the "app").
                                    </Text>
                                    <Text style={{ fontSize: 14, alignSelf: 'center', color: "#333333" }}>
                                        {"Read our "}
                                        <Text onPress={() => this.privacyPolicy()} style={{ color: "red" }}>Privacy Policy</Text>
                                        {" here in more detail."}
                                    </Text>
                                </ScrollView>
                                <View style={{ margin: 10, flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <TouchableOpacity style={{ marginVertical: 5, alignItems: 'center' }} onPress={() => this.toggleModal(false, !this.state.modalVisible)}>
                                        <LinearGradient
                                            start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                                            colors={['#434343', '#434343']} style={{
                                                alignItems: 'center',
                                                flexDirection: 'row',
                                                height: 40,
                                                width: width * 0.3,
                                                borderRadius: 30
                                            }}>
                                            <Text style={styles.buttonTextStyle}>
                                                CANCEL
                                            </Text>
                                        </LinearGradient>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={{ marginVertical: 5, alignItems: 'center' }} onPress={() => this.toggleModal(true, !this.state.modalVisible)}>
                                        <LinearGradient
                                            start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                                            colors={['#64B7A0', '#3992B2']} style={{
                                                alignItems: 'center',
                                                flexDirection: 'row',
                                                height: 40,
                                                width: width * 0.3,
                                                borderRadius: 30
                                            }}>
                                            <Text style={styles.buttonTextStyle}>
                                                AGREE
                                            </Text>
                                        </LinearGradient>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </View>
                </Modal>
                <Modal animationType={"slide"} transparent={false}
                    visible={this.state.otpModalVisible}
                    transparent={true}
                    onRequestClose={() => this.setState({ otpModalVisible: !this.state.otpModalVisible })}>

                    <View style={{
                        justifyContent: 'center',
                        flex: 1,
                        backgroundColor: "rgba(49,49,49, 0.7)",
                        alignItems: "center"
                    }}>
                        <View style={{
                            // height: 150,
                            borderRadius: 10,
                            marginHorizontal: 10,
                            marginVertical: 30,
                            // flex: 1,
                            justifyContent: 'center',
                            // backgroundColor:"#000",
                            backgroundColor: "#fff",
                            // justifyContent: "center",
                            alignItems: "center",
                        }}>
                            <Text style={{ top: 10, margin: 5, fontFamily: FONT_BOLD }}>Enter OTP</Text>
                            <Text style={{ top: 10, margin: 5, alignItems: 'center', textAlign: 'center', fontFamily: FONT_REGULAR }}>Enter The 4-digit code sent to you at</Text>
                            <Text style={{ margin: 5, textAlign: 'center', fontFamily: FONT_REGULAR, }}>{"+91  " + this.state.phone}</Text>
                            <View style={{ margin: 10, height: 150 }}>
                                <OtpInputs
                                    handleChange={code => this.setState({ otp: code })}
                                    numberOfInputs={4}
                                    placeholder={'0'}
                                />
                                {this.state.otpError ? <Text style={styles.errorText}>{this.state.otpError}</Text> : null}
                            </View>
                            {
                                this.state.isResendOtp ? <TouchableOpacity onPress={() => this._registerClick()}>
                                    <Text style={{ alignSelf: 'center', fontFamily: FONT_BOLD, fontSize: 13 }}>
                                        Resend OTP
                                    </Text>
                                </TouchableOpacity> : <Text style={{ alignSelf: 'center', color: '#C2C0C0', fontSize: 13 }}>
                                        Resend OTP in {this.state.timeCount} sec
                                </Text>
                            }

                            <TouchableOpacity style={{ marginVertical: 10, alignItems: 'center' }}
                                onPress={() => this.otpVarification()}>
                                {/* onPress={() => this.setState({ otpModalVisible: false })}> */}
                                <LinearGradient
                                    start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                                    colors={['#64B7A0', '#3992B2']} style={{
                                        alignItems: 'center',
                                        flexDirection: 'row',
                                        height: 30,
                                        width: width * 0.3,
                                        borderRadius: 30
                                    }}>
                                    <Text style={styles.buttonTextStyle}>
                                        SUBMIT
                                </Text>
                                </LinearGradient>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
                <Container>

                    <GuestHeader title={'SIGN UP'} navigateTo={navigateToVideo} />
                    <Content style={styles.contentView}>
                        <IconTextInput
                            ref={input => (this.name = input)}

                            placeholder={"Name"}
                            returnKeyType='next'
                            submitSubscriber={() => this.email.textInput.focus()}
                            onChangeText={(name) => this.setState({ name: name })}
                            value={this.state.name}
                            inputStyle={styles.input}
                            underlineColorAndroid={'rgba(0,0,0,0)'}
                            onBlur={() => {
                                this.setState({
                                    nameError: validate('name', this.state.name),
                                })
                            }}
                            error={this.state.nameError}
                        />
                        <IconTextInput
                            ref={input => (this.email = input)}
                            placeholder={"Email"}
                            returnKeyType='next'
                            keyboardType='email-address'
                            submitSubscriber={() => this.phone.textInput.focus()}
                            onChangeText={(name) => this.setState({ email: name.trim() })}
                            value={this.state.email}
                            inputStyle={styles.input}

                            onBlur={() => {
                                this.setState({
                                    emailError: validate('email', this.state.email),
                                })
                            }}
                            error={this.state.emailError}
                        />
                        <IconTextInput
                            ref={input => (this.phone = input)}
                            placeholder={"Phone no. (10 digits)"}
                            onChangeText={(name) => this.setState({ phone: name.trim() })}
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
                        <View>
                            <TouchableOpacity
                                onPress={() => this.showDateTimePicker()}
                                style={[styles.TextInputContainer, this.state.dobError ? styles.errorBox : null]}
                                onBlur={() => {
                                    this.setState({
                                        dobError: validate('dob', this.state.dob),
                                    })
                                }}
                            >
                                <Text style={[styles.textStyle, { color: "#cacaca" }]}>
                                    {this.state.DateOfBirth}
                                </Text>
                            </TouchableOpacity>
                            {this.state.dobError ? <Text style={styles.errorText}>{this.state.dobError}</Text> : null}
                        </View>
                        <View>
                            <View style={[styles.TextInputContainer, { flexDirection: 'row', flex: 1 }, this.state.passwordError ? styles.errorBox : null]}>
                                <TextInput
                                    style={styles.textInput}
                                    secureTextEntry={this.state.passswordHide}
                                    placeholder={"Password"}
                                    onChangeText={(text) => this.setState({ password: text.trim() })}
                                    value={this.state.password}
                                    onBlur={() => {
                                        this.setState({
                                            passwordError: validate('password', this.state.password),
                                        })
                                    }}
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
                        <View style={styles.TextInputContainer}>
                            <Text style={[styles.textStyle, { color: "#cacaca" }]}>
                                Gender
                            </Text>
                            <View style={styles.genderView}>
                                <TouchableOpacity onPress={() => this.setState({ gender: 0 })}>
                                    <LinearGradient
                                        start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                                        colors={this.state.gender === 0 ? ['#64B7A0', '#3992B2'] : ['#ffffff', '#ffffff']} style={styles.genderLinearGradient}>
                                        <Text style={[styles.genderTextStyle, { color: this.state.gender === 0 ? "#ffffff" : '#d2d2d2' }]} >
                                            MALE
                                    </Text>
                                    </LinearGradient>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => this.setState({ gender: 1 })}>
                                    <LinearGradient
                                        start={{ x: 0.0, y: 0.25 }} end={{ x: 0.5, y: 1.0 }}
                                        colors={this.state.gender === 1 ? ['#64B7A0', '#3992B2'] : ['#ffffff', '#ffffff']} style={styles.genderLinearGradient}>
                                        <Text style={[styles.genderTextStyle, { color: this.state.gender === 1 ? "#ffffff" : '#d2d2d2' }]} >
                                            FEMALE
                                        </Text>
                                    </LinearGradient>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <IconTextInput
                            ref={input => (this.referral_code = input)}
                            placeholder={"Referral Code"}
                            onChangeText={(text) => this.setState({ refeeralCode: text })}
                            value={this.state.refeeralCode}
                            inputStyle={styles.input}
                        />
                        <View style={{ flexDirection: 'row', top: 10 }}>
                            <TouchableOpacity
                                onPress={() => this.setState({ modalVisible: true, isChecked: !this.state.isChecked })}
                                style={styles.checkBoxView}>
                                <Image source={this.state.isChecked ? images.register.checked : images.register.un_checked} style={{ width: 25, height: 25 }} resizeMode={"cover"} />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this.setState({ modalVisible: true })}>
                                <Text style={[styles.textStyle, { paddingLeft: 0 }]}>
                                    Check Terms and Conditions
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity style={{ marginVertical: 20, alignItems: 'center' }}
                            onPress={this._checkPayTm}
                        >
                            <SubmitButton />
                        </TouchableOpacity>

                        <View style={styles.alreadyRegisterView}>
                            <Text style={styles.alredyRegistrationText}>
                                Already Registered ?
                        <Text onPress={() => navigateToLogin()} style={styles.loginText}>
                                    {" " + "Login"}
                                </Text>
                            </Text>
                        </View>
                    </Content>

                    <DateTimePicker
                        maximumDate={new Date()}
                        isVisible={this.state.isDateTimePickerVisible}
                        onConfirm={this.handleDatePicked}
                        onCancel={this.hideDateTimePicker}
                    />
                </Container>
            </SafeAreaView>
        );
    }
}
