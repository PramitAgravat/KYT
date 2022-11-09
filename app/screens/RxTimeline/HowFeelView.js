import React, {
    Component,
} from 'react';

import {
    LayoutAnimation,
    UIManager,
    View,
    Modal,
    TouchableHighlight,
    Text,
    TouchableOpacity
} from 'react-native';

import FoldView from 'react-native-foldview';
import HowFeelDetailHead from './Components/HowFeelCard/HowFeelDetailHead';
import HowFeelDetailBody from './Components/HowFeelCard/HowFeelDetailBody';
import validate from 'app/lib/validation_wrapper';
import { HowFeelCard } from "./Components";
import { RatingSlider } from '../Home/Components';
import { AlertDialog } from "app/components/AlertDialog";
import styles from '../Home/styles';
import LinearGradient from 'react-native-linear-gradient';
if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

const ROW_HEIGHT = 100;

const Spacer = ({ height }) => (
    <View
        pointerEvents="none"
        style={{
            height,
        }}
    />
);

export default class HowFeelView extends Component {

    constructor(props) {
        super(props);

        this.state = {
            ratingValue: 3,
            commentError: false,
            comment: '',
            expanded: false,
            height: ROW_HEIGHT
        };
    }

    componentWillMount() {
        this.flip = this.flip.bind(this);
        this.handleAnimationStart = this.handleAnimationStart.bind(this);
        this.renderFrontface = this.renderFrontface.bind(this);
        this.renderBackface = this.renderBackface.bind(this);
    }

    flip() {
        console.log('asd');
        this.setState({
            expanded: !this.state.expanded,
        });
    }

    handleAnimationStart(duration, height) {
        const isExpanding = this.state.expanded;

        const animationConfig = {
            duration,
            update: {
                type: isExpanding ? LayoutAnimation.Types.easeOut : LayoutAnimation.Types.easeIn,
                property: LayoutAnimation.Properties.height,
            },
        };

        LayoutAnimation.configureNext(animationConfig);

        this.setState({
            height,
        });
    }

    renderFrontface() {
        if (!this.state.expanded) {
            return (
                <HowFeelCard onPress={this.flip} data={this.props.data} />
            );
        } else {
            return null;
        }

    }

    renderBackface() {
        console.log('this.props.data', this.props.data);
        return (
            <HowFeelDetailBody onHowFeelDelete={(data) => this.onHowFeelDelete(data)} onPress={(val) => this.handlePress(val)} data={this.props.data} />
        );
    }

    handlePress = (value) => {
        this.setState({
            comment: value.comment,
            ratingValue: value.feeling_type,
            feeling_id: value.feeling_today_id

        })
        this._onPressCommentBox()
    }
    onHowFeelDelete = (value) => {

        let params = {
            feeling_id: value.feeling_today_id
        }
        this.props.deleteFeeling(params);
        this.setState({ commentError: false, comment: '', ratingValue: 3, feeling_id: null })
    }

    _onPressCommentBox = () => {
        this.commentAlert.customeAlert()
    }



    _updateFeeling = async () => {
        // this.commentAlert.setModalVisible(false)
        const commentError = await validate('ratingComment', this.state.comment);
        await commentError != null ? this.setState({ commentError: true, comment: this.state.comment.trim() }) : this.setState({ commentError: false })
        if (commentError === null) {
            let params = {
                id: this.state.feeling_id,
                comment: this.state.comment,
                feeling_type: this.state.ratingValue
            }
            console.log("ADD FEELING", params)
            this.props.editFeeling(params);
            this.setState({ commentError: false, comment: '', ratingValue: 3, feeling_id: null })
            this.commentAlert.setModalVisible(false)
        }
        else {
            this.setState({ commentError: true })
        }
    }

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
    onClose = () => {
        console.log('sds close');
        this.setState({
            comment: '',
            ratingValue: 3,
            feeling_id: null

        })
    }
    _alertHowFeel = () => {
        return (
            <AlertDialog
                ref={ref => (this.commentAlert = ref)} onClose={() => this.onClose()}>
                <View style={styles.commentContainerView}>
                    <Text style={styles.personName}>
                        {"Welcome  " + this.props.user.name + ","}
                    </Text>
                    <Text style={styles.titleText}>
                        How are you feeling today ?
                    </Text>
                </View>
                <View style={styles.ratingView}>
                    {<RatingSlider ratingValue={this.state.ratingValue} comment={this.state.comment} getRatingValue={(val) => this.getRatingValue(val)} getCommentValue={(comment) => this.getCommentValue(comment)} />}
                </View>
                {this.state.commentError ? <Text style={{ fontFamily: "Lemonada-Bold", left: 10, color: 'red', fontSize: 14, top: -30 }}>Enter your symptoms</Text> : null}
                <TouchableOpacity style={{ marginVertical: 10, alignItems: 'center' }} onPress={() =>
                    this._updateFeeling()}
                >
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

    render() {
        const { height } = this.state;
        const { zIndex } = this.props;

        let spacerHeight = height - ROW_HEIGHT;
        if (spacerHeight > 1) {
            spacerHeight += 20;
        } else {
            spacerHeight -= 20;
        }
        console.log('spacerHeight', spacerHeight);

        return (
            <View
                style={{
                    flex: 1,
                    zIndex,

                }}
            >
                {this._alertHowFeel()}
                <View
                    style={{
                        //height: ROW_HEIGHT,
                        margin: 10,
                        flex: 1
                    }}
                >
                    <FoldView
                        expanded={this.state.expanded}
                        onAnimationStart={this.handleAnimationStart}
                        perspective={1000}
                        renderFrontface={this.renderFrontface}
                        renderBackface={this.renderBackface}

                    >
                        <HowFeelDetailHead data={this.props.data} onPress={this.flip} />
                    </FoldView>

                </View>

                <Spacer height={spacerHeight} />
            </View>
        );
    }
}
