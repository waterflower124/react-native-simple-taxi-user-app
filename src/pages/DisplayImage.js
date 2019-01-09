/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, 
    StyleSheet, 
    Text, 
    View,
    Image,
    TextInput,
    TouchableOpacity,
    KeyboardAvoidingView,
    Keyboard,
    Dimensions,
    TouchableWithoutFeedback,
    ScrollView,
    Alert,
    FlatList,
    Linking,
    StatusBar,
    Modal,
    ImageBackground
} from 'react-native';
import 'whatwg-fetch'
import Global from '../Global/Global';



var deviceWidth = Dimensions.get('window').width;
var deviceHeight = Dimensions.get('window').height;
var deviceRatio = deviceWidth / (deviceHeight - 50);
var bannerHeight = deviceHeight * 0.1;
var mainSectionHeight = Platform.OS === 'android' ? deviceHeight - (bannerHeight + 50 + StatusBar.currentHeight) : deviceHeight - (bannerHeight + 50);

export default class DisplayImage extends Component {
    static navigationOptions = {
		header: null,
    };
    
    constructor(props) {
        super(props);
        
        this.state = {
            image_array: this.props.navigation.state.params.image_array,
            image_ratio_array: this.props.navigation.state.params.image_ratio_array,
            selected_index: this.props.navigation.state.params.index,


            ads_image: '',
            ads_link: '',
            ads_id: -1,
        };
    };


    componentDidMount() {
        this.initialListner =  this.props.navigation.addListener('willFocus', this.initialSetting.bind(this));
    };

    initialSetting() {
        var formData = new FormData();
        formData.append('type', 'user');
        formData.append('token', Global.token);
        self = this;
        fetch('https://cabgomaurice.com/api/get_ad', {
            method: 'POST',
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            // console.log(data);
            if(data.status === 'fail') {
            } else if(data.status === 'success') {
                if(data.data === null) {
                    self.setState({
                        ads_image: '',
                        ads_link: '',
                        ads_id: -1,
                    });
                } else {
                    self.setState({
                        ads_image: 'http://cabgomaurice.com/public/images/ads/' + data.data.image,
                        ads_link: data.data.link,
                        ads_id: data.data.id,
                    });
                }
            } else if(data.message === 'token_error') {
                // Alert.alert('Please notice!', 'Please signin again.');
            }               
        })
        .catch(function(error) {
        });
    };

    render() {
        return (
            <ImageBackground style={styles.container} source = {require('../assets/images/background.jpg')}>
                <View style = {{width: '100%', height: 50, justifyContent: 'center', alignItems: 'flex-start'}}>
                    <TouchableOpacity style = {{height: '100%', aspectRatio: 1, alignItems: 'flex-start', justifyContent: 'center', marginLeft: 10, marginTop: 15}} onPress = {() => {this.props.navigation.navigate('DriverDetail')}}>
                        <Image style = {{width: '30%', height: '30%'}} resizeMode = 'contain' source = {require('../assets/images/left_arrow.png')}/>
                    </TouchableOpacity>
                </View>
                <View style = {{width: '100%', height: mainSectionHeight, justifyContent: 'center', alignItems: 'center'}}>
                {
                    (this.state.image_ratio_array[this.state.selected_index] > deviceRatio) &&
                    <Image style = {{width: deviceWidth, aspectRatio: this.state.image_ratio_array[this.state.selected_index], borderRadius: 10, overflow: 'hidden'}} source = {{uri: this.state.image_array[this.state.selected_index]}}/>
                }
                {
                    (this.state.image_ratio_array[this.state.selected_index] <= deviceRatio) &&
                    <Image style = {{height: deviceHeight - 50, aspectRatio: this.state.image_ratio_array[this.state.selected_index], borderRadius: 10, overflow: 'hidden'}} source = {{uri: this.state.image_array[this.state.selected_index]}}/>
                }
                    
                </View>
                <TouchableOpacity style = {styles.banner_section} onPress = {() => this.onClickAds()}>
                {
                    (this.state.ads_image !== '')&&
                    <Image style = {{width: '100%', height: '100%'}} resizeMode = {'stretch'} source = {{uri: this.state.ads_image}}/>
                }
                </TouchableOpacity>
            </ImageBackground>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        resizeMode: 'cover',
        backgroundColor: '#000000',
    },
    banner_section: {
        // position: 'absolute',
        width: '100%',
        height: bannerHeight,
        bottom: 0,
        // backgroundColor: '#392b59',
    },
    
      
});
