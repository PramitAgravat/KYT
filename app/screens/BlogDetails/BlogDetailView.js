import React, { Component } from 'react';
import {
    Dimensions,
    Image,
    PixelRatio,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    FlatList,
    Share,
    Platform, ScrollView
} from 'react-native';
const { width } = Dimensions.get("screen");
import images from 'app/config/images';
import { navigateToHome } from 'app/navigation/NavigationHelpers';
import HTML from 'react-native-render-html';
import SafeArea from 'app/components/SafeAreaView';
import styles from './styles';
import fontStyle from 'app/config/styles';
const FONT_BOLD = fontStyle.fonts.FONT_BOLD;
const FONT_REGULAR = fontStyle.fonts.FONT_REGULAR;
const CUSTOM_STYLES = {
    p: { fontFamily: FONT_REGULAR },
    span: { fontFamily: FONT_REGULAR },
    a: { fontFamily: FONT_REGULAR },
    ul: { fontFamily: FONT_REGULAR }
};
const DEFAULT_PROPS = {
    tagsStyles: CUSTOM_STYLES
};
const htmlContent = `
<em style="textAlign: center; font-family: Poppins;">Look at how happy this native cat is</em>    
<h1 style="textAlign: center; font-family: Poppins;">This HTML snippet is now rendered with native components !</h1>
    <h2>Enjoy a webview-free and blazing fast application</h2>
    <img src="https://i.imgur.com/dHLmxfO.jpg?2" />
    
`;
export default class BlogDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            blogDetail: this.props.navigation.getParam('blogDetail'),
        };
    }
    handlePress = () => {
        navigateToHome()
    }
    ShareMessage = (data) => {
        Share.share(
            {
                message: data.title + "\n" + data.share_url + "\n\n" + "Download the KYT app here: " + "\nhttps://play.google.com/store/apps/details?id=com.thekyt" + "\n\nShare your health records and get monetised",
                // message: data.title + "\n" + url + "\n\n" + "Download the KYT app here: " + "\nhttps://play.google.com/store/apps/details?id=com.thekyt" + "\n\nShare your health records and get monetised",
            }).then(result => console.log(result)).catch(errorMsg => console.log(errorMsg));
    }
    render() {
        const { navigation } = this.props;
        const { onScroll = () => { } } = this.props;
        return (
            <SafeArea>
                <View style={styles.header}>
                    <TouchableOpacity style={styles.leftArrow}
                        onPress={() => this.handlePress()}>
                        <Image source={images.login.left_arrow} style={styles.leftArrowImage} resizeMode={"cover"} />
                    </TouchableOpacity>
                    {/* <Text style={styles.headerTitleText} numberOfLines={1}>
                        {this.state.blogDetail.title}
                    </Text> */}
                    <TouchableOpacity style={styles.moreImageContiner} onPress={() => this.ShareMessage(this.state.blogDetail)}>
                        <Image source={images.home.shareWhite} style={styles.moreButtonStyle} resizeMode={"contain"} />
                    </TouchableOpacity>
                </View>
                {/* <AuthHeader title={'BLOGDETAIL'} navigateTo={navigateToHome} menuPress={() => this.menuPress} /> */}
                <ScrollView style={{}}>
                    <Image
                        // source={{ uri: 'https://images.pexels.com/photos/34153/pexels-photo.jpg' }}
                        source={{ uri: this.state.blogDetail.image_url }}
                        style={styles.blogImage} resizeMode={"cover"} />
                    <View style={{ margin: 10 }}>
                        <View style={{ marginVertical: 5 }}>
                            <Text style={styles.blogDetailDate}>
                                {this.state.blogDetail.date}
                                {/* {Moment(this.state.blogDetail.date).format('DD-MM-YYYY')} */}
                            </Text>
                        </View>
                        <Text style={styles.blogDetailTitle}>
                            {this.state.blogDetail.title}
                        </Text>
                        <HTML
                            {...DEFAULT_PROPS}
                            // html={htmlContent}
                            html={this.state.blogDetail.description}
                            imagesMaxWidth={width * 0.95} />
                    </View>
                </ScrollView>

            </SafeArea>
        );

    }
}
