import React, { Component } from 'react';
import { View, Text } from 'react-native';

export default class InfoScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <View>
                <Text>
                    ABCD
                </Text>
                {/* <Text> {JSON.stringify(this.props.navigation.state.params.report_data)} </Text> */}
            </View>
        );
    }
}
