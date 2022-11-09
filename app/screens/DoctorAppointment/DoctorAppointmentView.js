import React from 'react';
import { default as Moment, default as moment } from 'moment';
import { Container, Content, Text, Thumbnail, Picker, Label } from 'native-base';
import { Image, TouchableOpacity, View, Platform } from 'react-native';
import SafeArea from 'app/components/SafeAreaView';
import DateTimePicker from "react-native-modal-datetime-picker";
import IconTextInput from "app/components/IconTextInput";
import images from 'app/config/images';
import styles from './styles';
import AuthHeader from "app/components/AuthHeader";
import { navigateToHome, navigateToVideo, navigateToRxTimeline } from "app/navigation/NavigationHelpers";
import LinearGradient from 'react-native-linear-gradient';
import validate from 'app/lib/validation_wrapper';
const today = moment().format("YYYY-MM-DD");
import PickerModal from 'react-native-picker-modal-view';
import { AlertDialog } from "app/components/AlertDialog";
import SuccessModal from 'app/components/SuccessModal';
import ModalBox from 'app/components/ModalBox';
export default class DoctorAppointment extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            reminderMe: 0,
            reminderTime: [{
                key: 0,
                val: 'Remind me before'
            },
            {
                key: 2,
                val: '2 hours before'
            },
            {
                key: 4,
                val: '4 hours before'
            },
            {
                key: 6,
                val: '6 hours before'
            },
            {
                key: 12,
                val: '12 hours before'
            },
            {
                key: 24,
                val: '24 hours before'
            },],
            message: '',
            isVisible: false,
            selectedItem: {},
            doctor_name: '',
            hospital_name: '',
            hospital_city: '',
            otherDisease: '',
            diseaseList: [],
            diseasesSelected: "Select Disease",
            diseasesList: ["Infectious Disease", "Allergies & Asthma", "Cancer", "Celiac Disease", "Crohn's & Colitis.", "Add New"],
            isDateTimePickerVisible: false,
            isTimePickerVisible: false,
            selectDateTime: '',
            selectDate: '',
            selectTime: '',
            selectedReminderTime: '',
            // reminderTime: '',
            doctorNameError: '',
            hospitalNameError: '',
            hospitalCityError: '',
            appointmentDateError: '',
            reminderTimeError: '',
            reminderTimeError2: false,
            diseaseError: '',
            otherDiseaseError: '',
            selectedReminderTimeError: '',
        };
    }

    componentDidMount() {
        this.props.getDiseasesList();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const newProps = this.props;
        if (prevState.diseaseList !== newProps.diseaseList) {
            console.log(prevState.diseaseList !== newProps.diseaseList);
            this.setState({ diseaseList: newProps.diseaseList })
        }

        // console.log("New :" + newProps.addDoctorAppointmentSuccess + "\nOld :" + prevProps.addDoctorAppointmentSuccess)
        if (newProps.addDoctorAppointmentSuccess) {
            // this.alertAfterSuccess.customeAlert()
            this.props.setDoctorAppointmentData(false);
            let text = "Appointment for Dr. " + this.state.doctor_name + " has been scheduled on " + this.state.selectDateTime + " and added to your Rx Timeline"
            // let text = "New appointment for DR. " + this.state.doctor_name + " scheduled on " + Moment(this.state.date).format('DD-MM-YYYY') + " " + Moment(this.state.date).format('hh:mm A') + " created and added to timeline"
            console.log("Sucess Message", text)
            this.setState({
                isVisible: true,
                message: text
            })
        }
    }
    navigateToScreen() {
        this.setState({ isVisible: false }, () => this.props.navigation.navigate('RxTimeline'))
        // if (screen) {
        //      this.props.navigation.navigate('RxTimeline')
        // }
        // else {
        //     this.props.navigation.navigate('Home')
        // }

    }
    _alertAfterSuccess = () => {
        return (
            <AlertDialog ref={ref => (this.alertAfterSuccess = ref)}>
                <Text style={styles.titleText}>
                    Success
                </Text>

                <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-between', marginTop: 10 }}>
                    <TouchableOpacity style={{ marginTop: "5%", alignItems: 'center' }}
                        onPress={() => {
                            this.alertAfterSuccess.setModalVisible(false)
                            navigateToHome()
                        }}>
                        <LinearGradient
                            start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                            colors={['#64B7A0', '#3992B2']} style={styles.navigationButtonStyle}>
                            <Text style={styles.navigationButtonTextStyle}>
                                Go to Home
                            </Text>
                        </LinearGradient>
                    </TouchableOpacity>

                    <TouchableOpacity style={{ marginTop: "5%", alignItems: 'center' }}
                        onPress={() => {
                            this.alertAfterSuccess.setModalVisible(false)
                            navigateToRxTimeline()
                        }}>
                        <LinearGradient
                            start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                            colors={['#64B7A0', '#3992B2']} style={styles.navigationButtonStyle}>
                            <Text style={styles.navigationButtonTextStyle}>
                                Go to RxTimeline
                            </Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </View>
            </AlertDialog >
        );
    }

    showDateTimePicker = () => {
        this.setState({ isDateTimePickerVisible: true });
    };

    hideDateTimePicker = () => {
        this.setState({ isDateTimePickerVisible: false });
    };

    handleDatePicked = date => {
        this.setState({
            selectDateTime: Moment(date).format('DD-MM-YYYY') + " " + Moment(date).format('hh:mm A'),
            selectDate: Moment(date).format('YYYY-MM-DD'),
            selectTime: Moment(date).format('HH:mm')
        })
        this.hideDateTimePicker();
    };

    // showTimePicker = () => {
    //     this.setState({ isTimePickerVisible: true });
    // };

    // hideTimePicker = () => {
    //     this.setState({ isTimePickerVisible: false });
    // };

    // handleTimePicked = date => {
    //     console.log("Selected DAte", Moment(date).format('DD-MM-YYYY HH:mm:ss'))
    //     this.setState({
    //         selectedReminderTime: Moment(date).format('DD-MM-YYYY') + " " + Moment(date).format('hh:mm A'),
    //         reminderTime: Moment(date).format('YYYY-MM-DD HH:mm'),
    //     })
    //     this.hideTimePicker();
    // };

    _addAppointment = async () => {

        const doctorNameError = await validate('doctorName', this.state.doctor_name.trim());
        const hospitalNameError = await validate('hospitalName', this.state.hospital_name.trim());
        const hospitalCityError = await validate('hospitalCityName', this.state.hospital_city.trim());
        const appointmentDateError = await validate('appointmentDate', this.state.selectDate);
        const reminderTimeError = this.state.reminderMe == 0 ? true : false;
        // const reminderTimeError = await validate('reminderTime', this.state.selectedReminderTime);
        const diseaseError = Object.keys(this.state.selectedItem).length > 0 ? this.state.selectedItem.Name : 'Please Select Diseases'
        const otherDiseaseError = await validate('otherDiseases', this.state.otherDisease.trim());
        this.setState({
            doctorNameError: doctorNameError,
            hospitalNameError: hospitalNameError,
            hospitalCityError: hospitalCityError,
            appointmentDateError: appointmentDateError,
            diseaseError: diseaseError,
            otherDiseaseError: otherDiseaseError,
            reminderTimeError: reminderTimeError,
        })
        const selectDisease = this.state.selectedItem.Name === 'Other' ? this.state.otherDisease : this.state.selectedItem.Name
        if (selectDisease != 'Select Disease' && selectDisease != 'Other') {
            if (!doctorNameError && !hospitalNameError && !hospitalCityError && !appointmentDateError && !reminderTimeError) {
                let params = {
                    doctor_name: this.state.doctor_name,
                    disease: selectDisease,
                    appointment_date: this.state.selectDate,
                    appointment_time: this.state.selectTime,
                    // reminder_time: this.state.reminderTime,
                    reminder_before_hour: this.state.reminderMe,
                    hospital_name: this.state.hospital_name,
                    hospital_city: this.state.hospital_city,
                }
                this.props.addDoctorAppointment(params);
                console.log("ADD Appointment ", params);
            }
        }
    }

    onClosed() {
        console.log('close key pressed');
    }

    onSelected(selected) {
        this.setState({ selectedItem: selected });
        return selected;
    }

    onBackButtonPressed() {
        console.log('back key pressed');
    }

    sucessMessage = () => {

    }
    setTextView = (item) => {
        this.setState({ reminderMe: item })
    }
    render() {
        return (
            <SafeArea>
                {/* {this._alertAfterSuccess()} */}
                <SuccessModal
                    title={"Success"}
                    body={this.state.message}
                    isVisible={this.state.isVisible}
                    onClose={() => this.navigateToScreen()}
                    backDropClose={true}
                    swipeClose={true}
                />
                {/* <ModalBox firstTitle={"Home Screen"} secondTitle={"RX Time Line"} messageContent={this.state.message} isVisible={this.state.isVisible} onClose={(screen) => this.navigateToScreen(screen)} /> */}
                <AuthHeader title={'DOCTORS APPOINTMENT'} navigateTo={navigateToRxTimeline} />
                <Content style={styles.contentView}>
                    <IconTextInput
                        ref={input => (this.docName = input)}
                        placeholder={"Doctor Name"}
                        returnKeyType='next'
                        submitSubscriber={() => this.clinicName.textInput.focus()}
                        onChangeText={(doctor_name) => this.setState({ doctor_name: doctor_name.trim() })}
                        // onChangeText={this.onEmailChange.bind(this)}
                        // value={this.props.name}
                        inputStyle={styles.input}
                        onBlur={() => {
                            this.setState({
                                doctorNameError: validate('Doctor Name', this.state.doctorNameError),
                            })
                        }}
                        error={this.state.doctorNameError}
                    />
                    <View style={{}}>
                        <PickerModal
                            renderSelectView={(disabled, selected, showModal) =>
                                // <Button disabled={disabled} title={'Show me!'} onPress={showModal} />
                                <TouchableOpacity style={styles.pickerView} onPress={showModal}>
                                    <Text style={{ left: 20 }}>
                                        {Object.keys(this.state.selectedItem).length > 0 ? this.state.selectedItem.Name : 'Select Disease Name'}
                                    </Text>
                                </TouchableOpacity>
                            }
                            onSelected={this.onSelected.bind(this)}
                            onClosed={this.onClosed.bind(this)}
                            onBackButtonPressed={this.onBackButtonPressed.bind(this)}
                            items={this.state.diseaseList}
                            sortingLanguage={'tr'}
                            showToTopButton={true}
                            selected={this.state.selectedItem}
                            showAlphabeticalIndex={true}
                            autoGenerateAlphabeticalIndex={true}
                            selectPlaceholderText={'Choose one...'}
                            onEndReached={() => console.log('list ended...')}
                            searchPlaceholderText={'Search...'}
                            requireSelection={false}
                            autoSort={false}
                        />
                    </View>
                    {this.state.diseaseError === "Please Select Diseases" ? <Text style={{ left: 20, color: 'red', fontSize: 14 }}>Please select diseases</Text> : null}
                    {
                        this.state.selectedItem.Name === "Other" ?
                            <IconTextInput
                                ref={input => (this.name = input)}
                                placeholder={"Diseases Name"}
                                returnKeyType='done'
                                onChangeText={(otherDisease) => this.setState({ otherDisease: otherDisease })}
                                // onChangeText={this.onEmailChange.bind(this)}
                                // value={this.props.name}
                                inputStyle={styles.input}
                                onBlur={() => {
                                    this.setState({
                                        otherDiseaseError: validate('Other Disease', this.state.otherDiseaseError),
                                    })
                                }}
                                error={this.state.otherDiseaseError}
                            /> : null}
                    <TouchableOpacity onPress={() => this.showDateTimePicker()}>
                        <IconTextInput
                            editable={false}
                            ref={input => (this.email = input)}
                            placeholder={"Appointment Date"}
                            returnKeyType='done'
                            iconPath={images.doctorAppoint.appointment}
                            value={(this.state.selectDateTime)}
                            inputStyle={styles.input}
                            onBlur={() => {
                                this.setState({
                                    appointmentDateError: validate('Doctor Name', this.state.appointmentDateError),
                                })
                            }}
                            error={this.state.appointmentDateError}
                        />
                    </TouchableOpacity>
                    <View style={[styles.pickerView, { paddingLeft: 20, paddingRight: 10 }]}>
                        <Picker
                            placeholder={"1 Hour ago"}
                            placeholderStyle={styles.pickerPlaceHolderText}
                            selectedValue={this.state.reminderMe}
                            iosIcon={<View style={{ right: 20, paddingRight: 20 }}><Image source={images.pillReminder.down_arrow} style={{ height: 20, width: 20 }} /></View>}
                            itemStyle={{ backgroundColor: '#fff' }}
                            onValueChange={(itemValue, itemPosition) => this.setTextView(itemValue)}>
                            {this.state.reminderTime.map((item, key) => {
                                return (<Picker.Item label={item.val + " "} value={item.key} key={key} />)
                            })}
                        </Picker>
                    </View>
                    {this.state.reminderTimeError ? <Text style={{ left: 20, color: 'red', fontSize: 14 }}>Please select Reminder Time</Text> : null}
                    {/* <TouchableOpacity onPress={() => this.showTimePicker()}>
                        <IconTextInput
                            editable={false}
                            ref={input => (this.reminderTime = input)}
                            placeholder={"Reminder Time"}
                            returnKeyType='done'
                            iconPath={images.doctorAppoint.appointment}
                            value={(this.state.selectedReminderTime)}
                            inputStyle={styles.input}
                            onBlur={() => {
                                this.setState({
                                    reminderTimeError: validate('reminderTime', this.state.selectedReminderTime),
                                })
                            }}
                            error={this.state.reminderTimeError}
                        />
                    </TouchableOpacity> */}
                    <IconTextInput
                        ref={input => (this.clinicName = input)}
                        placeholder={"Hospital / Clinic Name"}
                        returnKeyType='next'
                        submitSubscriber={() => this.cityName.textInput.focus()}
                        onChangeText={(hospital_name) => this.setState({ hospital_name: hospital_name })}
                        // onChangeText={this.onEmailChange.bind(this)}
                        // value={this.props.name}
                        inputStyle={styles.input}
                        onBlur={() => {
                            this.setState({
                                hospitalNameError: validate('Hospital Name', this.state.hospitalNameError),
                            })
                        }}
                        error={this.state.hospitalNameError}
                    />
                    <IconTextInput
                        ref={input => (this.cityName = input)}
                        placeholder={"Hospital / Clinic City"}
                        returnKeyType='done'
                        onChangeText={(hospital_city) => this.setState({ hospital_city: hospital_city })}
                        // submitSubscriber={() => this.inputPhone.textInput.focus()}
                        // onChangeText={this.onEmailChange.bind(this)}
                        // value={this.props.name}
                        inputStyle={styles.input}
                        onBlur={() => {
                            this.setState({
                                hospitalCityError: validate('Hospital City Name', this.state.hospitalCityError),
                            })
                        }}
                        error={this.state.hospitalCityError}
                    />
                    <TouchableOpacity style={{ marginVertical: 30, alignItems: 'center' }}
                        onPress={() => this._addAppointment()}
                    >
                        <LinearGradient
                            start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                            colors={['#64B7A0', '#3992B2']} style={styles.buttonStyle}>
                            <Text style={styles.buttonTextStyle}>
                                SUBMIT
                            </Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </Content>
                <DateTimePicker
                    is24Hour={false}
                    mode='datetime'
                    minimumDate={new Date()}
                    isVisible={this.state.isDateTimePickerVisible}
                    onConfirm={this.handleDatePicked}
                    onCancel={this.hideDateTimePicker}
                />
                <DateTimePicker
                    mode='datetime'
                    minimumDate={new Date()}
                    isVisible={this.state.isTimePickerVisible}
                    onConfirm={this.handleTimePicked}
                    onCancel={this.hideTimePicker}
                />
            </SafeArea>
        );
    }
}
