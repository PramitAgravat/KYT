import { default as Moment, default as moment } from 'moment';
import { Container, Content, Picker, Text, Icon } from 'native-base';
import React from 'react';
import { Dimensions, FlatList, Image, TouchableOpacity, View, TextInput } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import DateTimePicker from "react-native-modal-datetime-picker";
import styles from './styles';
import AuthHeader from "app/components/AuthHeader";
import { navigateToRxTimeline } from "app/navigation/NavigationHelpers";
import images from 'app/config/images';
import SafeArea from 'app/components/SafeAreaView';
import validate from "app/lib/validation_wrapper";
import AnimatedLoader from "react-native-animated-loader";
import GS from "app/config/GlobalStyle";
const { width, height } = Dimensions.get('window');
const today = moment().format("YYYY-MM-DD");

export default class UpdatePillReminderView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            reFillReminder: false,
            pillInADaySelect: 1,
            pillInADay: [
                {
                    key: 1,
                    val: "Once A Day",
                    time: "08:00 AM"
                },
                {
                    key: 2,
                    val: "Twice A Day",
                    time: "12:00 AM"
                },
                {
                    key: 3,
                    val: "3 Times A Day",
                    time: "04:00 PM"
                },
                {
                    key: 4,
                    val: "4 Times A Day",
                    time: "08:00 PM"
                }
            ],
            pillReminderMeWhenSelect: "1 pills left",
            pillReminderMeWhen: ["1 pills left", "2 pills left", "3 pills left", "4 pills left", "5 pills left", "10 pills left", "15 pills left", "20 pills left"],
            scheduleDatePickerVisible: false,
            startDate: new Date(),
            isDateTimePickerVisible: false,
            scheduleDateTimePickerVisible: false,
            selectDateTime: '',
            scheduleTime: 1,
            total_days: '5',
            medicine_type: 1,
            medicineType: [],
            selectedTime: moment(`${moment().format('YYYY-MM-DD') + ' 08:00'}`).toDate(),
            medicine_name: '',
            schedule_type: 1,
            time: [],
            medicine_nameError: null,
            visible: false,
            pillReminder: []
        };
    }

    componentDidMount(): void {
        const pill_reminder_id = {
            'id': this.props.navigation.getParam('pill_reminder_id'),
        }
        if (this.props.navigation.getParam('pill_reminder_id')) {
            this.props.getPillReminder(pill_reminder_id);
        }

        this.props.getPillReminderList()
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const newProps = this.props;
        if (prevState.visible !== newProps.loader) {
            console.log('newProps.loader --->', newProps.loader);
            this.setState({ visible: newProps.loader })
        }

        if (prevState.medicineType !== newProps.medicineType) {
            console.log('new medicine --->', newProps.medicineType);
            this.setState({ medicineType: newProps.medicineType })
        }

        if (prevState.pillReminder !== newProps.pillReminder) {
            // console.log('newProps.pillReminder 123 1--->', newProps.pillReminder);
            // console.log('newProps.pillReminder 123 2--->', newProps.pillReminder.medicine_name);
            // console.log('newProps.pillReminder 123 3--->', newProps.pillReminder.dosage);
            // console.log('newProps.pillReminder 123 4--->', newProps.pillReminder.pill_left);
            // console.log('newProps.pillReminder 123 5--->', newProps.pillReminder.refill_reminder);
            // console.log('newProps.pillReminder 123 6--->', newProps.pillReminder.schedule_type);
            // console.log('newProps.pillReminder 123 7--->', newProps.pillReminder.timearray);

            this.setState({
                test: (newProps.pillReminder.time).split(','),
                medicine_type: newProps.pillReminder.medicine_type,
                pillInADaySelect: newProps.pillReminder.schedule_type,
                schedule_type: newProps.pillReminder.schedule_type,
                total_days: newProps.pillReminder.dosage,
                reFillReminder: newProps.pillReminder.refill_reminder,
                pillInADay: newProps.pillReminder.timearray,
                pillReminder: newProps.pillReminder,
            })
        }
    }
    saveReminder = async () => {
        let times = [];
        await this.state.pillInADay.map(a => {
            if (a.key <= this.state.schedule_type) {
                times.push(moment(a.time, ["hh:mm A"]).format("HH:mm"))
            }
        });
        const param = {
            id: this.props.navigation.getParam('pill_reminder_id'),
            schedule_type: this.state.schedule_type,
            time: times,
            total_days: this.state.total_days,
            refill_reminder: this.state.reFillReminder,
        }
        console.log("Schedule Update Pill Remider", param);
        this.props.updatePillReminder(param);

    }
    scheduleHandleDatePicker = () => {
        this.setState({ scheduleDatePickerVisible: true });
    };

    scheduleHideDatePicker = () => {
        this.setState({ scheduleDatePickerVisible: false });
    };

    setScheduleDate = async (date) => {
        const NewDate = date;

        await this.setState({ startDate: NewDate })
        await this.scheduleHideDatePicker();
    };


    hideDateTimePicker = () => {
        this.setState({ isDateTimePickerVisible: false });
    };

    handleDatePicked = async (date) => {
        const NewDate = Moment(date).format('HH:mm')
        await this.setState({ pillReminderTime: NewDate })
        await this.hideDateTimePicker();
    };


    scheduleShowDateTimePicker = (key, scheduleTime) => {
        console.log("Update selectedTime -->", moment(`${moment().format('YYYY-MM-DD') + ' ' + scheduleTime}`).toDate())
        this.setState({ scheduleTime: key, scheduleDateTimePickerVisible: true, selectedTime: moment(`${moment().format('YYYY-MM-DD') + ' ' + scheduleTime}`).toDate() });

    };

    scheduleHideDateTimePicker = () => {
        this.setState({ scheduleDateTimePickerVisible: false });
    };

    scheduleHandleDatePicked = async (date) => {
        const timeVal = Moment(date).format('hh:mm A');
        this.state.pillInADay[this.state.scheduleTime - 1]['time'] = timeVal;
        this.setState({ pillInADay: this.state.pillInADay, scheduleDateTimePickerVisible: false });
    };

    setTextView = (item) => {
        this.setState({ schedule_type: item, pillInADaySelect: item })
    }


    renderSetText = () => {
        // return this.state.pillInADay.map((item, key) => {
        //     if (item.key <= this.state.pillInADaySelect) {
        //         return <TouchableOpacity
        //             onPress={() => this.scheduleShowDateTimePicker(item.key, item.time)}
        //             style={styles.pillReminderView} key={key}>
        //             <Text style={[styles.pillReminderText, { color: "#439EAD" }]}>
        //                 {item.time}
        //             </Text>
        //             <Image source={images.pillReminder.edit} style={{ width: 20, height: 20 }} resizeMode={"cover"} />
        //         </TouchableOpacity>
        //     }

        // })
        return this.state.pillInADay.map((item, key) => {
            if (item.key <= this.state.schedule_type) {
                return <TouchableOpacity
                    onPress={() => this.scheduleShowDateTimePicker(item.key, moment(item.time, ["hh:mm A"]).format("HH:mm"))}
                    style={styles.pillReminderView} key={key}>
                    <Text style={[styles.pillReminderText, { color: "#439EAD" }]}>
                        {item.time}
                    </Text>
                    <Image source={images.pillReminder.edit} style={{ width: 20, height: 20 }} resizeMode={"cover"} />
                </TouchableOpacity>
            }

        })
    }
    _medicineImage = (item) => {
        let data = item.item;
        return (
            <View
                style={{ margin: 4, alignItems: 'center' }}
            // onPress={() => this.setState({ medicine_type: this.state.medicine_type })}
            >
                <Image source={{ uri: data.image_url }} style={{ width: 50, height: 35 }} resizeMode={"center"} />
                <Text style={{ fontSize: 12, top: 3, color: this.state.medicine_type === data.id ? "#47A0AB" : "#333333" }}>
                    {data.title}
                </Text>
            </View>

        );
    }
    render() {
        console.log("Pill Reminder View -->", this.state.pillReminder)
        return (
            <SafeArea>
                <AnimatedLoader
                    visible={this.state.visible}
                    overlayColor="rgba(255,255,255,0.75)"
                    animationStyle={styles.lottie}
                    speed={1}
                    source={require('app/assets/json/data.json')}
                />
                <AuthHeader title={'UPDATE MEDICINE'} navigateTo={navigateToRxTimeline} />
                <Content style={styles.mainContentView}>
                    <View style={{ alignItems: 'center' }}>
                        <View style={styles.contentView}>
                            <View style={{ margin: 10 }}>
                                <View style={[this.state.medicine_nameError ? styles.errorBox : null]}>
                                    <TextInput
                                        editable={false}
                                        placeholder={"Medicine Name"}
                                        placeholderStyle={styles.placeholderStyle}
                                        style={styles.textInputStyle}
                                        returnKeyType='done'
                                        onChangeText={(text) => this.setState({ medicine_name: text })}
                                        defaultValue={this.state.pillReminder.medicine_name}
                                    />
                                </View>
                                {this.state.medicine_nameError ? <Text style={styles.errorText}>{this.state.medicine_nameError}</Text> : null}
                                <View style={{ marginVertical: 5 }}>
                                    <Text style={styles.medicineColorTextTile}>
                                        {/* Medicine Color */}
                                        Form of Medicine
                                    </Text>
                                    <View style={{ alignItems: 'center' }}>
                                        <FlatList
                                            // onScroll={(e) => { console.log("TEST", e) }}
                                            showsHorizontalScrollIndicator={false}
                                            horizontal={true}
                                            data={this.state.medicineType}
                                            renderItem={this._medicineImage}
                                            extraData={this.state}
                                            keyExtractor={(item, index) => index.toString()}
                                        />
                                    </View>
                                </View>
                            </View>
                        </View>
                        <View style={styles.contentView}>
                            <View style={{}}>
                                <Text style={styles.scheduleText}>
                                    SCHEDULE
                                </Text>
                                <View style={styles.pickerView}>
                                    <Picker
                                        placeholder={"Once A Day"}
                                        placeholderStyle={styles.pickerPlaceHolderText}
                                        selectedValue={this.state.pillInADaySelect}
                                        pillInADaySelect
                                        iosIcon={<View style={{ right: 10 }}><Image source={images.pillReminder.down_arrow} style={{ height: 20, width: 20 }} /></View>}
                                        itemStyle={{ backgroundColor: '#fff' }}
                                        onValueChange={(itemValue, itemPosition) => this.setTextView(itemValue)}>
                                        {/* <Picker.Item label={"Once A Day"} color={"#a59fa2"} /> */}
                                        {this.state.pillInADay.map((item, key) => {
                                            return (<Picker.Item label={item.val + " "} value={item.key} key={key} />)
                                        })}
                                    </Picker>
                                </View>
                                <View style={{ margin: 10 }}>
                                    {
                                        this.renderSetText()
                                    }
                                </View>
                            </View>
                        </View>
                        <View style={styles.contentView}>
                            <View style={{ margin: 5 }}>
                                <View style={styles.pillReminderView}>
                                    <Text style={styles.pillReminderText}>
                                        Total Days
                                    </Text>
                                    <TextInput
                                        keyboardType={'numeric'}
                                        textAlign={'center'}
                                        placeholder={"20"}
                                        onChangeText={(text) => {
                                            if (/^\d+$/.test(text.toString())) {
                                                this.setState({ total_days: text });
                                            }

                                        }}
                                        style={styles.reFillReminderText}
                                        defaultValue={this.state.total_days}
                                        returnKeyType='done'
                                    />
                                </View>
                                <View style={styles.pillReminderView}>
                                    <Text style={styles.pillReminderText}>
                                        Re-fill Reminder
                                    </Text>
                                    <View style={styles.reminderView}>
                                        <TouchableOpacity onPress={() => this.setState({ reFillReminder: true })}>
                                            <LinearGradient
                                                start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                                                colors={this.state.reFillReminder ? ['#64B7A0', '#3992B2'] : ['#ffffff', '#ffffff']} style={styles.genderLinearGradient}>
                                                <Text style={[styles.genderTextStyle, { color: this.state.reFillReminder ? "#fff" : '#a59fa2' }]} >
                                                    YES
                                                </Text>
                                            </LinearGradient>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => this.setState({ reFillReminder: false })}>
                                            <LinearGradient
                                                start={{ x: 0.0, y: 0.25 }} end={{ x: 0.5, y: 1.0 }}
                                                colors={this.state.reFillReminder ? ['#ffffff', '#ffffff'] : ['#64B7A0', '#3992B2']} style={styles.genderLinearGradient}>
                                                <Text style={[styles.genderTextStyle, { color: this.state.reFillReminder ? '#a59fa2' : "#fff" }]} >
                                                    NO
                                                </Text>
                                            </LinearGradient>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                {
                                    this.state.reFillReminder ?
                                        <Text style={{ fontSize: 12 }}>
                                            Re-fill reminder will be sent before 24 hours of your last medicine dose.
                                        </Text> :
                                        null
                                }
                            </View>
                        </View>
                    </View>

                    <TouchableOpacity style={{ marginVertical: 50, alignItems: 'center' }} onPress={() => this.saveReminder()}>
                        <LinearGradient
                            start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                            colors={['#64B7A0', '#3992B2']} style={styles.buttonStyle}>
                            <Text style={styles.buttonTextStyle}>
                                UPDATE REMINDER
                            </Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </Content>
                <DateTimePicker
                    mode='date'
                    isVisible={this.state.scheduleDatePickerVisible}
                    onConfirm={this.setScheduleDate}
                    onCancel={this.scheduleHideDatePicker}
                />
                <DateTimePicker
                    is24Hour={false}
                    mode='time'
                    date={this.state.selectedTime}
                    isVisible={this.state.scheduleDateTimePickerVisible}
                    onConfirm={this.scheduleHandleDatePicked}
                    onCancel={this.scheduleHideDateTimePicker}
                />
                <DateTimePicker
                    is24Hour={false}
                    mode='time'
                    isVisible={this.state.isDateTimePickerVisible}
                    onConfirm={this.handleDatePicked}
                    onCancel={this.hideDateTimePicker}
                />
            </SafeArea>
        );
    }
}
