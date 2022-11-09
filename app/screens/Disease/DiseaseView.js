import Api from 'app/api';
import ApiConstants from 'app/api/ApiConstants';
import { AlertDialog } from "app/components/AlertDialog";
import { FixedViewAlertDialog } from "app/components/FixedViewAlertDialog";
import FloatingAction from 'app/components/FloatingAction';
//import RNImageToPdf from 'react-native-image-to-pdf';
import IconTextInput from "app/components/IconTextInput";
import ImageViewerModal from 'app/components/ImageViewerModal';
import SafeArea from 'app/components/SafeAreaView';
import SuccessModal from 'app/components/SuccessModal';
import images from 'app/config/images';
import validate from 'app/lib/validation_wrapper';
import { Container, Content, Text, Toast } from 'native-base';
import React from 'react';
import { TextInput, Alert, Dimensions, FlatList, Image, ImageBackground, Platform, ScrollView, TouchableOpacity, View, Modal } from 'react-native';
import AnimatedLoader from 'react-native-animated-loader';
import LinearGradient from 'react-native-linear-gradient';
import Pdf from 'react-native-pdf';
import Share from 'react-native-share';
import RNFetchBlob from 'rn-fetch-blob';
import styles from './styles';
import GS from "../../config/GlobalStyle";
const fs = RNFetchBlob.fs;
let imagePath = null;
import FastImage from 'react-native-fast-image';


const { width, height } = Dimensions.get("screen");
const selectTab = ['#64B7A0', '#3992B2']
const unSelectTab = ['#565656', '#565656']

const inputProps = {
    keyboardType: 'default',
    placeholder: 'email',
    autoFocus: true,
    style: {
        fontSize: 14,
        marginVertical: Platform.OS == 'ios' ? 10 : -2,
    },
};



export default class Diseases extends React.Component {
    constructor(props) {
        super(props);
        this.modalIndex = 0;
        this.state = {
            modalVisible: false,
            isDeleteFolder: false,
            isPopupMenuList: 0,
            isVisible: false,
            msgTitle: "",
            body: "",
            imagePath: '',
            isOpen: false,
            selectTab: 0,
            data: [],
            popupMenuList: [
                {
                    icon: images.disease.mail,
                    title: 'Email',
                    navigate: 'email'
                },
                {
                    icon: images.disease.email,
                    title: 'Email To Myself',
                    navigate: 'email-to-myself'
                },
                {
                    icon: images.disease.share,
                    title: 'Share',
                    navigate: 'share'
                },
                // {
                //     icon: images.disease.pdf,
                //     title: 'PDF Preview',
                //     navigate: 'pdf-preview'
                // },
                {
                    icon: images.disease.delete,
                    title: 'Delete health record',
                    navigate: 'delete'
                },
                {
                    icon: images.disease.delete,
                    title: 'Delete disease folder',
                    navigate: 'delete_folder'
                },
                {
                    icon: images.disease.edit,
                    title: 'Change folder name',
                    navigate: 'change_folder_name'
                }
            ],

            selectedImages: [],
            emailFormData: {},
            emailIDs: [],
            emailError: '',
            pdfPage: 1,
            pdfScale: 1,
            pdfNumberOfPages: 0,
            pdfSource: {},
            user_disease_id: this.props.navigation.getParam('user_disease_id', 0),
            disease_title: this.props.navigation.getParam('disease_title', 'Disease'),
            diseaseDocList: [],
            email_text: '',
            tags: "",
            text: "",
            horizontalTags: [],
            horizontalText: "",
            visible: false,
            activeTab: 0,
            imageIndex: 0,
            isImageViewerVisible: false,
            imagesList: []

        };

        this.pdf = null;
        this.imageList = [];
    }
    labelExtractor = (tag) => tag;
    onChangeTags = (tags) => {
        this.setState({ tags: tags });
    }

    onChangeText = (text) => {
        this.setState({ text: text.trim() });

        const lastTyped = text.charAt(text.length - 1);
        const parseWhen = [' ']; //',', '\n',';'

        if (parseWhen.indexOf(lastTyped) > -1) {
            setTimeout(() => {
                this.setState({
                    tags: [...this.state.tags, this.state.text.trim()],
                    text: "",
                });
            }, 0)

        }
    }
    componentDidMount(): void {
        const param = {
            doc_type: 0,
            user_disease_id: this.state.user_disease_id,

        }
        //this.props.userDiseaseDocList(param)
        this.willFocusSubscription = this.props.navigation.addListener(
            'willFocus',
            () => {
                this.props.userDiseaseDocList(param);
            }
        );
    }
    componentWillUnmount() {
        this.willFocusSubscription.remove();
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        const newProps = this.props;
        if (prevState.diseaseDocList !== newProps.diseaseDocList) {
            this.imageList = [];
            newProps.diseaseDocList.
                map((item) => {
                    this.imageList.push({
                        url: item.image_url,
                        title: 'Report Date : ' + item.report_date
                    })
                    return item
                });
            this.setState({ diseaseDocList: newProps.diseaseDocList, data: newProps.diseaseDocList })
        }

    }

    _onPressMenu = () => {
        this.menuAlert.customeAlert()
    };

    _renderItem = (index, item) => {

        let data = item;
        return (
            // onPress={() => this.props.navigation.navigate("BlogDetail", { blogDetail: data })}
            <TouchableOpacity key={data.id} onPress={() => {
                this.modalIndex = index
                this.setState({
                    imageIndex: index,
                    isImageViewerVisible: true,
                });
                console.log('this.props', this.imageList);
            }}>
                <FastImage
                    style={{
                        borderWidth: 2,
                        borderColor: "#64B7A0",
                        borderTopLeftRadius: 5,
                        borderBottomLeftRadius: 5,
                        borderTopRightRadius: 15,
                        borderBottomRightRadius: 15,
                        width: width * .25,
                        height: width * .30,
                        margin: 5
                    }}
                    resizeMode={FastImage.resizeMode.cover}
                    source={{ uri: data.image_url }}
                />
            </TouchableOpacity>
        )
    };

