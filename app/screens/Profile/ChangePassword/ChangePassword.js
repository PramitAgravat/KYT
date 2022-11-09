import React from 'react';
import { Container, Content, Text } from 'native-base';
import { Dimensions, Image, TextInput, TouchableOpacity, View, SafeAreaView } from 'react-native';
import IconTextInput from 'app/components/IconTextInput';
import styles from './styles';
import images from 'app/config/images';
import { navigateToProfile } from 'app/navigation/NavigationHelpers';
import LinearGradient from 'react-native-linear-gradient';
import validate from 'app/lib/validation_wrapper';
import GuestHeader from 'app/components/GuestHeader';
import AnimatedLoader from 'react-native-animated-loader';
import { Toast } from 'native-base';
import Api from 'app/api';
import ApiConstants from 'app/api/ApiConstants';
import AuthHeader from '../../../components/AuthHeader';

const { height, width } = Dimensions.get("screen");
var show = images.login.show;
var hide = images.login.hide;

export default class ChangePassword extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            oldPassswordHide: false,
            newPassswordHide: false,
            confirmPassswordHide: false,
            color: '#5EB9AA',
            oldPassword: '',
            newPassword: '',
            confirmPassword: '',
            oldPasswordError: '',
            newPasswordError: '',
            confirmPasswordError: '',
            passwordMatch: true,
            visible: false,
        };
    }

    _submitClick = async () => {
        const { newPassword, confirmPassword } = this.state;
        const oldPasswordError = await validate('oldPassword', this.state.oldPassword);
        const newPasswordError = await validate('newPassword', this.state.newPassword);
        const confirmPasswordError = await validate('confirmPassword', this.state.confirmPassword);
        this.setState({
            oldPasswordError: oldPasswordError,
            newPasswordError: newPasswordError,
            confirmPasswordError: confirmPasswordError
        })
        if (newPassword !== confirmPassword) {
            this.setState({ passwordMatch: false })
        } else {
            this.setState({ passwordMatch: true })
            if (!oldPasswordError && !newPasswordError && !confirmPasswordError) {
                let data = {
                    old_password: this.state.oldPassword,
                    new_password: this.state.newPassword,
                    confirm_password: this.state.confirmPassword
                }
                this.setState({ visible: true })
                await Api(ApiConstants.CHANGE_PASSWORD, data, 'post').then(res => {
                    res.data.status ?
                        this.setState({ visible: false }, () => navigateToProfile())
                        :
                        this.setState({ visible: false }, () =>
                            Toast.show({
                                text: res.data.msg,
                                buttonText: "Okay",
                                duration: 3000,
                                type: "danger"
                            }));
                }).catch(err => {
                    this.setState({ visible: false });
                    console.log('err', err);
                    Toast.show({
                        text: 'Network issue.Please try again later.',
                        buttonText: "Okay",
                        duration: 3000,
                        type: "danger"
                    });
                });
            }
        }

    }

    renderImage = (value) => {
        const { oldPassswordHide, newPassswordHide, confirmPassswordHide } = this.state;
        if (value === 1)
            var imgSource = oldPassswordHide ? hide : show;
        else if (value === 2)
            var imgSource = newPassswordHide ? hide : show;
        else if (value === 3)
            var imgSource = confirmPassswordHide ? hide : show;
        return (
            <Image source={imgSource} style={{ width: 30, height: 30 }} resizeMode={"cover"} />
        );
    }
    goBack() {
        this.props.navigation.goBack()
    }
    render() {
        return (
            <SafeAreaView style={styles.container}>
                <AnimatedLoader
                    visible={this.state.visible}
                    overlayColor="rgba(255,255,255,0.75)"
                    animationStyle={styles.lottie}
                    speed={1}
                    source={require('app/assets/json/data.json')}
                />
                <Container>
                    <AuthHeader title={'Change Password'} navigateTo={()=>this.goBack()} />

                    <Content>
                        <View>
                            <View style={[styles.TextInputContainer, { flexDirection: 'row', flex: 1 }, this.state.oldPasswordError ? styles.errorBox : null]}>
                                <TextInput
                                    style={styles.textInputStyle}
                                    secureTextEntry={this.state.oldPassswordHide}
                                    placeholder={"Old Password"}
                                    placeholderStyle={styles.placeHolderText}
                                    onChangeText={(text) => this.setState({ oldPassword: text.trim() })}
                                    value={this.state.oldPassword}
                                    onBlur={() => {
                                        this.setState({
                                            oldPasswordError: validate('oldPassword', this.state.oldPassword),
                                        })
                                    }}
                                    error={this.state.oldPasswordError}
                                />
                                {/* <TouchableOpacity
                                    onPress={() => this.setState({ oldPassswordHide: !this.state.oldPassswordHide })}
                                    style={{ position: 'absolute', right: 10 }}>
                                    {this.renderImage(1)}
                                </TouchableOpacity> */}
                            </View>
                            {this.state.oldPasswordError ? <Text style={styles.errorText}>{this.state.oldPasswordError}</Text> : null}
                        </View>

                        <View>
                            <View style={[styles.TextInputContainer, { flexDirection: 'row', flex: 1 }, this.state.newPasswordError ? styles.errorBox : null]}>
                                <TextInput
                                    style={styles.textInputStyle}
                                    secureTextEntry={this.state.newPassswordHide}
                                    placeholder={"New Password"}
                                    placeholderStyle={styles.placeHolderText}
                                    onChangeText={(text) => this.setState({ newPassword: text.trim() })}
                                    value={this.state.newPassword}
                                    onBlur={() => {
                                        this.setState({
                                            newPasswordError: validate('newPassword', this.state.newPassword),
                                        })
                                    }}
                                    error={this.state.newPasswordError}
                                />
                                {/* <TouchableOpacity
                                    onPress={() => this.setState({ newPassswordHide: !this.state.newPassswordHide })}
                                    style={{ position: 'absolute', right: 10 }}>
                                    {this.renderImage(2)}
                                </TouchableOpacity> */}
                            </View>
                            {this.state.newPasswordError ? <Text style={styles.errorText}>{this.state.newPasswordError}</Text> : null}
                        </View>
                        <View>
                            <View style={[styles.TextInputContainer, { flexDirection: 'row', flex: 1 }, this.state.confirmPasswordError ? styles.errorBox : null]}>
                                <TextInput
                                    style={styles.textInputStyle}
                                    secureTextEntry={this.state.confirmPassswordHide}
                                    placeholder={"Confirm Password"}
                                    placeholderStyle={styles.placeHolderText}
                                    onChangeText={(text) => this.setState({ confirmPassword: text.trim() })}
                                    value={this.state.confirmPassword}
                                    onBlur={() => {
                                        this.setState({
                                            confirmPasswordError: validate('confirmPassword', this.state.confirmPassword),
                                        })
                                    }}
                                    error={this.state.confirmPasswordError}
                                />
                                {/* <TouchableOpacity
                                    onPress={() => this.setState({ confirmPassswordHide: !this.state.confirmPassswordHide })}
                                    style={{ position: 'absolute', right: 10 }}>
                                    {this.renderImage(3)}
                                </TouchableOpacity> */}
                            </View>
                            {this.state.confirmPasswordError ? <Text style={styles.errorText}>{this.state.confirmPasswordError}</Text> : null}
                        </View>
                        {!this.state.passwordMatch ? <Text style={styles.errorText}>Confirm Password Don't Match</Text> : null}
                        <TouchableOpacity style={{ marginVertical: 30, alignItems: 'center' }} onPress={this._submitClick}>
                            <LinearGradient
                                start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                                colors={['#64B7A0', '#3992B2']} style={styles.buttonStyle}>
                                <Text style={styles.buttonTextStyle}>
                                    SUBMIT
                            </Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    </Content>
                </Container>
            </SafeAreaView>
        );
    }
}
