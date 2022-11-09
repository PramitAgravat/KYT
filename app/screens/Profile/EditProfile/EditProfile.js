import SafeArea from 'app/components/SafeAreaView';
import images from 'app/config/images';
import fontStyle from 'app/config/styles';
import validate from "app/lib/validation_wrapper";
import FormData from 'form-data';
import Moment from 'moment';
import { Text } from 'native-base';
import React, { Component } from 'react';
import { Dimensions, Image, Platform, TextInput, TouchableOpacity, View } from 'react-native';
import AnimatedLoader from "react-native-animated-loader";
import ImagePicker from 'react-native-image-picker';
import LinearGradient from 'react-native-linear-gradient';
import DateTimePicker from "react-native-modal-datetime-picker";
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import image from '../../../config/images';
import styles from './styles';

const AVATAR_SIZE = 100;
const PARALLAX_HEADER_HEIGHT = 220;
const STICKY_HEADER_HEIGHT = 55;
const selectTab = ['#64B7A0', '#3992B2']
const unSelectTab = ['#ffffff', '#ffffff']

class EditProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visibleHeader: true,
            name: this.props.userProfile.name,
            email: this.props.userProfile.email,
            phone: this.props.userProfile.phone,
            dob: this.props.userProfile.dob,
            gender: this.props.userProfile.gender,
            profile_pic: this.props.userProfile.image_url,
            /*health_insurance_no: this.props.userProfile.health_insurance_no,
            policy_no: this.props.userProfile.policy_no,*/
            // emergency_number: this.props.userProfile.emergency_number,
            sendMeAlert: this.props.userProfile.is_notification_enable,
            dataSharing: this.props.userProfile.is_data_share,
            eMailSetting: this.props.userProfile.is_email_enable,
            address: this.props.userProfile.address,
            pincode: this.props.userProfile.pincode ? this.props.userProfile.pincode.toString() : null,
            userProfile: this.props.userProfile,
            health_image: {},
            health_image_url: this.props.userProfile.health_insurance_url,
            aadhar_image: {},
            aadhar_image_url: this.props.userProfile.aadhar_image_url,
            insurance_claim_data: this.props.insurance_claim_data === undefined ? 1 : 0,
            medical_expenses: this.props.medical_expenses === undefined ? 1 : 0,
            doctors_report: this.props.doctors_report === undefined ? 1 : 0,
            prescription: this.props.prescription === undefined ? 1 : 0,
            test_results: this.props.test_results === undefined ? 1 : 0,
            pincodeError: null,
            addressError: null,
            // emergency_numberError: null,
            emailError: null,
            phoneError: null,
            generalInformationEdit: true,
            visible: false,
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
        };
        console.log("this.state.profile_pic", this.state.profile_pic);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log("Component Did Update After Okay click", this.props)
        const newProps = this.props;
        if (prevState.userProfile !== newProps.userProfile) {
            console.log(prevState.userProfile !== newProps.userProfile);
            this.setState({
                userProfile: newProps.userProfile
            })
        }
        if (prevState.visible !== newProps.loader) {
            console.log('newProps.loader', newProps.loader);
            this.setState({ visible: newProps.loader })
        }
        if (prevProps.profileError !== newProps.profileError) {
            console.log('newProps.error', newProps.loader);
            if (Object.keys(newProps.profileError).length) {
                for (let key in newProps.profileError) {
                    if (!newProps.profileError.hasOwnProperty(key)) continue;
                    let v = newProps.profileError[key];
                    let k = key + 'Error';
                    let state = {};
                    state[k] = v[0];
                    this.setState(state)
                }
            }
        }
    }

    showDateTimePicker = () => {
        this.setState({ isDateTimePickerVisible: true });
    };

    hideDateTimePicker = () => {
        this.setState({ isDateTimePickerVisible: false });
    };

    handleDatePicked = async (date) => {
        const NewDate = Moment(date).format('DD-MM-YYYY')
        await this.setState({
            dob: NewDate,
        });
        await this.hideDateTimePicker();
    };

    selectPhotoTapped() {
        const options = {
            quality: 1.0,
            maxWidth: 300,
            maxHeight: 300,
            storageOptions: {
                skipBackup: true
            },
        };

        ImagePicker.showImagePicker(options, (response) => {
            if (response.didCancel) {
                console.log('User cancelled photo picker');
            }
            else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            }
            else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            }
            else {
                let source = response.uri;
                console.log("response TEST", response)
                /*this.setState({
                    profile_pic: { uri: source }
                });*/
                let bodyFormData = new FormData();
                const image = {
                    uri: Platform.OS === 'android' ? response.uri : response.uri.replace('file://', ''),
                    type: response.type,
                    name: response.fileName,
                };

                bodyFormData.append('image', image);
                this.props.updateProfilePic(bodyFormData);
            }
        });
    }

    selectHealthPhotoTapped() {
        const options = {
            quality: 1.0,
            // maxWidth: 300,
            // maxHeight: 300,
            maxWidth: 800,
            maxHeight: 800,
            storageOptions: {
                skipBackup: true
            },
        };

        ImagePicker.showImagePicker(options, (response) => {
            if (response.didCancel) {
                console.log('User cancelled photo picker');
            }
            else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            }
            else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            }
            else {
                this.setState({
                    health_image_url: response.uri,
                    health_image: {
                        uri: Platform.OS === 'android' ? response.uri : response.uri.replace('file://', ''),
                        type: response.type,
                        name: response.fileName,
                    },
                })

            }
        });
    }

    selectAadharPhotoTapped() {
        const options = {
            quality: 1.0,
            maxWidth: 300,
            maxHeight: 300,
            storageOptions: {
                skipBackup: true
            },
        };

        ImagePicker.showImagePicker(options, (response) => {
            if (response.didCancel) {
                console.log('User cancelled photo picker');
            }
            else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            }
            else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            }
            else {
                console.log("Image is ----->", response)
                this.setState({
                    aadhar_image_url: response.uri,
                    aadhar_image: {
                        uri: Platform.OS === 'android' ? response.uri : response.uri.replace('file://', ''),
                        type: response.type,
                        name: response.fileName,
                    },
                })
            }
        });
    }


    generalInformation = () => {
        return <View style={styles.contentView}>
            <View style={styles.firstComponentView}>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={[styles.mainTitleTextStyle, { color: "#439EAD" }]}>
                        GENERAL INFORMATION
                    </Text>

                </View>

                {/* <View style={{ margin: 5, flexDirection: 'row' }}> */}
                <View style={[styles.childContainer, this.state.addressError ? styles.errorBox : null]}>
                    <Text style={styles.titleTextStyle}>
                        Address
                    </Text>
                    <TextInput
                        // editable={this.state.generalInformationEdit}
                        multiline
                        placeholder={"Full Address here"}
                        style={[styles.textInputStyle, { textAlignVertical: 'top', height: 80 }]}
                        returnKeyType='next'
                        onChangeText={(text) => this.setState({ address: text })}
                        defaultValue={this.state.address}
                        onBlur={() => {
                            this.setState({
                                addressError: validate('address', this.state.address),
                            })
                        }}
                    />
                </View>
                {this.state.addressError ? <Text style={styles.errorText}>{this.state.addressError}</Text> : null}
                <View>
                    <View style={[styles.childContainer, this.state.pincodeError ? styles.errorBox : null]}>
                        <Text style={styles.titleTextStyle}>
                            Pincode
                    </Text>
                        <TextInput
                            maxLength={6}
                            keyboardType={'numeric'}
                            underlineColorAndroid='transparent'
                            placeholder={"PINCODE"}
                            style={[styles.textInputStyle]}
                            returnKeyType='done'
                            onChangeText={(text) => this.setState({ pincode: text })}
                            defaultValue={this.state.pincode}
                            onBlur={() => {
                                this.setState({
                                    pincodeError: validate('pincodeLength', this.state.pincode),
                                })
                            }}
                        />
                    </View>
                    {this.state.pincodeError ? <Text style={styles.errorText}>{this.state.pincodeError}</Text> : null}
                </View>
                <TouchableOpacity
                    onPress={() => this.showDateTimePicker()}
                    style={styles.childContainer}>
                    <Text style={styles.titleTextStyle}>
                        DOB
                    </Text>
                    <TextInput
                        editable={false}
                        placeholder={Moment(new Date().getDate()).format('DD-MM-YYYY')}
                        style={styles.textInputStyle}
                        returnKeyType='done'
                        value={this.state.dob}
                    //defaultValue={Moment(this.state.dob).format('DD-MM-YYYY')}
                    />
                </TouchableOpacity>
                <View style={styles.childContainer}>
                    <Text style={[styles.titleTextStyle, { width: 60 }]}>
                        Gender
                    </Text>
                    <View style={{ flexDirection: 'row' }}>
                        <TouchableOpacity onPress={() => this.setState({
                            gender: 0,
                        })}>
                            <LinearGradient
                                start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                                // colors={this.state.gender ? ['#64B7A0', '#3992B2'] : ['#ffffff', '#ffffff']}
                                colors={this.state.gender == 0 ? selectTab : unSelectTab}
                                style={[styles.genderLinearGradient, { width: 70 }]}>
                                <Text style={[styles.genderTextStyle, { color: this.state.gender == 0 ? "#fff" : '#a59fa2' }]} >
                                    Male
                                </Text>
                            </LinearGradient>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.setState({
                            gender: 1,
                        })}>
                            <LinearGradient
                                start={{ x: 0.0, y: 0.25 }} end={{ x: 0.5, y: 1.0 }}
                                // colors={this.state.gender ? ['#ffffff', '#ffffff'] : ['#64B7A0', '#3992B2']}
                                colors={this.state.gender == 1 ? selectTab : unSelectTab}
                                style={[styles.genderLinearGradient, { width: 70 }]}>
                                <Text style={[styles.genderTextStyle, { color: this.state.gender == 1 ? "#fff" : '#a59fa2' }]} >
                                    Female
                                </Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    }

    contactInformation = () => {
        console.log("Health Image 1", this.props.userProfile.health_insurance_url);
        console.log("Health Image 2", this.state.health_image);
        return <View style={styles.contentView}>
            <View style={styles.firstComponentView}>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={[styles.mainTitleTextStyle, { color: "#439EAD" }]}>
                        PERSONAL INFORMATION
                    </Text>
                </View>
                <View>
                    <View style={styles.childContainer}>
                        <Text style={styles.titleTextStyle}>
                            Name
                        </Text>
                        <TextInput
                            maxLength={30}
                            underlineColorAndroid='transparent'
                            placeholder={"Enter Your Name"}
                            style={[styles.textInputStyle]}
                            returnKeyType='done'
                            onChangeText={(text) => this.setState({ name: text })}
                            defaultValue={this.state.name}
                        />
                    </View>
                </View>
                <View>
                    {/* <View style={[{ margin: 5, flexDirection: 'row' }, this.state.emailError ? styles.errorBox : null]}> */}
                    <View style={[styles.childContainer, this.state.addressError ? styles.errorBox : null]}>
                        <Text style={styles.titleTextStyle}>
                            Email
                        </Text>
                        <TextInput
                            // editable={false}
                            placeholder={"dummy@gmail.com"}
                            style={[styles.textInputStyle]}
                            // style={[styles.textInputStyle, { left: 0, width: Dimensions.get('window').width * .80 }]}
                            returnKeyType='done'
                            keyboardType='email-address'
                            onChangeText={(text) => this.setState({ email: text })}
                            defaultValue={this.state.email}
                            onBlur={() => {
                                this.setState({
                                    emailError: validate('email', this.state.email),
                                })
                            }}
                        />

                    </View>
                    {this.state.emailError ? <Text style={styles.errorText}>{this.state.emailError}</Text> : null}
                </View>
                <View style={[{ flexDirection: "row", alignItems: 'center', margin: 5 }, this.state.phoneError ? styles.errorBox : null]}>
                    <Text style={styles.titleTextStyle}>
                        Phone
                    </Text>
                    <TextInput
                        maxLength={10}
                        editable={false}
                        underlineColorAndroid='transparent'
                        keyboardType={'phone-pad'}
                        placeholder={"9876543210"}
                        style={[styles.textInputStyle, { color: "#d2d2d2" }]}
                        onChangeText={(text) => this.setState({ phone: text })}
                        defaultValue={this.state.phone}
                        returnKeyType='done'
                    />
                </View>
                {this.state.phoneError ? <Text style={styles.errorText}>{this.state.phoneError}</Text> : null}
            </View>
        </View>
    }

    submitData = async () => {
        console.log("--> KYT Pinconde 1", validate('pincode', this.state.pincode))
        const pincodeError = await validate('pincode', this.state.pincode);
        const phoneError = await validate('phone', this.state.phone);
        // const emergency_numberError = await validate('emergencyPhone', this.state.emergency_number);
        const emailError = await validate('email', this.state.email);
        const addressError = await validate('address', this.state.address)
        this.setState({
            phoneError: phoneError,
            emailError: emailError,
            pincodeError: pincodeError,
            // emergency_numberError: emergency_numberError,
            addressError: addressError
        })
        console.log('phoneError', phoneError);
        console.log('emailError', emailError);
        console.log('pincodeError', pincodeError);
        // console.log('emergency_numberError', emergency_numberError);
        if (!emailError && !pincodeError && !phoneError) {

            let bodyFormData = new FormData();
            bodyFormData.append('name', this.state.name);
            bodyFormData.append('email', this.state.email);
            bodyFormData.append('phone', this.state.phone);
            bodyFormData.append('dob', Moment(this.state.dob, "DD-MM-YYYY").format('YYYY-MM-DD'));
            bodyFormData.append('gender', this.state.gender);
            // bodyFormData.append('emergency_number', this.state.emergency_number);
            bodyFormData.append('address', this.state.address);
            bodyFormData.append('pincode', this.state.pincode);
            /*bodyFormData.append('health_image', this.state.health_image);
            bodyFormData.append('aadhar_image', this.state.aadhar_image);*/
            this.props.updateProfile(bodyFormData);
            console.log("bodyFormData", bodyFormData)
        }
    }

    render() {
        const { onScroll = () => { } } = this.props;
        const { navigation } = this.props;
        const { userProfile, visible } = this.state;
        console.log('this.state.dob', Moment(this.state.dob, "DD-MM-YYYY").format('YYYY-MM-DD'));
        return (
            <SafeArea>
                <AnimatedLoader
                    visible={visible}
                    overlayColor="rgba(255,255,255,0.75)"
                    animationStyle={styles.lottie}
                    speed={1}
                    source={require('app/assets/json/data.json')}
                />
                <ParallaxScrollView
                    backgroundColor="#d2d2d2"
                    onScroll={onScroll}
                    headerBackgroundColor="#000"
                    onChangeHeaderVisibility={(visible) => {
                        console.log(" CHECK HEADER VISIBLITY ", visible)
                        this.setState({ visibleHeader: visible });
                    }}
                    stickyHeaderHeight={!this.state.visibleHeader ? STICKY_HEADER_HEIGHT : 1}
                    parallaxHeaderHeight={PARALLAX_HEADER_HEIGHT}
                    // stickyHeaderHeight={STICKY_HEADER_HEIGHT}
                    // parallaxHeaderHeight={PARALLAX_HEADER_HEIGHT}
                    backgroundSpeed={10}
                    renderBackground={() => (
                        <View style={{ backgroundColor: "#fff" }}>
                            <Image source={images.profile.background} style={{ width: "190%", height: "110%", left: "-40%", top: "-35%" }} resizeMode={"contain"} />
                        </View>
                    )}

                    renderForeground={() => (
                        <View key="parallax-header" style={styles.parallaxHeader}>


                            <View style={{ flexDirection: "row", justifyContent: "space-between", marginHorizontal: 10 }}>
                                <TouchableOpacity
                                    style={{ padding: 10 }}
                                    onPress={() => this.props.navigation.goBack()}>
                                    <Image source={image.disease.left_arrow} style={{ width: 20, height: 20, }} resizeMode={"cover"} />
                                </TouchableOpacity>

                                <View style={{ alignItems: "center" }}>
                                    <Text style={styles.profileTitle}>
                                        PROFILE
                                    </Text>
                                    <View>
                                        <Image
                                            source={{ uri: this.state.userProfile.image_url }}
                                            style={{
                                                borderRadius: 150,
                                                width: AVATAR_SIZE,
                                                height: AVATAR_SIZE
                                            }} />
                                        <TouchableOpacity
                                            onPress={() => this.selectPhotoTapped()}
                                            style={styles.photoTappedStyle}>
                                            <Image source={images.profile.white_bg} style={styles.whiteBGImage} resizeMode={"center"} />
                                            <Image source={images.profile.edit} style={[styles.editImage, { position: 'absolute' }]} resizeMode={"contain"} />
                                        </TouchableOpacity>
                                    </View>
                                    <Text style={styles.userName}>
                                        {this.state.name}
                                    </Text>
                                </View>


                                <TouchableOpacity
                                    onPress={() => this.submitData()}
                                    style={{
                                        right:10,
                                        alignItems: 'center',
                                        marginTop: 5,
                                        justifyContent: "center", alignSelf: "baseline"
                                    }}>
                                    <Text style={{
                                        fontFamily: fontStyle.fonts.TITLE_TEXT,
                                        color: 'white',
                                        fontSize: 16
                                    }}>
                                        Save
                                    </Text>
                                </TouchableOpacity>

                            </View>

                        </View>
                    )}

                    renderStickyHeader={() => (
                        <View style={{ flexDirection: "row", backgroundColor: "#4EA6A8", padding: 5, alignItems: 'center' }}>
                            <Image
                                source={{ uri: this.state.userProfile.image_url }}
                                style={{
                                    top: 3,
                                    left: 12,
                                    borderRadius: 100,
                                    width: 40,
                                    height: 40
                                }} />
                            <View key="sticky-header" style={styles.stickySection}>
                                <Text style={[styles.userName, { margin: 10 }]}>{this.state.name}</Text>
                            </View>
                            <TouchableOpacity
                                onPress={() => this.submitData()}
                                style={{ position: 'absolute', right: 20, alignItems: 'center' }}>
                                <Text style={{ color: "#fff" }}>
                                    Save
                                        </Text>
                            </TouchableOpacity>
                        </View>
                    )}
                >
                    <View style={styles.mainContentView}>
                        <View style={{ alignItems: 'center' }}>
                            {this.contactInformation()}
                            {this.generalInformation()}
                        </View>
                        <View style={{ height: 10 }} />
                    </View>
                </ParallaxScrollView>
                <DateTimePicker
                    isVisible={this.state.isDateTimePickerVisible}
                    onConfirm={this.handleDatePicked}
                    onCancel={this.hideDateTimePicker}
                    date={new Date(Moment(this.state.dob, "DD-MM-YYYY").format('YYYY-MM-DD'))}
                />
                {/* <View style={{ marginTop: 40 }}>
                    <FooterTabs navigation={navigation} />
                </View> */}
            </SafeArea>
        );
    }
}



export default EditProfile;