    _popupMenuList = (item, index) => {
        let data = item.item;

        return (
            <TouchableOpacity
                onPress={(e) => {
                    this.menuAlert.setModalVisible(false);
                    switch (data.navigate) {
                        case 'email':
                            this.state.data.length == 0 ?
                                this.setState({
                                    isPopupMenuList: 1,
                                    msgTitle: "Disease Folder is Empty",
                                    body: "Please Add Your Health Records",
                                    isVisible: true,
                                }) :
                                this.emailAlert.customeAlert();
                            break;

                        case 'email-to-myself':
                            this.state.data.length == 0 ?
                                this.setState({
                                    isPopupMenuList: 1,
                                    msgTitle: "Disease Folder is Empty",
                                    body: "Please Add Your Health Records",
                                    isVisible: true,
                                }) :
                                this.emailToSelfAlert.customeAlert();
                            break;

                        case 'share':
                            this.state.data.length == 0 ?
                                this.setState({
                                    isPopupMenuList: 1,
                                    msgTitle: "Disease Folder is Empty",
                                    body: "Please Add Your Health Records",
                                    isVisible: true,
                                }) :
                                this.shareImagesAlert.customeAlert();
                            break;

                        case 'delete':
                            this.state.data.length == 0 ?
                                this.setState({
                                    isPopupMenuList: 1,
                                    msgTitle: "Disease Folder is Empty",
                                    body: "Please Add Your Health Records",
                                    isVisible: true,
                                }) :
                                this.deleteAlert.customeAlert();
                            break;

                        case 'delete_folder':
                            Alert.alert(
                                'Are you sure you want to delete this?',
                                '',
                                [
                                    { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
                                    { text: 'Delete', onPress: () => this._submitDeleteFolder(), style: 'destructive' },
                                ],
                                { cancelable: false }
                            )
                            break;

                        case 'change_folder_name':
                            this.setState({ modalVisible: true })
                            // Alert.alert(
                            //     'Are you sure you want to change this?',
                            //     '',
                            //     [
                            //         { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
                            //         { text: 'Change', onPress: () => this._changeFolderName(), style: 'destructive' },
                            //     ],
                            //     { cancelable: false }
                            // )
                            break;
                        /*case 'pdf-preview':
                            this.pdfPreviewGeneratorAlert.customeAlert();
                            break;*/
                    }
                }}
                style={styles.mainView}>
                <View style={styles.imageContainer}>
                    <FastImage
                        style={styles.icon}
                        resizeMode={FastImage.resizeMode.center}
                        source={data.icon}
                    />
                </View>
                <Text
                    style={styles.textStyle}>
                    {data.title}
                </Text>
            </TouchableOpacity>
        )
    };

    onPress = (index) => {
        this.scroll.scrollTo({ x: index * width, y: 0, animated: true })
    };


    selectTab = async (selectTab) => {
        this.imageList = [];
        if (selectTab != 0) {
            let dt = this.state.diseaseDocList.filter((item) => item.doc_type == selectTab).
                map((item) => {
                    this.imageList.push({
                        url: item.image_url,
                        title: 'Report Date : ' + item.report_date
                    })
                    return item
                });
            this.setState({ selectTab: selectTab, data: dt })
        } else {
            this.state.diseaseDocList.
                map((item) => {
                    this.imageList.push({
                        url: item.image_url,
                        title: 'Report Date : ' + item.report_date
                    })
                    return item
                });
            this.setState({ selectTab: selectTab, data: this.state.diseaseDocList })
        }


    };

    myAsyncPDFFunction = async () => {
        try {
            const options = {
                imagePaths: ['/path/to/image1.png', '/path/to/image2.png'],
                name: 'PDFName',
                maxSize: { // optional maximum image dimension - larger images will be resized
                    width: 900,
                    height: Math.round(height / width * 900),
                },
                quality: .7, // optional compression paramter
            };
            /* const pdf = await RNImageToPdf.createPDFbyImages(options);

             console.log(pdf.filePath);*/
        } catch (e) {
            console.log(e);
        }
    };

    filterList = () => {
        return (
            <View
                style={styles.mainContainer}>
                <View style={styles.childContainer}>
                    <TouchableOpacity
                        style={{ margin: 5 }}
                        onPress={() => this.selectTab(0)}>
                        {/* onPress={() => this.setState({ selectTab: 'All' })}> */}
                        <LinearGradient
                            start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                            colors={this.state.selectTab === 0 ? selectTab : unSelectTab} style={styles.diseasesView}>
                            <Text style={styles.diseasesText}>
                                ALL
                            </Text>
                        </LinearGradient>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{ margin: 5 }}
                        // onPress={() => this.onPress(2)}>
                        onPress={() => this.selectTab(8)}>
                        <LinearGradient
                            start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                            colors={this.state.selectTab === 8 ? selectTab : unSelectTab} style={styles.diseasesView}>
                            <Text style={styles.diseasesText}>
                                Prescription
                            </Text>
                        </LinearGradient>
                    </TouchableOpacity>

                </View>
                <View style={styles.childContainer}>
                    <TouchableOpacity
                        style={{ margin: 5 }}
                        // onPress={() => this.onPress(1)}>
                        onPress={() => this.selectTab(7)}>
                        <LinearGradient
                            start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                            colors={this.state.selectTab === 7 ? selectTab : unSelectTab} style={styles.diseasesView}>
                            <Text style={styles.diseasesText}>
                                Genetic Tests
                            </Text>
                        </LinearGradient>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{ margin: 5 }}
                        // onPress={() => this.onPress(3)}>
                        onPress={() => this.selectTab(6)}>
                        <LinearGradient
                            start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                            colors={this.state.selectTab === 6 ? selectTab : unSelectTab} style={styles.diseasesView}>
                            <Text style={styles.diseasesText}>
                                Laboratory Tests
                            </Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </View>
                <View style={styles.childContainer}>
                    <TouchableOpacity
                        style={{ margin: 5 }}
                        // onPress={() => this.onPress(3)}>
                        onPress={() => this.selectTab(5)}>
                        <LinearGradient
                            start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                            colors={this.state.selectTab === 5 ? selectTab : unSelectTab} style={styles.diseasesView}>
                            <Text style={styles.diseasesText}>
                                Medical Expenses
                            </Text>
                        </LinearGradient>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={{ margin: 5 }}
                        // onPress={() => this.onPress(4)}>
                        onPress={() => this.selectTab(4)}>
                        <LinearGradient
                            start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                            colors={this.state.selectTab === 4 ? selectTab : unSelectTab} style={styles.diseasesView}>
                            <Text style={styles.diseasesText}>
                                Clinical Photograph
                            </Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </View>
                <View style={styles.childContainer}>
                    <TouchableOpacity
                        style={{ margin: 5 }}
                        // onPress={() => this.onPress(5)}>
                        onPress={() => this.selectTab(3)}>
                        <LinearGradient
                            start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                            colors={this.state.selectTab === 3 ? selectTab : unSelectTab} style={styles.diseasesView}>
                            <Text style={styles.diseasesText}>
                                Radiology & Imaging
                            </Text>
                        </LinearGradient>
                    </TouchableOpacity>
                    {/* </View>
                <View style={styles.childContainer}> */}
                    <TouchableOpacity
                        style={{ margin: 5 }}
                        // onPress={() => this.onPress(5)}>
                        onPress={() => this.selectTab(2)}>
                        <LinearGradient
                            start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                            colors={this.state.selectTab === 2 ? selectTab : unSelectTab} style={styles.diseasesView}>
                            <Text style={styles.diseasesText}>
                                Insurance Claim Data
                            </Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </View>
                <View style={styles.childContainer}>
                    <TouchableOpacity
                        style={{ margin: 5 }}
                        // onPress={() => this.onPress(5)}>
                        onPress={() => this.selectTab(1)}>
                        <LinearGradient
                            start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                            colors={this.state.selectTab === 1 ? selectTab : unSelectTab} style={styles.diseasesView}>
                            <Text style={styles.diseasesText}>
                                Hospital Discharge Papers
                            </Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </View>
            </View>
        )
    };

    _clearSelectedImages = () => {
        this.setState({ selectedImages: [], emailError: null, tags: "", text: "" });
    };

    _renderEmailPopUpItem = (item) => {
        let data = item.item;
        console.log('data', data);
        return (
            // onPress={() => this.props.navigation.navigate("BlogDetail", { blogDetail: data })}
            <TouchableOpacity
                onPress={() => {
                    var selectedImages = this.state.selectedImages;
                    if (selectedImages.includes(data.actual_url)) {
                        selectedImages = selectedImages.filter(image => image !== data.actual_url);
                        this.setState({ selectedImages: selectedImages });
                    } else {
                        selectedImages.push(data.actual_url);
                        this.setState({ selectedImages: selectedImages });
                    }
                }}
            >
                <FastImage
                    resizeMode={FastImage.resizeMode.cover}
                    source={{ uri: data.image_url }}
                    style={[
                        {
                            // flex:1,
                            width: width * .25,
                            height: width * .30,
                            margin: 5,
                            zIndex: 1
                        },
                        this.state.selectedImages.includes(data.actual_url) ? styles.selectedImage : {}
                    ]}
                />

                {this.state.selectedImages.includes(data.actual_url) &&
                    <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center', zIndex: 2 }}>
                        <FastImage
                            resizeMode={FastImage.resizeMode.center}
                            source={require('app/assets/images/take.png')}
                            style={[
                                {
                                    width: '20%',
                                    height: '20%'
                                }
                            ]}
                        />
                    </View>
                }
            </TouchableOpacity>
        )
    };

    _renderEmailPopUp = () => {
        return (
            <FixedViewAlertDialog ref={ref => (this.emailAlert = ref)} callBackFunctionOnClose={this._clearSelectedImages}>
                <View style={{ height: '100%' }}>
                    <View style={{ flexDirection: 'row', marginHorizontal: 20 }}>
                        <Text style={{ fontSize: 18 }}>Select Images</Text>
                        <TouchableOpacity style={{ position: 'absolute', right: 0 }}
                            onPress={() => this.emailAlert.setModalVisible(false)} >
                            <FastImage
                                resizeMode={FastImage.resizeMode.cover}
                                source={images.pillReminder.skip}
                                style={styles.menuButtonStyle}
                            />
                        </TouchableOpacity>
                    </View>

                    <ScrollView directionalLockEnabled={false} contentContainerStyle={{ height: "50%", margin: 5, flexGrow: 1 }}>
                        <View style={{ height: "100%", flex: 1, alignItems: "center" }}>
                            <FlatList
                                numColumns={3}
                                bounces={false}
                                style={{ backgroundColor: 'transparent' }}
                                data={this.state.data}
                                renderItem={this._renderEmailPopUpItem}
                                keyExtractor={(item, index) => index.toString()}
                            />
                        </View>
                    </ScrollView>
                    <ScrollView directionalLockEnabled={false} >
                        <View style={[{ flex: 1, paddingLeft: 5, paddingRight: 5, marginTop: 5 }]}>
                            <IconTextInput
                                ref={input => (this.email = input)}
                                placeholder={"Email"}
                                returnKeyType='done'
                                keyboardType='email-address'
                                onChangeText={(emailId) => this.setState({ tags: emailId })}
                                value={this.state.tags}
                                inputStyle={styles.input}

                                onBlur={() => {
                                    this.setState({
                                        emailError: validate('email', this.state.tags),
                                    })
                                }}
                                error={this.state.emailError}
                            />
                            {/* <TagInput
                                    value={this.state.tags}
                                    onChange={this.onChangeTags}
                                    labelExtractor={this.labelExtractor}
                                    text={this.state.text}
                                    onChangeText={this.onChangeText}
                                    tagColor="#439EAD"
                                    tagTextColor="white"
                                    inputProps={inputProps}
                                    maxHeight={75}
                                /> */}
                            {/* </View> */}
                        </View>

                        <TouchableOpacity style={{ marginTop: 10, marginBottom: 20, alignItems: 'center' }} onPress={this._submitEmailForm}>
                            <LinearGradient
                                start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                                colors={['#64B7A0', '#3992B2']} style={styles.buttonStyle}>
                                <Text style={styles.buttonTextStyle}>
                                    SUBMIT
                                </Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    </ScrollView>
                </View>
            </FixedViewAlertDialog>
        );
    };

    _submitEmailForm = async () => {
        console.log("Selected Images", this.state.selectedImages)
        const emailError = await validate('email', this.state.tags);
        this.setState({
            emailError: emailError
        })
        console.log('emailError', emailError);
        if (!emailError && this.state.selectedImages.length > 0) {
            let params = {
                email_ids: this.state.tags,
                selected_images: this.state.selectedImages.join(',')
            }
            this.setState({
                visible: true
            })
            // Call SEND MAIL method
            this.emailAlert.setModalVisible(false);
            await Api(ApiConstants.SEND_DISEASE_DOC_EMAIL, params, 'post').then(res => {
                console.log("Disease View", res);
                this.setState({
                    isPopupMenuList: 0,
                    msgTitle: "Success",
                    body: res.data.message,
                    visible: false,
                    isVisible: true,
                })

            }).catch(err => {
                console.log('err', err);
                this.setState({
                    visible: false
                })
                Toast.show({
                    text: 'Network issue.Please try again later.',
                    buttonText: "Okay",
                    duration: 3000,
                    type: "danger"
                });
                this.setState({
                    value: "test"
                });
            });


        } else if (this.state.selectedImages.length == 0) {
            Alert.alert('Please select Image')
        }
    };

    _renderEmailToSelfPopUpItem = (item) => {
        let data = item.item;
        return (
            <TouchableOpacity
                onPress={() => {
                    var selectedImages = this.state.selectedImages;
                    if (selectedImages.includes(data.actual_url)) {
                        selectedImages = selectedImages.filter(image => image !== data.actual_url);
                        this.setState({ selectedImages: selectedImages });
                    } else {
                        selectedImages.push(data.actual_url);
                        this.setState({ selectedImages: selectedImages });
                    }
                }}
            >
                <FastImage
                    resizeMode={FastImage.resizeMode.cover}
                    source={{ uri: data.image_url }}
                    style={[
                        {
                            // flex:1,
                            width: width * .25,
                            height: width * .30,
                            margin: 5,
                            zIndex: 1
                        },
                        this.state.selectedImages.includes(data.actual_url) ? styles.selectedImage : {}
                    ]}
                />
                {this.state.selectedImages.includes(data.actual_url) &&
                    <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center', zIndex: 2 }}>
                        <FastImage
                            resizeMode={FastImage.resizeMode.center}
                            source={require('../../assets/images/take.png')}
                            style={[
                                {
                                    width: '20%',
                                    height: '20%'
                                }
                            ]}
                        />
                    </View>
                }
            </TouchableOpacity>
        )
    };

    _renderEmailToSelfPopUp = () => {
        return (
            <FixedViewAlertDialog ref={ref => (this.emailToSelfAlert = ref)} callBackFunctionOnClose={this._clearSelectedImages}>
                <View style={{ height: '100%' }}>
                    <View style={{ flex: 1, marginHorizontal: 20 }}>
                        <Text style={{ fontSize: 18 }}>Select Images</Text>
                        <TouchableOpacity style={{ position: 'absolute', right: 0 }}
                            onPress={() => this.emailToSelfAlert.setModalVisible(false)} >
                            <FastImage
                                resizeMode={FastImage.resizeMode.cover}
                                source={images.pillReminder.skip}
                                style={styles.menuButtonStyle}
                            />
                        </TouchableOpacity>
                    </View>

                    <ScrollView directionalLockEnabled={false} contentContainerStyle={{ height: "70%", margin: 5, flexGrow: 1 }}>
                        <View style={{ height: "100%", flex: 1, alignItems: "center" }}>
                            <FlatList
                                numColumns={3}
                                bounces={false}
                                style={{ backgroundColor: 'transparent' }}
                                data={this.state.data}
                                renderItem={this._renderEmailToSelfPopUpItem}
                                keyExtractor={(item, index) => index.toString()}
                            />
                        </View>
                    </ScrollView>

                    <TouchableOpacity style={{ marginTop: 10, marginBottom: 20, alignItems: 'center' }} onPress={this._submitEmailToMySelfForm}>
                        <LinearGradient
                            start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                            colors={['#64B7A0', '#3992B2']} style={styles.buttonStyle}>
                            <Text style={styles.buttonTextStyle}>
                                SUBMIT
                            </Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </View>
            </FixedViewAlertDialog>
        );
    };

    _submitEmailToMySelfForm = async () => {
        if (this.state.selectedImages.length > 0) {
            let params = {
                selected_images: this.state.selectedImages.join(',')
            }
            this.emailToSelfAlert.setModalVisible(false);
            // Call SEND MAIL method
            console.log("SEND MAIL PARAMS ", params);
            this.setState({
                visible: true
            })
            await Api(ApiConstants.SEND_EMAIL_TO_MYSELF, params, 'post').then(res => {
                console.log("Result", res.data.result)
                this.setState({
                    isPopupMenuList: 0,
                    msgTitle: "Success",
                    body: res.data.message,
                    visible: false,
                    isVisible: true,
                })

            }).catch(err => {
                console.log('err', err);
                this.setState({
                    visible: false
                })
                Toast.show({
                    text: 'Network issue.Please try again later.',
                    buttonText: "Okay",
                    duration: 3000,
                    type: "danger"
                });
                this.setState({
                    value: "test"
                });
            });


        } else if (this.state.selectedImages.length == 0) {
            Alert.alert('Please select Image')
        }
    };

    _renderShareImagesPopUpItem = (item) => {
        let data = item.item;
        return (
            <TouchableOpacity
                onPress={() => {
                    var selectedImages = this.state.selectedImages;
                    if (selectedImages.includes(data.image_url)) {
                        selectedImages = selectedImages.filter(image => image !== data.image_url);
                        this.setState({ selectedImages: selectedImages });
                    } else {
                        selectedImages.push(data.image_url);
                        this.setState({ selectedImages: selectedImages });
                    }
                }}
            >

                <FastImage
                    resizeMode={FastImage.resizeMode.cover}
                    source={{ uri: data.image_url }}
                    style={[
                        {
                            // flex:1,
                            width: width * .25,
                            height: width * .30,
                            margin: 5,
                            zIndex: 1
                        },
                        this.state.selectedImages.includes(data.image_url) ? styles.selectedImage : {}
                    ]}
                />

                {this.state.selectedImages.includes(data.image_url) &&
                    <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center', zIndex: 2 }}>
                        <FastImage
                            resizeMode={FastImage.resizeMode.center}
                            source={require('../../assets/images/take.png')}
                            style={[
                                {
                                    width: '20%',
                                    height: '20%'
                                }
                            ]}
                        />
                    </View>
                }
            </TouchableOpacity>
        )
    };

    _renderShareImagesPopUp = () => {
        return (
            <FixedViewAlertDialog ref={ref => (this.shareImagesAlert = ref)} callBackFunctionOnClose={this._clearSelectedImages}>
                <View style={{ height: '100%' }}>
                    <View style={{ flex: 1 }}>
                        <Text style={{ fontSize: 18 }}>Select Images</Text>
                        <TouchableOpacity style={{ position: 'absolute', right: 10 }}
                            onPress={() => this.shareImagesAlert.setModalVisible(false)} >
                            <FastImage
                                resizeMode={FastImage.resizeMode.cover}
                                source={images.pillReminder.skip}
                                style={styles.menuButtonStyle}
                            />
                        </TouchableOpacity>
                    </View>

                    <ScrollView directionalLockEnabled={false} contentContainerStyle={{ height: "70%", margin: 5, flexGrow: 1 }}>
                        <View style={{ height: "100%", flex: 1 }}>
                            <FlatList
                                numColumns={3}
                                bounces={false}
                                style={{ backgroundColor: 'transparent' }}
                                data={this.state.data}
                                renderItem={this._renderShareImagesPopUpItem}
                                keyExtractor={(item, index) => index.toString()}
                            />
                        </View>
                    </ScrollView>

                    <TouchableOpacity style={{ marginTop: 10, marginBottom: 20, alignItems: 'center' }} onPress={this._submitShareImagesForm}>
                        <LinearGradient
                            start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                            colors={['#64B7A0', '#3992B2']} style={styles.buttonStyle}>
                            <Text style={styles.buttonTextStyle}>
                                SHARE
                            </Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </View>
            </FixedViewAlertDialog>
        );
    };

    _submitShareImagesForm = async () => {
        try {
            if (this.state.selectedImages.length > 0) {
                this.setState({
                    visible: true
                })
                let imageList = [];
                for (let i = 0; i < this.state.selectedImages.length; i++) {
                    // Loop through selected images and change api to send image with extension separately
                    await RNFetchBlob.config({
                        fileCache: true
                    }).fetch("GET", this.state.selectedImages[i])
                        // the image is now dowloaded to device's storage
                        .then(resp => {
                            // the image path you can use it directly with Image component
                            imagePath = resp.path();
                            console.log('resp', resp)
                            return resp.readFile("base64");
                        })
                        .then(async base64Data => {
                            // here's base64 encoded image
                            console.log(base64Data);
                            var shareBase64Data = `data:image/png;base64,` + base64Data
                            imageList.push(shareBase64Data)
                        });
                }
                if (imageList.length > 0) {
                    const shareOptions = {
                        title: 'Share file',
                        failOnCancel: false,
                        urls: imageList,
                    };
                    this.shareImagesAlert.setModalVisible(false);
                    const ShareResponse = await Share.open(shareOptions);
                    console.log(JSON.stringify(ShareResponse, null, 2));
                    // remove the file from storage
                    this.setState({
                        visible: false
                    })
                    return await fs.unlink(imagePath);
                }

            } else if (this.state.selectedImages.length == 0) {
                Alert.alert('Please select Image')
            }

            return false;
            console.log(this.state.selectedImages);

            if (this.state.selectedImages.length > 0) {
                this.setState({
                    visible: true
                })
                let imageList = [];
                for (let i = 0, len = this.state.selectedImages.length; i < len; i++) {
                    imageList.push(`data:image/png;base64,` + this.state.selectedImages[i]);
                }
                const shareOptions = {
                    title: 'Share file',
                    failOnCancel: false,
                    urls: imageList,
                };
                this.shareImagesAlert.setModalVisible(false);

                const ShareResponse = await Share.open(shareOptions);
                console.log(JSON.stringify(ShareResponse, null, 2));
                // remove the file from storage
                this.setState({
                    visible: false
                })
                return await fs.unlink(imageList);
            }
            return false;

        } catch (error) {
            console.log(error.message);
        }
    };

    _renderDeletePopUpItem = (item) => {
        let data = item.item;
        return (
            // onPress={() => this.props.navigation.navigate("BlogDetail", { blogDetail: data })}
            <TouchableOpacity
                onPress={() => {
                    var selectedImages = this.state.selectedImages;
                    if (selectedImages.includes(data.id)) {
                        selectedImages = selectedImages.filter(image => image !== data.id);
                        this.setState({ selectedImages: selectedImages });
                    } else {
                        selectedImages.push(data.id);
                        this.setState({ selectedImages: selectedImages });
                    }
                }}
            >
                <FastImage
                    resizeMode={FastImage.resizeMode.cover}
                    source={{ uri: data.image_url }}
                    style={[
                        {
                            // flex:1,
                            width: width * .25,
                            height: width * .30,
                            margin: 5,
                            zIndex: 1
                        },
                        this.state.selectedImages.includes(data.id) ? styles.selectedImage : {}
                    ]}
                />

                {this.state.selectedImages.includes(data.id) &&
                    <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center', zIndex: 2 }}>
                        <FastImage
                            resizeMode={FastImage.resizeMode.center}
                            source={require('../../assets/images/take.png')}
                            style={[
                                {
                                    width: '20%',
                                    height: '20%'
                                }
                            ]}
                        />
                    </View>
                }
            </TouchableOpacity>
        )
    }
    _renderDeletePopUp = () => {
        return (
            <FixedViewAlertDialog ref={ref => (this.deleteAlert = ref)} callBackFunctionOnClose={this._clearSelectedImages}>
                <View style={{ height: '100%' }}>
                    <View style={{ flex: 1, marginHorizontal: 20 }}>
                        <Text style={{ fontSize: 18 }}>Select Images</Text>
                        <TouchableOpacity style={{ position: 'absolute', right: 0 }}
                            onPress={() => this.deleteAlert.setModalVisible(false)} >
                            <FastImage
                                resizeMode={FastImage.resizeMode.cover}
                                source={images.pillReminder.skip}
                                style={styles.menuButtonStyle}
                            />
                        </TouchableOpacity>
                    </View>

                    <ScrollView directionalLockEnabled={false} contentContainerStyle={{ height: "70%", margin: 5, flexGrow: 1 }}>
                        <View style={{ height: "100%", flex: 1, alignItems: "center" }}>
                            <FlatList
                                numColumns={3}
                                bounces={false}
                                style={{ backgroundColor: 'transparent' }}
                                data={this.state.data}
                                renderItem={item => this._renderDeletePopUpItem(item)}
                                keyExtractor={(item, index) => index.toString()}
                            />
                        </View>
                    </ScrollView>

                    <TouchableOpacity style={{ marginTop: 10, marginBottom: 20, alignItems: 'center' }} onPress={this._submitDeleteForm}>
                        <LinearGradient
                            start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                            colors={['#64B7A0', '#3992B2']} style={styles.buttonStyle}>
                            <Text style={styles.buttonTextStyle}>
                                DELETE
                            </Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </View>
            </FixedViewAlertDialog>
        );
    }

    _submitDeleteForm = async () => {
        if (this.state.selectedImages.length > 0) {
            let params = {
                selected_images: this.state.selectedImages
            }
            this.deleteAlert.setModalVisible(false);
            // Call SEND MAIL method
            console.log("SEND MAIL PARAMS ", params);
            this.setState({
                visible: true
            })
            await Api(ApiConstants.DELETE_DISEASE_DOC, params, 'post').then(res => {
                console.log("Result", res.data.result)
                const param = {
                    doc_type: 0,
                    user_disease_id: this.state.user_disease_id,

                }
                this.props.userDiseaseDocList(param);
                this.setState({
                    isPopupMenuList: 0,
                    msgTitle: "Success",
                    body: res.data.message,
                    visible: false,
                    isVisible: true,
                })

            }).catch(err => {
                console.log('err', err);
                this.setState({
                    visible: false
                })
                Toast.show({
                    text: 'Network issue.Please try again later.',
                    buttonText: "Okay",
                    duration: 3000,
                    type: "danger"
                });
                this.setState({
                    value: "test"
                });
            });


        } else if (this.state.selectedImages.length == 0) {
            Alert.alert('Please select Image')
        }
    }

    _submitDeleteFolder = async () => {
        let params = {
            id: this.state.user_disease_id
        }
        this.setState({
            visible: true
        })
        await Api(ApiConstants.DELETE_DISEASE_FOLDER, params, 'post').then(res => {
            console.log("Result", res.data.result)
            this.setState({
                isPopupMenuList: 0,
                msgTitle: "Success",
                body: res.data.message,
                visible: false,
                isVisible: true,
                isDeleteFolder: true,
            })
        }).catch(err => {
            console.log('err', err);
            this.setState({
                visible: false
            })
            Toast.show({
                text: 'Network issue.Please try again later.',
                buttonText: "Okay",
                duration: 3000,
                type: "danger"
            });
            this.setState({
                value: "test"
            });
        });
    }

    _changeFolderName = async () => {
        let params = {
            disease_title: this.state.disease_title,
            id: this.state.user_disease_id
        }
        this.setState({
            modalVisible: false,
            visible: true
        })
        await Api(ApiConstants.UPDATE_DISEASE_FOLDER, params, 'post').then(res => {
            console.log("Result -->", res.data.result)
            this.setState({
                isPopupMenuList: 0,
                msgTitle: "Success",
                body: res.data.message,
                visible: false,
                isVisible: true,
            })
        }).catch(err => {
            console.log('err', err);
            this.setState({
                visible: false
            })
            Toast.show({
                text: 'Network issue.Please try again later.',
                buttonText: "Okay",
                duration: 3000,
                type: "danger"
            });
            this.setState({
                value: "test"
            });
        });
    }
    onClose() {
        this.setState({
            isVisible: false,
            msgTitle: '',
            body: '',
            isPopupMenuList: 0
        }
        )
        this.state.isDeleteFolder ? this.props.navigation.goBack() : null
        /*{
            this.state.isPopupMenuList ?
                this.setState({ isPopupMenuList: 0, isVisible: false })
                :
                this.props.navigation.goBack()
        }*/
    }

    _renderpdfPreviewGeneratorPopUpItem = (item) => {
        let data = item.item;
        return (
            <TouchableOpacity
                onPress={() => {
                    var selectedImages = this.state.selectedImages;
                    if (selectedImages.includes(data.image_url)) {
                        selectedImages = selectedImages.filter(image => image !== data.image_url);
                        this.setState({ selectedImages: selectedImages });
                    } else {
                        selectedImages.push(data.image_url);
                        this.setState({ selectedImages: selectedImages });
                    }
                }}
            >
                <FastImage
                    resizeMode={FastImage.resizeMode.cover}
                    source={{ uri: data.image_url }}
                    style={[
                        {
                            // flex:1,
                            width: width * .25,
                            height: width * .30,
                            margin: 5,
                            zIndex: 1
                        },
                        this.state.selectedImages.includes(data.image_url) ? styles.selectedImage : {}
                    ]}
                />

                {this.state.selectedImages.includes(data.image_url) &&
                    <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center', zIndex: 2 }}>
                        <FastImage
                            resizeMode={FastImage.resizeMode.center}
                            source={require('../../assets/images/take.png')}
                            style={[
                                {
                                    width: '20%',
                                    height: '20%'
                                }
                            ]}
                        />
                    </View>
                }
            </TouchableOpacity>
        )
    };

    _renderPdfPreviewGeneratorPopUp = () => {
        return (
            <FixedViewAlertDialog ref={ref => (this.pdfPreviewGeneratorAlert = ref)} callBackFunctionOnClose={this._clearSelectedImages}>
                <View style={{ height: '100%' }}>
                    <View style={{ flex: 1 }}>
                        <Text style={{ fontSize: 18 }}>Select Images</Text>
                        <TouchableOpacity style={{ position: 'absolute', right: 10 }}
                            onPress={() => this.pdfPreviewGeneratorAlert.setModalVisible(false)} >
                            <FastImage
                                resizeMode={FastImage.resizeMode.cover}
                                source={images.pillReminder.skip}
                                style={styles.menuButtonStyle}
                            />
                        </TouchableOpacity>
                    </View>

                    <ScrollView directionalLockEnabled={false} contentContainerStyle={{ height: "70%", margin: 5, flexGrow: 1 }}>
                        <View style={{ height: "100%", flex: 1 }}>
                            <FlatList
                                numColumns={3}
                                bounces={false}
                                style={{ backgroundColor: 'transparent' }}
                                data={this.state.data}
                                renderItem={this._renderpdfPreviewGeneratorPopUpItem}
                                keyExtractor={(item, index) => index.toString()}
                            />
                        </View>
                    </ScrollView>

                    <TouchableOpacity style={{ marginTop: 10, marginBottom: 20, alignItems: 'center' }} onPress={this._submitPdfPreviewGeneratorForm}>
                        <LinearGradient
                            start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                            colors={['#64B7A0', '#3992B2']} style={styles.buttonStyle}>
                            <Text style={styles.buttonTextStyle}>
                                PREVIEW PDF
                            </Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </View>
            </FixedViewAlertDialog>
        );
    };

    _submitPdfPreviewGeneratorForm = async () => {
        if (this.state.selectedImages.length > 0) {
            let params = {
                selected_images: this.state.selectedImages
            }
            for (let j = 0, len2 = this.state.selectedImages.length; j < len2; j++) {
                let dirs = RNFetchBlob.fs.dirs;
                RNFetchBlob.config({
                    // add this option that makes response data to be stored as a file,
                    // this is much more performant.
                    path: dirs.DownloadDir + "/kyt/path-to-file.png",
                    fileCache: true
                })
                    .fetch(
                        "GET",
                        this.state.selectedImages[j],
                        {
                            //some headers ..
                        }
                    )
                    .progress((received, total) => {
                        console.log("progress", received / total);
                        // this.setState({ progress: received / total });
                    })
                    .then(res => {
                        console.log('res', res);

                    });
            }
            /*this.setState({
                visible:true
            })*/

            return false;
            await Api(ApiConstants.CONVERT_IMAGE_TO_PDF, params, 'post').then(res => {
                console.log('res', res)
                this.setState({
                    visible: false
                })

            }).catch(err => {
                console.log('err', err);
                this.setState({
                    visible: false
                })
                Toast.show({
                    text: 'Network issue.Please try again later.',
                    buttonText: "Okay",
                    duration: 3000,
                    type: "danger"
                });
                this.setState({
                    value: "test"
                });
            });

            // Call GENERATE PDF method
            // Get response url and call preview method
            var responsePdfURL = "http://samples.leanpub.com/thereactnativebook-sample.pdf"; // Replace response url here
            this.state.pdfSource = {
                uri: responsePdfURL,
                cache: true
            };
            this.pdfPreviewGeneratorAlert.setModalVisible(false);
            this.pdfPreviewAlert.customeAlert();
        }
    };

    _prePage = () => {
        let prePage = this.state.pdfPage > 1 ? this.state.pdfPage - 1 : 1;
        this.setState({ pdfPage: prePage });
        console.log(`prePage: ${prePage}`);
    };

    _nextPage = () => {
        let nextPage = this.state.pdfPage + 1 > this.state.pdfNumberOfPages ? this.state.pdfNumberOfPages : this.state.pdfPage + 1;
        this.setState({ pdfPage: nextPage });
        console.log(`nextPage: ${nextPage}`);
    };

    _zoomOut = () => {
        let scale = this.state.pdfScale > 1 ? this.state.pdfScale / 1.2 : 1;
        this.setState({ pdfScale: scale });
        console.log(`zoomOut scale: ${scale}`);
    };

    _zoomIn = () => {
        let scale = this.state.pdfScale * 1.2;
        scale = scale > 3 ? 3 : scale;
        this.setState({ pdfScale: scale });
        console.log(`zoomIn scale: ${scale}`);
    };

    _clearPdfControls = () => {
        this.pdf = null;
        this.setState({
            pdfPage: 1,
            pdfScale: 1,
            pdfNumberOfPages: 0,
            pdfSource: {}
        });
    }

    _renderPreviewPdfPopUp = () => {
        return (
            <FixedViewAlertDialog ref={ref => (this.pdfPreviewAlert = ref)} callBackFunctionOnClose={this._clearPdfControls}>
                <View style={{ height: '100%' }}>
                    <View style={{ height: '80%', margin: 5, flex: 1 }}>
                        <Pdf ref={(pdf) => {
                            console.log('pdf', pdf);
                            this.pdf = pdf;
                        }}
                            source={this.state.pdfSource}
                            scale={this.state.pdfScale}
                            page={this.state.pdfPage}
                            onLoadComplete={(numberOfPages, filePath, { width, height }, tableContents) => {
                                this.setState({
                                    pdfNumberOfPages: numberOfPages
                                });
                                console.log(`total page count: ${numberOfPages}`);
                                console.log(tableContents);
                            }}
                            onError={(error) => {
                                console.log(error);
                            }}
                            style={{ flex: 1, width: '100%', padding: 5 }}
                        />
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                        <TouchableOpacity disabled={this.state.pdfPage === 1} style={this.state.pdfPage === 1 ? styles.btnDisable : styles.btn} onPress={() => this._prePage()}>
                            <Text style={styles.btnText}>{'-'}</Text>
                        </TouchableOpacity>
                        <View style={styles.btnText}><Text style={styles.btnText}>Page</Text></View>
                        <TouchableOpacity disabled={this.state.pdfPage === this.state.pdfNumberOfPages} style={this.state.pdfPage === this.state.pdfNumberOfPages ? styles.btnDisable : styles.btn} onPress={() => this._nextPage()}>
                            <Text style={styles.btnText}>{'+'}</Text>
                        </TouchableOpacity>

                        <TouchableOpacity disabled={this.state.pdfScale === 1} style={this.state.pdfScale === 1 ? styles.btnDisable : styles.btn} onPress={() => this._zoomOut()}>
                            <Text style={styles.btnText}>{'-'}</Text>
                        </TouchableOpacity>
                        <View style={styles.btnText}><Text style={styles.btnText}>Scale</Text></View>
                        <TouchableOpacity disabled={this.state.pdfScale >= 3} style={this.state.pdfScale >= 3 ? styles.btnDisable : styles.btn} onPress={() => this._zoomIn()}>
                            <Text style={styles.btnText}>{'+'}</Text>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity style={{ marginTop: 10, marginBottom: 20, alignItems: 'center' }} onPress={this._submitSharePdfForm}>
                        <LinearGradient
                            start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                            colors={['#64B7A0', '#3992B2']} style={styles.buttonStyle}>
                            <Text style={styles.buttonTextStyle}>
                                SHARE PDF
                            </Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </View>
            </FixedViewAlertDialog>
        )
    }

    _submitSharePdfForm = async () => {
        try {
            // Loop through selected images and change api to send image with extension separately
            RNFetchBlob.config({
                fileCache: true
            }).fetch("GET", this.state.pdfSource.uri)
                // the image is now dowloaded to device's storage
                .then(resp => {
                    // the image path you can use it directly with Image component
                    imagePath = resp.path();
                    console.log('resp', resp)
                    return resp.readFile("base64");
                })
                .then(async base64Data => {
                    // here's base64 encoded image
                    console.log(base64Data);
                    var shareBase64Data = `data:application/pdf;base64,` + base64Data
                    console.log(shareBase64Data);
                    const shareOptions = {
                        title: 'Share file',
                        failOnCancel: false,
                        url: shareBase64Data,
                    };

                    const ShareResponse = await Share.open(shareOptions);
                    console.log(JSON.stringify(ShareResponse, null, 2));
                    // remove the file from storage
                    return await fs.unlink(imagePath);
                });

            this.pdfPreviewAlert.setModalVisible(false);
        } catch (error) {
            console.log(error.message);
        }
    };
    dismissImageViewer = () => {
        this.setState({ isImageViewerVisible: false });
    }

    redirectToNextScreen = () => {
        console.log("Disease Information", this.state.data[this.modalIndex])
        this.setState({ isImageViewerVisible: false });
        this.props.navigation.navigate("DiseaseInformation", {
            report_data: this.state.data[this.modalIndex]
        })
    }

    onChangeImage = (index) => {
        this.modalIndex = index
    }
    closeModal = () => {
        this.setState({
            modalVisible: false,
            visible: false,
            modalData: []
        })
    }
    render() {
        const { isImageViewerVisible, imageIndex } = this.state;
        return (
            <SafeArea>

                <SuccessModal title={this.state.msgTitle} body={this.state.body} isVisible={this.state.isVisible} onClose={() => this.onClose()} backDropClose={false} swipeClose={false} />
                <AnimatedLoader
                    visible={this.state.visible}
                    overlayColor="rgba(255,255,255,0.75)"
                    animationStyle={styles.lottie}
                    speed={1}
                    source={require('app/assets/json/data.json')}
                />
                <Modal
                    animationType={"slide"}
                    visible={this.state.modalVisible}
                    transparent={true}
                    onRequestClose={() => this.closeModal()}>
                    <TouchableOpacity
                        style={styles.modalContainer}
                        activeOpacity={1}
                        onPressOut={() => { this.closeModal() }}
                    >
                        <View style={styles.modalView}>
                            {/* <Text>
                                Change Folder Name
                            </Text> */}
                            <TextInput
                                placeholder={"Change Folder Name"}
                                placeholderStyle={styles.placeholderStyle}
                                style={styles.textInputStyle}
                                returnKeyType='done'
                                onChangeText={(text) => this.setState({ disease_title: text })}
                                defaultValue={this.state.disease_title}
                            />
                            <TouchableOpacity style={{ marginVertical: 10, alignItems: 'center' }}
                                onPress={() => this._changeFolderName()}>
                                <LinearGradient
                                    start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                                    colors={['#64B7A0', '#3992B2']} style={styles.buttonStyle}>
                                    <Text style={styles.buttonTextStyle}>
                                        Change Name
                                    </Text>
                                </LinearGradient>
                            </TouchableOpacity>
                        </View>
                    </TouchableOpacity>
                </Modal>
                <ImageViewerModal
                    dismissImageViewer={this.dismissImageViewer}
                    isImageViewerVisible={isImageViewerVisible}
                    arrayImages={this.imageList}
                    imageIndex={imageIndex}
                    visibleInfoBtn={true}
                    onChange={this.onChangeImage}
                    redirectToNextScreen={this.redirectToNextScreen} />
                {this._renderEmailPopUp()}

                {this._renderEmailToSelfPopUp()}

                {this._renderShareImagesPopUp()}

                {this._renderPdfPreviewGeneratorPopUp()}

                {this._renderPreviewPdfPopUp()}
                {this._renderDeletePopUp()}

                <AlertDialog
                    ref={ref => (this.menuAlert = ref)}>
                    <FlatList
                        data={this.state.popupMenuList}
                        renderItem={this._popupMenuList}
                        // ListEmptyComponent={this._ListEmptyComponent}
                        keyExtractor={(item, index) => index.toString()}
                    />
                </AlertDialog>

                <Content >
                    <View style={GS.containerStyle}>
                        <Image source={images.disease.background} style={GS.backgroundImage} resizeMode={"contain"} />
                        <View style={GS.headerView}>
                            <TouchableOpacity style={{ flex: 0.2, left: 5 }} onPress={() => this.props.navigation.navigate("HealthRecord")}>
                                <Image source={images.disease.left_arrow} style={{ width: 20, height: 20, }} resizeMode={"cover"} />
                            </TouchableOpacity>
                            <View style={{ left: -25, flex: 0.65, alignItems: 'center', alignSelf: 'center', justifyContent: 'center' }}>
                                <Text style={GS.hederText}>
                                    {(this.state.disease_title).toUpperCase()}
                                </Text>
                            </View>
                            <TouchableOpacity style={{ position: 'absolute', flex: 0.2, right: 20 }} onPress={() => this._onPressMenu()} >
                                <Image source={images.disease.more} style={styles.menuButtonStyle} resizeMode={"cover"} />
                            </TouchableOpacity>
                        </View>
                        {/* <View style={GS.headerView}>
                            <TouchableOpacity
                                style={GS.leftArrow}
                                onPress={() => this.props.navigation.navigate("HealthRecord")}>
                                <Image source={images.disease.left_arrow} style={{ width: 20, height: 20, }} resizeMode={"cover"} />
                            </TouchableOpacity>
                            <Text style={GS.hederText}>
                                {(this.state.disease_title).toUpperCase()}
                            </Text>
                            <TouchableOpacity style={{ flex: 0.1, right: 5 }}
                                onPress={() => this._onPressMenu()} >
                                <Image source={images.disease.more} style={styles.menuButtonStyle} resizeMode={"cover"} />
                            </TouchableOpacity>
                        </View> */}
                    </View>
                    {this.state.diseaseDocList.length != 0 ?
                        this.filterList() : null
                    }
                    {this.state.data.length == 0 ?
                        <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 50 }}>
                            <Text style={{ color: "black", fontSize: 18 }}>
                                Click "+" Button To Upload Your Reports.
                            </Text>
                        </View>
                        :
                        <View style={styles.flatListView}>
                            <FlatList
                                // horizontal={true}
                                numColumns={3}
                                bounces={false}
                                style={{ backgroundColor: 'transparent', marginBottom: 5 }}
                                data={this.state.data}
                                renderItem={({ item, index }) => this._renderItem(index, item)}
                                extraData={this.state}
                                // ListEmptyComponent={this._ListEmptyComponent}
                                keyExtractor={(item, index) => index.toString()}
                            />
                        </View>
                    }
                </Content>
                {/* <View style={{ marginBottom: 30, marginLeft: 15 }}> */}
                <FloatingAction screen_name={'disease'} user_disease_id={this.state.user_disease_id} />
                {/* </View> */}
            </SafeArea>
        );
    }
}

