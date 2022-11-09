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
import { navigateToRxTimeline } from "app/navigation/NavigationHelpers";
import LinearGradient from 'react-native-linear-gradient';
import validate from 'app/lib/validation_wrapper';
const today = moment().format("YYYY-MM-DD");
import PickerModal from 'react-native-picker-modal-view';
export default class UpdateDoctorAppointmentView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            reminderMe: 0,
            reminderTime: [{
                key: 0,
                val: 'Remind me before'
            }, {
                key: 1,
                val: '1 hour before'
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
            selectedItem: {},
            doctor_name: '',
            hospital_name: '',
            hospital_city: '',
            otherDisease: '',
            diseaseList: [],
            doctorAppointment: [],
            diseasesSelected: "Select Disease",
            diseasesList: ["Infectious Disease", "Allergies & Asthma", "Cancer", "Celiac Disease", "Crohn's & Colitis.", "Add New"],
            isDateTimePickerVisible: false,
            selectDateTime: '',
            selectedAppointmentDate: '',
            selectedReminderDate: '',
            selectDate: '',
            selectTime: '',
            // selectedReminderTime: '',
            doctorNameError: '',
            hospitalNameError: '',
            hospitalCityError: '',
            appointmentDateError: '',
            diseaseError: '',
            otherDiseaseError: '',
            reminderTimeError: '',
            // selectedReminderTimeError: '',
        };
    }

    componentDidMount() {
        const doctorAppointmentId = {
            'id': this.props.navigation.getParam('appointment_id'),
        }
        if (this.props.navigation.getParam('appointment_id')) {
            this.props.getDoctorAppointment(doctorAppointmentId);
        }

        this.props.getDiseasesList();

    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const newProps = this.props;
        console.log("Reminder Time", newProps.doctorAppointment.reminder_time)
        if (prevState.diseaseList !== newProps.diseaseList) {
            this.setState({ diseaseList: newProps.diseaseList })
        }
        if (prevState.doctorAppointment !== newProps.doctorAppointment) {
            const selectedItem = {
                Name: newProps.doctorAppointment.disease,
                title: newProps.doctorAppointment.disease,
            }
            console.log('newProps.doctorAppointment.appointment_time', newProps.doctorAppointment.appointment_time);
            this.setState({
                doctorAppointment: newProps.doctorAppointment,
                doctor_name: newProps.doctorAppointment.doctor_name,
                selectDateTime: Moment(newProps.doctorAppointment.date_time).format('DD-MM-YYYY hh:mm A'),
                // selectedReminderTime: Moment(newProps.doctorAppointment.reminder_time).format('DD-MM-YYYY h:mm A'),
                // reminderTime: newProps.doctorAppointment.reminder_time,
                reminderMe: newProps.doctorAppointment.reminder_before_hour,
                hospital_city: newProps.doctorAppointment.hospital_city,
                hospital_name: newProps.doctorAppointment.hospital_name,
                selectedItem: selectedItem,
                selectDate: Moment(newProps.doctorAppointment.appointment_date).format('YYYY-MM-DD'),
                selectTime: Moment(newProps.doctorAppointment.appointment_date).format('HH:MM:SS'),
                selectedAppointmentDate: Moment(newProps.doctorAppointment.date_time).format('YYYY-MM-DD hh:mm'),
                selectedReminderDate: Moment(newProps.doctorAppointment.reminder_time).format('YYYY-MM-DD  hh:mm')
            })
        }
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
            selectTime: Moment(date).format('HH:mm'),
            selectedAppointmentDate: Moment(date).format('YYYY-MM-DD hh:mm')
        })
        this.hideDateTimePicker();
    };
    // showTimePicker = () => {
    //     this.setState({ isTimePickerVisible: true });
    // };

    // hideTimePicker = () => {
    //     this.setState({ isTimePickerVisible: false });
    // };

    handleTimePicked = date => {
        this.setState({
            selectedReminderTime: Moment(date).format('DD-MM-YYYY hh:mm A'),
            // reminderTime: Moment(date).format('YYYY-MM-DD h:mm'),
            selectedReminderDate: Moment(date).format('YYYY-MM-DD hh:mm')
        })
        this.hideTimePicker();
    };
    _updateAppointment = async () => {
        const doctorNameError = await validate('doctorName', this.state.doctor_name.trim());
        const hospitalNameError = await validate('hospitalName', this.state.hospital_name.trim());
        const hospitalCityError = await validate('hospitalCityName', this.state.hospital_city.trim());
        const appointmentDateError = await validate('appointmentDate', this.state.selectDateTime);
        // const reminderTimeError = await validate('reminderTime', this.state.reminderMe);
        const reminderTimeError = this.state.reminderMe == 0 ? true : false;
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
                    id: this.props.navigation.getParam('appointment_id'),
                    doctor_name: this.state.doctor_name,
                    disease: selectDisease,
                    appointment_date: this.state.selectDate,
                    appointment_time: this.state.selectTime,
                    reminder_before_hour: this.state.reminderMe,
                    hospital_name: this.state.hospital_name,
                    hospital_city: this.state.hospital_city,
                }
                this.props.updateDoctorAppointment(params);
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

    setTextView = (item) => {
        this.setState({ reminderMe: item })
    }
    render() {
        return (
            <SafeArea>
                <AuthHeader title={'DOCTORS APPOINTMENT'} navigateTo={navigateToRxTimeline} />
                <Content style={styles.contentView}>
                    <IconTextInput
                        ref={input => (this.name = input)}
                        placeholder={"Doctor Name"}
                        returnKeyType='next'
                        submitSubscriber={() => this.email.textInput.focus()}
                        onChangeText={(doctor_name) => this.setState({ doctor_name: doctor_name.trim() })}
                        // onChangeText={this.onEmailChange.bind(this)}
                        // value={this.props.name}
                        defaultValue={this.state.doctor_name}
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
                                    {/* <Text style={{ left: 20 }}>
                                        {Object.keys(this.state.selectedItem.Name)}
                                    </Text> */}
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
                                // defaultValue={this.state.otherDisease}
                                inputStyle={styles.input}
                                onBlur={() => {
                                    this.setState({
                                        otherDiseaseError: validate('Other Disease', this.state.otherDiseaseError),
                                    })
                                }}
                                error={this.state.otherDiseaseError}
                            /> : null}
                    {/*   <IconTextInput
                        ref={input => (this.email = input)}
                        placeholder={"Speciality"}
                        returnKeyType='done'
                        inputStyle={styles.input}
                    /> */}
                    <TouchableOpacity onPress={() => this.showDateTimePicker()}>
                        <IconTextInput
                            editable={false}
                            ref={input => (this.email = input)}
                            placeholder={"Appointment Date"}
                            returnKeyType='done'
                            iconPath={images.doctorAppoint.appointment}
                            value={(this.state.selectDateTime)}
                            inputStyle={styles.input}
                            defaultValue={this.state.selectDateTime}
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
                        ref={input => (this.name = input)}
                        placeholder={"Hospital / Clinic Name"}
                        returnKeyType='next'
                        submitSubscriber={() => this.email.textInput.focus()}
                        onChangeText={(hospital_name) => this.setState({ hospital_name: hospital_name })}
                        // onChangeText={this.onEmailChange.bind(this)}
                        // value={this.props.name}
                        inputStyle={styles.input}
                        defaultValue={this.state.hospital_name}
                        onBlur={() => {
                            this.setState({
                                hospitalNameError: validate('Hospital Name', this.state.hospitalNameError),
                            })
                        }}
                        error={this.state.hospitalNameError}
                    />
                    <IconTextInput
                        ref={input => (this.email = input)}
                        placeholder={"Hospital / Clinic City"}
                        returnKeyType='done'
                        onChangeText={(hospital_city) => this.setState({ hospital_city: hospital_city })}
                        // submitSubscriber={() => this.inputPhone.textInput.focus()}
                        // onChangeText={this.onEmailChange.bind(this)}
                        // value={this.props.name}
                        inputStyle={styles.input}
                        defaultValue={this.state.hospital_city}
                        onBlur={() => {
                            this.setState({
                                hospitalCityError: validate('Hospital City Name', this.state.hospitalCityError),
                            })
                        }}
                        error={this.state.hospitalCityError}
                    />
                    <TouchableOpacity style={{ marginVertical: 30, alignItems: 'center' }}
                        onPress={() => this._updateAppointment()}
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
                    date={Moment(this.state.selectedAppointmentDate, "YYYY-MM-DD HH:mm").toDate()}
                />
                {/* <DateTimePicker
                    mode='datetime'
                    minimumDate={new Date()}
                    maximumDate={Moment(this.state.selectedAppointmentDate, "YYYY-MM-DD HH:mm").toDate()}
                    isVisible={this.state.isTimePickerVisible}
                    onConfirm={this.handleTimePicked}
                    onCancel={this.hideTimePicker}
                    date={Moment(this.state.selectedReminderDate, "YYYY-MM-DD HH:mm").toDate()}
                /> */}
            </SafeArea>
        );
    }
}
