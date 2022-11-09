'use strict';

import React, {
    Component
} from 'react';

import {
    Text,
    TouchableOpacity,
    View,
    Image,
    SafeAreaView,
    Dimensions
} from 'react-native';
import Video from 'react-native-video';
import images from 'app/config/images';
import styles from './styles';
import LinearGradient from 'react-native-linear-gradient';
const { height, width } = Dimensions.get("window");


export default class VideoPlayer extends Component {

    state = {
        rate: 1,
        volume: 1,
        muted: false,
        resizeMode: 'cover',
        duration: 0.0,
        currentTime: 0.0,
        paused: true,
        isStarting: false,
    };

    video: Video;

    onLoad = (data) => {
        this.setState({ duration: data.duration });
    };

    onProgress = (data) => {
        this.setState({ currentTime: data.currentTime });
    };

    onEnd = () => {
        this.setState({ paused: true, isStarting: false })
        this.video.seek(0)
    };

    onAudioBecomingNoisy = () => {
        this.setState({ paused: true })
    };

    login = () => {
        this.setState({ paused: true, isStarting: false })
        !this.state.paused ? this.video.seek(0) : null
        this.props.navigation.navigate("Login")
    }

    register = () => {
        this.setState({ paused: true, isStarting: false })
        !this.state.paused ? this.video.seek(0) : null
        this.props.navigation.navigate("Register")
    }

    // onAudioFocusChanged = (event: { hasAudioFocus: boolean }) => {
    //     this.setState({ paused: !event.hasAudioFocus })
    // };

    getCurrentTimePercentage() {
        if (this.state.currentTime > 0) {
            return parseFloat(this.state.currentTime) / parseFloat(this.state.duration);
        }
        return 0;
    };

    renderRateControl(rate) {
        const isSelected = (this.state.rate === rate);

        return (
            <TouchableOpacity onPress={() => { this.setState({ rate }) }}>
                <Text style={[styles.controlOption, { fontWeight: isSelected ? 'bold' : 'normal' }]}>
                    {rate}x
                </Text>
            </TouchableOpacity>
        );
    }

    renderResizeModeControl(resizeMode) {
        const isSelected = (this.state.resizeMode === resizeMode);

        return (
            <TouchableOpacity onPress={() => { this.setState({ resizeMode }) }}>
                <Text style={[styles.controlOption, { fontWeight: isSelected ? 'bold' : 'normal' }]}>
                    {resizeMode}
                </Text>
            </TouchableOpacity>
        )
    }

    renderVolumeControl(volume) {
        const isSelected = (this.state.volume === volume);

        return (
            <TouchableOpacity onPress={() => { this.setState({ volume }) }}>
                <Text style={[styles.controlOption, { fontWeight: isSelected ? 'bold' : 'normal' }]}>
                    {volume * 100}%
                </Text>
            </TouchableOpacity>
        )
    }

    render() {
        const flexCompleted = this.getCurrentTimePercentage() * 100;
        const flexRemaining = (1 - this.getCurrentTimePercentage()) * 100;

        return (
            <SafeAreaView style={{ flex: 1 }}>
                <View style={styles.container}>
                    <Image
                        source={images.videoSignInOut.logo}
                        resizeMode={'contain'}
                        style={{ height: width * 0.2, }}
                    />
                    <Text style={styles.videoTitleText}>
                        {/* Join India’s First Healthcare Data Marketplace. Contribute towards Research for a Better Tomorrow, While Monetizing On Your Health Data */}
                        Patient Data Doesn’t Belong To {'\n'}Doctor, Hospital Or Electronic Health Record. It Belongs To The Patient.
                    </Text>
                    <TouchableOpacity
                        style={[styles.fullScreen, { width: "100%", justifyContent: 'center' }]}
                        onPress={() => this.setState({ isStarting: true, paused: !this.state.paused })}
                    >
                        {
                            !this.state.isStarting ?
                                <Image source={images.home.videoContain} style={{
                                    borderRadius: 10,
                                    height: width * 0.50,
                                    width: "90%",
                                }} resizeMode={"cover"} />
                                :
                                <Video
                                    ref={(ref: Video) => { this.video = ref }}
                                    /* For ExoPlayer */
                                    // source={{ uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny', type: 'mp4' }}
                                    source={{ uri: 'http://phpstack-302571-934272.cloudwaysapps.com/KYT_video.mp4' }}
                                    // source={{ uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4' }}
                                    style={styles.fullScreen}
                                    rate={this.state.rate}
                                    paused={this.state.paused}
                                    volume={this.state.volume}
                                    muted={this.state.muted}
                                    resizeMode={this.state.resizeMode}
                                    onLoad={this.onLoad}
                                    onProgress={this.onProgress}
                                    onEnd={this.onEnd}
                                    onAudioBecomingNoisy={this.onAudioBecomingNoisy}
                                    onAudioFocusChanged={this.onAudioFocusChanged}
                                    repeat={false}
                                />
                        }
                    </TouchableOpacity>
                    <TouchableOpacity style={{ marginVertical: 30 }} onPress={() => this.register()}>
                        <LinearGradient
                            start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                            colors={['#64B7A0', '#3992B2']} style={styles.buttonStyle}>
                            <Text style={styles.buttonTextStyle}>
                                SIGNUP AND GET REWARDS
                            </Text>
                        </LinearGradient>
                    </TouchableOpacity>
                    <Text style={styles.alredyRegistrationText}>
                        Already Registered ?
                        <Text onPress={() => this.login()} style={{ fontWeight: 'bold', fontSize: 16, color: '#3992B3' }}>
                            {" " + "Login"}
                        </Text>
                    </Text>
                </View>
            </SafeAreaView>
        );
    }
}
