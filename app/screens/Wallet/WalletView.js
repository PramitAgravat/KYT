import React, { Component } from 'react';
import {
    Dimensions,
    FlatList,
    Image,
    Modal,
    ScrollView,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
} from 'react-native';
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import SafeArea from 'app/components/SafeAreaView';
import LinearGradient from 'react-native-linear-gradient';
import { navigateToKYCVerificaiton, navigateToRedeemPoint } from 'app/navigation/NavigationHelpers';
import image from 'app/config/images';
import styles from './styles';
import SuccessModal from 'app/components/SuccessModal';
import HTML from 'react-native-render-html';
const { height, width } = Dimensions.get('screen');
const images = {
    background: image.wallet.background, // Put your own image here
};
const trophy = {
    background: image.wallet.trophy, // Put your own image here
};
const wallet = {
    background: image.wallet.wallet, // Put your own image here
};
const info = {
    background: image.wallet.info, // Put your own image here
};

export default class Wallet extends Component {
    constructor(props) {
        super(props);
        this.state = {
            is_kyc_verified: this.props.userProfile.is_kyc_verified,
            walletBalance: [],
            walletTransactionList: [],
            pageContent: '',
            skip: 0,
            limit: 10,
            modalVisible: false,
            successTitle: 'Notice',
            successBody:
                'Your Verification is under process. We will notify you once verification done.',
            isVisibleSuccess: false,
        };
        this.isDisable = false;
    }

    componentDidMount() {
        const { skip, limit } = this.state;
        const data = {
            skip: skip,
            limit: limit,
        };
        this.props.getPageContent();
        this.props.getWalletTransactionData(data);
        this.willFocusSubscription = this.props.navigation.addListener(
            'willFocus',
            () => {
                this.props.getPageContent();
                this.props.getWalletTransactionData(data);
            }
        );
    }
    componentWillUnmount() {
        this.willFocusSubscription.remove();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const newProps = this.props;
        if (prevState.walletTransactionList !== newProps.walletTransactionList) {
            console.log(
                prevState.walletTransactionList !== newProps.walletTransactionList,
            );
            this.setState({
                walletTransactionList: newProps.walletTransactionList,
            });
        }
        if (prevState.walletBalance !== newProps.walletBalance) {
            // console.log(JSON.stringify(newProps.walletBalance))
            console.log(prevState.walletBalance !== newProps.walletBalance);
            this.setState({
                walletBalance: newProps.walletBalance,
            });
        }
        if (prevState.pageContent !== newProps.pageContent) {
            console.log(prevState.pageContent !== newProps.pageContent);
            this.setState({
                pageContent: newProps.pageContent,
            });
            console.log("PAGE CONTENT --->", this.state.pageContent)
        }
    }

    _renderTransctionHistory = item => {
        let data = item.item;
        return (
            <View style={styles.contentView}>
                <Image
                    source={{ uri: data.image_url }}
                    style={styles.trophyImage}
                    resizeMode={"contain"} />
                {/* <Image
                    source={trophy.background}
                    style={styles.trophyImage}
                    resizeMode={'contain'}
                /> */}
                <View style={{ margin: 5, flex: 0.9 }}>
                    <Text style={styles.titleTextStyle}>{data.title}</Text>
                    <Text style={styles.dateTimeTextStyle}>
                        {data.date} | {data.transaction_type}
                    </Text>
                </View>
                {data.transaction_type == "DEBIT" ? <Text style={styles.amountTextStyle}>- {data.points + ''}</Text> :
                    <Text style={styles.amountTextStyle}>+ {data.points + ''}</Text>}
                {/* <Text style={styles.amountTextStyle}>+ {data.points + ''}</Text> */}
            </View>
        );
    };

    toggleModal(visible) {
        this.setState({ modalVisible: visible });
    }

    onClose(data) {
        this.setState({
            isVisibleSuccess: false,
        });
        this.isDisable = false;
    }

    isKycVerified = () => {
        console.log('ISKYCVERIFIED', this.state.is_kyc_verified);
        if (this.state.is_kyc_verified == 1) {
            this.isDisable = false;
            if (this.state.walletBalance < 1) {
                alert('Minimum Points 200');
            } else {
                navigateToRedeemPoint();
            }
        } else if (this.state.is_kyc_verified == 2) {
            this.setState({
                isVisibleSuccess: true,
            });
            this.isDisable = true;
        } else {
            this.isDisable = false;
            navigateToKYCVerificaiton();
            // this.props.navigation.navigate("KYCVerification",{points:this.state.walletBalance})
        }
    };

    content = () => {
        let data = this.state.pageContent;
        console.log("THIS.PAGE.CONTENT", data.title)
        return (
            <View>
                <Text style={styles.infoAlertTitle}>{data.title}</Text>
                <HTML
                    // {...DEFAULT_PROPS}
                    // html={htmlContent}
                    html={data.content}
                    imagesMaxWidth={width * 0.95} />
            </View>
        );
    };

