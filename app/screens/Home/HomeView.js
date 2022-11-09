import { AlertDialog } from 'app/components/AlertDialog';
import FloatingAction from 'app/components/FloatingAction';
// import YouTube, { YouTubeStandaloneIOS, YouTubeStandaloneAndroid } from 'react-native-youtube';
import ModalBox from 'app/components/ModalBox';
// import ModalBox from 'react-native-modalbox';
import SafeArea from 'app/components/SafeAreaView';
import Shimmer from 'app/components/Shimmer';
import images from 'app/config/images';
import validate from 'app/lib/validation_wrapper';
import React, { Component } from 'react';
import {
    Animated,
    DeviceEventEmitter,
    Dimensions,
    FlatList,
    Image,
    ScrollView,
    Share,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Permissions from 'react-native-permissions';
import { widthPercentageToDP } from 'react-native-responsive-screen';
import { RatingSlider } from './Components';
import styles from './styles';
import YouTube from './YouTubeModel';
import { navigateToNotification } from 'app/navigation/NavigationHelpers';
import fontStyle from 'app/config/styles';

import { Toast } from 'native-base';
import Api from 'app/api';
import ApiConstants from 'app/api/ApiConstants';
import SuccessModal from '../../components/SuccessModal';
import { AppTourView } from 'react-native-app-tour';

const { width } = Dimensions.get('screen');
const Header_Maximum_Height = width * 0.7;
const Header_Minimum_Height = 50;
const FONT_BOLD = fontStyle.fonts.FONT_BOLD;
const FONT_REGULAR = fontStyle.fonts.FONT_REGULAR;

export default class Home extends Component {
    constructor(props) {
        super(props);
        this._isMounted = false;
        this.state = {
            feeling: 3,
            messageContent:
                'Your today’s mood and symptoms have been added to your Rx timeline',
            isVisible: false,
            successTitle: 'Congratulations!',
            successBody: '',
            isVisibleSuccess: false,
            modalVisible: false,
            videoID: '',
            profile_pic: this.props.userProfile.image_url,
            ratingValue: 3,
            name: this.props.userProfile.name,
            commentError: false,
            comment: '',
            imagePath: '',
            blogVisible: false,
            videoVisible: false,
            isLoading: false,
            isRefreshing: false,
            skipBlog: 0,
            limitBlog: 20,
            skipVideo: 0,
            limitVideo: 20,
            popupProfileList: [
                {
                    icon: images.home.profile,
                    title: 'Profile 1',
                },
                {
                    icon: images.home.profile,
                    title: 'Profile 2',
                },
                {
                    icon: images.home.profile,
                    title: 'Profile 3',
                },
            ],
            popupMenuList: [
                {
                    icon: images.home.medication,
                    title: 'Medicine Reminder',
                    navigate: 'PillReminder',
                },
                {
                    icon: images.home.doctorIcon,
                    title: 'Doctors Appointment',
                    navigate: 'DoctorAppointment',
                },
                {
                    icon: images.home.shareWhite,
                    title: 'Refer A Friend',
                    navigate: 'ReferralCode',
                },
            ],
            videoList: [],
            blogList: [],
            currentVideoUrl: null,
            isReady: false,
            status: null,
            quality: null,
            error: null,
            duration: 0,
            currentTime: 0,
            fullscreen: false,
            isPlaying: true,
            isLooping: true,
        };
        this.AnimatedHeaderValue = new Animated.Value(0);
    }

    // componentWillMount() {
    //     setTimeout(() => {
    //         this.setState({
    //             blogVisible: true
    //         })
    //     }, 3000)
    // }
    unMountListener = () => {
        this._isMounted = false;
    };

    componentDidMount() {
        DeviceEventEmitter.addListener('unmount', this.unMountListener);
        this._isMounted = true;
        const { skipBlog, limitBlog, skipVideo, limitVideo } = this.state;
        const dataBlog = {
            skip: skipBlog,
            limit: limitBlog,
        };
        const dataVideo = {
            skip: skipVideo,
            limit: limitVideo,
        };
        this._isMounted && this.props.getVideoData(dataVideo);
        this._isMounted && this.props.getBlogData(dataBlog);
        this._isMounted &&
            Permissions.request('storage').then(response => {
                // Returns once the user has chosen to 'allow' or to 'not allow' access
                // Response is one of: 'authorized', 'denied', 'restricted', or 'undetermined'
                if (this._isMounted) {
                    this.setState({ storagePermission: response });
                    Permissions.request('camera').then(response => {
                        this.setState({ cameraPermission: response });
                    });
                }
            });
        this._isMounted &&
            setTimeout(async () => {
                await Api(ApiConstants.GET_USER_LOGIN_STATUS, null, 'get')
                    .then(res => {
                        if (res.data.status) {
                            this.props.updateAuth(res.data.result);
                            if (res.data.login_status) {
                                setTimeout(() => {
                                    console.log('load modla');
                                    this.setState({
                                        isVisibleSuccess: true,
                                        successBody: res.data.message,
                                    });
                                }, 5000);
                            }
                        } else {
                            Toast.show({
                                text: res.data.message,
                                buttonText: 'Okay',
                                duration: 3000,
                                type: 'danger',
                            });
                        }
                    })
                    .catch(err => {
                        console.log('err', err);
                        Toast.show({
                            text: 'NetWork Issue Try Again Letter',
                            buttonText: 'Okay',
                            duration: 3000,
                            type: 'danger',
                        });
                    });
            }, 2000);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const newProps = this.props;
        if (prevState.videoList !== newProps.videoList) {
            if (this._isMounted) {
                console.log(prevState.videoList !== newProps.videoList);
                this.setState({ videoVisible: true, videoList: newProps.videoList });
            }
        }
        console.log('newProps.blogList', this._isMounted);
        if (prevState.blogList !== newProps.blogList) {
            if (this._isMounted) {
                console.log(prevState.blogList !== newProps.blogList);
                this.setState({ blogVisible: true, blogList: newProps.blogList });
            }
        }

        /*if (prevProps.addFeelingSuccess != newProps.addFeelingSuccess) {
            console.log('DATA IS--->', this.props.addFeelingSuccess.data.result);
            this.setText(this.props.addFeelingSuccess.data.result.feeling_type);
            this.commentAlert.setModalVisible(false);
            this.setState({
                isVisible: true,
            });
        }*/
    }

    isEmptyObject(obj) {
        for (var key in obj) {
            if (obj.hasOwnProperty(key)) {
                return false;
            }
        }
        return true;
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    async setModalVisible(visible) {
        await this.setState({ modalVisible: visible });
    }

    renderModel() {
        return (
            <TouchableOpacity
                activeOpacity={1}
                onPress={() => {
                    this.setModalVisible(false);
                }}
                style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: 'rgba(0,0,0,1)',
                    width: widthPercentageToDP('100%'),
                }}>
                <YouTube
                    videoId={this.state.videoID}
                    apiKey="AIzaSyCzCc9Dmfh-Mxfn6RgfrIcSdhfxjQS-TNo"
                    isLooping={false}
                    controls={1}
                    onDismiss={() => {
                    }}
                />
            </TouchableOpacity>
        );
    }

    /*navigateToScreen(screen) {
        this.setState({isVisible: false});
        if (screen) {
            this.props.navigation.navigate('RxTimeline');
        }
    }*/

    setImage = () => {
        switch (this.state.feeling) {
            case 1:
                return (
                    <Image
                        source={images.feeling.feel_1}
                        style={{
                            width: width * 0.2,
                            height: width * 0.2,
                        }}
                        resizeMode={'cover'}
                    />
                );
                break;
            case 2:
                return (
                    <Image
                        source={images.feeling.feel_2}
                        style={{
                            width: width * 0.2,
                            height: width * 0.2,
                        }}
                        resizeMode={'cover'}
                    />
                );
                break;
            case 3:
                return (
                    <Image
                        source={images.feeling.feel_3}
                        style={{
                            width: width * 0.2,
                            height: width * 0.2,
                        }}
                        resizeMode={'cover'}
                    />
                );
                break;
            case 4:
                return (
                    <Image
                        source={images.feeling.feel_4}
                        style={{
                            width: width * 0.2,
                            height: width * 0.2,
                        }}
                        resizeMode={'cover'}
                    />
                );
                break;
            case 5:
                return (
                    <Image
                        source={images.feeling.feel_5}
                        style={{
                            width: width * 0.2,
                            height: width * 0.2,
                        }}
                        resizeMode={'cover'}
                    />
                );
                break;
        }
    };

    onClose() {
        this.setState({
            isVisibleSuccess: false,
        });
    }

    // _modalAfterHowFeel = () => {
    //     return (
    //         <ModalBox
    //             style={{
    //                 height: 250,
    //                 width: '80%',
    //                 backgroundColor: '#fff',
    //                 borderRadius: 10,
    //             }}
    //             position={'center'}
    //             backdropPressToClose={false}
    //             swipeToClose={false}
    //             isOpen={this.state.isVisible}>
    //             <View
    //                 style={{
    //                     justifyContent: 'center',
    //                     alignItems: 'center',
    //                     flex: 1,
    //                     margin: 20,
    //                 }}>
    //                 {this.setImage()}
    //                 <Text
    //                     style={{
    //                         textAlign: 'center',
    //                         color: '#46C1D0',
    //                         fontFamily: FONT_BOLD,
    //                         fontSize: 18,
    //                         top: 10,
    //                     }}>
    //                     CONGRATULATIONS
    //                 </Text>
    //                 <Text
    //                     style={{fontFamily: FONT_REGULAR, textAlign: 'center', top: 20}}>
    //                     {this.state.messageContent}
    //                 </Text>
    //                 <View
    //                     style={{
    //                         flexDirection: 'row',
    //                         justifyContent: 'center',
    //                         alignItems: 'center',
    //                         flex: 1,
    //                         top: 20,
    //                     }}>
    //                     <TouchableOpacity
    //                         style={{margin: '5%', alignItems: 'center'}}
    //                         onPress={() => this.navigateToScreen(0)}>
    //                         <LinearGradient
    //                             start={{x: 0, y: 0}}
    //                             end={{x: 1, y: 0}}
    //                             colors={['#64B7A0', '#3992B2']}
    //                             style={styles.navigationButtonStyle}>
    //                             <Text style={styles.navigationButtonTextStyle}>
    //                                 Home Screen
    //                             </Text>
    //                         </LinearGradient>
    //                     </TouchableOpacity>

    //                     <TouchableOpacity
    //                         style={{margin: '5%', alignItems: 'center'}}
    //                         onPress={() => this.navigateToScreen(1)}>
    //                         <LinearGradient
    //                             start={{x: 0, y: 0}}
    //                             end={{x: 1, y: 0}}
    //                             colors={['#64B7A0', '#3992B2']}
    //                             style={styles.navigationButtonStyle}>
    //                             <Text style={styles.navigationButtonTextStyle}>
    //                                 RX Time Line
    //                             </Text>
    //                         </LinearGradient>
    //                     </TouchableOpacity>
    //                 </View>
    //             </View>
    //         </ModalBox>
    //     );
    // };

    render() {
        console.log('Props get into Child', this.state.videoList);
        const { navigation } = this.props;
        const AnimateHeaderBackgroundColor = this.AnimatedHeaderValue.interpolate({
            inputRange: [0, Header_Maximum_Height - Header_Minimum_Height],

            outputRange: ['#009688', '#009688'],

            extrapolate: 'clamp',
        });

        const AnimateHeaderHeight = this.AnimatedHeaderValue.interpolate({
            inputRange: [0, Header_Maximum_Height - Header_Minimum_Height],

            outputRange: [Header_Maximum_Height, Header_Minimum_Height],

            extrapolate: 'clamp',
        });
        console.log('tesssss');
        if (this.state.modalVisible) {
            return this.renderModel();
        }
        return (
            <SafeArea>
                {/* <SafeAreaView style={{ flex: 1 }}> */}
                <SuccessModal
                    title={this.state.successTitle}
                    body={this.state.successBody}
                    isVisible={this.state.isVisibleSuccess}
                    onClose={() => this.onClose()}
                    backDropClose={true}
                    swipeClose={true}
                />
                {/*<ModalBox
                    firstTitle={'Home Screen'}
                    secondTitle={'RX Time Line'}
                    feeling={this.state.feeling}
                    messageContent={this.state.messageContent}
                    isVisible={this.state.isVisible}
                    onClose={screen => this.navigateToScreen(screen)}
                />*/}
                {this._alertMenu()}
                {/*{this._alertHowFeel()}*/}
                {/* {this._modalAfterHowFeel()} */}
                {/* {this._renderVideoPlayerAlert()} */}
                {this.state.modalVisible && this.renderModel()}
                <View style={styles.MainContainer}>
                    {this._renderBlogView()}
                    {this._renderVideoView({
                        AnimateHeaderHeight,
                        AnimateHeaderBackgroundColor,
                    })}
                    {this._renderFloatView()}
                </View>

                {/* <View style={{ marginTop: 40 }}>
                    <FooterTabs navigation={navigation} />
                </View> */}
            </SafeArea>
            // {/* </SafeAreaView> */ }
        );
    }

    _onPressMenu = () => {
        this.menuAlert.customeAlert();
    };

    _popupMenuList = (item, index) => {
        let data = item.item;
        console.log('Pop up Menu item', data.navigate);
        return (
            <TouchableOpacity
                onPress={() =>
                    this.props.navigation.navigate(data.navigate) &&
                    this.menuAlert.setModalVisible(false)
                }
                style={styles.mainView}>
                <View style={styles.imageContainer}>
                    <Image
                        source={images.home.roundBG}
                        style={styles.imageBG}
                        resizeMode={'center'}
                    />
                    <Image source={data.icon} style={styles.icon} resizeMode={'center'} />
                </View>
                <Text style={styles.textStyle}>{data.title}</Text>
            </TouchableOpacity>
        );
    };

    _onPressCommentBox = () => {
        this.commentAlert.customeAlert();
    };

    _renderBlogs = item => {
        let data = item.item;
        console.log(data);
        return (
            <TouchableOpacity
                onPress={() =>
                    this.props.navigation.navigate('BlogDetail', {
                        blogDetail: data,
                        transition: 'collapseTransition',
                    })
                }
                // key={index}
                style={styles.blogContainer}>
                <Shimmer
                    autoRun={true}
                    visible={this.state.blogVisible}
                    style={styles.blogImage}>
                    <Image
                        source={{ uri: data.thumb_image_url }}
                        style={styles.blogImage}
                        resizeMode={'cover'}
                    />
                </Shimmer>
                <View style={styles.blogTitleView}>
                    <Shimmer
                        autoRun={true}
                        visible={this.state.blogVisible}
                        style={styles.blogTitleText}>
                        <Text style={styles.blogTitleText} numberOfLines={2}>
                            {data.title}
                        </Text>
                    </Shimmer>

                    <View style={styles.dateAndShareIconView}>
                        <Shimmer
                            autoRun={true}
                            visible={this.state.blogVisible}
                            style={styles.dateText}>
                            <Text style={styles.dateText}>
                                {data.date}
                                {/*{Moment(data.date).format('DD-MM-YYYY')}*/}
                            </Text>
                        </Shimmer>
                        <TouchableOpacity
                            onPress={() => this.ShareMessage(data)}
                            style={styles.shareIconView}>
                            <Image
                                source={images.home.share}
                                style={styles.shareIcon}
                                resizeMode={'contain'}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
            </TouchableOpacity>
        );
    };

    _alertMenu = () => {
        return (
            <AlertDialog ref={ref => (this.menuAlert = ref)}>
                <FlatList
                    data={this.state.popupMenuList}
                    renderItem={this._popupMenuList}
                    // ListEmptyComponent={this._ListEmptyComponent}
                    keyExtractor={(item, index) => index.toString()}
                />
            </AlertDialog>
        );
    };

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

    getRatingValue = value => {
        this.setState({
            ratingValue: value,
        });
    };
    getCommentValue = value => {
        this.setState({
            comment: value,
        });
    };

    setText = value => {
        switch (value) {
            case 1:
                return this.setState({
                    feeling: 1,
                    messageContent:
                        'Your today’s mood and symptoms have been added to your Rx timeline',
                    title: 'Congratulation',
                });
                // return <Text style={styles.descriptionText}>Your today’s mood and symptoms have been added to your Rx timeline</Text>
                break;
            case 2:
                return this.setState({
                    feeling: 2,
                    messageContent:
                        'Your today’s mood and symptoms have been added to your Rx timeline',
                    title: 'Congratulation',
                });
                // return <Text style={styles.descriptionText}>Your today’s mood and symptoms have been added to your Rx timeline</Text>
                break;
            case 3:
                return this.setState({
                    feeling: 3,
                    messageContent:
                        'Your today’s mood and symptoms have been added to your Rx timeline',
                    title: 'Congratulation',
                });
                // return <Text style={styles.descriptionText}>Your today’s mood and symptoms have been added to your Rx timeline</Text>
                break;
            case 4:
                return this.setState({
                    feeling: 4,
                    messageContent:
                        'Your today’s mood and symptoms have been added to your Rx timeline',
                    title: 'Congratulation',
                });
                // return <Text style={styles.descriptionText}>Your today’s mood and symptoms have been added to your Rx timeline</Text>
                break;
            case 5:
                return this.setState({
                    feeling: 5,
                    messageContent:
                        'Your today’s mood and symptoms have been added to your Rx timeline',
                    title: 'Congratulation',
                });
                // return <Text style={styles.descriptionText}>Your today’s mood and symptoms have been added to your Rx timeline</Text>
                break;
        }
    };

    _alertHowFeel = () => {
        return (
            <AlertDialog ref={ref => (this.commentAlert = ref)}>
                <View style={styles.commentContainerView}>
                    <Text style={styles.personName}>
                        {'Welcome  ' + this.state.name + ','}
                    </Text>
                    <Text style={styles.titleText}>How are you feeling today ?</Text>
                </View>
                <View style={styles.ratingView}>
                    {
                        <RatingSlider
                            ratingValue={this.state.ratingValue}
                            getRatingValue={val => this.getRatingValue(val)}
                            getCommentValue={comment => this.getCommentValue(comment)}
                        />
                    }
                </View>
                {this.state.commentError ? (
                    <Text
                        style={{
                            fontFamily: 'Lemonada-Bold',
                            left: 10,
                            color: 'red',
                            fontSize: 14,
                            top: -30,
                        }}>
                        Enter your symptoms
                    </Text>
                ) : null}
                <TouchableOpacity
                    style={{ top: -20, marginVertical: 2, alignItems: 'center' }}
                    onPress={() => this._addFeeling()}>
                    <LinearGradient
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        colors={['#64B7A0', '#3992B2']}
                        style={styles.buttonStyle}>
                        <Text style={styles.buttonTextStyle}>SUBMIT</Text>
                    </LinearGradient>
                </TouchableOpacity>
                <Text style={styles.descriptionText}>
                    Record your daily emotions/symptoms and share it with your physician
                    on next visit, that will help him to manage your illness better.
                </Text>
            </AlertDialog>
        );
    };

    _renderVideoView = ({ AnimateHeaderHeight, AnimateHeaderBackgroundColor }) => {
        return (
            <Animated.View
                style={[
                    styles.HeaderStyle,
                    {
                        height: AnimateHeaderHeight,
                        backgroundColor: AnimateHeaderBackgroundColor,
                    },
                ]}>
                <View style={{ flexDirection: 'row', marginVertical: 10 }}>
                    <TouchableOpacity
                        onPress={() => this.props.navigation.navigate('Profile')}
                        style={{ left: -20 }}
                        key={'profile_btn'} ref={ref => {
                            if (!ref) return

                            let props = {
                                order: 1,
                                title: 'Profile',
                                description: 'Click here to manage your profile',
                                outerCircleColor: '#47A0AB'
                            }

                            this.props.addAppTourTarget &&
                                this.props.addAppTourTarget(AppTourView.for(ref, { ...props }))
                        }}
                    >
                        <Image
                            // source={images.home.profile}
                            source={{ uri: this.state.profile_pic }}
                            style={styles.profileImage}
                            resizeMode={'cover'}
                        />
                    </TouchableOpacity>
                    <View
                        style={{
                            width: '65%',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>
                        <Text style={styles.fellingTodayText}>
                            KYT - Know Your Treatment
                        </Text>
                    </View>
                    {/*<TouchableOpacity*/}
                    {/*  style={[styles.input, {width: '60%'}]}*/}
                    {/*  onPress={() => this._onPressCommentBox()}>*/}
                    {/*  <Text style={styles.fellingTodayText}>*/}
                    {/*    How are you feeling today ?*/}
                    {/*  </Text>*/}
                    {/*</TouchableOpacity>*/}
                    <TouchableOpacity
                        style={[
                            styles.moreButtonView,
                            { right: -20 },
                        ]}
                        onPress={() => navigateToNotification()}
                        key={'notification_btn'} ref={ref => {
                            if (!ref) return

                            let props = {
                                order: 2,
                                title: 'Notification',
                                description: 'Click here to manage your Notification',
                                outerCircleColor: '#47A0AB'
                            }

                            this.props.addAppTourTarget &&
                                this.props.addAppTourTarget(AppTourView.for(ref, { ...props }))
                        }}
                    // onPress={() => this._onPressMenu()}
                    >
                        <Image
                            source={images.footerTab.white_notification}
                            style={styles.menuButtonStyle}
                            resizeMode={'cover'}
                        />
                        {/* <Image source={images.home.more} style={styles.menuButtonStyle} resizeMode={"cover"} /> */}
                    </TouchableOpacity>
                </View>
                {this.state.videoList.length === 0 ? (
                    <View
                        style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
                        <Text style={{ color: 'white', fontSize: 18 }}>Uploading Video</Text>
                    </View>
                ) : (
                        <FlatList
                            showsHorizontalScrollIndicator={false}
                            horizontal={true}
                            bounces={false}
                            style={{
                                flexDirection: 'row',
                                paddingHorizontal: 5,
                                top: -5,
                            }}
                            data={this.state.videoList}
                            renderItem={this._renderVideo}
                            // ListEmptyComponent={this._ListEmptyComponent}
                            keyExtractor={(item, index) => index.toString()}
                        />
                    )}
            </Animated.View>
        );
    };

    _renderVideo = item => {
        let data = item.item;
        return (
            <View style={styles.videoContainer}>
                <TouchableOpacity

                    onPress={() =>
                        this.setState({ videoID: data.video_id }, () =>
                            this.setModalVisible(true),
                        )
                    }>
                    <Shimmer
                        autoRun={true}
                        visible={this.state.videoVisible}
                        style={styles.videoCoverImage}>
                        <Image
                            style={styles.videoCoverImage}
                            source={{ uri: data.image_url }}
                        />
                    </Shimmer>
                </TouchableOpacity>
                <View style={styles.videoDetailContainer}>
                    <View style={styles.videoTextContainer}>
                        <Shimmer
                            autoRun={true}
                            visible={this.state.videoVisible}
                            style={styles.videoTextTitle}>
                            <Text style={styles.videoTextTitle} numberOfLines={3}>
                                {data.title}
                            </Text>
                        </Shimmer>
                    </View>
                    <TouchableOpacity
                        onPress={() => this.ShareMessage(data)}
                        style={styles.shareButtonView}
                        key={'video_section'} ref={ref => {
                            if (item.index == 0) {
                                if (!ref) return

                                let props = {
                                    order: 3,
                                    title: 'Video',
                                    description: 'Share this video on social media and educate your friends about their healthcare data rights',
                                    outerCircleColor: '#47A0AB'
                                }

                                this.props.addAppTourTarget &&
                                    this.props.addAppTourTarget(AppTourView.for(ref, { ...props }))
                            }

                        }}
                    >
                        <Image
                            source={images.home.rounded_rectangle}
                            style={styles.shareButtonBG}
                            resizeMode={'contain'}
                        />
                        <Text style={styles.shareButtonText}>Share</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    };
    ShareMessage = data => {
        Share.share({
            message: data.title + "\n" + data.share_url + "\n\n" + "Download the KYT app here: " + "\nhttps://play.google.com/store/apps/details?id=com.thekyt" + "\n\nShare your health records and get monetised",
            // message: url,
        })
            .then(result => console.log(result))
            .catch(errorMsg => console.log(errorMsg));
    };
    _renderBlogView = () => {
        const { blogList, isRefreshing } = this.state;
        // blogList.length === 0 ? console.log("Blog Data Null", blogList) : console.log("Blog List DATA", blogList);

        return this.state.blogList.length === 0 ? (
            <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
                <Text style={{ color: 'black', fontSize: 18 }}>Uploading Blog</Text>
            </View>
        ) : (
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    scrollEventThrottle={16}
                    contentContainerStyle={{ paddingTop: Header_Maximum_Height }}
                    onScroll={Animated.event([
                        { nativeEvent: { contentOffset: { y: this.AnimatedHeaderValue } } },
                    ])}>
                    <Text style={styles.textView}>THE LATEST BLOGS FROM KYT</Text>
                    <FlatList
                        removeClippedSubviews
                        initialNumToRender={5}
                        showsHorizontalScrollIndicator={false}
                        horizontal={false}
                        bounces={false}
                        style={{
                            flexDirection: 'row',
                        }}
                        data={blogList}
                        renderItem={this._renderBlogs}
                        // ListEmptyComponent={this._ListEmptyComponent}
                        keyExtractor={(item, index) => index.toString()}
                    /*refreshing={isRefreshing}
                                        onRefresh={this.handleRefresh} */
                    /*onEndReached={this.handleLoadMore}
                                        onEndThreshold={0.5}
                                        extraData={this.state}*/
                    />
                </ScrollView>
            );
    };

    _renderFloatView = () => {
        return <FloatingAction screen_name={'home'} key={'float_section'} addAppTourTarget={this.props.addAppTourTarget} AppTourView={AppTourView} />;
    };

    handleRefresh = () => {
        this.setState(
            {
                seed: this.state.seed + 1,
                isRefreshing: true,
            },
            () => {
                this.props.getBlogData();
            },
        );
    };

    handleLoadMore = () => {
        //clearTimeout(st);
        setTimeout(() => {
            console.log('load more....');
            this.setState(
                {
                    skipBlog: this.state.skipBlog + this.state.limitBlog,
                },
                () => {
                    this.props.getBlogData();
                },
            );
        }, 100);
    };
}
