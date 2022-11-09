import React from 'react';
import { Container, Content, Text } from 'native-base';
import { Dimensions, Image, TextInput, TouchableOpacity, View, FlatList } from 'react-native';
import styles from './styles';
import { navigateToHome } from 'app/navigation/NavigationHelpers';
import image from 'app/config/images';
import AuthHeader from '../../components/AuthHeader';
import Moment from 'moment';
import SafeArea from 'app/components/SafeAreaView';

const info = {
    background: image.wallet.info, // Put your own image here
};

const trophy = {
    background: image.wallet.trophy, // Put your own image here
};

export default class Notification extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            notificationList: [],
        };
    }
    componentDidMount() {
        this.props.callGetNotification()
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        const newProps = this.props;
        if (prevState.notificationList !== newProps.notificationList) {
            this.setState({ notificationList: newProps.notificationList })
        }
    }
    renderViewMore(onPress) {
        return (
            <Text onPress={onPress}>View more</Text>
        )
    }
    renderViewLess(onPress) {
        return (
            <Text onPress={onPress}>View less</Text>
        )
    }
    renderNotification = (item) => {
        let data = item.item;
        return (
            <View style={styles.contentView}>
                <Image
                    source={{ uri: data.image_url }}
                    style={styles.trophyImage}
                    resizeMode={"contain"} />
                {/* <Image source={trophy.background} style={styles.trophyImage} resizeMode={"contain"} /> */}
                <View style={{ margin: 5, flex: 0.8, }}>
                    <Text style={styles.titleTextStyle}>
                        {(data.title)}
                        {/* {(data.title).toUpperCase()} */}
                    </Text>
                    <Text style={styles.dateTimeTextStyle} numberOfLines={3}>
                        {data.notification}
                    </Text>
                </View>
                <Text style={[styles.dateTimeTextStyle, { right: 5, }]}>
                    {Moment(data.updated_at).format('MMM DD')}
                </Text>
            </View >
        )
    }

    render() {
        return (
            <SafeArea style={styles.container}>
                <AuthHeader title={'NOTIFICATION'} navigateTo={navigateToHome} />
                <Content showsVerticalScrollIndicator={false} style={styles.mainContentView}>
                    {this.state.notificationList.length === 0 ?
                        <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1, }}>
                            <Text style={{ color: "white", fontSize: 18 }}>
                                Empty Notification List
                            </Text>
                        </View> :
                        <FlatList
                            showsVerticalScrollIndicator={false}
                            bounces={false}
                            style={{ alignSelf: 'center' }}
                            data={this.state.notificationList}
                            renderItem={this.renderNotification}
                            keyExtractor={(item, index) => index.toString()}
                        />
                    }
                </Content>
            </SafeArea>
        );
    }
}
