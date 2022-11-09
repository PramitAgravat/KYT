import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    TouchableWithoutFeedback,
    TouchableOpacity,
    Dimensions,
    Text,
    Image,
    TextInput
} from 'react-native';
import Slider from '@react-native-community/slider';
import fontStyle from 'app/config/styles';
const FONT_BOLD = fontStyle.fonts.FONT_BOLD;
const FONT_REGULAR = fontStyle.fonts.FONT_REGULAR;

const { height, width } = Dimensions.get("screen");
import images from 'app/config/images';
export default class CustomSlider extends Component {

    constructor(props) {
        super(props);

        this.state = {
            textLength: props.comment ? 120 - props.comment.length : 120,
            slideValue: props.ratingValue,
            comment: props.comment ? props.comment : '',
        };
    }
    _renderImage() {
        switch (this.state.slideValue) {
            case 1:
                return (<View style={{ alignItems: "center" }}>
                    <Image source={images.feeling.feel_1} style={styles.smileyImage} resizeMode={"cover"} />
                    <Text style={styles.ratingTitle}>
                        Extremely Dissatisfied
                    </Text>
                </View>)
                break;
            case 2:
                return (<View style={{ alignItems: "center" }}>
                    <Image source={images.feeling.feel_2} style={styles.smileyImage} resizeMode={"cover"} />
                    <Text style={styles.ratingTitle}>
                        Dissatisfied
                    </Text>
                </View>)
                break;
            case 3:
                return (<View style={{ alignItems: "center" }}>
                    <Image source={images.feeling.feel_3} style={styles.smileyImage} resizeMode={"cover"} />
                    <Text style={styles.ratingTitle}>
                        Neutral
                    </Text>
                </View>)
                break;
            case 4:
                return (<View style={{ alignItems: "center" }}>
                    <Image source={images.feeling.feel_4} style={styles.smileyImage} resizeMode={"cover"} />
                    <Text style={styles.ratingTitle}>
                        Satisfied
                    </Text>
                </View>)
                break;
            case 5:
                return (<View style={{ alignItems: "center" }}>
                    <Image source={images.feeling.feel_5} style={styles.smileyImage} resizeMode={"cover"} />
                    <Text style={styles.ratingTitle}>
                        Extremely Satisfied
                    </Text>
                </View>)
                break;
            default:
                <Image source={images.feeling.feel_3} style={styles.smileyImage} resizeMode={"cover"} />
        }
    }

    render() {
        const width = Dimensions.get('window').width;
        const sliderStyle = {
            sliderDummy: {
                backgroundColor: '#119EC2',
                width: 280,
                height: 30,
                borderRadius: 50,
                position: 'absolute',
            },
            sliderReal: {
                position: 'absolute',
                // backgroundColor: '#119EC2',
                width: (this.state.slideValue / 5) * 280,
                height: 30,
            }
        }
        return (
            <View style={{ borderRadius: 50, overflow: 'hidden', marginHorizontal: 10 }}>
                <View style={{ alignItems: 'center', }}>
                    {
                        this._renderImage()
                    }
                </View>
                <View style={{ flexDirection: 'row', marginTop: 10, }}>
                    <View style={sliderStyle.sliderDummy}></View>
                    <View style={sliderStyle.sliderReal}></View>
                </View>
                <Slider
                    style={{ width: 280, height: 30, borderRadius: 50, }}
                    step={1}
                    minimumValue={1}
                    maximumValue={5}
                    value={this.state.slideValue}
                    thumbTintColor={"#fff"}
                    thumbStyle={styles.thumb}
                    onValueChange={(value) => this.setState({ slideValue: value }, () => { this.props.getRatingValue(value) })}
                    maximumTrackTintColor='transparent'
                    minimumTrackTintColor='transparent'
                />
                <View style={{ width: 280, flexDirection: 'row', top: 2 }}>
                    <Text style={styles.scaleTextStyle}>1</Text>
                    <Text style={styles.scaleTextStyle}>2</Text>
                    <Text style={styles.scaleTextStyle}>3</Text>
                    <Text style={styles.scaleTextStyle}>4</Text>
                    <Text style={styles.scaleTextStyle}>5</Text>
                </View>
                <TextInput
                    multiline
                    maxLength={120}
                    style={{
                        top: 10,
                        fontFamily: FONT_REGULAR,
                        padding: 5, textAlignVertical: 'top',
                        height: 100,
                        borderColor: '#A1DCE4', borderWidth: 1, borderRadius: 5
                    }}
                    // style={[styles.textInputStyle, { fontFamily: "Lemonada-Bold" }]}
                    placeholderStyle={{ fontFamily: FONT_REGULAR, fontSize: 18 }}
                    placeholder={"Record your symptoms / side effects"}
                    onChangeText={(text) => this.setState({ textLength: 120 - text.length, }, () => this.props.getCommentValue(text))}
                    defaultValue={this.state.comment}
                />
                <Text style={{
                    bottom: 10,
                    marginRight: 5,
                    fontSize: 10,
                    color: '#46C1D0',
                    textAlign: 'right'
                }}>
                    <Text style={{ color: '#000' }}>(</Text>
                    <Text>{this.state.textLength}/120</Text>
                    <Text style={{ color: '#000' }}>)</Text>
                    {/* ({this.state.textLength}/120) */}
                </Text>
                <View style={{ margin: 20 }} />
            </View>

        );
    }

};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    smileyImage: {
        width: width * .25,
        height: width * .25
    },
    ratingTitle: {
        fontSize: 20,
        fontFamily: FONT_REGULAR,
        marginTop: 10,
        textAlign: 'center'
    },
    scaleTextStyle: { fontFamily: 'Lemonada-Bold', flex: 1, textAlign: 'center', fontSize: 16 },
    thumb: {
        width: 80,
        height: 100,
        backgroundColor: "#000",
        borderBottomRightRadius: 100,
        borderTopRightRadius: 100,

    },
});
