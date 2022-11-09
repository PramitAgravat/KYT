import React, { Component } from 'react';
import { Text, View, Linking, TouchableOpacity, Share, StyleSheet, Dimensions, TextInput } from 'react-native';
import { Picker } from 'native-base';
import fontStyle from 'app/config/styles';
const FONT_REGULAR = fontStyle.fonts.FONT_REGULAR;
const FONT_BOLD = fontStyle.fonts.FONT_BOLD;
import AuthHeader from "app/components/AuthHeader";
import SafeArea from 'app/components/SafeAreaView';
import { navigateToWallet } from "app/navigation/NavigationHelpers";
import LinearGradient from 'react-native-linear-gradient';
import styles from './styles';
import Api from 'app/api';
import ApiConstants from 'app/api/ApiConstants';
import DateTimePicker from "react-native-modal-datetime-picker";
import Moment from 'moment';
import AndroidOpenSettings from 'react-native-android-open-settings'
import FormData from 'form-data';
import * as healthRecordActions from 'app/actions/healthRecordActions';
import validate from 'app/lib/validation_wrapper';
import AnimatedLoader from "react-native-animated-loader";
class UploadImage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            imagePath: '',
            visible: false,
            title: 'Upload Image',
            reportDate: 'Report Date',
            modalVisible: false,
            isOpen: false,
            openPosition: null,
            diseasesSelected: this.props.screen_name == 'disease' ? this.props.user_disease_id : null,
            imagePath: null,
            diseaseList: [],
            visible: false,
            reportDateError: null,
            diseaseError: null,
            disease_title: null
        }
    }
    componentDidMount() {
        this.props.getDiseasesList();
        _this = this;
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const newProps = this.props;
        if (prevState.diseaseList !== newProps.diseaseList) {
            this.setState({ diseaseList: newProps.diseaseList })
        }
        if (prevState.visible !== newProps.loader) {
            this.setState({ visible: newProps.loader })
        }
    }
    showDateTimePicker = () => {
        this.setState({ isDateTimePickerVisible: true });
    };

    hideDateTimePicker = () => {
        this.setState({ isDateTimePickerVisible: false });
    };

    handleDatePicked = date => {
        const NewDate = Moment(date).format('YYYY-MM-DD')
        this.setState({ reportDate: NewDate })
        this.hideDateTimePicker();
    };
    submitDiseaseDoc = async () => {
        const diseaseError = this.props.screen_name == 'home' ? await validate('name', this.state.diseasesSelected) : null;
        const reportDateError = await validate('name', this.state.reportDate == 'Report Date' ? null : this.state.reportDate);
        console.log('reportDateError', reportDateError);
        this.setState({
            diseaseError: diseaseError,
            reportDateError: reportDateError
        })
        if (!diseaseError && !reportDateError) {
            let bodyFormData = new FormData();
            bodyFormData.append('image', this.state.imagePath);
            bodyFormData.append('user_diseases_id', this.state.diseasesSelected);
            bodyFormData.append('doc_type', this.state.openPosition);
            bodyFormData.append('report_date', this.state.reportDate);
            this.setState({ visible: true })
            await Api(ApiConstants.ADD_DISEASE_DOC, bodyFormData, 'post', { headers: { 'Content-Type': 'multipart/form-data' } }).then(res => {
                console.log("Result", res)
                console.log('this.state.diseasesSelected', this.state.diseasesSelected);
                if (res.data.status) {
                    if (this.props.screen_name == 'home') {
                        const param = {
                            user_disease_id: this.state.diseasesSelected,
                            disease_title: this.state.disease_title
                        }
                        this.setState({
                            imagePath: null,
                            diseasesSelected: null,
                            openPosition: null,
                            reportDate: 'Report Date',
                            disease_title: null,
                            visible: false
                        });
                        navigateToDisease(param)
                    } else {
                        const param = {
                            doc_type: 0,
                            user_disease_id: this.state.diseasesSelected,

                        }
                        this.setState({
                            imagePath: null,
                            openPosition: null,
                            reportDate: 'Report Date',
                            disease_title: null
                        });
                        this.props.userDiseaseDocList(param)
                    }

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

    }
    uploadInFolder = () => {
        return (

            <View style={{ margin: 20 }}>
                {this.props.screen_name == 'home' ? <View style={[styles.pickerView, this.state.diseaseError ? styles.errorBox : null]}>
                    <Picker
                        style={{ height: 40 }}
                        placeholder={"Select Disease"}
                        placeholderStyle={styles.pickerPlaceHolderText}
                        selectedValue={this.state.diseasesSelected}
                        iosIcon={<View style={{ right: 20 }}><Image source={images.pillReminder.down_arrow} style={{ height: 20, width: 20 }} /></View>}
                        itemStyle={{ backgroundColor: '#fff' }}
                        onValueChange={(itemValue, itemPosition) => {
                            for (let i = 0; i < this.state.diseaseList.length; i++) {
                                if (this.state.diseaseList[i].id === itemValue) {
                                    this.setState({ disease_title: this.state.diseaseList[i].disease_title });
                                    break;
                                }
                            }
                            this.setState({ diseasesSelected: itemValue })
                        }}>
                        <Picker.Item label={"Select Disease"} value={this.state.diseasesSelected} color={"#000"} />
                        {this.state.diseaseList.map((item, key) => {
                            return (<Picker.Item label={item.disease_title + " "} value={item.id} key={key} />)

                        })}
                        <Picker.Item label={"Other"} value={"Other"} color={"#000"} />
                    </Picker>
                </View> : null}
                {this.state.diseaseError ? <Text style={styles.errorText}>Select Your Disease</Text> : null}
                <View style={[this.state.reportDateError ? styles.errorBox : null]}>
                    <TouchableOpacity style={styles.datePickerView}
                        onPress={() => this.showDateTimePicker()}>
                        <Text style={{}}>
                            {this.state.reportDate}
                        </Text>
                    </TouchableOpacity>
                </View>
                {this.state.reportDateError ? <Text style={styles.errorText}>Select Report Date</Text> : null}
                <TouchableOpacity style={{ marginVertical: 20, alignItems: 'center' }}
                    onPress={() => { this.submitDiseaseDoc() }}>
                    <LinearGradient
                        start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                        colors={['#64B7A0', '#3992B2']} style={styles.buttonStyle}>
                        <Text style={[styles.buttonTextStyle, { fontSize: 14 }]}>
                            Submit
                            </Text>
                    </LinearGradient>
                </TouchableOpacity>
            </View>
        );
    }

    render() {
        return (
            <SafeArea>
                <AnimatedLoader
                    visible={this.state.visible}
                    overlayColor="rgba(255,255,255,0.75)"
                    animationStyle={styles.lottie}
                    speed={1}
                    source={require('app/assets/json/data.json')}
                />
                <AuthHeader title={this.state.title} navigateTo={navigateToWallet} />
                <View style={styles.contentView}>
                    <Text style={styles.contentTextStyle}>
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                    </Text>
                </View>
                {this.uploadInFolder()}
            </SafeArea>
        )
    }
}
function mapStateToProps(state) {
    return {
        diseaseList: state.healthRecordReducer.diseaseList,
        loader: state.globalReducer.is_visible,
    };
}
function mapDispatchToProps(dispatch) {
    return {
        getDiseasesList: () => dispatch(healthRecordActions.requestDisease()),
        userDiseaseDocList: (param) => dispatch(diseaseDocActions.listUserDiseaseDoc(param)),
    };
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UploadImage);
