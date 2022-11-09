import React, {
    Component,
} from 'react';

import {
    LayoutAnimation,
    UIManager,
    View
} from 'react-native';

import FoldView from 'react-native-foldview';
import DoctorDetailHead from './Components/DoctorAppointmentCard/DoctorDetailHead';
import DoctorDetailBody from './Components/DoctorAppointmentCard/DoctorDetailBody';
import { DoctorCard } from "./Components";
if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
}
import { navigateToRxTimeline } from "app/navigation/NavigationHelpers";
import HowFeelDetailBody from './Components/HowFeelCard/HowFeelDetailBody';
const ROW_HEIGHT = 100;

const Spacer = ({ height }) => (
    <View
        pointerEvents="none"
        style={{
            height,
        }}
    />
);

export default class DoctorView extends Component {

    constructor(props) {
        super(props);

        this.state = {
            expanded: false,
            height: ROW_HEIGHT,
        };
    }

    componentWillMount() {
        this.flip = this.flip.bind(this);
        this.handleAnimationStart = this.handleAnimationStart.bind(this);
        this.renderFrontface = this.renderFrontface.bind(this);
        this.renderBackface = this.renderBackface.bind(this);
    }

    flip() {
        this.setState({
            expanded: !this.state.expanded,
        });
    }

    handleAnimationStart(duration, height) {
        const isExpanding = this.state.expanded;

        const animationConfig = {
            duration,
            update: {
                type: isExpanding ? LayoutAnimation.Types.easeOut : LayoutAnimation.Types.easeIn,
                property: LayoutAnimation.Properties.height,
            },
        };

        LayoutAnimation.configureNext(animationConfig);

        this.setState({
            height,
        });
    }

    renderFrontface() {
        if(!this.state.expanded) {
            return (
                <DoctorCard onPress={this.flip} data={this.props.data}/>
            );
        }else{
            return null;
        }
    }

    renderBackface() {
        return (
            <DoctorDetailBody onDelete={(data)=> this.onDelete(data)} onPress={(val,data) => this.handlePress(val,data)} data={this.props.data}  />
        );
    }

    handlePress = (navigateTo,data) => {
        console.log("Handle Press", navigateTo)
        navigateTo({appointment_id:data})
    }
    onDelete = (value) =>{

        let params = {
            id: value.doctor_id
        }
        this.props.deleteAppointment(params);
        this.setState({ commentError: false, comment: '', ratingValue: 3, feeling_id:null})
    }

    render() {

        const { height } = this.state;
        const { zIndex } = this.props;

        let spacerHeight = height - ROW_HEIGHT;
        if (spacerHeight > 1) {
            spacerHeight += 20;
        } else {
            spacerHeight -= 20;
        }

        return (
            <View
                style={{
                    flex: 1,
                    zIndex,

                }}
            >
                <View
                    style={{
                        //height: ROW_HEIGHT,
                        margin: 10,
                        flex: 1
                    }}
                >
                    <FoldView
                        expanded={this.state.expanded}
                        onAnimationStart={this.handleAnimationStart}
                        perspective={1000}
                        renderBackface={this.renderBackface}
                        renderFrontface={this.renderFrontface}
                    >
                        <DoctorDetailHead data={this.props.data} onPress={this.flip} />
                    </FoldView>

                </View>

                <Spacer height={spacerHeight} />
            </View>
        );
    }
}
