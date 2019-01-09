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
    Alert
} from 'react-native';

import 'whatwg-fetch'
import Global from '../Global/Global';

import { BallIndicator } from 'react-native-indicators';

var deviceWidth = Dimensions.get('window').width;
var deviceHeight = Dimensions.get('window').height;
var topSectionHeight = 120;
var mainSectionHeight = deviceHeight - 120;

const DismissKeyboard = ({children}) => (
    <TouchableWithoutFeedback onPress = {() => Keyboard.dismiss()}>
        {children}
    </TouchableWithoutFeedback>
);

export default class SignUp extends Component {
    static navigationOptions = {
		header: null,
    };
    
    constructor(props) {
        super(props);
        
        this.state = {
            isReady: false,
            showIndicator: false,


            email: '',
            password: '',
            confirm_password: '',
            first_name: '',
            last_name: '',
            verification_code: '',

            register_check: false,/// first register then sign up
        };
    };

    handleFirstName = (typedText) => {
        this.setState({
            first_name: typedText
        });
    };

    handleLastName = (typedText) => {
        this.setState({
            last_name: typedText
        });
    };

    handleEmail = (typedText) => {
        this.setState({
            email: typedText
        });
    };

    handlePassword = (typedText) => {
        this.setState({
            password: typedText
        });
    };

    handleConfirmPassword = (typedText) => {
        this.setState({
            confirm_password: typedText
        });
    };

    handleVerificationCode = (typedText) => {
        this.setState({
            verification_code: typedText
        });
    };

    signIn = async() => {
        this.props.navigation.navigate('SignIn');
    };

    gotoSignIn = async() => {

        /*
        save account information to sqlite
        */
       this.props.navigation.navigate('SignIn', {email: Global.email, password: Global.password});

        // var formData = new FormData();
        // formData.append('type', 'user');
        // formData.append('email', Global.email);
        // formData.append('password', Global.password);

        // this.setState({showIndicator: true});
        // self = this;
        // await fetch('https://cabgomaurice.com/api/login', {
        //         method: 'POST',
        //         headers: {
        //             'Content-Type': 'multipart/form-data'
        //         },
        //         body: formData
        //     })
        //     .then(response => response.json())
        //     .then(data => {
        //         if(data.status === 'fail') {
        //             if(data.error_type === 'password_wrong') {
        //                 Alert.alert('Warning!', 'Password is incorrect. Please try again.')
        //             } else if(data.error_type === 'no_user') {
        //                 Alert.alert('Warning!', 'Email is incorrect. Please try again.')
        //             } else if(data.error_type === 'no_activated') {
        //                 Alert.alert('Warning!', 'Your account is not activated. Please verify your email',
        //                     [
        //                         {text: 'Cancel', onPress: () => null},
        //                         {text: 'OK', onPress: () => null}
        //                     ],
        //                     {cancelable: true}
        //                 );
        //             } else {
        //                 Alert.alert('Warning!', 'There is something wrong in server. Please try again.');
        //             }
        //         } else if(data.status === 'success') {
        //             Global.token = data.data;
        //             this.props.navigation.navigate('Home');
        //         }
        //     })
        //     .catch(function(error) {
        //         console.log('111111: signinerrorrororor' + JSON.stringify(error));
        //         Alert.alert('Warning!', 'Network error.')
        //     })

        // this.setState({showIndicator: false});
    };

    signUp = async() => {
        if(this.state.register_check) {  // after get verification code 
            if(this.state.verification_code === '') {
                Alert.alert("Warning!", 'Please input verification_code');
                return;
            };
            
            var formData = new FormData();
            formData.append('type', 'user');
            formData.append('email', Global.email);
            formData.append('code', this.state.verification_code);

            this.setState({showIndicator: true});
            self = this;
            await fetch('https://cabgomaurice.com/api/email_verify', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    },
                    body: formData
                })
                .then(response => response.json())
                .then(data => {
                    
                    if(data.status === 'fail') {
                        Alert.alert('Warning!', 'Your verification code is incorrect. Please try again.')
                    } else if(data.status === 'success'){
                        Alert.alert('Welcome!!!', 'Registration Successful!!!',
                            [
                                // {text: 'Cancel', onPress: () => this.props.navigation.navigate('SignIn')},
                                {text: 'OK', onPress: () => this.gotoSignIn()}
                            ],
                            {cancelable: true}
                        );
                    }
                })
                .catch(function(error) {
                    Alert.alert('Warning!', 'Network error.');
                })

