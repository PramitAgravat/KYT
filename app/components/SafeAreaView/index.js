import { DeviceEventEmitter } from 'react-native'
import React, { Component } from 'react'
import { Container } from 'native-base';
import { SafeAreaView } from 'react-native';
import styles from "./styles";
import SuccessModal from 'app/components/SuccessModal';

export default class SafeArea extends Component {
    constructor(props) {
        super(props);
        /*this.state = {
            isVisible: false,
            title: '',
            body: ''
        }*/
        this.isVisible = false;
        this.title = '';
        this.body ='';
    }
    componentDidMount () {
        console.log(['Backpack', 'Base.componentDidMount'])
        DeviceEventEmitter.addListener('message', this.messageListener)
      //  DeviceEventEmitter.addListener('new_notification', this.onNotification)

    }

    componentWillUnmount () {
        console.log(['Backpack', 'Base.componentWillUnmount'])
        DeviceEventEmitter.removeListener('message', this.messageListener)

    }

    messageListener = (data) => {
        console.log(['Backpack', 'Base.messageListener', data])

    }
    onClose() {
        /*this.setState({
            isVisible: false,
            title: '',
            body: ''
        })*/
        this.isVisible = false;
        this.title = '';
        this.body ='';
        this.forceUpdate();
    }
    onNotification = (data)=>{
        setTimeout(()=>{
            /*this.setState({
                title: data.title,
                body: data.body,
                isVisible: true
            })*/
            this.isVisible = true;
            this.title = data.title;
            this.body =data.body;
            this.forceUpdate()
        },1000)

    }
    render () {
        return (
            <SafeAreaView style={[styles.container, this.props.style]}>
                <Container style={{
                    flex: 1,
                    // paddingTop: (Platform.OS == 'ios') ? 20 : 0
                }}>
                    <SuccessModal title={this.title} body={this.body} backDropClose={true} swipeClose={true} isVisible={this.isVisible} onClose={()=>this.onClose()} />
                    {
                        this.props.children
                    }
                </Container>
            </SafeAreaView>
        )
    }
}
