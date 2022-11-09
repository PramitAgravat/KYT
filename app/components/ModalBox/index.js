import React, { Component } from 'react';
import { Text, TouchableOpacity, Image, StyleSheet, Modal, View, Dimensions } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import styles from './styles'
import ModalBox from 'react-native-modalbox';
import fontStyle from 'app/config/styles';
const FONT_BOLD = fontStyle.fonts.FONT_BOLD;
const FONT_REGULAR = fontStyle.fonts.FONT_REGULAR;
import images from 'app/config/images';
const { width } = Dimensions.get("screen");
const ModalBoxClass = ({ firstTitle, secondTitle, feeling, messageContent, isVisible, onClose }) => {
    console.log('visible', isVisible);
    const setImage = () => {
        switch (feeling) {
            case 1:
                return <Image source={images.feeling.feel_1} style={{
                    width: width * .20,
                    height: width * .20
                }} resizeMode={"cover"} />
                break;
            case 2:
                return <Image source={images.feeling.feel_2} style={{
                    width: width * .20,
                    height: width * .20
                }} resizeMode={"cover"} />
                break;
            case 3:
                return <Image source={images.feeling.feel_3} style={{
                    width: width * .20,
                    height: width * .20
                }} resizeMode={"cover"} />
                break;
            case 4:
                return <Image source={images.feeling.feel_4} style={{
                    width: width * .20,
                    height: width * .20
                }} resizeMode={"cover"} />
                break;
            case 5:
                return <Image source={images.feeling.feel_5} style={{
                    width: width * .20,
                    height: width * .20
                }} resizeMode={"cover"} />
                break;
        }
    }
    return <ModalBox
        style={{ height: 250, width: "80%", backgroundColor: "#fff", borderRadius: 10 }}
        position={"center"}
        backdropPressToClose={false} swipeToClose={false} isOpen={isVisible}>
        <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1, margin: 20 }}>
            {setImage()}
            {/* <Text style={{ textAlign: 'center', color: "#46C1D0", fontFamily: FONT_BOLD, fontSize: 18, top: 10 }}>
                CONGRATULATIONS
            </Text> */}
            <Text style={{ fontFamily: FONT_REGULAR, textAlign: 'center', top: 20 }}>
                {messageContent}
            </Text>
            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', flex: 1, top: 20 }}>
                <TouchableOpacity style={{ margin: "5%", alignItems: 'center' }}
                    onPress={() => onClose(0)}>
                    <LinearGradient
                        start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                        colors={['#64B7A0', '#3992B2']} style={styles.navigationButtonStyle}>
                        <Text style={styles.navigationButtonTextStyle}>
                            OKAY
                        </Text>
                    </LinearGradient>
                </TouchableOpacity>

                {/* <TouchableOpacity style={{ margin: "5%", alignItems: 'center' }}
                    onPress={() => onClose(1)}>
                    <LinearGradient
                        start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                        colors={['#64B7A0', '#3992B2']} style={styles.navigationButtonStyle}>
                        <Text style={styles.navigationButtonTextStyle}>
                            {secondTitle}
                        </Text>
                    </LinearGradient>
                </TouchableOpacity> */}
            </View>
        </View>
    </ModalBox>
}
// const ModalBoxClass = ({ firstTitle, secondTitle, messageContent, isVisible, onClose }) => {
//     console.log('visible', isVisible);
//     return <ModalBox
//         style={{ height: 150, width: "80%", backgroundColor: "#fff", borderRadius: 15 }}
//         position={"center"}
//         backdropPressToClose={false} swipeToClose={false} isOpen=
//         {isVisible}>
//         <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1, top: 20 }}>
//             <Text style={{ textAlign: 'center' }}>
//                 {/* {"Your today’s mood and symptoms have been added to your Rx timeline"} */}
//                 {messageContent}
//             </Text>
//             <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', flex: 1 }}>
//                 <TouchableOpacity style={{ margin: "5%", alignItems: 'center' }}
//                     onPress={() => onClose(0)}>
//                     <LinearGradient
//                         start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
//                         colors={['#64B7A0', '#3992B2']} style={styles.navigationButtonStyle}>
//                         <Text style={styles.navigationButtonTextStyle}>
//                             {firstTitle}
//                         </Text>
//                     </LinearGradient>
//                 </TouchableOpacity>

//                 <TouchableOpacity style={{ margin: "5%", alignItems: 'center' }}
//                     onPress={() => onClose(1)}>
//                     <LinearGradient
//                         start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
//                         colors={['#64B7A0', '#3992B2']} style={styles.navigationButtonStyle}>
//                         <Text style={styles.navigationButtonTextStyle}>
//                             {secondTitle}
//                         </Text>
//                     </LinearGradient>
//                 </TouchableOpacity>
//             </View>
//         </View>
//     </ModalBox>
// }
export default ModalBoxClass;
