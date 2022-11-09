import { Image, View, TouchableOpacity, ScrollView } from 'react-native';
import { Text } from 'native-base';
import React from "react";
import styles from './styles';
import fontStyle from 'app/config/styles';
const FONT_BOLD = fontStyle.fonts.FONT_BOLD;
const ImageCard = ({ data, openImageView }) => {

    return (
        <View style={styles.contentView}>
            {/* <View style={{ width: 10, backgroundColor: "#7584EA", borderTopLeftRadius: 5, borderBottomLeftRadius: 5 }} /> */}
            <View style={{ margin: 10 }}>
                <Text style={{ fontFamily: FONT_BOLD, fontSize: 15, }} numberOfLines={1}>
                    {data.name + " " + "Report"}
                </Text>
                <ScrollView style={{ flexDirection: "row", marginTop: 5 }} horizontal={true} showsHorizontalScrollIndicator={false}>
                    {
                        data.sub.map((val, key) => {
                            return <TouchableOpacity onPress={() => openImageView(val.doc_img)} style={{ justifyContent: 'center', marginLeft: 10 }} key={val.doc_type}>
                                {/* <Image source={bgIcon} style={{ height: 40, width: 40, marginLeft: 10 }} resizeMode={"contain"} /> */}
                                {/* <Image source={icon} style={{ height: 40, width: 40, marginLeft: 10 }} resizeMode={"contain"} /> */}
                                <Image source={{ uri: val.bg_icon }} style={{ height: 55, width: 55, }} resizeMode={"contain"} />
                                <Image source={{ uri: val.icon }} style={{ height: 50, width: 50, alignSelf: 'center', position: 'absolute', }} resizeMode={"contain"} />
                            </TouchableOpacity>
                        })
                    }

                    {/*<Image
                        source={images.timeline.image1}
                        style={styles.profile} resizeMode={"contain"} />
                    <Image
                        source={images.timeline.image2}
                        style={styles.profile} resizeMode={"contain"} />*/}
                </ScrollView>
            </View>
        </View>
    )
}

export default ImageCard;
