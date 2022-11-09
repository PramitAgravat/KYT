import React, { Component } from 'react';
import VideoSignInOutView from './VideoSignInOutView';
import { connect } from 'react-redux';

class VideoSignInOutContainer extends Component {
    render() {
        return <VideoSignInOutView {...this.props} />;
    }
}

function mapStateToProps(state) {
    return {

    };
}
function mapDispatchToProps(dispatch) {
    return {
    };
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(VideoSignInOutContainer);
