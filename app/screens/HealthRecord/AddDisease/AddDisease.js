import React, { Component } from 'react';
import { Button, View, Image, TouchableOpacity } from 'react-native';
import {  Text } from 'native-base';
import SafeArea from 'app/components/SafeAreaView';
import styles from './styles';
import { navigateToHealthRecord } from "app/navigation/NavigationHelpers";
import IconTextInput from "app/components/IconTextInput";
import AuthHeader from "app/components/AuthHeader";
import LinearGradient from 'react-native-linear-gradient';
import validate from 'app/lib/validation_wrapper';
import PickerModal from 'react-native-picker-modal-view';
import AnimatedLoader from 'react-native-animated-loader';
export default class AddDisease extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedItem: {},
            selectedItemName:'',
            diseaseList: [],
            diseasesSelected: "Select Disease",
            otherDisease: '',
            otherDiseaseError: '',
            disease_titleError: null,
            visible:false
        }
    }

    componentDidMount() {
        this.props.getDiseasesList();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const newProps = this.props;
        if (prevState.diseaseList !== newProps.diseaseList) {
            this.setState({ diseaseList: newProps.diseaseList })
        }
        if (prevState.visible !== newProps.loader) {
            console.log('newProps.loader', newProps.loader);
            this.setState({ visible: newProps.loader })
        }
        if (prevProps.diseaseError !== newProps.diseaseError) {
            console.log('newProps.diseaseError',newProps.diseaseError);
            if (Object.keys(newProps.diseaseError.response).length) {
                for (let key in newProps.diseaseError.response) {
                    if (!newProps.diseaseError.response.hasOwnProperty(key)) continue;
                    let v = newProps.diseaseError.response[key];
                    let k = key + 'Error';
                    let state = {};
                    state[k] = v[0];
                    console.log('state',state);
                    this.setState(state)

                }
            }
            /*this.setState({
                visible: !this.state.visible
            });*/
        }
    }

    diseasesSelected = (value) => {
        this.setState({ diseasesSelected: value.title })
    }

    onSubmit = async () => {
        const diseaseError = await validate('name', this.state.selectedItemName);
        let otherDiseaseError = null;
        if (this.state.selectedItemName == 'Other'){
            otherDiseaseError = await validate('otherDiseases', this.state.otherDisease.trim());
        }

        this.setState({
            disease_titleError: diseaseError,
            otherDiseaseError: otherDiseaseError,
        })
        if (!diseaseError && !otherDiseaseError) {
            const selectDisease = this.state.selectedItemName === 'Other' ? this.state.otherDisease : this.state.selectedItemName

            let params = {
                disease_title: selectDisease
            }
            this.props.addDisease(params)
        }
    }

    onClosed() {
        console.log('close key pressed');
    }

    onSelected(selected) {
        this.setState({
            selectedItemName: selected.Name,
            disease_titleError:validate('name', selected.Name)
        });
        return selected;
    }

    onBackButtonPressed() {
        console.log('back key pressed');
    }

    render() {
        return (
            <SafeArea>
                <AnimatedLoader
                    visible={this.state.visible}
                    overlayColor="rgba(255,255,255,0.75)"
                    animationStyle={styles.lottie}
                    speed={1}
                    source={require('app/assets/json/data.json')}
                />
                <AuthHeader title={'Add New Disease'} navigateTo={navigateToHealthRecord} />
                <View style={{ top: -30 }}>
                    <PickerModal
                        renderSelectView={(disabled, selected, showModal) =>
                            // <Button disabled={disabled} title={'Show me!'} onPress={showModal} />
                            <TouchableOpacity style={styles.pickerView} onPress={showModal}>
                                <Text style={{ left: 10 }}>
                                    {this.state.selectedItemName ? this.state.selectedItemName : 'Select Disease'}
                                </Text>
                            </TouchableOpacity>
                        }
                        onSelected={this.onSelected.bind(this)}
                        onClosed={this.onClosed.bind(this)}
                        onBackButtonPressed={this.onBackButtonPressed.bind(this)}
                        items={this.state.diseaseList}
                        sortingLanguage={'tr'}
                        showToTopButton={true}
                        selected={this.state.selectedItem}
                        showAlphabeticalIndex={true}
                        autoGenerateAlphabeticalIndex={true}
                        selectPlaceholderText={'Choose one...'}
                        onEndReached={() => console.log('list ended...')}
                        searchPlaceholderText={'Search...'}
                        requireSelection={false}
                        autoSort={false}
                    />
                    {this.state.disease_titleError  ? <Text style={{ left: 20, color: 'red', fontSize: 14 }}>{this.state.disease_titleError}</Text> : null}
                    {
                        this.state.selectedItemName === "Other" ?
                            <IconTextInput
                                ref={input => (this.name = input)}
                                placeholder={"Diseases Name"}
                                placeholderTextColor={'#000'}
                                returnKeyType='done'
                                onChangeText={(otherDisease) => this.setState({ otherDisease: otherDisease })}
                                // onChangeText={this.onEmailChange.bind(this)}
                                // value={this.props.name}
                                inputStyle={styles.input}
                                onBlur={() => {
                                    this.setState({
                                        otherDiseaseError: validate('Other Disease', this.state.otherDiseaseError),
                                    })
                                }}
                                error={this.state.otherDiseaseError}
                            /> : null}
                </View>
                <TouchableOpacity style={{ marginVertical: 10, alignItems: 'center' }} onPress={() => this.onSubmit()}>
                    <LinearGradient
                        start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                        colors={['#64B7A0', '#3992B2']} style={styles.buttonStyle}>
                        <Text style={styles.buttonTextStyle}>
                            SUBMIT
                        </Text>
                    </LinearGradient>
                </TouchableOpacity>
            </SafeArea>
        )
    }
}
