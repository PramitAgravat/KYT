import React from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  Platform,
  TouchableOpacity,
  Text,
  ActivityIndicator,
  TouchableHighlight,
  Button,
} from 'react-native';
import YouTube from 'react-native-youtube';
import Orientation from 'react-native-orientation';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export default class YouTubeModel extends React.Component {
  //   static navigationOptions = {
  //     headerTitle: "YouTube",
  //     headerStyle: {
  //       backgroundColor: "#000",
  //     },
  //     headerTitleStyle: {
  //       color: "#fff",
  //     },
  //   };

  constructor(props) {
    super(props);
    this.state = {
      isMounted: false,
      isReady: false,
      loading: false,
      status: null,
      quality: null,
      error: null,
      isPlaying: true,
      isLooping: true,
      duration: 0,
      currentTime: 0,
      fullscreen: false,
      containerMounted: false,
      containerWidth: wp('100%'),
      signal: null,
      controls: 1,
      height: 500,
      width: 0,
    };
  }

  componentDidMount() {
    this.setState({ isMounted: true });
  }

  componentWillUnmount() {
    this.setState({ isMounted: false, isReady: false });
  }

  handleStateChange = ({ state }) => {
    console.log('loadingState', state, this.state.isReady);
    if (this.state.isReady) {
      if (state === 'started') {
        setTimeout(
          () =>
            this.setState({
              height: '100%',
              width: '98%',
              controls: 1,
              isPlaying: true,
            }),
          500,
        );
      } else if (state === 'buffering') {
        setTimeout(
          () =>
            this.setState({
              height: '100%',
              width: '97.9%',
              controls: 1,
              isPlaying: true,
            }),
          1000,
        );
      } else {
        if (Platform.OS == 'ios') return;
        setTimeout(
          () =>
            this.setState({
              height: '100%',
              width: '98%',
              controls: 1,
              isPlaying: true,
            }),
          2000,
        );
      }
    }
  };

  handleFullScreen = f => {
    if (!f.isFullscreen) {
      Orientation.lockToPortrait();
      this.setState({ fullscreen: false });
    } else {
      Orientation.lockToLandscapeLeft();
      this.setState({ fullscreen: true });
    }
  };

  renderLoading = () => {
    if (!this.state.isReady) {
      return (
        <View
          style={{ flex: 1, justifyContent: 'center', alignContent: 'center' }}>
          <ActivityIndicator size={'large'} />
        </View>
      );
    }
    return null;
  };

  render() {
    return (
      <>
        <View style={styles.container} />

        <TouchableOpacity style={styles.mainContainer} activeOpacity={1}>
          {this.renderLoading()}
          <YouTube
            apiKey={this.props.videoId}
            ref={item => (this.player = item)}
            videoId={this.props.videoId}
            controls={this.state.controls}
            fullscreen={false}
            onReady={e => this.setState({ isReady: true })}
            play={this.state.isPlaying}
            onChangeState={e => this.handleStateChange(e)}
            onChangeFullscreen={f => this.handleFullScreen(f)}
            style={{ width: this.state.width, height: this.state.height }}
          />
        </TouchableOpacity>

        <View style={styles.container} />
      </>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    bottom:0,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    height: hp('100%'),
    width: wp('100%'),
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    width: wp('100%'),
    backgroundColor: 'rgba(0,0,0,0.5)',
    // backgroundColor: 'white',
  },
});
