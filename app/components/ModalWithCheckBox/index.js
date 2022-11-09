import React, { Component } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import styles from './styles'
import ModalBox from 'react-native-modalbox';
import CheckBox from 'react-native-check-box';

const ModalCheckBox = ({ title, body, isVisible, onClose,backDropClose,swipeClose,isChecked ,onCheckBoxClick}) => {
    console.log("Success Modal 1", title);
    console.log("Success Modal 2", body);
    console.log("Success Modal 3", isVisible);
    return <ModalBox
        style={{ height: 250, width: "100%", backgroundColor: "#F5FCFF", borderRadius: 15 }}
        position={"center"}
        // style={{ height: 250, width: "90%", borderRadius: 15, justifyContent: 'center', alignSelf: 'center' }}
        // position={"center"}
        backdropPressToClose={backDropClose} swipeToClose={swipeClose} isOpen=
            {isVisible}>
        <View style={{flex:1,margin:10}}>
            <View style={{flex: 1,justifyContent: 'center', alignItems: 'center'}}>
                <Text style={styles.titleText}>
                    {title}
                </Text>
                <Text style={styles.contentText}>
                    {body}
                </Text>
            </View>

            <CheckBox

                onClick={()=>{
                    onCheckBoxClick(!isChecked)
                }}
                rightTextStyle={{color:'black'}}
                isChecked={isChecked}
                rightText={"Tick here if you don’t wish to see this message again"}
            />
            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                <TouchableOpacity style={{ margin: "5%", alignItems: 'center' }}
                                  onPress={() => onClose(1)}>
                    <LinearGradient
                        start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                        colors={['#64B7A0', '#3992B2']} style={styles.navigationButtonStyle}>
                        <Text style={styles.navigationButtonTextStyle}>
                            Okay
                        </Text>
                    </LinearGradient>
                </TouchableOpacity>
            </View>

        </View>
    </ModalBox>
}

export default ModalCheckBox;
