import React from 'react';
import {
    Image,
    Platform,
    ScrollView,
    StyleSheet, TouchableOpacity,
    View,
    FlatList,
    TouchableWithoutFeedback
} from 'react-native';
import images from 'app/config/images';
import styles from './styles';
import FloatingAction from './Components/FloatingAction';
import DoctorView from './DoctorView';
import HowFeelView from './HowFeelView';
import PillView from './PillView';
import SafeArea from 'app/components/SafeAreaView';
import { Picker, Text, Toast } from 'native-base';
import { AlertDialog } from "../../components/AlertDialog";
import LinearGradient from "react-native-linear-gradient";
import DatepickerRange from 'react-native-range-datepicker';
import { DateCard, ImageCard } from "./Components";
import Api from 'app/api';
import ApiConstants from 'app/api/ApiConstants';
import AnimatedLoader from 'react-native-animated-loader';
import Moment from 'moment';
import ImageViewerModal from 'app/components/ImageViewerModal';
import ModalBox from 'react-native-modalbox';
import ModalBoxClass from 'app/components/ModalBox';
import GS from "../../config/GlobalStyle"

export default class RxTimelineView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isFilterClick: false,
            name: this.props.userProfile.name,
            diseaseList: this.props.diseaseList,
            feeling_type: 3,
            isVisible: false,
            showCalendar: false,
            title: false,
            data: [],
            selectItemType: null,
            expanded: false,
            isReady: false,
            skip: 0,
            limit: 200,
            visible: false,
            selectedDate: Moment().format('DD MMMM'),
            isRefreshing: false,
            isImageViewerVisible: false,
            arrayImages: [],
            openDatepicker: false,
            startDate: null,
            untilDate: null
        }
        this.modalIndex = 0;
    }

    componentDidMount() {
        let param = {
            skip: this.state.skip,
            limit: this.state.limit,
        }

        this.willFocusSubscription = this.props.navigation.addListener(
            'willFocus',
            () => {
                this.loadTimeLine(param);
            }
        );
    }
    componentWillUnmount() {
        this.willFocusSubscription.remove();
    }

    loadTimeLine = async (param) => {
        this.setState({
            visible: true
        })
        await Api(ApiConstants.RX_TIMELINE, param, 'post').then(res => {
            console.log("Result", res);
            if (res.data.status) {
                console.log('state update');
                this.setState({
                    data: res.data.result,
                    visible: false
                })
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
    handleRefresh = () => {
        this.setState({
            isRefreshing: true,
        }, () => {
            let param = {
                skip: this.state.skip,
                limit: this.state.limit,
            }
            this.loadTimeLine(param).then(res => {

            })
        });
    }
    handleLoadMore = () => {

    }
    deleteFeeling = async (param) => {
        await Api(ApiConstants.DELETE_FEELING_TODAY, param, 'post').then(res => {
            console.log("Result", res);
            if (res.data.status) {
                let param = {
                    skip: this.state.skip,
                    limit: this.state.limit,
                }
                this.loadTimeLine(param)
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

    deletePillReminder = async (param) => {

        await Api(ApiConstants.DELETE_PILL_REMINDER, param, 'post').then(res => {
            console.log("Result", res);
            if (res.data.status) {
                let param = {
                    skip: this.state.skip,
                    limit: this.state.limit,
                }
                this.loadTimeLine(param)
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

    deleteAppointment = async (param) => {
        await Api(ApiConstants.DELETE_DOCTOR_APPOINTMENT, param, 'post').then(res => {
            console.log("Result", res);
            if (res.data.status) {
                let param = {
                    skip: this.state.skip,
                    limit: this.state.limit,
                }
                this.loadTimeLine(param)
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

    editFeeling = async (param) => {
        console.log("Result ---------------->", param);
        await Api(ApiConstants.UPDATE_FEELING_TODAY, param, 'post').then(res => {
            console.log("Result", res);
            this.setState({ isVisible: true, feeling_type: param.feeling_type })
            if (res.data.status) {
                let param = {
                    skip: this.state.skip,
                    limit: this.state.limit,
                }
                this.loadTimeLine(param)
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
    editAppointment = async (param) => {
        await Api(ApiConstants.UPDATE_DOCTOR_APPOINTMENT, param, 'post').then(res => {
            console.log("Result", res);
            if (res.data.status) {
                let param = {
                    skip: this.state.skip,
                    limit: this.state.limit,
                }
                this.loadTimeLine(param)
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
    filterByDate = (day) => {
        console.log('day', day);
        let param = {
            skip: this.state.skip,
            limit: this.state.limit,
            date: day.dateString
        }
        this.loadTimeLine(param).then((res) => {
            this.setState({ selectedDate: day.day + ' ' + Moment(day.month, 'MM').format('MMMM'), showCalendar: !this.state.showCalendar })
        })

    }
    dismissImageViewer = () => {
        this.setState({ isImageViewerVisible: false });
    }
    redirectToNextScreen = () => {
        this.setState({ isImageViewerVisible: false });
    }
    openImageView = (data) => {
        let imgArray = [];
        for (let i = 0; i < data.length; i++) {
            imgArray.push({
                url: data[i]
            })
        }
        console.log('imgArray', imgArray);
        this.setState({
            isImageViewerVisible: true,
            arrayImages: imgArray
        })
    }
    onChangeImage = (index) => {
        this.modalIndex = index
    }
    successFeel = (screen) => {
        console.log('success');
        this.setState({ isVisible: false })
        let param = {
            skip: this.state.skip,
            limit: this.state.limit,
        }

        this.loadTimeLine(param);
        // if (!screen) {
        //     this.props.navigation.navigate('Home')

        // } else {
        //     let param = {
        //         skip: this.state.skip,
        //         limit: this.state.limit,
        //     }

        //     this.loadTimeLine(param);
        // }

    }
    _renderFloatView = () => {
        return (
            <FloatingAction screen_name={'RXTimeLine'} successFeel={(screen) => this.successFeel(screen)} />
        );
    }

    navigateToScreen(screen) {
        this.setState({ isVisible: false })
        // if (!screen) {
        //     this.props.navigation.navigate('Home')
        // }
    }

    render() {
        console.log("ABCDEF --> Start Date", this.state.startDate)
        console.log("ABCDEF --> Until Date", this.state.untilDate)
        return (

            <SafeArea>
                <ModalBoxClass firstTitle={""} secondTitle={""} feeling={this.state.feeling_type} messageContent={"Your today’s mood and symptoms have been added to your Rx timeline"} isVisible={this.state.isVisible} onClose={(screen) => this.navigateToScreen(screen)} />
                <AlertDialog
                    ref={ref => (this.menuAlert = ref)}>
                    <View style={{ marginHorizontal: 5 }}>
                        <Text style={styles.filterByText}>
                            FILTER BY
                        </Text>
                        <Text style={styles.diseaseTypeText}>
                            Disease Type
                        </Text>
                        <View style={styles.TextInputContainer}>
                            <Picker
                                mode={"dropdown"}
                                iosHeader={"All"}
                                iosIcon={<View><Image source={images.timeline.down_arrow} style={styles.pickerDownArrow} /></View>}
                                placeholder={"All"}
                                placeholderStyle={{ fontSize: 12 }}
                                selectedValue={this.state.selectItemType}
                                onValueChange={(itemValue, itemPosition) => this.setState({ selectItemType: itemValue })}>
                                <Picker.Item label={"All"} color={"#a59fa2"} />
                                {this.state.diseaseList.map((item, key) => {
                                    return (<Picker.Item label={item.disease_title + " "} value={item.id} key={key} />)
                                })}
                            </Picker>
                        </View>
                        <Text style={styles.diseaseTypeText}>
                            Date
                        </Text>
                        <TouchableOpacity onPress={() => {
                            this.setState({ showCalendar: !this.state.showCalendar }, () => {
                                this.menuAlert.setModalVisible(false)
                            })
                        }}>
                            <View style={styles.TextInputContainer}>
                                {this.state.startDate == null ?
                                    <Text style={{ left: 10 }}>
                                        Select Date Range
                                    </Text> :
                                    <Text style={{ left: 10 }}>
                                        {Moment(this.state.startDate).format('DD-MM-YYYY') + " To " + Moment(this.state.untilDate).format('DD-MM-YYYY')}
                                        {/* {this.state.startDate + " To " + this.state.untilDate} */}
                                    </Text>
                                }
                            </View>
                        </TouchableOpacity>
                        <View style={styles.alertDialogButtons}>
                            <TouchableOpacity
                                onPress={() => this._buttonReset()}
                                style={styles.cancelButton}>
                                <Text style={styles.applyButtonText}>
                                    RESET
                                </Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={() => this._buttonClick()} >
                                <LinearGradient
                                    start={{ x: 0.0, y: 0.25 }} end={{ x: 0.5, y: 1.0 }}
                                    colors={['#64B7A0', '#2F7FA3']} style={styles.genderLinearGradient}>
                                    <Text style={styles.applyButtonText} >
                                        APPLY
                                    </Text>
                                </LinearGradient>
                            </TouchableOpacity>
                        </View>
                    </View>
                </AlertDialog>
                <AnimatedLoader
                    visible={this.state.visible}
                    overlayColor="rgba(255,255,255,0.75)"
                    animationStyle={styles.lottie}
                    speed={1}
                    source={require('app/assets/json/data.json')}
                />
                <ImageViewerModal
                    dismissImageViewer={this.dismissImageViewer}
                    isImageViewerVisible={this.state.isImageViewerVisible}
                    arrayImages={this.state.arrayImages}
                    visibleInfoBtn={false}
                    imageIndex={0}
                    redirectToNextScreen={this.redirectToNextScreen}
                    onChange={this.onChangeImage}
                />
                <ModalBox backdropPressToClose={false} swipeToClose={false} isOpen=
                    {this.state.showCalendar}>
                    <DatepickerRange
                        startDate={this.state.startDate}
                        untilDate={this.state.untilDate}
                        onClose={() =>
                            this.setState({
                                showCalendar: false
                            }, () => this._onPressMenu())}
                        onConfirm={(startDate, untilDate) => {
                            this.setState({
                                showCalendar: false,
                                startDate: startDate ? Moment(startDate).format('YYYYMMDD') : null,
                                untilDate: untilDate ? Moment(untilDate).format('YYYYMMDD') : null
                                // startDate: startDate ? Moment(startDate).format('DD-MM-YYYY') : null,
                                // untilDate: untilDate ? Moment(untilDate).format('DD-MM-YYYY') : null
                            }, () => this._onPressMenu())

                            // let param = {
                            //     skip: this.state.skip,
                            //     limit: this.state.limit,
                            //     start_date: startDate ? Moment(startDate).format('YYYY-MM-DD') : null,
                            //     end_date: untilDate ? Moment(untilDate).format('YYYY-MM-DD') : null
                            // }
                            // this.loadTimeLine(param).then((res) => {
                            //     this.setState({ showCalendar: !this.state.showCalendar })
                            // })
                        }} />
                </ModalBox>
                <View style={GS.containerStyle}>
                    <Image source={images.timeline.background} style={GS.backgroundImage} resizeMode={"contain"} />
                    <View style={GS.headerView}>
                        <TouchableOpacity
                            style={GS.leftArrow}
                            onPress={() => this.props.navigation.navigate("Home")}>
                            <Image source={images.timeline.left_arrow} style={GS.leftArrowImg} resizeMode={"cover"} />
                        </TouchableOpacity>
                        {/*{
                            this.state.title ? <TouchableOpacity onPress={() => {
                                    this.setState({ showCalendar: !this.state.showCalendar })
                            }}>
                                <Text style={styles.hederText}>
                                    {
                                        this.state.selectedDate
                                    }
                                </Text>
                            </TouchableOpacity> :
                                <Text style={styles.hederText}>
                                    RX TIMELINE
                                </Text>
                        }*/}
                        {/* <TouchableOpacity onPress={() => {
                            this.setState({ showCalendar: !this.state.showCalendar })
                        }}> */}
                        <Text style={GS.hederText}>
                            RX TIMELINE
                                {/* {
                                    this.state.selectedDate
                                } */}
                        </Text>
                        {/* </TouchableOpacity> */}

                        <TouchableOpacity
                            style={styles.onPressMenu}
                            onPress={() => this._onPressMenu()}>
                            <Image source={images.timeline.filter} style={styles.filterImg} resizeMode={"cover"} />
                        </TouchableOpacity>
                    </View>
                </View>
                {/*<View style={styles.calendarView}>
                    {
                        this.state.showCalendar ?
                            <DatepickerRange
                                startDate={ '13052017'}
                                untilDate={ '26062017'}
                                onConfirm= {( startDate, untilDate ) => this.setState({ startDate, untilDate })}
                            /> : null
                    }
                </View>*/}
                {
                    this.state.data.length > 0 ?

                        <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView} >
                            {/*onScroll={e => this.handleScroll(e)}>*/}
                            <FlatList
                                data={this.state.data}
                                renderItem={this._renderData}
                                keyExtractor={(item, index) => index.toString()}
                                extraData={this.state}

                            />
                        </ScrollView> :
                        this.state.isFilterClick ?
                            <Text style={{ textAlign: 'center' }}>
                                NO Record Found
                            {/* Click on "+" sign to record your daily mood/emotions or schedule doctor's appointment */}
                            </Text>
                            :
                            <Text style={{ textAlign: 'center' }}>
                                Click on "+" sign to record your daily mood/emotions or schedule doctor's appointment
                        </Text>
                }
                {/* <View style={{ marginTop: 40 }}>
                    <FooterTabs />
                </View> */}
                {this._renderFloatView()}
            </SafeArea>

        )
    }
    _renderData = (item) => {
        console.log("RXTime Line DATA", item.item)
        let data = item.item;
        return (
            <TouchableWithoutFeedback onPress={() => this.setState({
                showCalendar: false
            })} style={{ flex: 1 }} key={data.day}>
                <View style={{ flexDirection: 'row' }}>
                    <DateCard fullDate={data.date} date={data.day} day={data.day_name} />
                    <View style={{ backgroundColor: "#d2d2d2", width: 2, top: 10 }} />
                    <View style={{ flex: 1 }} >
                        {
                            data.item.map((val, key) => {
                                if (val.type == 'appointment') {
                                    return <DoctorView zIndex={100} editAppointment={(param) => this.editAppointment(param)} deleteAppointment={(param) => this.deleteAppointment(param)} user={this.props.userProfile} data={val} key={data.day + '_' + key} />
                                }
                                if (val.type == 'feeling') {
                                    return <HowFeelView zIndex={100} editFeeling={(param) => this.editFeeling(param)} deleteFeeling={(param) => this.deleteFeeling(param)} user={this.props.userProfile} data={val} key={data.day + '_' + key} />
                                }
                                if (val.type == 'doc') {
                                    return <ImageCard data={val} openImageView={(data) => this.openImageView(data)} zIndex={100} key={data.day + '_' + key} />
                                }
                                if (val.type == 'pill') {
                                    return <PillView zIndex={100} deletePillReminder={(param) => this.deletePillReminder(param)} user={this.props.userProfile} data={val} key={data.day + '_' + key} />
                                }
                            })
                        }
                    </View>
                </View>
            </TouchableWithoutFeedback>
        )
    }
    /*handleScroll = (event) => {
        event.nativeEvent.contentOffset.y != 0 ? this.setState({ title: true }) : this.setState({ title: false })
        console.log("Scroll Event", event.nativeEvent.contentOffset.y);
    }*/
    _onPressMenu = () => {
        this.menuAlert.customeAlert()
    }
    _buttonClick = () => {
        let startDate = this.state.startDate;
        let untilDate = this.state.untilDate;
        let param = {
            skip: this.state.skip,
            limit: this.state.limit,
            start_date: startDate ? Moment(startDate, "YYYYMMDD").format('YYYY-MM-DD') : null,
            end_date: untilDate ? Moment(untilDate, "YYYYMMDD").format('YYYY-MM-DD') : null,
            user_diseases_id: this.state.selectItemType,
        }
        console.log("Params-------->", param)
        this.loadTimeLine(param).then((res) => {
            this.setState({
                isFilterClick: true,
                startDate: null,
                untilDate: null,
                selectItemType: null
            })
            this.menuAlert.setModalVisible(false)
            // this.setState({ showCalendar: !this.state.showCalendar })
        })

    }
    _buttonReset = () => {
        let param = {
            isFilterClick: false,
            skip: this.state.skip,
            limit: this.state.limit,
            start_date: null,
            end_date: null,
            user_diseases_id: null
        }
        console.log("Params-------->", param)
        this.loadTimeLine(param).then((res) => {
            this.setState({
                startDate: null,
                untilDate: null,
                selectItemType: null
            })
            this.menuAlert.setModalVisible(false)
            // this.setState({ showCalendar: !this.state.showCalendar })
        })
    }
}
