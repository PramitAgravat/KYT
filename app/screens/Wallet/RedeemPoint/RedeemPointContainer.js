import React, { Component } from 'react';
import RedeemPoint from './RedeemPoint';
import { connect } from 'react-redux';
import * as walletActions from 'app/actions/walletActions';

class RedeemPointContainer extends Component {
    render() {
        return <RedeemPoint {...this.props} />;
    }
}

function mapStateToProps(state) {
    return {
        reedemPointData: state.walletReducer.reedemPointData,
        loader: state.globalReducer.is_visible,
    };
}
function mapDispatchToProps(dispatch) {
    return {
        redeemPoint: (data) => dispatch(walletActions.requestRedeemPoint(data))
    };
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(RedeemPointContainer);
