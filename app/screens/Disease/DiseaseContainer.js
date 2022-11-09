import React, {Component, Fragment} from 'react';
import DiseaseView from './DiseaseView';
import { connect } from 'react-redux';
import * as diseaseDocActions from "app/actions/diseaseDocActions";
import SuccessModal from 'app/components/SuccessModal';
import * as introActions from 'app/actions/introActions';
class DiseaseContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: 'Disease Doc',
            body: 'This is where you can store your medical reports in a systematic manner. Simply click “+” select the type of report and take a picture or upload from phone gallery.',
            isVisible:this.props.isHealthDocScreenOpen
        }
    }
    onClose() {
        this.setState({
            isVisible: false
        })
        this.props.openHealthDocScreen()
    }
    render() {
        return <Fragment>
            {/* <SuccessModal title={this.state.title} body={this.state.body} isVisible={this.state.isVisible} onClose={()=>this.onClose()} backDropClose={false} swipeClose={false} /> */}
            <DiseaseView {...this.props} />
        </Fragment>;
    }
}

function mapStateToProps(state) {
    return {
        diseaseDocList : state.diseaseDocReducer.diseaseDoc,
        isHealthDocScreenOpen: state.introReducer.isHealthDocScreenOpen
    };
}
function mapDispatchToProps(dispatch) {
    return {
        userDiseaseDocList : (param) =>dispatch(diseaseDocActions.listUserDiseaseDoc(param)),
        openHealthDocScreen: () => dispatch(introActions.openHealthDocScreen())

    };
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DiseaseContainer);
