import React, { Component, Fragment } from 'react';
import {
    Text,
    View,
    Image,
    TextInput,
    TouchableOpacity,
    Alert,
    Platform,
    NativeModules,
    NativeEventEmitter,
    DeviceEventEmitter, Dimensions,
} from 'react-native';
import SafeArea from 'app/components/SafeAreaView';
import styles from './styles';
import LinearGradient from 'react-native-linear-gradient';
import { navigateToHome } from "app/navigation/NavigationHelpers";
import AuthHeader from "app/components/AuthHeader";
import validate from 'app/lib/validation_wrapper';
import fontStyle from 'app/config/styles';
import images from 'app/config/images';
const FONT_REGULAR = fontStyle.fonts.FONT_REGULAR;
const FONT_BOLD = fontStyle.fonts.FONT_BOLD;
const HKViewController = NativeModules.HKViewController;
import { connect } from 'react-redux';
import FormData from 'form-data';
import * as kycVerificationAction from "app/actions/kycVerificationAction";
import Permissions from 'react-native-permissions';
import AndroidOpenSettings from "react-native-android-open-settings";
import ModalBox from 'react-native-modalbox';
import { Content } from 'native-base';
const { width, height } = Dimensions.get("screen");
class KYCVerification extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pan_number: "",
            pan_number_Error: "",
            name: "",
            address: "",
            pan_image_url: {},
            pan_image_url_error: true,
            value: "",
            isVisible: false,
            show_image: null

        }
    }
    async showMap(type = 3) {
        HKViewController.showScanner(type)
            .then(imageURL => {
                // this.setState({imagePath: imageURL});
                console.log("Image Pathe Is -------------------------->",imageURL);
                this.imageUploaded(imageURL)
            })
            .catch(error => console.log(error.message)); // error is a Javascript Error object
    }
    imageUploaded = (response) => {
        console.log('Profile Screen Reminder 1', response);
        //console.log('Profile Screen Reminder 2', this.state.selectDocument);
        this.setState({
            pan_image_url: {
                uri: Platform.OS === 'ios' ? response.uri : "file://" + response.uri,
                type: response.type,
                name: response.name,
            },
            show_image: 'file://' + response.uri,
            isVisible: false
        })
    }
    uploadImage = async () => {
        this.setState({ isVisible: true });
    }

    submit = async () => {
        const pan_number_Error = await validate('panCardNumber', this.state.pan_number);
        const pan_image_url_error = Object.keys(this.state.pan_image_url).length > 0
        this.setState({
            pan_image_url_error: pan_image_url_error,
            pan_number_Error: pan_number_Error,
        })
        if (!pan_number_Error && pan_image_url_error) {
            let bodyFormData = new FormData();
            bodyFormData.append('pan_number', this.state.pan_number);
            bodyFormData.append('pan_image_url', this.state.pan_image_url);
            this.props.kycVerificationImage(bodyFormData);
        }
    }
    openCamera = () => {

        Permissions.checkMultiple(['camera', 'photo']).then(response => {
            //response is an object mapping type to permission
           
            console.log('response', response);
            if (response.camera == 'authorized'  || response.camera == 'undetermined')  {
                // Greeter.greet('pancard_upload')
                this.showMap(3);
            } else {

                Alert.alert(
                    'We need to access your photos and storage',
                    'Allow App permissions',
                    [
                        {
                            text: 'No way',
                            onPress: () => console.log('Permission denied'),
                            style: 'cancel',
                        },
                        { text: 'Open Settings', onPress: Platform.OS == 'ios' ? Permissions.openSettings : AndroidOpenSettings.appDetailsSettings }
                        /*this.state.photoPermission == 'undetermined'
                            ? {text: 'OK', onPress: this._requestPermission}
                            : {text: 'Open Settings', onPress: Platform.OS == 'ios' ? Permissions.openSettings : AndroidOpenSettings.appDetailsSettings()},*/
                    ],
                );
            }
        });

    }
    imageUploadModal = () => {
        return (
            <ModalBox
                style={{ height: 300, width: '90%', borderRadius: 15, justifyContent: 'center', padding: 5 }}
                position={'center'}
                backdropPressToClose={false} swipeToClose={false} isOpen={this.state.isVisible}>
                <View style={{
                    alignItems: 'center',
                    alignSelf: 'center',
                    height: 120, width: '80%',
                    justifyContent: 'center',
                }}>
                    {
                        this.state.imagePath == undefined ?
                            <Image source={images.icons.upload_image}
                                style={{ width: 120, height: 100, alignItems: 'center' }}
                                resizeMode={'contain'} />
                            :
                            <Image
                                source={this.state.imagePath}
                                style={{
                                    width: undefined,
                                    height: '80%',
                                }}
                                resizeMode={'center'} />
                    }
                </View>
                <Text style={{ marginTop: 10, textAlign: 'center', fontFamily: FONT_REGULAR }}>
                    Upload your PAN Card to verify your KYT account
                </Text>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 5 }}>
                    <TouchableOpacity style={{ marginVertical: 10, alignItems: 'center' }}
                        onPress={() => this.openCamera()}>
                        <LinearGradient
                            start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                            colors={['#64B7A0', '#3992B2']} style={{
                                alignItems: 'center',
                                flexDirection: 'row',
                                height: 35,
                                width: width * 0.4,
                                borderRadius: 30
                            }}>
                            <Text style={{
                                fontFamily: FONT_REGULAR, textAlign: 'center', color: '#fff', width: "100%", fontSize: 15,
                                textAlignVertical: 'center'
                            }}>
                                Take Photo..
                            </Text>
                        </LinearGradient>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ marginVertical: 10, alignItems: 'center' }}
                        onPress={() => {
                            Permissions.checkMultiple(['camera', 'photo']).then(response => {
                                //response is an object mapping type to permission
                                console.log('response', response);
                                if (response.camera == 'authorized' || response.photo == "authorized" || response.camera == 'undetermined' || response.photo == "undetermined")  {
                                    this.showMap(2);
                                    // Greeter.scanFromGallery('pancard_upload');
                                } else {
                                    Alert.alert(
                                        'We need to access your photos and storage',
                                        'Allow App permissions',
                                        [
                                            {
                                                text: 'No way',
                                                onPress: () => console.log('Permission denied'),
                                                style: 'cancel',
                                            },
                                            {
                                                text: 'Open Settings',
                                                onPress: Platform.OS == 'ios' ? Permissions.openSettings : AndroidOpenSettings.appDetailsSettings,
                                            },
                                            /*this.state.photoPermission == 'undetermined'
                                                ? {text: 'OK', onPress: this._requestPermission}
                                                : {text: 'Open Settings', onPress: Platform.OS == 'ios' ? Permissions.openSettings : AndroidOpenSettings.appDetailsSettings()},*/
                                        ],
                                    );
                                }
                            });

                        }}>
                        <LinearGradient
                            start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                            colors={['#64B7A0', '#3992B2']} style={{
                                alignItems: 'center',
                                flexDirection: 'row',
                                height: 35,
                                width: width * 0.4,
                                borderRadius: 30
                            }}>
                            <Text style={{
                                fontFamily: FONT_REGULAR, textAlign: 'center', color: '#fff', width: "100%", fontSize: 15,
                                textAlignVertical: 'center'
                            }}>
                                Choose from Gallery
                            </Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity
                    onPress={() => this.setState({ isVisible: false })}
                    style={{
                        backgroundColor: "#343434", height: 35, width: 130, borderRadius: 40, justifyContent: 'center', marginVertical: 10, alignItems: 'center', alignSelf: 'center'
                    }}>
                    <Text style={{
                        fontSize: 16,
                        textAlign: 'center',
                        alignSelf: 'center',
                        color: '#fff',
                        fontFamily: FONT_BOLD,
                        backgroundColor: 'transparent',
                    }}>
                        Cancel
                    </Text>
                </TouchableOpacity>
            </ModalBox>
        );
    };

    goBack() {
        this.props.navigation.goBack()
    }

    render() {
        return (
            <SafeArea>
                {this.imageUploadModal()}
                <AuthHeader title={'KYT VERIFICAITON'} navigateTo={() => this.goBack()} />
                <Content style={{ marginHorizontal: 10 }} showsVerticalScrollIndicator={false}>
                    <View style={{ justifyContent: 'center', alignSelf: 'center' }}>
                        <Text style={{ marginVertical: 10, textAlign: 'center', fontFamily: FONT_BOLD, fontSize: 16, color: "#3992B3" }}>
                            Upload your PAN Card to verify your KYT account
                        </Text>
                    </View>
                    <View style={{
                        // top: -10,
                        height: 150, width: "100%",
                        borderTopColor: "#d2d2d2",
                        borderRadius: 10, justifyContent: 'center'
                    }}>
                        {/*   {!this.state.show_image ?
                            <Fragment>
                                <Image source={images.profile.leftTop} style={[styles.editImage, { position: 'absolute', top: 5, left: 5 }]} resizeMode={"contain"} />
                                <Image source={images.profile.rightTop} style={[styles.editImage, { position: 'absolute', top: 5, right: 5 }]} resizeMode={"contain"} />
                                <Image source={images.profile.leftBottom} style={[styles.editImage, { position: 'absolute', left: 5 }]} resizeMode={"contain"} />
                                <Image source={images.profile.rightBottom} style={[styles.editImage, { position: 'absolute', right: 5 }]} resizeMode={"contain"} />
                            </Fragment>
                            : null} */}
                        {!this.state.show_image ?
                            <TouchableOpacity onPress={() => this.uploadImage()}>
                                <Image source={images.icons.upload_image}
                                    style={{
                                        // flex: 1,
                                        alignSelf: 'center',
                                        alignItems: 'center',
                                        height: 100
                                    }}
                                    resizeMode={'contain'} />
                                <Text style={{ fontFamily: FONT_BOLD, textAlign: 'center', fontSize: 14, top: 5, marginHorizontal: 30 }}>
                                    Upload & Get Rewards
                                </Text>
                            </TouchableOpacity>
                            :
                            <Image
                                source={{ uri: this.state.show_image }}
                                style={{
                                    flex: 1,
                                    alignSelf: 'center',
                                    alignItems: 'center',
                                    // borderRadius: 50,
                                    width: "90%",
                                    height: 140
                                }}
                                resizeMode={'contain'} />
                        }
                    </View>
                    {!this.state.pan_image_url_error ? <Text style={[styles.errorText, { top: -10 }]}>{"Upload Your Pan Card for Verification"}</Text> : null}
                    <View>
                        <View style={[styles.TextInputContainer, this.state.pan_number_Error ? styles.errorBox : null]}>
                            <TextInput
                                style={styles.textInputStyle}
                                placeholder={"Verify Pan Card Number"}
                                maxLength={10}
                                placeholderStyle={styles.placeHolderText}
                                onChangeText={(text) => this.setState({ pan_number: text.toLocaleUpperCase() })}
                                value={this.state.pan_number}
                                onBlur={() => {
                                    this.setState({
                                        pan_number_Error: validate('panCardNumber', this.state.pan_number),
                                    })
                                }}
                                defaultValue={"123456"}
                                error={this.state.pan_number_Error}
                            />
                        </View>
                        {this.state.pan_number_Error ? <Text style={styles.errorText}>{this.state.pan_number_Error}</Text> : null}
                    </View>
                    <TouchableOpacity style={{ marginVertical: 15, alignItems: 'center' }} onPress={() => this.submit()}>
                        <LinearGradient
                            start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                            colors={['#64B7A0', '#3992B2']} style={styles.buttonStyle}>
                            <Text style={styles.buttonTextStyle}>
                                SUBMIT
                            </Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </Content>
            </SafeArea>
        )
    }
}


function mapStateToProps(state) {
    return {
        userProfile: state.authReducer.mainUser,
    };
}
function mapDispatchToProps(dispatch) {
    return {
        kycVerification: (data) => dispatch(kycVerificationAction.kycVerificationImage(data)),
    };
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(KYCVerification);