            this.setState({showIndicator: false});

        } else {  // for get verification code
            if(this.state.first_name === '') {
                Alert.alert("Warning!", 'Please input First Name');
                return;
            };
            if(this.state.last_name === '') {
                Alert.alert("Warning!", 'Please input Last Name');
                return;
            };
            if(this.state.email === '') {
                Alert.alert("Warning!", 'Please input Email Address');
                return;
            };
            let regExpression = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ;
            if(regExpression.test(this.state.email) === false) {
                Alert.alert("Warning!", 'Please input valid Email Address');
                return;
            };
            if(this.state.password === '') {
                Alert.alert("Warning!", 'Please input password');
                return;
            };
            if(this.state.password.length < 6) {
                Alert.alert("Warning!", 'The Password must be at least 6 characters.');
                return;
            };
            if(this.state.password !== this.state.confirm_password) {
                Alert.alert("Warning!", 'Password does not match.');
                return;
            };

            var formData = new FormData();

            formData.append('type', 'user');
            formData.append('first_name', this.state.first_name);
            formData.append('last_name', this.state.last_name);
            formData.append('email', this.state.email);
            formData.append('password', this.state.password);
            formData.append('confirm_password', this.state.confirm_password);
    
            this.setState({showIndicator: true});
            self = this;
            await fetch('https://cabgomaurice.com/api/signup', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                    body: formData
                })
                .then(response => response.json())
                .then(data => {
                    if(data.status === 'fail') {
                        if(data.error_type === 'registered') {
                            Alert.alert('Warning!', 'Your Email has already registered. Please use another Email.');
                        } else {
                            Alert.alert('Warning!', 'There is something wrong in server. Please try again.');
                        }
                    } else if(data.status === 'success'){
                        Global.user_id = data.id;
                        Global.email = self.state.email;
                        Global.password = self.state.password;
                        self.setState({
                            register_check: true
                        });
                        Alert.alert('Notice!', 'We sent verification code to your email. Please check your email inbox.')
                    }
                })
                .catch(function(error) {
                    Alert.alert('Warning!', 'Network error.');
                })
            
            this.setState({showIndicator: false});

        }
    };

    scrollToText = (index) => {
        this.mainScrollView.scrollTo({y: 60 * index});
    };

    render() {
        return (
            // <DismissKeyboard>
                <View style={styles.container}>
                    {
                        this.state.showIndicator &&
                        <View style = {{position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, justifyContent: 'center', alignItems: 'center', backgroundColor: 'black', opacity: 0.5, zIndex: 100}}>
                            <View style = {{flex: 1}}>
                                <BallIndicator color = '#ffffff' size = {50} count = {8}/>
                            </View>
                        </View>
                    }
                    <View style = {styles.pagetitle_part}>
                        <Text style = {{fontSize: 25}}> Register User </Text>
                        <TouchableOpacity style = {{position: 'absolute', top: 30, left: 20}} onPress = {() => this.props.navigation.navigate('SignIn')}>
                            <Image style = {{width: 15, height: 15}} resizeMode = 'contain' source = {require('../assets/images/left_arrow.png')}/>
                        </TouchableOpacity>
                    </View>
                    <ScrollView style = {{width: deviceWidth, marginTop: 20}} showsVerticalScrollIndicator = {false} keyboardShouldPersistTaps='handled' ref={ref => this.mainScrollView = ref}>
                        <KeyboardAvoidingView style = {{flex: 1}}>
                            <View style = {styles.main_part}>
                                <View style = {styles.component_input}>
                                    <View style = {styles.title_view}>
                                        <Text style = {styles.title_text}> Fist Name </Text>
                                    </View>
                                    <View style = {styles.input_view}>
                                        <TextInput onTouchStart = {() => this.scrollToText(0)} underlineColorAndroid = 'transparent' style = {styles.input_text} onChangeText = {this.handleFirstName}>{this.state.first_name}</TextInput>
                                    </View>
                                </View>
                                <View style = {styles.component_input}>
                                    <View style = {styles.title_view}>
                                        <Text style = {styles.title_text}> Last Name </Text>
                                    </View>
                                    <View style = {styles.input_view}>
                                        <TextInput onTouchStart = {() => this.scrollToText(1)} underlineColorAndroid = 'transparent' style = {styles.input_text} onChangeText = {this.handleLastName}>{this.state.last_name}</TextInput>
                                    </View>
                                </View>
                                <View style = {styles.component_input}>
                                    <View style = {styles.title_view}>
                                        <Text style = {styles.title_text}> Email </Text>
                                    </View>
                                    <View style = {styles.input_view}>
                                        <TextInput onTouchStart = {() => this.scrollToText(2)} underlineColorAndroid = 'transparent' style = {styles.input_text} onChangeText = {this.handleEmail}>{this.state.email}</TextInput>
                                    </View>
                                </View>
                                <View style = {styles.component_input}>
                                    <View style = {styles.title_view}>
                                        <Text style = {styles.title_text}> Password </Text>
                                    </View>
                                    <View style = {styles.input_view}>
                                        <TextInput onTouchStart = {() => this.scrollToText(3)} underlineColorAndroid = 'transparent' style = {styles.input_text} onChangeText = {this.handlePassword} secureTextEntry={true}>{this.state.password}</TextInput>
                                    </View>
                                </View>
                                <View style = {styles.component_input}>
                                    <View style = {styles.title_view}>
                                        <Text style = {styles.title_text}> Confirm Password </Text>
                                    </View>
                                    <View style = {styles.input_view}>
                                        <TextInput onTouchStart = {() => this.scrollToText(4)} underlineColorAndroid = 'transparent' style = {styles.input_text} onChangeText = {this.handleConfirmPassword} secureTextEntry={true}>{this.state.confirm_password}</TextInput>
                                    </View>
                                </View>
                                {
                                    this.state.register_check &&
                                    <View style = {styles.component_input}>
                                        <View style = {styles.title_view}>
                                            <Text style = {styles.title_text}> Verification Code </Text>
                                        </View>
                                        <View style = {styles.input_view}>
                                            <TextInput onTouchStart = {() => this.scrollToText(5)} underlineColorAndroid = 'transparent' style = {styles.input_text} onChangeText = {this.handleVerificationCode}>{this.state.verification_code}</TextInput>
                                        </View>
                                    </View>
                                }
                                {
                                    !this.state.register_check &&
                                    <View style = {styles.component_input}/>
                                }
                                <View style = {styles.button_view}>
                                    <TouchableOpacity style = {{width: '40%', height: 40, backgroundColor: '#ff4858', borderRadius: 40, justifyContent: 'center', alignItems: 'center'}} onPress = {() => this.signUp()}>
                                            <Text style = {{fontSize: 15, color: '#ffffff'}}> {this.state.register_check ? 'Sign Up' : 'Register'} </Text>
                                    </TouchableOpacity>
                                    <View style = {{width: '100%', justifyContent: 'center', alignItems: 'center', flexDirection: 'row', marginTop: 10}}>
                                        <Text style = {{fontSize: 13, color: '#000000'}}> Already have an account? </Text>
                                        <TouchableOpacity onPress = {() => this.signIn()}>
                                            <Text style = {{fontSize: 15, color: '#ff4858', marginLeft: 15}}> Sign In </Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </KeyboardAvoidingView>
                        <View style = {{width: '100%', height: 250}}></View>
                    </ScrollView>
                </View>
            // </DismissKeyboard>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffffff',
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
        width: '100%',
        height: mainSectionHeight,
        // justifyContent: 'center',
        alignItems: 'center',
    },
    component_input: {
        width: '90%',
        height: '13%',
        justifyContent: 'flex-start',
        alignItems: 'center',
        // marginBottom: 20,
    },
    title_view: {
        width: '100%',
        height: '50%',
        justifyContent: 'center',
        alignItems: 'flex-start'
    },
    title_text: {
        color: '#000000', 
        fontSize: 15, 
        // fontFamily: 'coreSansBold', 
        // paddingTop: Platform.OS === 'android' ? 0 : 7
    },
    input_view: {
        width: '100%',
        height: '50%',
        borderBottomColor: '#000000',
        borderBottomWidth: 1,
        justifyContent: 'center',
        alignItems: 'flex-start'
    },
    input_text: {
        width: '100%',
        height: '100%',
        color: '#000000', 
        fontSize: 15, 
        // fontFamily: 'coreSansBold', 
        paddingTop: Platform.OS === 'android' ? 0 : 7
    },
    button_view: {
        width: '100%',
        height: '22%',
        // backgroundColor: '#ff4858',
        // borderRadius: 40,
        alignItems: 'center',
        justifyContent: 'center',
        // marginTop: 40
    },
    
});
