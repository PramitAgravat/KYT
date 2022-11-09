import SafeArea from 'app/components/SafeAreaView';
import images from 'app/config/images';
import { Container, Content, Text } from 'native-base';
import React from 'react';
import { FlatList, Image, ImageBackground, Platform, TouchableOpacity, View } from 'react-native';
import { AppTourView } from 'react-native-app-tour';
import GS from "../../config/GlobalStyle";
import image from '../../config/images';
import styles from './styles';


export default class HealthRecord extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            disease_symbol: images.health.disease_symbol,
            imageList: [
                images.health.cancer,
                images.health.infectious,
                images.health.allergies,
                images.health.celiac_dis,
                images.health.crohns_colitis,
            ],
            healthRecord: []
        };
    }
    componentDidMount() {
        //this.props.getDisease();
        this.willFocusSubscription = this.props.navigation.addListener(
            'willFocus',
            () => {
                this.props.getDisease();
            }
        );
    }
    componentWillUnmount() {
        this.willFocusSubscription.remove();
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        const newProps = this.props;
        if (prevState.healthRecord !== newProps.diseaseList) {
            this.setState({ healthRecord: newProps.diseaseList })
        }
    }
    addRecordView() {
        return (
            <TouchableOpacity onPress={() => this.props.navigation.navigate("AddDisease")}>
                <ImageBackground
                    source={images.health.white}
                    style={[styles.imageBackground, { alignItems: "center" }]} resizeMode={"cover"}>
                    <Image
                        source={images.health.add}
                        style={{ width: 30, height: 30, }} resizeMode={"contain"} />
                    <View style={{ flex: 0.5, marginVertical: 10, padding: 5 }}>
                        <Text style={{ fontSize: 12, color: "#3D9399" }}>Add Disease</Text>
                    </View>
                </ImageBackground>
            </TouchableOpacity>
        )
    }

    _renderItem = (data, index) => {
        console.log('dsf', data);
        return (
            <React.Fragment key={index}>
                <TouchableOpacity onPress={() => this.props.navigation.navigate("Disease", {
                    user_disease_id: data.id,
                    disease_title: data.disease_title
                })}>
                    <ImageBackground
                        source={this.state.imageList[data.key]}
                        style={[styles.imageBackground, { alignItems: "center" }]} resizeMode={"cover"}>
                        <Image
                            source={this.state.disease_symbol}
                            style={{ width: 35, height: 35, }} resizeMode={"contain"} />
                        <View style={{ flex: 0.8, marginVertical: 5, justifyContent: 'center' }}>
                            <Text style={{ fontSize: 12, color: "#fff", textAlign: 'center', textAlignVertical: 'center' }}
                                numberOfLines={3}
                            >{data.disease_title}</Text>
                        </View>
                    </ImageBackground>
                </TouchableOpacity>
            </React.Fragment>
        )
    }
    _renderFloatView = () => {
        return (
            <TouchableOpacity key={'add_btn_1'} ref={ref => {
                if (!ref) return

                let props = {
                    order: 1,
                    title: 'Add Disease',
                    description: 'Click here to create your personalised disease folders',
                    outerCircleColor: '#47A0AB'
                }

                this.props.addAppTourTarget &&
                    this.props.addAppTourTarget(AppTourView.for(ref, { ...props }))
            }}
            style={{ position: 'absolute', bottom: 10, right: 10, backgroundColor: "white", borderRadius: 50 }}

            onPress={() => this.props.navigation.navigate("AddDisease")}>
            <Image source={this.state.isOpen ? images.disease.cross_icon : images.disease.plus} style={{ width: 50, height: 50 }} resizeMode={"cover"} />

            </TouchableOpacity>
            // <FloatingAction screen_name={'home'} />
        );
    }
    render() {
        const { navigation } = this.props;
        return (
            <SafeArea>
                <View style={GS.containerStyle}>
                    <Image source={image.disease.background} style={GS.backgroundImage} resizeMode={"contain"} />
                    <View style={GS.headerView}>
                        <TouchableOpacity
                            style={GS.leftArrow}
                            onPress={() => this.props.navigation.navigate("Home")}>
                            <Image source={image.disease.left_arrow} style={{ width: 20, height: 20, }} resizeMode={"cover"} />
                        </TouchableOpacity>
                        <Text style={GS.hederText}>
                            HEALTH RECORDS
                        </Text>
                        {/* <TouchableOpacity style={{ position: 'absolute', right: 20 }}

                            onPress={() => this.props.navigation.navigate("AddDisease")}>
                            <Image source={images.pillReminder.plus} style={GS.menuButtonStyle} resizeMode={"cover"} />


                        </TouchableOpacity> */}
                    </View>
                </View>
                <Container style={{
                    flex: 1,
                    paddingTop: (Platform.OS == 'ios') ? 20 : 10
                }}>
                    <Content style={{ flex: 1, marginTop: -50 }}>
                        <View style={{ marginHorizontal: 10 }}>

                            {this.state.healthRecord.length == 0 ?
                                <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1, }}>
                                    <Text style={{ color: "black", fontSize: 18 }}>
                                        Empty Health Record
                                    </Text>
                                </View>
                                :
                                <FlatList
                                    // horizontal={true}
                                    numColumns={3}
                                    bounces={false}
                                    data={this.state.healthRecord}
                                    renderItem={({ item, index }) => this._renderItem(item, index)}
                                    keyExtractor={(item) => item.id.toString()}
                                    extraData={this.state}

                                />
                            }

                        </View>
                    </Content>
                </Container>
                {this._renderFloatView()}
                {/* <View style={{ marginTop: 40 }}>
                    <FooterTabs navigation={navigation} />
                </View> */}
            </SafeArea>
        );
    }
}

