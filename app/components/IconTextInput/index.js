import React, { Component } from 'react';
import {
    View,
    TextInput,
    Image,
    Text
} from 'react-native';
import styles from './styles';



export default class IconTextInput extends Component {
    constructor(props) {

        super(props);

        this.state = {
            text: '',
            capitalized: 'false'
        }

    }
    render() {
        return (
             <View>
                 <View style={[styles.TextInputContainer, this.props.inputStyle,this.props.error ? styles.errorBox : null]}>
                     <TextInput
                         style={[styles.TextInputStyle, this.props.style ]}
                         underlineColorAndroid='transparent'
                         defaultValue={this.props.text}
                         onSubmitEditing={this.props.submitSubscriber}
                         {...this.props}
                         autoCapitalize={'none'}
                         ref={c => this.textInput = c}
                     />
                     <Image
                         source={this.props.iconPath}
                         style={styles.iconStyle} />

                 </View>
                 {this.props.error ? <Text style={styles.errorText}>{this.props.error}</Text> : null}
             </View>
        );
    }

}
