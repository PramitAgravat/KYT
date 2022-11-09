import React, { Component } from 'react';
import IntroView from './IntroView';
import { connect } from 'react-redux';
import * as introActions from 'app/actions/introActions';


class IntroContainer extends Component {
    render() {
        return <IntroView {...this.props} />;
    }
}

function mapStateToProps(state) {
    return {
    };
}
function mapDispatchToProps(dispatch) {
    return {
        onIntro: () => dispatch(introActions.checkNewUser())
    };
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(IntroContainer);
