import React, { Component } from 'react';
import BlogDetailView from './BlogDetailView';
import { connect } from 'react-redux';
import * as blogAction from 'app/actions/blogActions';

class BlogDetailContainer extends Component {
    render() {
        return <BlogDetailView {...this.props} />;
    }
}

function mapStateToProps(state) {
    return {};
}
function mapDispatchToProps(dispatch) {
    return {};
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(BlogDetailContainer);
