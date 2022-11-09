import React, { Component } from "react"
import { Text, View, TouchableOpacity, Modal, ScrollView, TouchableWithoutFeedback } from "react-native";
import styles from './styles';

class AlertDialog extends Component {

    constructor(props) {
        super(props)
        this.state = {
            modalVisible: false,
            askAlways: true,
            alertsArr: []
        }

        this.checkbox = true
        this.modalID = null
        this.checkSaveBtnIdx = null
        this.title = " "
        this.messagesView = null
        this.buttons = []
        this.invisibleTime = null
    }

    customeAlert(messagesView) {
        // const typeError = this.typeChecker(title, messagesView, buttons, " ", 0)
        // if (typeError) {
        //   console.warn("TypeError, check the alert parameter")
        //   return
        // }
        this.messagesView = messagesView
        this.openModal()
    }

    simpleAlert(title, msg, onPress = null) {
        this.messagesView = (<View>
            <View style={{ paddingBottom: 10, marginTop: 10 }}>
                <Text style={styles.msgTextStyle}>{msg}</Text>
            </View>
            <View style={{ borderBottomWidth: 1, borderBottomColor: '#434546', marginVertical: 25, width: '80%', alignSelf: 'center' }} />
            <View>
                <Text style={[styles.msgTextStyle, { color: '#355c7d' }]} onPress={() => {
                    onPress()
                    this.setModalVisible(false)
                }}>{"Ok"}</Text>
            </View>

        </View>)
        this.openModal()
    }

    openModal(alertData = null) {
        this.setModalVisible(true)
        // if (alertData == null) {
        //         this.setModalVisible(true)
        //     return
        // }
        // alertData.show ? this.setModalVisible(true) : this.buttons[this.checkSaveBtnIdx].onPress()
    }

    setModalVisible(visible, buttonIdx = null) {
        if(!visible && this.props.onClose !== undefined && this.props.onClose !== null && this.props.onClose !== '') {
            this.props.onClose();
        }

        this.setState({ modalVisible: visible })
    }

    render() {
        const { children } = this.props;
        if (!this.state.modalVisible)
            return null
        return (
            <View>
                <Modal
                    // {...this.props.modalProps}
                    visible={this.state.modalVisible}
                    transparent={true}
                    animationType="fade"
                    onRequestClose={() => {
                        this.setModalVisible(false)
                    }}
                >
                    <TouchableOpacity
                        style={styles.modalContainer}
                        activeOpacity={1}
                        onPressOut={() => {
                            this.setModalVisible(false)
                        }}
                    >
                        <ScrollView
                            directionalLockEnabled={false}
                            contentContainerStyle={styles.scrollModal}
                        >
                            <TouchableWithoutFeedback>
                                <View style={styles.modalView}>
                                    {/* {this.messagesView} */}
                                    {children ? children : this.messagesView}
                                    {/* {(this.title != "") && <Text style={styles.titleText}>
                                {this.title}
                            </Text>}
                            {this.messagesView}
                            <View style={styles.buttonContainer}>
                                {this.buttons.map((button, index) => {
                                return (
                                    <TouchableOpacity
                                    key={index}
                                    onPress={() => {
                                        button.onPress()
                                        this.setModalVisible(false, index)
                                    }}
                                    style={[styles.button,{borderLeftWidth: (index > 0 ) ? 1 : 0}]}
                                    >
                                    <Text style={{color:'#355c7d'}}>
                                        {button.text}
                                    </Text>
                                    </TouchableOpacity>
                                )
                                })}
                            </View> */}
                                </View>
                            </TouchableWithoutFeedback>
                        </ScrollView>
                    </TouchableOpacity>
                </Modal>
            </View>
        )
    }
}

export { AlertDialog };
