import React, { Component } from 'react';
import WalletView from './WalletView';
import { connect } from 'react-redux';
import * as walletActions from 'app/actions/walletActions';

class WalletContainer extends Component {
    render() {
        return <WalletView {...this.props} />;
    }
}

function mapStateToProps(state) {
    return {
        userProfile: state.authReducer.mainUser,
        walletTransactionList: state.walletReducer.walletTransactionList,
        walletBalance: state.walletReducer.walletBalance,
        pageContent: state.walletReducer.pageContent
    };
}
function mapDispatchToProps(dispatch) {
    return {
        getWalletTransactionData: (data) => dispatch(walletActions.getWalletTransactionData(data)),
        getPageContent: () => dispatch(walletActions.getPageContent())
    };
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(WalletContainer);
