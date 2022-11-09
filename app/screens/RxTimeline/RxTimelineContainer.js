import React, { Component } from 'react';
import RxTimelineView from './RxTimelineView';
import { connect } from 'react-redux';

class RxTimelineContainer extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <RxTimelineView {...this.props} />;
    }
}

function mapStateToProps(state) {
    return {
        diseaseList: state.healthRecordReducer.diseaseList,
        userProfile: state.authReducer.mainUser,
    };
}
function mapDispatchToProps(dispatch) {
    return {

    };
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(RxTimelineContainer);