    render() {
        console.log("Wallet Balance is --->", this.state.walletBalance)
        const { navigation } = this.props;
        const {
            onScroll = () => {
            },
        } = this.props;
        return (
            <SafeArea>
                <SuccessModal
                    title={this.state.successTitle}
                    body={this.state.successBody}
                    isVisible={this.state.isVisibleSuccess}
                    onClose={data => this.onClose(data)}
                    backDropClose={true}
                    swipeClose={true}
                />
                <View>
                    <Modal
                        animationType={'slide'}
                        visible={this.state.modalVisible}
                        transparent={true}
                        onRequestClose={() => this.toggleModal(!this.state.modalVisible)}>
                        <TouchableOpacity
                            style={styles.modalContainer}
                            activeOpacity={1}
                            onPressOut={() => {
                                this.toggleModal(false);
                            }}>
                            <View style={styles.modalView}>
                                <View style={{ padding: 10 }}>
                                    <ScrollView>
                                        <TouchableWithoutFeedback>
                                            {this.content()}
                                        </TouchableWithoutFeedback>
                                    </ScrollView>
                                </View>
                            </View>
                        </TouchableOpacity>
                    </Modal>
                </View>
                <ParallaxScrollView
                    onScroll={onScroll}
                    headerBackgroundColor="#000"
                    stickyHeaderHeight={STICKY_HEADER_HEIGHT}
                    parallaxHeaderHeight={PARALLAX_HEADER_HEIGHT}
                    backgroundSpeed={10}
                    renderBackground={() => (
                        <View style={{ backgroundColor: '#fff' }}>
                            <Image
                                source={images.background}
                                style={styles.background}
                                resizeMode={'contain'}
                            />
                        </View>
                    )}
                    renderForeground={() => (
                        <View key="parallax-header" style={styles.parallaxHeader}>
                            <View style={styles.headerView}>
                                <Image
                                    source={wallet.background}
                                    style={styles.walletImage}
                                    resizeMode={'contain'}
                                />
                                <Text style={[styles.hederText, { fontSize: 18 }]}>
                                    KYT Wallet Amount
                                </Text>
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={[styles.hederText, { fontSize: 16 }]}>
                                        {this.state.walletBalance + ' KYT'}
                                    </Text>
                                    <TouchableOpacity
                                        style={{
                                            left: 10,
                                            justifyContent: 'center',
                                            height: 30,
                                            width: 30,
                                        }}
                                        onPress={() => this.toggleModal(!this.state.modalVisible)}>
                                        <Image
                                            source={info.background}
                                            style={styles.infoImage}
                                            resizeMode={'contain'}
                                        />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    )}
                    renderStickyHeader={() => (
                        <View style={styles.stickyHeader}>
                            <Image style={styles.avatar} source={wallet.background} />
                            <Text style={[styles.hederText, { fontSize: 20 }]}>
                                {this.state.walletBalance + ' KYT'}
                            </Text>
                            <TouchableOpacity
                                style={{
                                    position: 'absolute',
                                    right: 10,
                                    justifyContent: 'center',
                                    height: 30,
                                    width: 30,
                                }}
                                onPress={() => this.toggleModal(!this.state.modalVisible)}>
                                <Image
                                    source={info.background}
                                    style={[styles.infoImage, { right: 10, position: 'absolute' }]}
                                    resizeMode={'contain'}
                                />
                            </TouchableOpacity>
                        </View>
                    )}>
                    <View style={styles.row}>
                        {this.state.walletTransactionList.length === 0 ?
                            <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
                                <Text style={{ color: 'black', fontSize: 18 }}>
                                    Empty Wallet
                                </Text>
                            </View> :
                            <View>
                                <Text style={styles.titleTextView}>Transaction History</Text>
                                <FlatList
                                    bounces={false}
                                    style={styles.flatListView}
                                    // data={this.state.transctionHistory}
                                    data={this.state.walletTransactionList}
                                    renderItem={this._renderTransctionHistory}
                                    keyExtractor={(item, index) => index.toString()}
                                />
                                {!this.isDisable ? (
                                    <TouchableOpacity
                                        style={{ marginVertical: 10, alignItems: 'center' }}
                                        onPress={() => this.isKycVerified()}>
                                        <LinearGradient
                                            start={{ x: 0, y: 0 }}
                                            end={{ x: 1, y: 0 }}
                                            colors={['#64B7A0', '#3992B2']}
                                            style={styles.buttonStyle}>
                                            <Text style={styles.buttonTextStyle}>REDEEM POINTS</Text>
                                        </LinearGradient>
                                    </TouchableOpacity>
                                ) : (
                                        <View style={{ marginVertical: 10, alignItems: 'center' }}>
                                            <LinearGradient
                                                start={{ x: 0, y: 0 }}
                                                end={{ x: 1, y: 0 }}
                                                colors={['#64B7A0', '#3992B2']}
                                                style={styles.buttonStyle}>
                                                <Text style={styles.buttonTextStyle}>REDEEM POINTS</Text>
                                            </LinearGradient>
                                        </View>
                                    )}
                            </View>
                        }
                    </View>
                </ParallaxScrollView>
            </SafeArea>
        );
    }
}

const PARALLAX_HEADER_HEIGHT = 220;
const STICKY_HEADER_HEIGHT = 50;
