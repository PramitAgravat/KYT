import CustomAction from 'app/components/CustomAction';
import images from 'app/config/images';
import React, { Fragment, PureComponent } from 'react';
import { YellowBox, View, Text, TouchableOpacity } from 'react-native';
import { FloatingAction } from 'react-native-floating-action';
import { navigateToDoctorAppointment } from "app/navigation/NavigationHelpers";
import { RatingSlider } from 'app/screens/Home/Components';
import { AlertDialog } from "app/components/AlertDialog";
import validate from 'app/lib/validation_wrapper';
import styles from './styles';
import LinearGradient from 'react-native-linear-gradient';
import * as homeActions from 'app/actions/homeActions';
import { connect } from 'react-redux';
import ModalBox from 'app/components/ModalBox';
YellowBox.ignoreWarnings(['Warning: componentWillReceiveProps', 'Warning: componentWillUpdate']);
const actions = [{
    position: 1,
    name: '1',
    margin: 0,
    render: props => <CustomAction {...props} text="Doctor Appointment"
        bgIcon={images.home.insuranceBG}
        icon={images.home.doctor} />
}, {
    name: '2',
    position: 2,
    margin: 0,
    render: props => <CustomAction {...props} text="How are you feeling"
        bgIcon={images.home.feelingBG}
        icon={images.home.smiley} />
}];
class FloatingActionView extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            commentError: null,
            ratingValue: 3,
            comment: '',
            isOpen: false,
            feeling: 3,
            messageContent: 'Your today’s mood and symptoms have been added to your Rx timeline',
            isVisible: false,
            // successTitle: 'Congratulations!',
            successBody: ''
        }
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        const newProps = this.props;
        if (prevProps.addFeelingSuccess != newProps.addFeelingSuccess) {
            console.log('DATA IS--->', this.props.addFeelingSuccess.data.result);
            this.setText(this.props.addFeelingSuccess.data.result.feeling_type);
            this.commentAlert.setModalVisible(false);
            this.setState({
                isVisible: true,
            });
        }
    }
    setText = value => {
        switch (value) {
            case 1:
                return this.setState({
                    feeling: 1,
                    messageContent:
                        'Your today’s mood and symptoms have been added to your Rx timeline',
                    // title: 'Congratulation',
                });
                // return <Text style={styles.descriptionText}>Your today’s mood and symptoms have been added to your Rx timeline</Text>
                break;
            case 2:
                return this.setState({
                    feeling: 2,
                    messageContent:
                        'Your today’s mood and symptoms have been added to your Rx timeline',
                    // title: 'Congratulation',
                });
                // return <Text style={styles.descriptionText}>Your today’s mood and symptoms have been added to your Rx timeline</Text>
                break;
            case 3:
                return this.setState({
                    feeling: 3,
                    messageContent:
                        'Your today’s mood and symptoms have been added to your Rx timeline',
                    // title: 'Congratulation',
                });
                // return <Text style={styles.descriptionText}>Your today’s mood and symptoms have been added to your Rx timeline</Text>
                break;
            case 4:
                return this.setState({
                    feeling: 4,
                    messageContent:
                        'Your today’s mood and symptoms have been added to your Rx timeline',
                    // title: 'Congratulation',
                });
                // return <Text style={styles.descriptionText}>Your today’s mood and symptoms have been added to your Rx timeline</Text>
                break;
            case 5:
                return this.setState({
                    feeling: 5,
                    messageContent:
                        'Your today’s mood and symptoms have been added to your Rx timeline',
                    // title: 'Congratulation',
                });
                // return <Text style={styles.descriptionText}>Your today’s mood and symptoms have been added to your Rx timeline</Text>
                break;
        }
    };
    getRatingValue = (value) => {
        this.setState({
            ratingValue: value
        })
    }
    getCommentValue = (value) => {
        this.setState({
            comment: value
        })
    }

    navigateTo(position) {
        this.setState({ isOpen: false })
        if (position == 1) {
            navigateToDoctorAppointment()
        }
        else if (position == 2) {
            this._onPressCommentBox()
            // return alert("Position 3" + position)
        }
    }

    _addFeeling = async () => {
        const commentError = await validate('ratingComment', this.state.comment);
        await commentError != null ? this.setState({ commentError: true, comment: this.state.comment.trim() }) : this.setState({ commentError: false })
        if (commentError === null) {
            let params = {
                comment: this.state.comment,
                feeling_type: this.state.ratingValue
            }
            console.log("Params -->", params)
            this.commentAlert.setModalVisible(false)
            // this.props.onSuccess()
        }
        else {
            this.setState({ commentError: true })
        }
    }
    _onPressCommentBox = () => {
        this.commentAlert.customeAlert()
    }
    _alertHowFeel = () => {
        return (
            <AlertDialog
                ref={ref => (this.commentAlert = ref)}>
                <View style={styles.commentContainerView}>
                    <Text style={styles.personName}>
                        {"Welcome  " + this.props.userProfile.name + ","}
                    </Text>
                    <Text style={styles.titleText}>
                        How are you feeling today ?
                    </Text>
                </View>
                <View style={styles.ratingView}>
                    {<RatingSlider ratingValue={this.state.ratingValue} comment={this.state.comment} getRatingValue={(val) => this.getRatingValue(val)} getCommentValue={(comment) => this.getCommentValue(comment)} />}
                </View>
                {this.state.commentError ? <Text style={{ fontFamily: "Lemonada-Bold", left: 10, color: 'red', fontSize: 14, top: -30 }}>Enter your symptoms</Text> : null}
                <TouchableOpacity style={{ marginVertical: 10, alignItems: 'center' }} onPress={() => this._addFeeling()}>
                    <LinearGradient
                        start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                        colors={['#64B7A0', '#3992B2']} style={styles.buttonStyle}>
                        <Text style={styles.buttonTextStyle}>
                            SUBMIT
                        </Text>
                    </LinearGradient>
                </TouchableOpacity>
            </AlertDialog>
        );
    }
    _addFeeling = async () => {
        const commentError = await validate('ratingComment', this.state.comment);
        (await commentError) != null
            ? this.setState({ commentError: true, comment: this.state.comment.trim() })
            : this.setState({ commentError: false });
        if (commentError === null) {
            let params = {
                comment: this.state.comment,
                feeling_type: this.state.ratingValue,
            };
            this.props.addFeeling(params);
            this.setState({ commentError: false, comment: '', ratingValue: 3 });
        } else {
            this.setState({ commentError: true });
        }
    };
    navigateToScreen(screen) {
        this.setState({ isVisible: false });
        setTimeout(() => {
            this.props.successFeel(screen);
        }, 0)

    }

    render() {
        return <Fragment>
            {this._alertHowFeel()}
            <ModalBox
                firstTitle={'Home Screen'}
                secondTitle={'RX Time Line'}
                feeling={this.state.feeling}
                messageContent={this.state.messageContent}
                isVisible={this.state.isVisible}
                onClose={screen => this.navigateToScreen(screen)}
            />
            <FloatingAction
                iconWidth={50}
                iconHeight={50}
                onPressMain={() => {
                    this.setState({ isOpen: !this.state.isOpen });
                    console.log('main');
                }}
                onPressBackdrop={() => {
                    this.setState({ isOpen: !this.state.isOpen })
                    console.log('backpress');
                }}
                floatingIcon={this.state.isOpen ? images.home.cross_icon : images.home.plus_icon}
                color={this.state.isOpen ? "#ffffff00" : "#fff"}
                // color={Platform.OS === "ios" ? (this.state.isOpen ? null : "#fff") : "translate"}
                actions={actions}
                position="right"
                actionsPaddingTopBottom={1}
                distanceToEdge={5}
                onPressItem={
                    (position) => {
                        this.navigateTo(position)
                        // this.setState({ isOpen: !this.state.isOpen }, () => this.navigateTo(position))
                    }
                }
            />
        </Fragment>

    }
}


function mapStateToProps(state) {
    return {
        userProfile: state.authReducer.mainUser,
        addFeeling: state.homeReducer.addFeeling,
        addFeelingSuccess: state.homeReducer.addFeelingSuccess,
        loader: state.globalReducer.is_visible
    };
}
function mapDispatchToProps(dispatch) {
    return {
        addFeeling: (data) => dispatch(homeActions.requestAddFeeling(data)),
        addFeelingSuccessData: (data) => dispatch(homeActions.addFeelingSuccess(data)),
    };
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(FloatingActionView);
