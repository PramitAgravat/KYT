import images from 'app/config/images';
import { navigateToHealthRecord, navigateToHome, navigateToRxTimeline, navigateToWallet } from "app/navigation/NavigationHelpers";
import React from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
export default class FooterTabs extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <View style={{ flexDirection: 'row', position: 'absolute', bottom: 9, paddingTop: 9, backgroundColor: "#fff", borderTopColor: "#d2d2d2", borderTopWidth: 1 }}>
                <TouchableOpacity
                    onPress={() => navigateToHome()}
                    style={{ flex: 1, alignItems: 'center', marginVertical: 5 }}>
                    <View>
                        <Image
                            source={images.footerTab.home}
                            style={{ width: 25, height: 20 }}
                            resizeMode={'contain'}
                        />
                    </View>
                    {/* <Text style={{ fontSize: 10 }}>
                        Home
                    </Text> */}
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => navigateToHealthRecord()}
                    style={{ flex: 1, alignItems: 'center', marginVertical: 5 }}>
                    <View>
                        <Image
                            source={images.footerTab.heart}
                            style={{ width: 25, height: 20, }}
                            resizeMode={'contain'}
                        />
                    </View>
                    {/* <Text style={{ fontSize: 10 }}>
                        Health Record
                    </Text> */}
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => navigateToRxTimeline()}
                    style={{ flex: 1, alignItems: 'center', marginVertical: 5 }}>
                    <View>
                        <Image
                            source={images.footerTab.bar_chart}
                            style={{ width: 25, height: 20, }}
                            resizeMode={'contain'}
                        />
                    </View>
                    {/* <Text style={{ fontSize: 10 }}>
                        Rx Timeline
                    </Text> */}
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => this.props.navigation.navigate("PillReminder")}
                    style={{ flex: 1, alignItems: 'center', marginVertical: 5 }}>
                    <View>
                        <Image
                            source={images.footerTab.reminder}
                            style={{ width: 25, height: 20, }}
                            resizeMode={'contain'}
                        />
                    </View>
                    {/* <Text style={{ fontSize: 10 }}>
                        Notification
                    </Text> */}
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => navigateToWallet()}
                    style={{ flex: 1, alignItems: 'center', marginVertical: 5 }}>
                    <View>
                        <Image
                            source={images.footerTab.wallet}
                            style={{ width: 25, height: 20, }}
                            resizeMode={'contain'}
                        />
                    </View>
                    {/* <Text style={{ fontSize: 10 }}>
                        Wallet
                    </Text> */}
                </TouchableOpacity>
            </View>
        )
    }
}
