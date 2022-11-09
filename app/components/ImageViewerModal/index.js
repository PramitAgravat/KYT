import React, { Component } from 'react';
import { Text, TouchableOpacity, Image, StyleSheet, Modal, View } from 'react-native';
import images from 'app/config/images';
import ImageViewer from 'react-native-image-zoom-viewer';


export default class ImageViewerClass extends Component {

    constructor(props) {
        super(props);
        console.log(" constractor called......")
    }

    render() {
        return <Modal
            visible={this.props.isImageViewerVisible}
            transparent={true}
            animationType="slide"
            onRequestClose={this.props.dismissImageViewer}
        >
            <View style={{ flex: 1, backgroundColor: 'black' }}>
                <View style={{ flexDirection: 'row', alignSelf: 'flex-end', marginTop: 30 }}>
                    {this.props.visibleInfoBtn ? <TouchableOpacity
                        style={{
                            paddingHorizontal: 20,
                        }}
                        onPress={this.props.redirectToNextScreen}
                    >
                        <Image
                            style={{ width: 25, height: 25, tintColor: '#ffffff' }}
                            source={images.disease.info}
                            resizeMode="contain"
                        />
                    </TouchableOpacity>
                        : null
                    }
                    <TouchableOpacity
                        style={{
                            paddingHorizontal: 20,
                        }}
                        onPress={this.props.dismissImageViewer}
                    >
                        <Image
                            style={{ width: 25, height: 25 }}
                            source={images.disease.close}
                        />
                    </TouchableOpacity>

                </View>
                <ImageViewer
                    onCancel={this.props.dismissImageViewer}
                    imageUrls={this.props.arrayImages}
                    enablePreload={true}
                    onChange={(index) => {
                        console.log(" check index number ", index)
                        this.props.onChange(index)
                    }}
                    index={this.props.imageIndex}
                    renderIndicator={() => <View />}
                />
            </View>
        </Modal>;
    }
}

