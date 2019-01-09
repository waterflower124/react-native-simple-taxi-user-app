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
    ImageBackground
} from 'react-native';
import 'whatwg-fetch'
import Global from '../Global/Global';

import { BallIndicator } from 'react-native-indicators';
import Star from 'react-native-star-view';
import Communications from '../components/communication/AKCommunications';

var deviceWidth = Dimensions.get('window').width;
var deviceHeight = Dimensions.get('window').height;
var topSectionHeight = 120;
var bannerHeight = deviceHeight * 0.1;
var mainSectionHeight = Platform.OS === 'android' ? deviceHeight - (bannerHeight + topSectionHeight + StatusBar.currentHeight) : deviceHeight - (bannerHeight + topSectionHeight);

const DismissKeyboard = ({children}) => (
    <TouchableWithoutFeedback onPress = {() => Keyboard.dismiss()}>
        {children}
    </TouchableWithoutFeedback>
);


export default class DriverDetail extends Component {
    static navigationOptions = {
		header: null,
    };
    
    constructor(props) {
        super(props);
        
        this.state = {
            isReady: false,
            driver_info: this.props.navigation.state.params.driverInfo,
            vehicle_image_Ratio: this.props.navigation.state.params.ratio_array,

            ///  variables for ads
            ads_image: '',
            ads_link: '',
            ads_id: -1,
        };
    };

    // async componentWillMount() {
    //     var vehicleImages_Array = this.state.driver_info.car_images;
    //     var ratio = 0;
    //     for(i = 0; i < vehicleImages_Array.length; i ++) {
    //         await Image.getSize(vehicleImages_Array[i], (width, height) => {
    //             alert(width + '  ' + height);
    //             ratio = width / height;
    //             console.log('//////////////////////' + ratio);
    //             this.setState({vehicle_image_Ratio: [...this.state.vehicle_image_Ratio, ratio]});
    //         });
            
    //     };
    // };

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

    phoneCall = (phoneNumber) => {
        Communications.phonecall(phoneNumber, true);
    };

    onClickAds = () => {
        if(this.state.ads_link !== '') {
            Linking.canOpenURL(this.state.ads_link).then(supported => {
                if(supported) {
                    Linking.openURL(this.state.ads_link); 
                } else {
                        Alert.alert('Warning!', 'Can not open this Ads.');
                    }
                });
        }
    };

    onClickImage = (index) => {
        this.props.navigation.navigate('DisplayImage', {image_array: this.state.driver_info.car_images, image_ratio_array: this.state.vehicle_image_Ratio, index: index})
    }

