import React from 'react';
import { Image, SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import Wave from 'react-native-waveview';
import images from 'app/config/images';
import styles from './styles';
import FastImage from 'react-native-fast-image';

const slides = [
    {
        title: 'Easily upload and store your health records in a systematic fashion',
        key: 'first',
        image: images.intro.first,
    },
    {
        title: 'Create your treatment timeline and keep a track of your health',
        key: 'second',
        image: images.intro.second,
    }, {
        title: 'Share your medical data with research and pharmaceutical companies for a better tomorrow',
        key: 'third',
        image: images.intro.third,
    }, {
        title: 'Receive direct monetary \n benefits by being the part of this novel data sharing initiative',
        key: 'fourth',
        image: images.intro.fourth,
    },
];
console.log('slide', slides)
export default class IntroView extends React.PureComponent {
    constructor(props) {
        super(props);

    }

    _renderItem = (item) => {
        console.log('item', item);
        return (
            <View style={{ flex: 0.6, justifyContent: 'center', }}>
                <Text style={styles.title} ellipsizeMode='head' >{item.title}</Text>
                <FastImage
                    style={styles.intoScreenImage}
                    resizeMode={FastImage.resizeMode.contain}
                    source={item.image}
                />
            </View>
        );
    }
    _renderNextButton = () => {
        return (
            <TouchableOpacity
                onPress={this.onPress}
                style={styles.buttonView}>
                <FastImage
                    style={styles.buttonImage}
                    resizeMode={FastImage.resizeMode.cover}
                    source={images.intro.bg}
                />
                <Text style={styles.buttonText}>
                    SKIP
                </Text>
            </TouchableOpacity>
        );
    }
    _renderDoneButton = () => {
        return (
            <TouchableOpacity
                onPress={this.onPress}
                style={styles.buttonView}>
                <FastImage
                    style={styles.buttonImage}
                    resizeMode={FastImage.resizeMode.cover}
                    source={images.intro.bg}
                />
                <Text style={styles.buttonText}>
                    DONE
                </Text>
            </TouchableOpacity>
        );
    }
    render() {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.waveContainer}>
                    <Wave
                        ref={ref => this._waveRect = ref}
                        style={styles.wave}
                        H={80}
                        waveParams={[
                            { A: 20, T: 800, fill: '#5EB9AA' },
                        ]}
                        speed={9000}
                        animated={true}
                    />
                </View>
                <View style={{ justifyContent: 'center', flex: 1 }}>
                    <AppIntroSlider
                        dotStyle={{ backgroundColor: "#000" }}
                        activeDotStyle={{ backgroundColor: "#5EB9AA" }}
                        bottomButton
                        renderItem={this._renderItem}
                        slides={slides}
                        renderNextButton={this._renderNextButton}
                        renderDoneButton={this._renderDoneButton}
                    />
                </View>
            </SafeAreaView>
        );
    }

    onPress = () => {
        this.props.onIntro();

    }


}

