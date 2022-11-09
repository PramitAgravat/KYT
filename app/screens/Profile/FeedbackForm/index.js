import Api from 'app/api';
import ApiConstants from 'app/api/ApiConstants';
import { Container, Content, Text, Toast } from 'native-base';
import React from 'react';
import { SafeAreaView, TextInput, TouchableOpacity, View } from 'react-native';
import AnimatedLoader from 'react-native-animated-loader';
import LinearGradient from 'react-native-linear-gradient';
import styles from './styles';
import fontStyle from 'app/config/styles';
const FONT_REGULAR = fontStyle.fonts.FONT_REGULAR;
import SuccessModal from 'app/components/SuccessModal';
import AuthHeader from '../../../components/AuthHeader';
import validate from 'app/lib/validation_wrapper';
export default class FeedBackForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            msgTitle: "",
            body: "",
            isVisible: false,
            textLength: props.comment ? 500 - props.comment.length : 500,
            feedBackText: "",
            visible: false,
            feedBackError: null
        };
    }

    _submitClick = async () => {
        const feedBackError = await validate('feedBack', this.state.feedBackText);
        this.setState({
            feedBackError: feedBackError,
        })
        if (!feedBackError) {
            let data = {
                feedback: this.state.feedBackText,
            }
            this.setState({ visible: true })
            await Api(ApiConstants.FEEDBACK_FORM, data, 'post').then(res => {
                res.data.status ?
                    this.setState({
                        visible: false,
                        msgTitle: "Success",
                        body: "Thank you for your valuable feedback. We shall revert on the same within next 48 hours",
                        // body: res.data.message,
                        isVisible: true
                    })
                    :
                    this.setState({ visible: false }, () =>
                        Toast.show({
                            text: res.data.errors,
                            buttonText: "Okay",
                            duration: 3000,
                            type: "danger"
                        }));
            }).catch(err => {
                this.setState({ visible: false });
                console.log('err', err);
                Toast.show({
                    text: 'Network issue.Please try again later.',
                    buttonText: "Okay",
                    duration: 3000,
                    type: "danger"
                });
            });
        }

    }

    onClose() {
        this.setState({
            isVisible: false,
            msgTitle: '',
            body: ''
        }, () => this.props.navigation.goBack())
    }
    goBack() {
        this.props.navigation.goBack()
    }
    render() {
        return (
            <SafeAreaView style={styles.container}>
                <SuccessModal title={this.state.msgTitle} body={this.state.body} isVisible={this.state.isVisible} onClose={() => this.onClose()} backDropClose={true} swipeClose={true} />
                <AnimatedLoader
                    visible={this.state.visible}
                    overlayColor="rgba(255,255,255,0.75)"
                    animationStyle={styles.lottie}
                    speed={1}
                    source={require('app/assets/json/data.json')}
                />
                <Container>
                    <AuthHeader title={'Feedback Form'} navigateTo={() => this.goBack()} />

                    <Content>
                        {/* <View style={styles.TextInputContainer}> */}
                        <View style={{ marginHorizontal: 20, }}>
                            <Text style={styles.contentTextStyle}>
                                We value your feedback. It helps us to strive hard and improvise our app, so as to give you best user experience
                            </Text>
                            <TextInput
                                multiline
                                maxLength={500}
                                style={{
                                    top: 10,
                                    fontFamily: FONT_REGULAR,
                                    padding: 5, textAlignVertical: 'top',
                                    height: 150,
                                    borderColor: '#A1DCE4', borderWidth: 1, borderRadius: 5
                                }}
                                // style={[styles.textInputStyle, { fontFamily: "Lemonada-Bold" }]}
                                placeholderStyle={{ fontFamily: FONT_REGULAR, fontSize: 18 }}
                                placeholder={"Enter Your FeedBack"}
                                onChangeText={(text) => this.setState({ feedBackText: text, textLength: 500 - text.length, })}
                                defaultValue={this.state.comment}
                            />
                            {/* </View> */}
                            <Text style={{
                                bottom: 8,
                                marginRight: 10,
                                fontSize: 10,
                                color: '#46C1D0',
                                textAlign: 'right'
                            }}>
                                <Text style={{ fontSize: 10, color: '#000' }}>(</Text>
                                <Text style={{ fontSize: 10 }}>{this.state.textLength}/500</Text>
                                <Text style={{ fontSize: 10, color: '#000' }}>)</Text>
                            </Text>
                        </View>
                        {this.state.feedBackError ? <Text style={styles.errorText}>{this.state.feedBackError}</Text> : null}
                        <TouchableOpacity style={{ marginVertical: 30, alignItems: 'center' }} onPress={this._submitClick}>
                            <LinearGradient
                                start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                                colors={['#64B7A0', '#3992B2']} style={styles.buttonStyle}>
                                <Text style={styles.buttonTextStyle}>
                                    SUBMIT
                                </Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    </Content>
                </Container>
            </SafeAreaView>
        );
    }
}
