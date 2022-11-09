import Api from 'app/api';
import ApiConstants from 'app/api/ApiConstants';
import AuthHeader from "app/components/AuthHeader";
import SafeArea from 'app/components/SafeAreaView';
import SuccessModal from 'app/components/SuccessModal';
import fontStyle from 'app/config/styles';
import { default as Moment } from 'moment';
import { Content, Text, Toast } from 'native-base';
import React, { Component } from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
import AnimatedLoader from 'react-native-animated-loader';
import LinearGradient from 'react-native-linear-gradient';
import DateTimePicker from "react-native-modal-datetime-picker";
import styles from './styles';
const FONT_BOLD = fontStyle.fonts.FONT_BOLD;
const selectTab = ['#64B7A0', '#3992B2']
const unSelectTab = ['#565656', '#565656']

export default class DiseaseInformation extends Component {
    constructor(props) {
        super(props)
        this.state = ({
            msgTitle: "Update Success",
            body: "Disease Information Updated",
            isVisible: false,
            visible: false,
            selectTab: this.props.navigation.state.params.report_data.doc_type,
            title: 'DISEASE INFORMATION',
            point: 200,
            data: this.props.navigation.state.params.report_data,
            report_date: this.props.navigation.state.params.report_data.report_date,
            isDateTimePickerVisible: false,
        })
    }
    showDateTimePicker = () => {
        this.setState({ isDateTimePickerVisible: true });
    };

    hideDateTimePicker = () => {
        this.setState({ isDateTimePickerVisible: false });
    };

    handleDatePicked = date => {
        this.setState({ report_date: date });
        this.hideDateTimePicker();
    };

    selectTab = async (selectTab) => {
        this.setState({ selectTab: selectTab })
    };

