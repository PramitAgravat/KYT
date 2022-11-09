import SafeArea from 'app/components/SafeAreaView';
import image from 'app/config/images';
import React, { Component } from 'react';
import { Dimensions, FlatList, Image, Text, TouchableOpacity, View, Modal } from 'react-native';
import CalendarStrip from 'react-native-slideable-calendar-strip';
import { AlertDialog } from "app/components/AlertDialog";
import images from 'app/config/images';
import styles from './styles';
import { default as Moment, default as moment } from 'moment';
import DateTimePicker from "react-native-modal-datetime-picker";
const { height, width } = Dimensions.get("screen");
const PARALLAX_HEADER_HEIGHT = 220;
const STICKY_HEADER_HEIGHT = 50;
import Api from 'app/api';
import ApiConstants from 'app/api/ApiConstants';
import { Toast } from "native-base";
import AnimatedLoader from 'react-native-animated-loader';
import GS from "app/config/GlobalStyle"

// const images = {
//     background: image.wallet.background, // Put your own image here
// };
const trophy = {
    background: image.wallet.trophy, // Put your own image here
};
const reminder = {
    background: image.pillReminder.reminder, // Put your own image here
};
const add = {
    background: image.pillReminder.plus, // Put your own image here
};
const back = {
    background: image.pillReminder.left_arrow, // Put your own image here
};