    render() {
        return (
            <ImageBackground style={styles.container} source = {require('../assets/images/background.jpg')}>
                <View style = {styles.pagetitle_part}>
                    <Text style = {{fontSize: 25}}> Driver Profile </Text>
                    <TouchableOpacity style = {{position: 'absolute', top: 30, left: 20}} onPress = {() => this.props.navigation.navigate('Home')}>
                        <Image style = {{width: 15, height: 15}} resizeMode = 'contain' source = {require('../assets/images/left_arrow.png')}/>
                    </TouchableOpacity>
                </View>
                <View style = {styles.main_part}>
                <View style = {{width: '100%', height: '20%', flexDirection: 'row'}}>
                    <View style = {{width: '30%', height: '100%', alignItems: 'center', justifyContent: 'center'}}>
                    {
                        (this.state.driver_info.avatar === '') &&
                        <Image style = {{aspectRatio: 1, height: '90%'}} resizeMode = {'contain'} source = {require('../assets/images/empty_user.png')}/>
                    }
                    {
                        (this.state.driver_info.avatar !== '') &&
                        <View style = {{aspectRatio: 1, height: '90%', borderRadius: 10, overflow: 'hidden'}}>
                            <Image style = {{width: '100%', height: '100%'}} resizeMode = {'cover'} source = {{uri: this.state.driver_info.avatar}}/>
                        </View>
                    }
                    </View>
                    <View style = {{width: '65%', height: '100%', marginLeft: '5%'}}>
                        <View style = {{width: '100%', height: '50%', alignItems: 'flex-start', justifyContent: 'center'}}>
                            <Text style = {{fontSize: 25, color: '#ffffff'}}>{this.state.driver_info.name}</Text>
                        </View>
                        <View style = {{width: '100%', height: '50%', alignItems: 'flex-start', justifyContent: 'center'}}>
                            <Star
                                style = {{width: deviceWidth * 0.9 * 0.4, height: deviceWidth * 0.9 * 0.4 * 0.2}}
                                score={this.state.driver_info.rating}
                            />
                        </View>
                    </View>
                </View>
                    
                    <View style = {{width: '100%', height: '10%', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start'}}>
                        <Text style = {{fontSize: 20, color: '#ffffff'}}>Tel: {this.state.driver_info.phonenumber}</Text>
                        <TouchableOpacity style = {{width: 100, height: 30, marginLeft: 20, backgroundColor: '#ff4858', alignItems: 'center', justifyContent: 'center', borderRadius: 10, flexDirection: 'row'}} onPress = {() => this.phoneCall(this.state.driver_info.phonenumber)}>
                            <Image style = {{width: 20, height: 20}} resizeMode = {'contain'} source = {require('../assets/images/call.png')}/>
                            <Text style = {{fontSize: 17, color: '#ffffff'}}>  Call </Text>
                        </TouchableOpacity>
                    </View>
                    <View style = {{width: '100%', height: '30%', alignItems: 'center', justifyContent: 'center'}}>
                        <View style = {{width: '100%', height: '20%', alignItems: 'flex-start', justifyContent: 'center'}}>
                            <Text style = {{fontSize: 20, color: '#ffffff'}}>Comments</Text>
                        </View>
                        <ScrollView style = {{width: '100%', height: '80%'}} showsVerticalScrollIndicator = {false}>
                            <Text style = {{width: '100%', fontSize: 17, color: '#e1e1e1'}} multiline = {true}>{this.state.driver_info.comment}</Text>
                        </ScrollView>
                    </View>
                    <View style = {{width: '100%', height: '40%', alignItems: 'center', justifyContent: 'center'}}>
                        <View style = {{width: '100%', height: '20%', alignItems: 'flex-start', justifyContent: 'center'}}>
                            <Text style = {{fontSize: 20, color: '#ffffff'}}>Vehicle Photos</Text>
                        </View>
                        <ScrollView style = {{width: '100%', height: '80%'}} horizontal = {true} showsHorizontalScrollIndicator = {false}>
                            <View style = {{width: '100%', height: '100%', flexDirection: 'row', alignItems: 'center'}}>
                            {
                                (this.state.driver_info.car_images.length === 0) &&
                                    <Text style = {{fontSize: 17, color: '#808080'}}> No Vehicle Pictures</Text>
                            }
                            {
                                (this.state.driver_info.car_images.length !== 0) &&
                                    this.state.driver_info.car_images.map((item, index) => 
                                        <TouchableOpacity key = {index} onPress = {() => this.onClickImage(index)} style = {{height: '90%', aspectRatio: this.state.vehicle_image_Ratio[index], flex: 1, marginRight: 10, borderRadius: 10, overflow: 'hidden'}}>
                                            <Image source = {{uri: item}} resizeMode = {'contain'} style = {{width: '100%', height: '100%'}} />
                                        </TouchableOpacity>
                                    )
                            }
                            </View>
                        </ScrollView>
                    </View>
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
        backgroundColor: '#111111',
    },
    pagetitle_part: {
        width: '100%',
        height: topSectionHeight,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f7b731',
        borderBottomLeftRadius: 40,
        borderBottomRightRadius: 40,
    },
    main_part: {
        width: '90%',
        height: mainSectionHeight,
        // justifyContent: 'center',
        // alignItems: 'center',
    },
    banner_section: {
        // position: 'absolute',
        width: '100%',
        height: bannerHeight,
        bottom: 0,
        // backgroundColor: '#392b59',
    },
      
});