    filterList = () => {
        return (
            <View style={{ alignItems: 'center', }}>
                <View style={styles.contentView}>
                    <View style={styles.firstComponentView}>
                        <Text style={[styles.mainTitleTextStyle, { color: "#439EAD" }]}>
                            DOCUMENT CATEGORY
                        </Text>
                        <View
                            style={styles.mainContainer}>
                            <View style={styles.childContainer}>
                                <TouchableOpacity
                                    style={{ margin: 1 }}
                                    // onPress={() => this.onPress(2)}>
                                    onPress={() => this.selectTab(8)}>
                                    <LinearGradient
                                        start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                                        colors={this.state.selectTab === 8 ? selectTab : unSelectTab} style={styles.diseasesView}>
                                        <Text style={styles.diseasesText}>
                                            Prescription
                                        </Text>
                                    </LinearGradient>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={{ margin: 1 }}
                                    // onPress={() => this.onPress(1)}>
                                    onPress={() => this.selectTab(7)}>
                                    <LinearGradient
                                        start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                                        colors={this.state.selectTab === 7 ? selectTab : unSelectTab} style={styles.diseasesView}>
                                        <Text style={styles.diseasesText}>
                                            Genetic Tests
                                        </Text>
                                    </LinearGradient>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={{ margin: 1 }}
                                    // onPress={() => this.onPress(3)}>
                                    onPress={() => this.selectTab(6)}>
                                    <LinearGradient
                                        start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                                        colors={this.state.selectTab === 6 ? selectTab : unSelectTab} style={styles.diseasesView}>
                                        <Text style={styles.diseasesText}>
                                            Laboratory Tests
                                        </Text>
                                    </LinearGradient>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.childContainer}>

                                <TouchableOpacity
                                    style={{ margin: 2 }}
                                    // onPress={() => this.onPress(4)}>
                                    onPress={() => this.selectTab(5)}>
                                    <LinearGradient
                                        start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                                        colors={this.state.selectTab === 5 ? selectTab : unSelectTab} style={styles.diseasesView}>
                                        <Text style={styles.diseasesText}>
                                            Medical Expenses
                                        </Text>
                                    </LinearGradient>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={{ margin: 2 }}
                                    // onPress={() => this.onPress(4)}>
                                    onPress={() => this.selectTab(4)}>
                                    <LinearGradient
                                        start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                                        colors={this.state.selectTab === 4 ? selectTab : unSelectTab} style={styles.diseasesView}>
                                        <Text style={styles.diseasesText}>
                                            Clinical Photograph
                                        </Text>
                                    </LinearGradient>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.childContainer}>
                                <TouchableOpacity
                                    style={{ margin: 2 }}
                                    // onPress={() => this.onPress(5)}>
                                    onPress={() => this.selectTab(3)}>
                                    <LinearGradient
                                        start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                                        colors={this.state.selectTab === 3 ? selectTab : unSelectTab} style={styles.diseasesView}>
                                        <Text style={styles.diseasesText}>
                                            Radiology & Imaging
                                        </Text>
                                    </LinearGradient>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={{ margin: 2 }}
                                    // onPress={() => this.onPress(5)}>
                                    onPress={() => this.selectTab(2)}>
                                    <LinearGradient
                                        start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                                        colors={this.state.selectTab === 2 ? selectTab : unSelectTab} style={styles.diseasesView}>
                                        <Text style={styles.diseasesText}>
                                            Insurance Claim Data
                                        </Text>
                                    </LinearGradient>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.childContainer}>
                                <TouchableOpacity
                                    style={{ margin: 2 }}
                                    // onPress={() => this.onPress(5)}>
                                    onPress={() => this.selectTab(1)}>
                                    <LinearGradient
                                        start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                                        colors={this.state.selectTab === 1 ? selectTab : unSelectTab} style={styles.diseasesView}>
                                        <Text style={styles.diseasesText}>
                                            Hospital Discharge Papers
                                        </Text>
                                    </LinearGradient>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        )
    };

    onClose() {
        this.setState({
            isVisible: false,
            msgTitle: '',
            body: ''
        })
    }
    _submit = async () => {
        this.setState({
            visible: true
        })
        let params = {
            id: this.props.navigation.state.params.report_data.id,
            user_diseases_id: this.props.navigation.state.params.report_data.user_diseases_id,
            doc_type: this.state.selectTab,
            report_date: Moment(this.state.report_date).format('YYYY-MM-DD')
        }
        await Api(ApiConstants.UPDATE_DISEASE_DOCUMENT, params, 'post').then(res => {
            this.setState({
                visible: false,
                msgTitle: "Update Success",
                body: res.data.message,
                isVisible: true
            })
        }).catch(err => {
            console.log('err', err);
            this.setState({
                visible: false
            })
            Toast.show({
                text: 'Network issue.Please try again later.',
                buttonText: "Okay",
                duration: 3000,
                type: "danger"
            });
            this.setState({
                value: "test"
            });
        });
    }

    goBack() {
        this.props.navigation.goBack()
    }

    render() {
        return (
            <SafeArea style={styles.container}>
                <SuccessModal title={this.state.msgTitle} body={this.state.body} isVisible={this.state.isVisible} onClose={() => this.onClose()} backDropClose={false} swipeClose={false} />
                <AnimatedLoader
                    visible={this.state.visible}
                    overlayColor="rgba(255,255,255,0.75)"
                    animationStyle={styles.lottie}
                    speed={1}
                    source={require('app/assets/json/data.json')}
                />
                <AuthHeader title={this.state.title} navigateTo={() => this.goBack()} />
                <Content style={styles.mainContentView}>
                    <View style={{ alignItems: 'center', }}>
                        <Image
                            source={{ uri: this.state.data.image_url }}
                            style={{
                                width: 150,
                                height: 100,
                            }}
                            resizeMode={'center'} />
                        <View style={styles.contentView}>
                            <View style={styles.firstComponentView}>
                                <TouchableOpacity onPress={() => this.showDateTimePicker()}
                                    style={{ marginVertical: 5 }}>
                                    <Text style={{ color: '#000' }}>
                                        Report Date
                                </Text>
                                    <Text style={{ color: "#b2adad" }}>
                                        {(Moment(this.state.report_date).format('DD-MM-YYYY'))}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    {this.filterList()}
                    <TouchableOpacity style={{ marginTop: 10, alignItems: 'center', }} onPress={() => this._submit()}>
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
                    isVisible={this.state.isDateTimePickerVisible}
                    onConfirm={this.handleDatePicked}
                    onCancel={this.hideDateTimePicker}
                    date={new Date(Moment(this.state.report_date, "YYYY-MM-DD").format('YYYY-MM-DD'))}
                />
            </SafeArea>
        )
    }
}
