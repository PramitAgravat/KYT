import FooterTabs from 'app/components/FooterTabs';
import SafeArea from 'app/components/SafeAreaView';
import images from 'app/config/images';
import { navigateToChangePassword, navigateToFeedbackForm, navigateToKYCVerificaiton, navigateToLoginandReset, navigateToReferralCode } from "app/navigation/NavigationHelpers";
import ListView from 'deprecated-react-native-listview';
import Moment from 'moment';
import { Text } from 'native-base';
import React, { Component, Fragment } from 'react';
import { DeviceEventEmitter, Image, ImageBackground, Linking, NativeEventEmitter, NativeModules, Platform, TouchableOpacity, View, Modal } from 'react-native';
import AndroidOpenSettings from 'react-native-android-open-settings';
import LinearGradient from 'react-native-linear-gradient';
import DateTimePicker from "react-native-modal-datetime-picker";
import ModalBox from 'react-native-modalbox';
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import Permissions from 'react-native-permissions';
import image from '../../config/images';
import styles from './styles';
import Api from 'app/api';
import ApiConstants from 'app/api/ApiConstants';
import AnimatedLoader from "react-native-animated-loader";
import SuccessModal from 'app/components/SuccessModal';
const HKViewController = NativeModules.HKViewController;
import ImageViewer from 'react-native-image-zoom-viewer';
const AVATAR_SIZE = 80;
const PARALLAX_HEADER_HEIGHT = 220;
const STICKY_HEADER_HEIGHT = 55;
const selectTab = ['#64B7A0', '#3992B2']
const unSelectTab = ['#ffffff', '#ffffff']
class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            successTitle: "Upload Image Success",
            successBody: "",
            isVisibleSuccess: false,
            imagePath: null,
            aadharCardIsVisible: false,
            panCardIsVisible: false,
            healthCardIsVisible: false,
            aadharTextMsg: "You are requested to establish Indian nationality by uploading the copy of your Aadhar card.",
            modalVisible: false,
            dataSharingContent: 'You have full control over what you want to share with us. You can change this setting anytime. However, please note that disabling sharing will make your data ineligible to receive monetary benefits, although you will still be able to use the app features to full functionality. Check our "Privacy policy" and "Monetisation policy" for further clarity.',
            contectUsContent: 'You have full control over what you want to share with us. You can change this setting anytime. However, please note that disabling sharing will make your data ineligible to receive monetary benefits, although you will still be able to use the app features to full functionality. Check our "Privacy policy" and "Monetisation policy" for further clarity.',
            visibleHeader: true,
            panCardModal: false,
            adharCardModal: false,
            healthCardModal: false,
            unique_code: this.props.userProfile.unique_code,
            profileVerified: this.props.userProfile.is_kyc_verified,
            name: this.props.userProfile.name,
            email: this.props.userProfile.email,
            phoneNumber: this.props.userProfile.phone,
            dob: this.props.userProfile.dob,
            gender: this.props.userProfile.gender,
            profile_pic: this.props.userProfile.image_url,
            emergency_number: this.props.userProfile.emergency_number,
            sendMeAlert: this.props.userProfile.is_notification_enable,
            dataSharing: this.props.userProfile.is_data_share,
            eMailSetting: this.props.userProfile.is_email_enable,
            address: this.props.userProfile.address,
            pincode: this.props.userProfile.pincode,
            userProfile: this.props.userProfile,
            health_insurance_image: {},
            health_insurance_url: this.props.userProfile.health_insurance_url,
            aadhar_image: {},
            aadhar_image_url: this.props.userProfile.aadhar_image_url,
            pan_image: {},
            pan_image_url: this.props.userProfile.pan_image_url,
            selectDocument: null,
            insurance_claim_data: this.props.insurance_claim_data === undefined ? 1 : 0,
            medical_expenses: this.props.medical_expenses === undefined ? 1 : 0,
            doctors_report: this.props.doctors_report === undefined ? 1 : 0,
            prescription: this.props.prescription === undefined ? 1 : 0,
            test_results: this.props.test_results === undefined ? 1 : 0,

            shareDataList: [
                {
                    id: 1,
                    title: "Insurance Cliam Data",
                    status: 1
                },
                {
                    id: 2,
                    title: "Medical Expenses",
                    status: 1
                },
                {
                    id: 3,
                    title: "Doctor's Report",
                    status: 1
                },
                {
                    id: 4,
                    title: "Prescription",
                    status: 1
                },
                {
                    id: 5,
                    title: "Test Result",
                    status: 1
                }],
            buttons: [
                {
                    id: 1,
                    title: "Data Sharing Settings",
                    icon: images.profile.setting_black,
                },
                {
                    id: 2,
                    title: "Refer a Friend and Earn KYT Points ",
                    icon: images.profile.share_black,
                },
                {
                    id: 3,
                    title: "E-mail Settings",
                    icon: images.profile.arrow_right_black,
                },
                {
                    id: 4,
                    title: "Contact Us",
                    icon: images.profile.arrow_right_black,
                },
                {
                    id: 5,
                    title: "Sign Out",
                    icon: images.profile.logout_black,
                }
            ],
        };
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
    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log("Component Did Update", this.props)
        const newProps = this.props;
        if (prevState.userProfile !== newProps.userProfile) {
            console.log(prevState.userProfile !== newProps.userProfile);
            this.setState({
                userProfile: newProps.userProfile
            })
        }
    }

    showDateTimePicker = () => {
        this.setState({ isDateTimePickerVisible: true });
    };

    hideDateTimePicker = () => {
        this.setState({ isDateTimePickerVisible: false });
    };

    handleDatePicked = async (date) => {
        await this.setState({
            dob: date
        });
        await this.hideDateTimePicker();
    };

    IS_SEND_ME_ALERT = async (value) => {
        let data = {
            is_notification_enable: value
        }
        this.setState({
            sendMeAlert: value
        });
        this.props.changeSendMeAlert(data);
    }
    IS_EMAIL_ENABLE = async (value) => {
        let data = {
            is_email_enable: value
        }
        this.setState({
            eMailSetting: value
        });
        this.props.changeEmailEnable(data);
    }
    onClose(data) {
        this.setState({
            isVisibleSuccess: false
        })
    }
    aadharImageUpload = async () => {
        let bodyFormData = new FormData();
        bodyFormData.append('aadhar_image', this.state.aadhar_image);
        this.setState({ aadharCardIsVisible: false, visible: true })
        await Api(ApiConstants.ADD_AADHAR_IMAGE, bodyFormData, 'post', { headers: { 'Content-Type': 'multipart/form-data' } }).then(res => {
            console.log("Result", res)
            if (res.data.status) {
                this.setState({
                    successTitle: "Upload Image Success",
                    successBody: res.data.message,
                    isVisibleSuccess: true,
                    visible: false
                });
                console.log("Update AADHAR IMAGE", res.data);
            }
        }).catch(err => {
            console.log('err', err);
            Toast.show({
                text: 'Network issue.Please try again later.',
                buttonText: "Okay",
                duration: 3000,
                type: "danger"
            });
            this.setState({
                visible: false
            });
        });
    }
    healthImageUpload = async () => {
        let bodyFormData = new FormData();
        bodyFormData.append('health_image', this.state.health_insurance_image);
        console.log('bodyFormData', bodyFormData);
        this.setState({ healthCardIsVisible: false, visible: true })
        await Api(ApiConstants.ADD_HEALTH_IMAGE, bodyFormData, 'post', { headers: { 'Content-Type': 'multipart/form-data' } }).then(res => {
            if (res.data.status) {
                this.setState({
                    successTitle: "Upload Image Success",
                    successBody: res.data.message,
                    isVisibleSuccess: true,
                    visible: false
                });
            }
        }).catch(err => {
            console.log('err', err);
            Toast.show({
                text: 'Network issue.Please try again later.',
                buttonText: "Okay",
                duration: 3000,
                type: "danger"
            });
            this.setState({
                visible: false
            });
        });
    }
    imageUploaded = (reminder) => {
        console.log('Profile Screen Reminder 1', reminder);
        console.log('Profile Screen Reminder 2', this.state.selectDocument);
        let imagePath = {
            uri: Platform.OS === 'ios' ? reminder.uri : "file://" + reminder.uri,
            type: reminder.type,
            name: reminder.name
        }
        switch (this.state.selectDocument) {
            case 1:
                this.setState({
                    health_insurance_url: "file://" + reminder.uri,
                    health_insurance_image: imagePath
                }, () => this.healthImageUpload());
                break;
            case 2:
                this.setState({
                    pan_image_url: "file://" + reminder.uri,
                    pan_image: imagePath
                });
                break;
            case 3:
                this.setState({
                    aadhar_image_url: "file://" + reminder.uri,
                    aadhar_image: imagePath
                }, () => this.aadharImageUpload());
                break;
        }
    }
    myDocument = () => {
        return <View style={[styles.contentView,]}>
            <View style={[styles.firstComponentView, {}]}>
                {/* <View style={{ flexDirection: 'row' }}> */}
                <Text style={[styles.mainTitleTextStyle, { color: "#439EAD" }]}>
                    MY CREDENTIALS
                    </Text>
                {/* </View> */}
                <View style={{ flexDirection: "row", flex: 1, }}>
                    <TouchableOpacity
                        style={{ alignItems: 'center', flex: 1, }}
                        onPress={() =>
                            this.setState({ aadharCardIsVisible: true })}>
                        <ImageBackground
                            source={images.health.infectious}
                            style={[styles.imageBackground, { alignItems: "center" }]} resizeMode={"cover"}>
                            <Image source={images.profile.adharCard} style={{ width: 30, height: 30, }} resizeMode={"cover"} />
                            <View style={{ flex: 0.5, marginVertical: 5, padding: 2 }}>
                                <Text style={{ textAlign: 'center', fontSize: 12, color: "#fff" }}>Aadhar</Text>
                                <Text style={{ textAlign: 'center', fontSize: 12, color: "#fff" }}>Card</Text>
                            </View>
                        </ImageBackground>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{ alignItems: 'center', flex: 1, }}
                        onPress={() =>
                            this.state.pan_image_url == undefined ? navigateToKYCVerificaiton() :
                                this.setState({ panCardIsVisible: true })}>
                        <ImageBackground
                            source={images.health.allergies}
                            style={[styles.imageBackground, { alignItems: "center" }]} resizeMode={"cover"}>
                            <Image source={images.profile.panCard} style={{ width: 30, height: 30, }} resizeMode={"cover"} />
                            <View style={{ flex: 0.5, marginVertical: 5, padding: 2 }}>
                                <Text style={{ textAlign: 'center', fontSize: 12, color: "#fff" }}>PAN</Text>
                                <Text style={{ textAlign: 'center', fontSize: 12, color: "#fff" }}>Card</Text>
                            </View>
                        </ImageBackground>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{ alignItems: 'center', flex: 1, }}
                        onPress={() =>
                            this.setState({ healthCardIsVisible: true })}>
                        <ImageBackground
                            source={images.health.crohns_colitis}
                            style={[styles.imageBackground, { alignItems: "center" }]} resizeMode={"cover"}>
                            <Image source={images.profile.healthInsurance} style={{ width: 30, height: 30, }} resizeMode={"cover"} />
                            <View style={{ flex: 0.5, marginVertical: 5, padding: 2 }}>
                                <Text style={{ textAlign: 'center', fontSize: 12, color: "#fff" }}>Health</Text>
                                <Text style={{ textAlign: 'center', fontSize: 12, color: "#fff" }}>Insurance</Text>
                            </View>
                        </ImageBackground>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    }

    contactInformation = () => {
        console.log("this.state.emergency_number", this.state.emergency_number)
        return <View style={styles.contentView}>
            <View style={styles.firstComponentView}>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={[styles.mainTitleTextStyle, { color: "#439EAD" }]}>
                        CONTACT INFORMATION
                    </Text>
                </View>
                <View style={{ flexDirection: "row", alignItems: 'center', margin: 5 }}>
                    <Text style={[styles.titleTextStyle, { width: 80 }]}>
                        Email
                    </Text>
                    <Text style={styles.addressTextInputStyle}>
                        {this.props.userProfile.email}
                    </Text>
                </View>
                <View style={{ flexDirection: "row", alignItems: 'center', margin: 5 }}>
                    <Text style={[styles.titleTextStyle, { width: 80 }]}>
                        Phone
                    </Text>
                    <Text style={styles.addressTextInputStyle}>
                        {this.state.phoneNumber}
                    </Text>
                </View>
                {this.props.userProfile.address ? <View style={{ flexDirection: "row", alignItems: 'center', margin: 5 }}>
                    <Text style={[styles.titleTextStyle, { width: 80 }]}>
                        Address
                    </Text>
                    <Text style={styles.addressTextInputStyle}>
                        {
                            this.props.userProfile.address
                            + " , " +
                            this.props.userProfile.pincode
                        }
                    </Text>
                </View> : null}
            </View>
        </View>
    }

    logout = () => {
        this.props.logout();
        navigateToLoginandReset();
    }
    dataSharing = (value) => {
        this.setState({
            dataSharing: value
        })
    }
    eMailSetting = (value) => {
        this.setState({
            eMailSetting: value
        })
    }
    _sendMeAlert = () => {
        return <View style={styles.buttonContainer}>
            <Image source={images.profile.rectangle_transparent_bg} style={styles.buttonBackgroundImage} resizeMode={"contain"} />
            <View style={styles.buttonContent}>
                <Text style={styles.buttonText}>
                    Send me Alerts & Updates
                </Text>
                <View style={styles.alertView}>
                    <TouchableOpacity
                        onPress={() => this.IS_SEND_ME_ALERT(1)}>
                        <LinearGradient
                            start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                            colors={this.state.sendMeAlert ? selectTab : unSelectTab}
                            style={styles.genderLinearGradient}>
                            <Text style={[styles.genderTextStyle, { color: this.state.sendMeAlert ? "#fff" : '#a59fa2' }]} >
                                ON
                            </Text>
                        </LinearGradient>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => this.IS_SEND_ME_ALERT(0)}>
                        <LinearGradient
                            start={{ x: 0.0, y: 0.25 }} end={{ x: 0.5, y: 1.0 }}
                            colors={this.state.sendMeAlert ? unSelectTab : selectTab}
                            style={styles.genderLinearGradient}>
                            <Text style={[styles.genderTextStyle, { color: this.state.sendMeAlert ? '#a59fa2' : "#fff" }]} >
                                OFF
                            </Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    }
    _dataSharing = () => {
        return <View style={styles.buttonContainer}>
            <Image source={images.profile.rectangle_transparent_bg} style={styles.buttonBackgroundImage} resizeMode={"stretch"} />
            <View style={styles.buttonContent}>
                <Text style={styles.buttonText}>
                    Data Sharing Settings
                    </Text>
                <View style={styles.alertView}>
                    <TouchableOpacity onPress={() => this.dataSharingClick(1)}>
                        <LinearGradient
                            start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                            colors={this.state.dataSharing ? selectTab : unSelectTab}
                            // colors={this.state.dataSharing ? ['#64B7A0', '#3992B2'] : ['#ffffff', '#ffffff']}
                            style={styles.genderLinearGradient}>
                            <Text style={[styles.genderTextStyle, { color: this.state.dataSharing ? "#ffffff" : '#a59fa2' }]} >
                                ON
                            </Text>
                        </LinearGradient>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.dataSharingClick(0)}>
                        <LinearGradient
                            start={{ x: 0.0, y: 0.25 }} end={{ x: 0.5, y: 1.0 }}
                            colors={this.state.dataSharing ? unSelectTab : selectTab}
                            style={styles.genderLinearGradient}>
                            <Text style={[styles.genderTextStyle, { color: this.state.dataSharing ? '#a59fa2' : "#ffffff" }]} >
                                OFF
                            </Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    }
    _eMailSetting = () => {
        return <View style={styles.buttonContainer}>
            <Image source={images.profile.rectangle_transparent_bg} style={styles.buttonBackgroundImage} resizeMode={"stretch"} />
            <View style={styles.buttonContent}>
                <Text style={styles.buttonText}>
                    E-mail Settings
                </Text>
                <View style={styles.alertView}>
                    <TouchableOpacity
                        onPress={() => this.IS_EMAIL_ENABLE(1)}>
                        <LinearGradient
                            start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                            colors={this.state.eMailSetting ? selectTab : unSelectTab}
                            // colors={this.state.dataSharing ? ['#64B7A0', '#3992B2'] : ['#ffffff', '#ffffff']}
                            style={styles.genderLinearGradient}>
                            <Text style={[styles.genderTextStyle, { color: this.state.eMailSetting ? "#ffffff" : '#a59fa2' }]} >
                                ON
                            </Text>
                        </LinearGradient>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => this.IS_EMAIL_ENABLE(0)}
                    >
                        <LinearGradient
                            start={{ x: 0.0, y: 0.25 }} end={{ x: 0.5, y: 1.0 }}
                            colors={this.state.eMailSetting ? unSelectTab : selectTab}
                            style={styles.genderLinearGradient}>
                            <Text style={[styles.genderTextStyle, { color: this.state.eMailSetting ? '#a59fa2' : "#ffffff" }]} >
                                OFF
                            </Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    }

    shareData = (index, value) => {
        this.state.shareDataList[index - 1].status = value
    }

    _setdataSharing = (item) => {
        let data = item.item;
        return <View style={[styles.buttonContainer, { height: 40, marginHorizontal: 10 }]}>
            <View style={styles.buttonContent}>
                <Text style={styles.buttonText}>
                    {data.title}
                </Text>
                <View style={styles.alertView}>
                    <TouchableOpacity onPress={() => this.shareData(data.id, 1)}>
                        <LinearGradient
                            start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                            colors={this.state.shareDataList[item.index].status ? selectTab : unSelectTab}
                            // colors={this.state.sendMeAlert ? ['#64B7A0', '#3992B2'] : ['#ffffff', '#ffffff']}
                            style={styles.genderLinearGradient}>
                            <Text style={[styles.genderTextStyle, { color: this.state.shareDataList[item.index].status ? "#fff" : '#a59fa2' }]} >
                                ON
                            </Text>
                        </LinearGradient>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.shareData(data.id, 0)}>
                        <LinearGradient
                            start={{ x: 0.0, y: 0.25 }} end={{ x: 0.5, y: 1.0 }}
                            // colors={this.state.sendMeAlert ? ['#ffffff', '#ffffff'] : ['#64B7A0', '#3992B2']}
                            colors={this.state.shareDataList[item.index].status ? unSelectTab : selectTab}
                            style={styles.genderLinearGradient}>
                            <Text style={[styles.genderTextStyle, { color: this.state.shareDataList[item.index].status ? '#a59fa2' : "#fff" }]} >
                                OFF
                            </Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    }

    profileVerifiedText = () => {
        const { profileVerified } = this.state;
        console.log("Pending Profile", profileVerified)
        if (profileVerified === 0) {
            return <Text style={{ fontSize: 13, color: "#ffffff" }}
                onPress={() => navigateToKYCVerificaiton()}
            >
                (Unverified? - Click Here!)
            </Text>
        }
        else if (profileVerified === 1) {
            return <Text style={{ fontSize: 13, color: "#ffffff" }}>
                Verified
            </Text>
        }
        else if (profileVerified === 2) {
            return <Text style={{ fontSize: 13, color: "#ffffff" }}>
                Verification Pending
            </Text>
        }
    }

    healthCardModal = () => {
        return (
            this.state.health_insurance_url == undefined ?
                <ModalBox
                    style={{ height: 300, width: "90%", borderRadius: 15, justifyContent: 'center', padding: 5 }}
                    position={"center"}
                    backdropPressToClose={false} swipeToClose={false} isOpen={this.state.healthCardIsVisible}>
                    <View>
                        <View style={{
                            alignItems: 'center',
                            alignSelf: 'center',
                            height: 120, width: "80%",
                            justifyContent: 'center'
                        }}>
                            <Image source={images.icons.upload_image}
                                style={{ width: 120, height: 100, alignItems: 'center' }}
                                resizeMode={'contain'} />
                            {/* {this.state.health_insurance_url == undefined ?
                                <Fragment>
                                    <Image source={images.profile.leftTop} style={[styles.editImage, { position: 'absolute', top: 5, left: 5 }]} resizeMode={"contain"} />
                                    <Image source={images.profile.rightTop} style={[styles.editImage, { position: 'absolute', top: 5, right: 5 }]} resizeMode={"contain"} />
                                    <Image source={images.profile.leftBottom} style={[styles.editImage, { position: 'absolute', left: 5 }]} resizeMode={"contain"} />
                                    <Image source={images.profile.rightBottom} style={[styles.editImage, { position: 'absolute', right: 5 }]} resizeMode={"contain"} />
                                </Fragment>
                                : null} */}
                        </View>
                        <Text style={{ marginTop: 10, textAlign: 'center' }}>
                            Upload your Health Insurance image and keep it handy in times of need.
                        </Text>
                        <View style={{ flexDirection: "row", justifyContent: 'space-between', marginHorizontal: 5 }}>
                            <TouchableOpacity style={{ marginVertical: 10, alignItems: 'center' }}
                                onPress={() => this.setState({ selectDocument: 1 }, () => this.openCamera())}>
                                <LinearGradient
                                    start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                                    colors={['#64B7A0', '#3992B2']} style={styles.buttonStyle}>
                                    <Text style={styles.buttonTextStyle}>
                                        Take Photo..
                                    </Text>
                                </LinearGradient>
                            </TouchableOpacity>
                            <TouchableOpacity style={{ marginVertical: 10, alignItems: 'center' }}
                                onPress={() => {
                                    Permissions.checkMultiple(['camera', 'photo']).then(response => {
                                        //response is an object mapping type to permission
                                        console.log('response', response);
                              
                                        if ((response.camera == 'authorized' || response.photo == "authorized")  || (response.camera == 'undetermined' && response.photo == "undetermined") ) {
                                            this.setState({ selectDocument: 1 },()=> this.showMap(2))
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
                                                ],
                                            );
                                        }
                                    });

                                }}>
                                <LinearGradient
                                    start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                                    colors={['#64B7A0', '#3992B2']} style={styles.buttonStyle}>
                                    <Text style={styles.buttonTextStyle}>
                                        Choose from Gallery
                            </Text>
                                </LinearGradient>
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity
                            onPress={() => this.setState({ healthCardIsVisible: false })}
                            style={styles.cancelButton}>
                            <Text style={styles.applyButtonText}>
                                Cancel
                            </Text>
                        </TouchableOpacity>
                        {/* <TouchableOpacity style={{ alignItems: 'center' }}
                            onPress={() => this.setState({ healthCardIsVisible: false })}>
                            <LinearGradient
                                start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                                colors={['#64B7A0', '#3992B2']} style={styles.buttonStyle}>
                                <Text style={styles.buttonTextStyle}>
                                    Cancel
                        </Text>
                            </LinearGradient>
                        </TouchableOpacity> */}
                    </View>

                </ModalBox> :
                <Modal
                    visible={this.state.healthCardIsVisible}
                    transparent={true}
                    animationType="slide"
                    onRequestClose={() => this.setState({ healthCardIsVisible: false })}
                >
                    <View style={{ flex: 1, backgroundColor: 'black' }}>
                        <View style={{ flexDirection: 'row', alignSelf: 'flex-end', marginTop: 30 }}>
                            <TouchableOpacity
                                style={{
                                    paddingHorizontal: 20,
                                }}
                                onPress={() => this.setState({ healthCardIsVisible: false })}
                            >
                                <Image
                                    style={{ width: 25, height: 25 }}
                                    source={images.disease.close}
                                />
                            </TouchableOpacity>

                        </View>
                        <Image
                            source={{ uri: this.state.health_insurance_url }}
                            style={{
                                width: undefined,
                                height: "80%"
                            }}
                            resizeMode={'center'} />
                    </View>
                </Modal>
        )
    }

    panCardModal = () => {
        return (

            this.state.pan_image_url == undefined ?

                <ModalBox
                    style={{ height: 300, width: "90%", borderRadius: 15, justifyContent: 'center', padding: 5 }}
                    position={"center"}
                    backdropPressToClose={false} swipeToClose={false} isOpen={this.state.panCardIsVisible}>
                    <View style={{
                        alignItems: 'center',
                        alignSelf: 'center',
                        height: 120, width: "80%",
                        justifyContent: 'center'
                    }}>
                        <Image source={images.icons.upload_image}
                            style={{ width: 120, height: 100, alignItems: 'center' }}
                            resizeMode={'contain'} />
                        {/* {this.state.pan_image_url == undefined ?
                            <Fragment>
                                <Image source={images.profile.leftTop} style={[styles.editImage, { position: 'absolute', top: 5, left: 5 }]} resizeMode={"contain"} />
                                <Image source={images.profile.rightTop} style={[styles.editImage, { position: 'absolute', top: 5, right: 5 }]} resizeMode={"contain"} />
                                <Image source={images.profile.leftBottom} style={[styles.editImage, { position: 'absolute', left: 5 }]} resizeMode={"contain"} />
                                <Image source={images.profile.rightBottom} style={[styles.editImage, { position: 'absolute', right: 5 }]} resizeMode={"contain"} />
                            </Fragment>
                            : null} */}
                    </View>
                    <Text style={{ marginTop: 10, textAlign: 'center' }}>
                        Upload your PAN Card image to verify your account.
            </Text>
                    <TouchableOpacity
                        onPress={() => this.setState({ panCardIsVisible: false })}
                        style={styles.cancelButton}>
                        <Text style={styles.applyButtonText}>
                            Cancel
                            </Text>
                    </TouchableOpacity>
                    {/* <TouchableOpacity style={{ marginTop: 20, alignItems: 'center' }}
                        onPress={() => this.setState({ panCardIsVisible: false })}>
                        <LinearGradient
                            start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                            colors={['#64B7A0', '#3992B2']} style={styles.buttonStyle}>
                            <Text style={styles.buttonTextStyle}>
                                Cancel
                </Text>
                        </LinearGradient>
                    </TouchableOpacity> */}
                </ModalBox>
                :
                <Modal
                    visible={this.state.panCardIsVisible}
                    transparent={true}
                    animationType="slide"
                    onRequestClose={() => this.setState({ panCardIsVisible: false })}
                >
                    <View style={{ flex: 1, backgroundColor: 'black' }}>
                        <View style={{ flexDirection: 'row', alignSelf: 'flex-end', marginTop: 30 }}>
                            <TouchableOpacity
                                style={{
                                    paddingHorizontal: 20,
                                }}
                                onPress={() => this.setState({ panCardIsVisible: false })}
                            >
                                <Image
                                    style={{ width: 25, height: 25 }}
                                    source={images.disease.close}
                                />
                            </TouchableOpacity>

                        </View>
                        <Image
                            source={{ uri: this.state.pan_image_url }}
                            style={{
                                width: undefined,
                                height: "80%"
                            }}
                            resizeMode={'center'} />
                    </View>
                </Modal>
        )
    }

    adharCardModal = () => {
        return (
            this.state.aadhar_image_url == undefined ?
                <ModalBox
                    style={{ height: 300, width: "90%", borderRadius: 15, justifyContent: 'center', padding: 5 }}
                    position={"center"}
                    backdropPressToClose={false} swipeToClose={false} isOpen={this.state.aadharCardIsVisible}>
                    <View style={{
                        alignItems: 'center',
                        alignSelf: 'center',
                        height: 120, width: "80%",
                        justifyContent: 'center'
                    }}>
                        <Image source={images.icons.upload_image}
                            style={{ width: 120, height: 100, alignItems: 'center' }}
                            resizeMode={'contain'} />
                        {/* {this.state.aadhar_image_url == undefined ?
                            <Fragment>
                                <Image source={images.profile.leftTop} style={[styles.editImage, { position: 'absolute', top: 5, left: 5 }]} resizeMode={"contain"} />
                                <Image source={images.profile.rightTop} style={[styles.editImage, { position: 'absolute', top: 5, right: 5 }]} resizeMode={"contain"} />
                                <Image source={images.profile.leftBottom} style={[styles.editImage, { position: 'absolute', left: 5 }]} resizeMode={"contain"} />
                                <Image source={images.profile.rightBottom} style={[styles.editImage, { position: 'absolute', right: 5 }]} resizeMode={"contain"} />
                            </Fragment>
                            : null} */}
                    </View>
                    <Text style={{ marginTop: 10, textAlign: 'center' }}>
                        Upload front copy of your Aadhar Card image to establish Indian nationality.
            </Text>
                    <View style={{ flexDirection: "row", justifyContent: 'space-between', marginHorizontal: 5 }}>
                        <TouchableOpacity style={{ marginVertical: 10, alignItems: 'center' }}
                            onPress={() => this.setState({ selectDocument: 3 }, () => this.openCamera())}>
                            <LinearGradient
                                start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                                colors={['#64B7A0', '#3992B2']} style={styles.buttonStyle}>
                                <Text style={styles.buttonTextStyle}>
                                    Take Photo..
                        </Text>
                            </LinearGradient>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ marginVertical: 10, alignItems: 'center' }}
                            onPress={() => {
                                Permissions.checkMultiple(['camera', 'photo']).then(response => {
                                    //response is an object mapping type to permission
                                    console.log('response', response);
                                    if ((response.camera == 'authorized' || response.photo == "authorized")  || (response.camera == 'undetermined' && response.photo == "undetermined") ) {
                                        this.setState({ selectDocument: 3 },()=>this.showMap(2))
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
                                            ],
                                        );
                                    }
                                });
                            }}>
                            <LinearGradient
                                start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                                colors={['#64B7A0', '#3992B2']} style={styles.buttonStyle}>
                                <Text style={styles.buttonTextStyle}>
                                    Choose from Gallery
                        </Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity
                        onPress={() => this.setState({ aadharCardIsVisible: false })}
                        style={styles.cancelButton}>
                        <Text style={styles.applyButtonText}>
                            Cancel
                            </Text>
                    </TouchableOpacity>
                    {/* <TouchableOpacity style={{ alignItems: 'center' }}
                        onPress={() => this.setState({ aadharCardIsVisible: false })}>
                        <LinearGradient
                            start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                            colors={['#64B7A0', '#3992B2']} style={styles.buttonStyle}>
                            <Text style={styles.buttonTextStyle}>
                                Cancel
                    </Text>
                        </LinearGradient>
                    </TouchableOpacity> */}
                </ModalBox>
                :
                <Modal
                    visible={this.state.aadharCardIsVisible}
                    transparent={true}
                    animationType="slide"
                    onRequestClose={() => this.setState({ aadharCardIsVisible: false })}
                >
                    <View style={{ flex: 1, backgroundColor: 'black' }}>
                        <View style={{ flexDirection: 'row', alignSelf: 'flex-end', marginTop: 30 }}>
                            <TouchableOpacity
                                style={{
                                    paddingHorizontal: 20,
                                }}
                                onPress={() => this.setState({ aadharCardIsVisible: false })}
                            >
                                <Image
                                    style={{ width: 25, height: 25 }}
                                    source={images.disease.close}
                                />
                            </TouchableOpacity>

                        </View>
                        <Image
                            source={{ uri: this.state.aadhar_image_url }}
                            style={{
                                width: undefined,
                                height: "80%"
                            }}
                            resizeMode={'center'} />
                    </View>
                </Modal>
        )
    }
    openCamera = () => {

   
        Permissions.checkMultiple(['camera', 'photo']).then(response => {
            
            //response is an object mapping type to permission
            console.log('response', response);
            if (response.camera == 'authorized'  || response.camera == 'undetermined')  {
                this.showMap(3);
                // Greeter.greet("profileImageUpload")
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
    render() {
        var now = Moment(new Date()); //todays date
        var end = Moment(this.state.userProfile.dob, "DD-MM-YYYY").format('YYYY-MM-DD')
        var duration = Moment.duration(now.diff(end));
        var age = Math.floor(Math.abs(duration.asYears()));

        const { onScroll = () => { } } = this.props;
        const { navigation } = this.props;
        const { userProfile } = this.state;
        return (
            <SafeArea>
                <AnimatedLoader
                    visible={this.state.visible}
                    overlayColor="rgba(255,255,255,0.75)"
                    animationStyle={styles.lottie}
                    speed={1}
                    source={require('app/assets/json/data.json')}
                />
                <SuccessModal title={this.state.successTitle} body={this.state.successBody} isVisible={this.state.isVisibleSuccess} onClose={(data) => this.onClose(data)} backDropClose={true} swipeClose={true} />
                {this.adharCardModal()}
                {this.panCardModal()}
                {this.healthCardModal()}
                {/* {this.imageCropMenu()} */}
                <ParallaxScrollView
                    onScroll={onScroll}
                    onChangeHeaderVisibility={(visible) => {
                        console.log(" CHECK HEADER VISIBLITY ", visible)
                        this.setState({ visibleHeader: visible });
                    }}
                    stickyHeaderHeight={!this.state.visibleHeader ? STICKY_HEADER_HEIGHT : 1}
                    parallaxHeaderHeight={PARALLAX_HEADER_HEIGHT}
                    backgroundSpeed={10}
                    renderBackground={() => (
                        <View style={{ backgroundColor: "#fff" }}>
                            <Image source={images.profile.background} style={{ width: "190%", height: "110%", left: "-40%", top: "-35%" }} resizeMode={"contain"} />
                        </View>
                    )}

                    renderForeground={() => (
                        <View key="parallax-header" style={styles.parallaxHeader}>
                            <View style={{
                                flexDirection: "row",
                                justifyContent: "space-between",
                                marginHorizontal: 10
                            }}>

                                <TouchableOpacity
                                    style={{ paddingHorizontal: 10, alignSelf: "baseline" }}
                                    onPress={() => this.props.navigation.goBack()}>
                                    <Image source={image.disease.left_arrow} style={{ width: 20, height: 20, }} resizeMode={"cover"} />
                                </TouchableOpacity>

                                <View style={{ alignItems: "center" }}>
                                    <Text style={styles.profileTitle}>
                                        PROFILE
                                    </Text>
                                    <Image
                                        source={{ uri: this.props.userProfile.image_url }}
                                        style={{
                                            borderRadius: 150,
                                            width: AVATAR_SIZE,
                                            height: AVATAR_SIZE
                                        }} />
                                    <Text style={styles.userName}>
                                        {this.state.userProfile.name}
                                    </Text>
                                    <Text style={[styles.userName, { fontSize: 13 }]}>
                                        (
                                            {this.state.userProfile.gender == 1 ? "Female" : "Male"}
                                        <Text style={[styles.userName, { fontSize: 13 }]}>
                                            {"/" + age + " years"}
                                            )
                                                </Text>
                                    </Text>
                                    {
                                        this.profileVerifiedText()
                                    }
                                </View>

                                <TouchableOpacity
                                    onPress={() => this.props.navigation.navigate("EditProfile")}
                                    style={{ paddingHorizontal: 10, alignSelf: "baseline", top: 5 }}
                                >
                                    <Image source={images.profile.white_bg} style={styles.whiteBGImage} resizeMode={"center"} />
                                    <Image source={images.profile.edit} style={[styles.headerEditImage,
                                    { position: "absolute" }]} resizeMode={"contain"} />
                                </TouchableOpacity>

                            </View>
                        </View>
                    )}


                    renderStickyHeader={() => (
                        <View style={{ flexDirection: "row", backgroundColor: "#4EA6A8", padding: 5, alignItems: 'center' }}>
                            <Image
                                source={{ uri: this.props.userProfile.image_url }}
                                style={{
                                    top: 3,
                                    left: 12,
                                    borderRadius: 100,
                                    width: 40,
                                    height: 40
                                }} />
                            <View key="sticky-header" style={styles.stickySection}>
                                <Text style={[styles.userName, { margin: 10 }]}>{this.state.userProfile.name}</Text>
                            </View>
                            <TouchableOpacity
                                onPress={() => this.props.navigation.navigate("EditProfile")}
                                style={{ position: 'absolute', right: 15, alignItems: 'center' }}>
                                <Image source={images.profile.white_bg} style={styles.whiteBGImage} resizeMode={"center"} />
                                <Image source={images.profile.edit} style={[styles.editImage, { position: 'absolute' }]} resizeMode={"contain"} />
                            </TouchableOpacity>
                        </View>
                    )}
                >
                    <View style={styles.mainContentView}>
                        <View style={{ alignItems: 'center' }}>
                            {this.contactInformation()}
                            {this.myDocument()}
                        </View>
                        <TouchableOpacity
                            onPress={() => navigateToReferralCode()}
                            style={styles.buttonContainer}>
                            <Image source={images.profile.rectangle_transparent_bg} style={styles.buttonBackgroundImage} resizeMode={"stretch"} />
                            <View style={styles.buttonContent}>
                                <Text style={[styles.buttonText, { color: '#439EAD', fontWeight: "bold" }]}>
                                    Refer a Friend and Earn KYT Points
                                    </Text>
                                <Image
                                    source={images.profile.share}
                                    style={styles.buttonImg} resizeMode={"contain"} />
                            </View>
                        </TouchableOpacity>
                        {this._sendMeAlert()}
                        <TouchableOpacity
                            onPress={() => this.props.navigation.navigate("DataSharing", { title: "Data Sharing Settings", contentScreen: "DataSharing", content: this.state.dataSharingContent })}
                            style={styles.buttonContainer}>
                            <Image source={images.profile.rectangle_transparent_bg} style={styles.buttonBackgroundImage} resizeMode={"stretch"} />
                            <View style={styles.buttonContent}>
                                <Text style={styles.buttonText}>
                                    Data Sharing Settings
                                    </Text>
                                <Image
                                    source={images.profile.arrow_right_black}
                                    style={styles.buttonImg} resizeMode={"contain"} />
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity
                            // onPress={() => this.submitData()}
                            onPress={() => navigateToChangePassword()}
                            style={styles.buttonContainer}>
                            <Image source={images.profile.rectangle_transparent_bg} style={styles.buttonBackgroundImage} resizeMode={"stretch"} />
                            <View style={styles.buttonContent}>
                                <Text style={styles.buttonText}>
                                    Change Password
                                    </Text>
                                <Image
                                    source={images.profile.change_password}
                                    style={styles.buttonImg} resizeMode={"contain"} />
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => navigateToFeedbackForm()}
                            style={styles.buttonContainer}>
                            <Image source={images.profile.rectangle_transparent_bg} style={styles.buttonBackgroundImage} resizeMode={"stretch"} />
                            <View style={styles.buttonContent}>
                                <Text style={styles.buttonText}>
                                    Feedback Form
                                </Text>
                                <Image
                                    source={images.profile.arrow_right_black}
                                    style={styles.buttonImg} resizeMode={"contain"} />
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => Linking.openURL('mailto:enquiry@thekyt.in')}
                            style={styles.buttonContainer}>
                            <Image source={images.profile.rectangle_transparent_bg} style={styles.buttonBackgroundImage} resizeMode={"stretch"} />
                            <View style={styles.buttonContent}>
                                <Text style={styles.buttonText}>
                                    Contact Us
                                        </Text>
                                <Image
                                    source={images.profile.arrow_right_black}
                                    style={styles.buttonImg} resizeMode={"contain"} />
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity
                            // onPress={() => this.submitData()}
                            onPress={() => this.logout()}
                            style={styles.buttonContainer}>
                            <Image source={images.profile.rectangle_transparent_bg} style={styles.buttonBackgroundImage} resizeMode={"stretch"} />
                            <View style={styles.buttonContent}>
                                <Text style={styles.buttonText}>
                                    Sign Out
                                </Text>
                                <Image
                                    source={images.profile.logout_black}
                                    style={styles.buttonImg} resizeMode={"contain"} />
                            </View>
                        </TouchableOpacity>
                    </View>
                </ParallaxScrollView>


                <DateTimePicker
                    isVisible={this.state.isDateTimePickerVisible}
                    onConfirm={this.handleDatePicked}
                    onCancel={this.hideDateTimePicker}
                />
                <View style={{ marginTop: 40 }}>
                    <FooterTabs navigation={navigation} />
                </View>
            </SafeArea>
        );
    }
}



export default Profile;