export default class PillReminder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            timeChange: '',
            modalData: [],
            selectedDate: new Date(),
            modalVisible: false,
            isDateTimePickerVisible: false,
            pillReminderTime: '10:00',
            selectReminderId: 0,
            pillReminderHistory: [{
                id: 1,
                medicineName: "Acetaminophen",
                medicineColor: "#3AB2D3",
                medicineSchedule: "Take 1 before eating",
                medicineTime: "8:00 am"
            },
            {
                id: 2,
                medicineName: "Amoxicillin",
                medicineColor: "#FF292D",
                medicineSchedule: "Take 1 before eating",
                medicineTime: "11:00 am"
            },
            {
                id: 3,
                medicineName: "Atorvastatin",
                medicineColor: "#003AFF",
                medicineSchedule: "Take 1 before eating",
                medicineTime: "3:00 pm"
            },
            {
                id: 4,
                medicineName: "Amlodipine",
                medicineColor: "#1A75B7",
                medicineSchedule: "Take 1 before eating",
                medicineTime: "6:00 pm"
            }],
            pillReminderRecord: [],
            visible: false,
            selectedTime: moment().format("HH:mm")
        };
    }
    // define a separate function to get triggered on focus
    onFocusFunction = () => {
        const param = {
            date: moment().format("YYYY-MM-DD")
        }
        console.log('param1', param);
        this.getPillReminder(param);
    }



    // and don't forget to remove the listener
    componentWillUnmount() {
        this.focusListener.remove()
    }
    async componentDidMount() {
        /*const param = {
            date: moment().format("YYYY-MM-DD")
        }
        console.log('param',param);
        this.getPillReminder(param);*/
        this.focusListener = this.props.navigation.addListener('didFocus', () => {
            this.onFocusFunction()
        })
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        const newProps = this.props;
        /*if (prevState.pillReminderRecord !== newProps.pillReminderList) {
            this.setState({ pillReminderRecord: newProps.pillReminderList })
        }*/
    }
    showDateTimePicker = (data) => {
        this.setState({ isDateTimePickerVisible: true });
    };

    hideDateTimePicker = () => {
        this.setState({ isDateTimePickerVisible: false });
    };
    getPillReminder = async (data) => {
        this.setState({
            visible: true
        })
        await Api(ApiConstants.PILL_REMINDER_LIST, data, 'post').then(res => {
            this.setState({
                pillReminderRecord: res.data.result,
                visible: false
            })
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


    updateTime = (newDate) => {
        switch (this.state.selectReminderId) {
            case 1:
                return this.reschedule(newDate)
            case 2:
                return console.log("Update Time 2", newDate)
            // return (this.setState({ secondTime: date, }))
            case 3:
                return console.log("Update Time 3", newDate)
            // return (this.setState({ thirdTime: date, }))
            case 4:
                return console.log("Update Time 4", newDate)
            // return (this.setState({ fourthTime: date, }))
            default:
                return (this.setState({ firstTime: date, }))
        }
    }

    reschedule = (newDate) => {
        this.state.pillReminderHistory[1].medicineTime = newDate
    }

    toggleModal(data, visible) {
        console.log('data', data);
        this.setState({ modalData: data, modalVisible: visible, selectedTime: data.time });
    }
    _onPress = (data) => {
        console.log("DATA -->", data)
        let SimpleView = (<View style={{ justifyContent: 'center', flex: 1 }}>
            <View style={{}}>

            </View>
            <View style={{ alignItems: 'center' }}>
                <View style={[styles.medicineColor, { backgroundColor: data.medicineColor }]} />
                <Text style={styles.medicineName}>
                    {data.name}
                </Text>
            </View>
            <View style={{ marginTop: 10 }}>
                <View style={{ flexDirection: 'row', marginVertical: 5, alignItems: 'center' }}>
                    <Image source={images.doctorAppoint.appointment} style={{ height: 15, width: 15 }} resizeMode={"cover"} />
                    <Text style={{ marginLeft: 10 }}>
                        Scheduled for {data.time}
                    </Text>
                </View>
                <View style={{ flexDirection: 'row', marginVertical: 5, alignItems: 'center' }}>
                    <Image source={images.doctorAppoint.appointment} style={{ height: 15, width: 15 }} resizeMode={"cover"} />
                    <Text style={{ marginLeft: 10 }}>
                        {data.medicine_type}
                    </Text>
                </View>
            </View>
            <View style={{ height: 50, backgroundColor: "#f5f5f5" }}>
                <Image source={{ uri: data.image }} style={{ height: 15, width: 15 }} resizeMode={"cover"} />
            </View>

        </View>)
        this.pillReminder.customeAlert(SimpleView)
    }
    _renderPillReminder = (item) => {
        let data = item.item;
        console.log('data', data);
        return (
            <TouchableOpacity
                onPress={() => this.toggleModal(data, true)}
                // onPress={() => this._onPress(data)}
                style={[styles.contentView, {}]}>
                <View style={styles.dateTextView}>
                    <Text style={styles.dateText}>
                        {data.time}
                    </Text>
                </View>
                <View style={[styles.medicineContent]}>
                    <View style={[styles.medicineColor, { margin: 4, }]} >
                        <Image source={{ uri: data.image }} style={{ height: 30, width: 40 }} resizeMode={"center"} />
                    </View>

                    <View style={styles.medicineData}>
                        <Text style={styles.medicineName}>
                            {data.name}
                        </Text>
                        <Text style={styles.scheduledTime}>
                            {data.medicine_type}
                        </Text>
                    </View>
                    {
                        data.status != 0 ?
                            data.status === 2 ?
                                <View style={[styles.medicineColor, { width: 60, position: 'absolute', right: 5, alignItems: 'center' }]} >
                                    <Image source={images.pillReminder.skip} style={{ height: 20, width: 35, }} resizeMode={"center"} />
                                    <Text style={{ alignItems: 'center', textAlign: 'center' }}>
                                        Skipped
                                    </Text>
                                </View> :
                                <View style={[styles.medicineColor, { width: 60, position: 'absolute', right: 5, alignItems: 'center' }]} >
                                    <Image source={images.pillReminder.take} style={{ height: 20, width: 35, }} resizeMode={"center"} />
                                    <Text style={{ textAlign: 'center', alignContent: 'center' }}>
                                        Taken
                                    </Text>
                                </View>
                            :
                            null}
                </View>
            </TouchableOpacity>
        )
    }

    _pressButton = (navigation) => {
        this.setState({ modalVisible: false })
        this.props.navigation.navigate(navigation)
    }

    selectedDate = (date) => {
        this.setState({ selectedDate: date });
        console.log("Select Date", moment(date).format('DD-MM-YYYY'))
    }
    handleDatePicked = async (date) => {
        const NewDate = Moment(date).format('HH:mm')
        console.log('NewDate', NewDate);
        //this.updateTime(NewDate)
        // await this.setState({ pillReminderTime: NewDate })
        this.setState({
            visible: true
        })
        let param = {
            id: this.state.modalData.id,
            date_time: this.state.modalData.date + ' ' + NewDate
        }
        await this.hideDateTimePicker();
        await Api(ApiConstants.RESCHEDULE_PILL, param, 'post').then(res => {
            const param = {
                date: this.state.modalData.date
            }
            this.setState({
                modalVisible: false,
                visible: false,
                modalData: []
            })
            this.getPillReminder(param);
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

    };
    skipPill = async (data) => {
        this.setState({
            visible: true
        })
        let param = {
            id: data.id,
        }
        await Api(ApiConstants.SKIP_PILL, param, 'post').then(res => {
            this.setState({
                modalVisible: false,
                visible: false,
                modalData: []
            })
            const param = {
                date: data.date
            }
            this.getPillReminder(param);
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
    takePill = async (data) => {
        this.setState({
            visible: true
        })
        let param = {
            id: data.id,
        }
        await Api(ApiConstants.TAKE_PILL, param, 'post').then(res => {
            this.setState({
                modalVisible: false,
                visible: false,
                modalData: []
            })
            const param = {
                date: data.date
            }
            this.getPillReminder(param);
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
    deletePill = async (data) => {
        this.setState({
            visible: true
        })
        await Api(ApiConstants.DELETE_PILL, data, 'post').then(res => {
            this.setState({
                modalVisible: false,
                visible: false,
                modalData: []
            })
            const param = {
                date: data.date
            }
            this.getPillReminder(param);
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
    closeModal = () => {
        this.setState({
            modalVisible: false,
            visible: false,
            modalData: []
        })
    }
    _renderFloatView = () => {
        return (
            <TouchableOpacity style={{ position: 'absolute', bottom: 10, right: 10, backgroundColor: "white", borderRadius: 50 }}
                onPress={() => this.props.navigation.navigate("AddPillReminder")}>
                <Image source={this.state.isOpen ? images.disease.cross_icon : images.disease.plus} style={{ width: 50, height: 50 }} resizeMode={"cover"} />

            </TouchableOpacity>
            // <FloatingAction screen_name={'home'} />
        );
    }
    render() {
        const { modalData } = this.state;
        const { navigation } = this.props;
        const { onScroll = () => { } } = this.props;
        return (
            <SafeArea>
                <AnimatedLoader
                    visible={this.state.visible}
                    overlayColor="rgba(255,255,255,0.75)"
                    animationStyle={styles.lottie}
                    speed={1}
                    source={require('app/assets/json/data.json')}
                />
                <View>
                    {this.state.modalVisible ?
                        <Modal
                            animationType={"slide"}
                            visible={this.state.modalVisible}
                            transparent={true}
                            onRequestClose={() => this.closeModal()}>
                            <TouchableOpacity
                                style={styles.modalContainer}
                                activeOpacity={1}
                                onPressOut={() => { this.closeModal() }}
                            >
                                <View style={styles.modalView}>
                                    <View style={{ alignItems: 'center', marginTop: 10 }}>
                                        <View style={[styles.medicineColor, { backgroundColor: modalData.medicineColor }]} />
                                        <Text style={[styles.medicineName, { fontSize: 18 }]}>
                                            {modalData.name}
                                        </Text>
                                    </View>
                                    <View style={{ margin: 10 }}>
                                        <View style={{ flexDirection: 'row', marginVertical: 5, alignItems: 'center' }}>
                                            <Image source={images.doctorAppoint.appointment} style={{ height: 20, width: 20 }} resizeMode={"cover"} />
                                            <Text style={styles.scheduledTime}>
                                                Scheduled for {modalData.time}
                                            </Text>
                                        </View>
                                    </View>
                                    <View style={{ justifyContent: 'space-around', flexDirection: 'row', borderBottomLeftRadius: 40, borderBottomRightRadius: 40, marginTop: 10, height: 80, backgroundColor: "#f5f5f5" }}>
                                        <TouchableOpacity
                                            onPress={() => this.skipPill(modalData)}
                                            style={{ alignItems: 'center' }}>
                                            <Image source={images.pillReminder.skip} style={{ margin: 10, height: 30, width: 30 }} resizeMode={"cover"} />
                                            <Text>
                                                Skip
                                            </Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            onPress={() => this.takePill(modalData)}
                                            style={{ alignItems: 'center' }}>
                                            <Image source={images.pillReminder.take} style={{ margin: 10, height: 30, width: 30 }} resizeMode={"cover"} />
                                            {/* <Image source={require('../../assets/images/take.png')} style={{ margin: 10, height: 30, width: 30 }} resizeMode={"cover"} /> */}
                                            <Text>
                                                Take
                                            </Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            onPress={() => this.showDateTimePicker(modalData)}
                                            // onPress={() => this._pressButton("AddPillReminder")}
                                            style={{ alignItems: 'center' }}>
                                            <Image source={images.pillReminder.reschedule} style={{ margin: 10, height: 30, width: 30 }} resizeMode={"cover"} />
                                            {/* <Image source={require('../../assets/images/reschedule.png')} style={{ margin: 10, height: 30, width: 30 }} resizeMode={"cover"} /> */}
                                            <Text>
                                                Reschedule
                                            </Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            onPress={() => this.deletePill(modalData)}
                                            style={{ alignItems: 'center' }}>
                                            <Image source={images.pillReminder.delete} style={{ margin: 10, height: 30, width: 30 }} resizeMode={"cover"} />
                                            {/* <Image source={require('../../assets/images/delete.png')} style={{ margin: 10, height: 30, width: 30 }} resizeMode={"cover"} /> */}
                                            <Text>
                                                Delete
                                            </Text>
                                        </TouchableOpacity>
                                        {/* <Image source={images.doctorAppoint.skip} style={{ margin: 10, height: 30, width: 30 }} resizeMode={"cover"} />
                                        <Image source={images.doctorAppoint.take} style={{ margin: 10, height: 30, width: 30 }} resizeMode={"cover"} />
                                        <Image source={images.doctorAppoint.reschedule} style={{ margin: 10, height: 30, width: 30 }} resizeMode={"cover"} /> */}
                                    </View>
                                </View>
                            </TouchableOpacity>
                        </Modal> : null}
                </View>
                {/* <AuthHeader title={'PILL REMINDER'} navigateTo={navigateToHome} /> */}
                <AlertDialog
                    ref={ref => (this.pillReminder = ref)} />
                <View style={GS.containerStyle}>
                    <Image source={image.disease.background} style={GS.backgroundImage} resizeMode={"contain"} />
                    <View style={GS.headerView}>
                        <TouchableOpacity
                            style={GS.leftArrow}
                            onPress={() => this.props.navigation.navigate("Home")}>
                            <Image source={image.disease.left_arrow} style={{ width: 20, height: 20, }} resizeMode={"cover"} />
                        </TouchableOpacity>
                        <Text style={GS.hederText}>
                            MEDICINE REMINDER
                        </Text>
                        {/* <TouchableOpacity style={GS.rightImage}
                            onPress={() => this.props.navigation.navigate("AddPillReminder")}>
                            <Image source={images.pillReminder.plus} style={GS.menuButtonStyle} resizeMode={"cover"} />
                        </TouchableOpacity> */}
                    </View>
                </View>
                <View style={{ top: -60 }}>
                    <CalendarStrip
                        selectedDate={this.state.selectedDate}
                        onPressDate={(date) => {
                            console.log('date', date);
                            this.selectedDate(date)
                            const param = {
                                date: moment(date).format("YYYY-MM-DD")
                            }
                            this.getPillReminder(param);
                            // this.setState({ selectedDate: date });
                        }}
                        onPressGoToday={(today) => {
                            this.setState({ selectedDate: today });
                        }}
                        onSwipeDown={() => {
                            //   alert('onSwipeDown');
                        }}
                        markedDate={['2018-05-04', '2018-05-15', '2018-06-04', '2018-05-01',]}
                    />
                </View>
                {/* <View style={styles.row}> */}
                {this.state.pillReminderRecord.length == 0 ?
                    <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1, top: -50 }}>
                        <Text style={{ color: "black", fontSize: 18 }}>
                             Click "+" Button To Add Medicine Reminder
                        </Text>
                    </View>
                    :
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        bounces={false}
                        style={styles.flatListView}
                        data={this.state.pillReminderRecord}
                        extraData={this.state}
                        renderItem={this._renderPillReminder}
                        keyExtractor={(item, index) => index.toString()}
                    />
                }
                {this._renderFloatView()}
                {/* </View> */}
                <DateTimePicker
                    is24Hour={false}
                    mode='time'
                    isVisible={this.state.isDateTimePickerVisible}
                    onConfirm={this.handleDatePicked}
                    onCancel={this.hideDateTimePicker}
                    date={new Date(Moment(this.state.selectedTime, "HH:mm"))}
                />
            </SafeArea>
        );
    }
}

