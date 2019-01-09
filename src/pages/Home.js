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
    AppState,
    ImageBackground
} from 'react-native';
import 'whatwg-fetch'
import Global from '../Global/Global';

import { BallIndicator } from 'react-native-indicators';
import GridView from 'react-native-super-grid';

import Star from 'react-native-star-view';
import Swiper from 'react-native-swiper';

var deviceWidth = Dimensions.get('window').width;
var deviceHeight = Dimensions.get('window').height;
var topSectionHeight = 120;
var bannerHeight = deviceHeight * 0.1;
var mainSectionHeight = Platform.OS === 'android' ? deviceHeight - (bannerHeight + topSectionHeight + StatusBar.currentHeight) : deviceHeight - (bannerHeight + topSectionHeight);

var APIkey = "AIzaSyBQFCqY7afcjleEKi0YRlv1XHBKRxn8pxE";

const DismissKeyboard = ({children}) => (
    <TouchableWithoutFeedback onPress = {() => Keyboard.dismiss()}>
        {children}
    </TouchableWithoutFeedback>
);

const renderPagination = (index, total, context) => {
    return (
      <View style={styles.paginationStyle}>
        <Text style={{ color: 'grey' }}>
          <Text style={styles.paginationText}>{index + 1}</Text>/{total}
        </Text>
      </View>
    )
  }


export default class Home extends Component {
    static navigationOptions = {
		header: null,
    };
    
    constructor(props) {
        super(props);
        
        this.state = {
            isReady: false,
            flat_list_drivers: 0,
            // driver_data_array: [
            //     { name: 'name1', phonenumber: '+123456789', rating: 4.3, distance: 11.2, comment: 'This is driver1 comment and also test comment This is driver1 comment and also test comment', car_images: ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTk0ZS-mzIXylbTyBx7tlfIIhmEoakDPtgPtp0K_JK2KZe4zozi', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIsk5nWVjXsgQERUeDE9qUoyeJvdEJOiyAx65qKNWghOyU-1gYrA', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_IriZ3USxNaRDvvQZ17gZhNuaYiSQMprOgCZpFvYRjx7uVvmD']},
            //     { name: 'name2', phonenumber: '+123456789', rating: 3.3, distance: 11.2, comment: 'This is driver1 comment and also test commentasdf This is driver1 comment and also test comment', car_images: ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTk0ZS-mzIXylbTyBx7tlfIIhmEoakDPtgPtp0K_JK2KZe4zozi', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIsk5nWVjXsgQERUeDE9qUoyeJvdEJOiyAx65qKNWghOyU-1gYrA', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_IriZ3USxNaRDvvQZ17gZhNuaYiSQMprOgCZpFvYRjx7uVvmD']},
            //     { name: 'name3', phonenumber: '+123456789', rating: 2.3, distance: 4.2, comment: 'This is driver1 comment and also test comment tyrtThis is driver1 comment and also test comment', car_images: ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTk0ZS-mzIXylbTyBx7tlfIIhmEoakDPtgPtp0K_JK2KZe4zozi', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIsk5nWVjXsgQERUeDE9qUoyeJvdEJOiyAx65qKNWghOyU-1gYrA', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_IriZ3USxNaRDvvQZ17gZhNuaYiSQMprOgCZpFvYRjx7uVvmD']},
            //     { name: 'name4', phonenumber: '+123456789', rating: 4.3, distance: 11.2, comment: 'This is driver1 comment and also test commentdsfg This is driver1 comment and also test comment', car_images: ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTk0ZS-mzIXylbTyBx7tlfIIhmEoakDPtgPtp0K_JK2KZe4zozi', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIsk5nWVjXsgQERUeDE9qUoyeJvdEJOiyAx65qKNWghOyU-1gYrA', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_IriZ3USxNaRDvvQZ17gZhNuaYiSQMprOgCZpFvYRjx7uVvmD']},                
            //     { name: 'name5', phonenumber: '+123456789', rating: 5, distance: 1.2, comment: 'This is driver1 comment and also test commentdfg This is driver1 comment and also test comment', car_images: ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTk0ZS-mzIXylbTyBx7tlfIIhmEoakDPtgPtp0K_JK2KZe4zozi', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIsk5nWVjXsgQERUeDE9qUoyeJvdEJOiyAx65qKNWghOyU-1gYrA', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_IriZ3USxNaRDvvQZ17gZhNuaYiSQMprOgCZpFvYRjx7uVvmD']},
            //     { name: 'name6', phonenumber: '+123456789', rating: 4.3, distance: 11.2, comment: 'This is driver1 comment and also test comment63456 This is driver1 comment and also test comment', car_images: ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTk0ZS-mzIXylbTyBx7tlfIIhmEoakDPtgPtp0K_JK2KZe4zozi', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIsk5nWVjXsgQERUeDE9qUoyeJvdEJOiyAx65qKNWghOyU-1gYrA', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_IriZ3USxNaRDvvQZ17gZhNuaYiSQMprOgCZpFvYRjx7uVvmD']},
            //     { name: 'name7', phonenumber: '+123456789', rating: 4.3, distance: 9.2, comment: 'This is driver1 comment and also test comment 7867This is driver1 comment and also test comment', car_images: ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTk0ZS-mzIXylbTyBx7tlfIIhmEoakDPtgPtp0K_JK2KZe4zozi', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIsk5nWVjXsgQERUeDE9qUoyeJvdEJOiyAx65qKNWghOyU-1gYrA', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_IriZ3USxNaRDvvQZ17gZhNuaYiSQMprOgCZpFvYRjx7uVvmD']},
            //     { name: 'name8', phonenumber: '+123456789', rating: 4.3, distance: 11.2, comment: 'This is driver1 comment and also test commentertert This is driver1 comment and also test comment', car_images: ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTk0ZS-mzIXylbTyBx7tlfIIhmEoakDPtgPtp0K_JK2KZe4zozi', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIsk5nWVjXsgQERUeDE9qUoyeJvdEJOiyAx65qKNWghOyU-1gYrA', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_IriZ3USxNaRDvvQZ17gZhNuaYiSQMprOgCZpFvYRjx7uVvmD']},
            //     { name: 'name9', phonenumber: '+123456789', rating: 4.3, distance: 11.2, comment: 'This is driver1 comment and also test comment3453456 This is driver1 comment and also test comment', car_images: ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTk0ZS-mzIXylbTyBx7tlfIIhmEoakDPtgPtp0K_JK2KZe4zozi', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIsk5nWVjXsgQERUeDE9qUoyeJvdEJOiyAx65qKNWghOyU-1gYrA', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_IriZ3USxNaRDvvQZ17gZhNuaYiSQMprOgCZpFvYRjx7uVvmD']},
            //     { name: 'name10', phonenumber: '+123456789', rating: 4.3, distance: 11.2, comment: 'This is driver1 comment and also test comment789789 This is driver1 comment and also test comment', car_images: ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTk0ZS-mzIXylbTyBx7tlfIIhmEoakDPtgPtp0K_JK2KZe4zozi', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIsk5nWVjXsgQERUeDE9qUoyeJvdEJOiyAx65qKNWghOyU-1gYrA', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_IriZ3USxNaRDvvQZ17gZhNuaYiSQMprOgCZpFvYRjx7uVvmD']},
            //     { name: 'name11', phonenumber: '+123456789', rating: 4.3, distance: 11.2, comment: 'This is driver1 comment and also test comment34525 This is driver1 comment and also test comment', car_images: ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTk0ZS-mzIXylbTyBx7tlfIIhmEoakDPtgPtp0K_JK2KZe4zozi', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIsk5nWVjXsgQERUeDE9qUoyeJvdEJOiyAx65qKNWghOyU-1gYrA', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_IriZ3USxNaRDvvQZ17gZhNuaYiSQMprOgCZpFvYRjx7uVvmD']},
            //     { name: 'name12', phonenumber: '+123456789', rating: 4.8, distance: 8.2, comment: 'This is driver1 comment and also test comment ,.;This is driver1 comment and also test comment', car_images: ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTk0ZS-mzIXylbTyBx7tlfIIhmEoakDPtgPtp0K_JK2KZe4zozi', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIsk5nWVjXsgQERUeDE9qUoyeJvdEJOiyAx65qKNWghOyU-1gYrA', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_IriZ3USxNaRDvvQZ17gZhNuaYiSQMprOgCZpFvYRjx7uVvmD']},               
            //     { name: 'name13', phonenumber: '+123456789', rating: 4.3, distance: 7.2, comment: 'This is driver1 comment and also test commenteewrt This is driver1 comment and also test comment', car_images: ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTk0ZS-mzIXylbTyBx7tlfIIhmEoakDPtgPtp0K_JK2KZe4zozi', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIsk5nWVjXsgQERUeDE9qUoyeJvdEJOiyAx65qKNWghOyU-1gYrA', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_IriZ3USxNaRDvvQZ17gZhNuaYiSQMprOgCZpFvYRjx7uVvmD']},
            //     { name: 'name14', phonenumber: '+123456789', rating: 3.3, distance: 0.2, comment: 'This is driver1 comment and also test commentghjbnh This is driver1 comment and also test comment', car_images: ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTk0ZS-mzIXylbTyBx7tlfIIhmEoakDPtgPtp0K_JK2KZe4zozi', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIsk5nWVjXsgQERUeDE9qUoyeJvdEJOiyAx65qKNWghOyU-1gYrA', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_IriZ3USxNaRDvvQZ17gZhNuaYiSQMprOgCZpFvYRjx7uVvmD']},
            //     { name: 'name15', phonenumber: '+123456789', rating: 4.3, distance: 11.2, comment: 'This is driver1 comment and also test commentxcvdfsg This is driver1 comment and also test comment', car_images: ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTk0ZS-mzIXylbTyBx7tlfIIhmEoakDPtgPtp0K_JK2KZe4zozi', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIsk5nWVjXsgQERUeDE9qUoyeJvdEJOiyAx65qKNWghOyU-1gYrA', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_IriZ3USxNaRDvvQZ17gZhNuaYiSQMprOgCZpFvYRjx7uVvmD']},
            //     { name: 'name16', phonenumber: '+123456789', rating: 4.3, distance: 11.2, comment: 'This is driver1 comment and also test comment98080 This is driver1 comment and also test comment', car_images: ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTk0ZS-mzIXylbTyBx7tlfIIhmEoakDPtgPtp0K_JK2KZe4zozi', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIsk5nWVjXsgQERUeDE9qUoyeJvdEJOiyAx65qKNWghOyU-1gYrA', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_IriZ3USxNaRDvvQZ17gZhNuaYiSQMprOgCZpFvYRjx7uVvmD']},
            // ],

            // driver_data_array: [
            //     [
            //         { name: 'name1', phonenumber: '+123456789', rating: 4.3, distance: 11.2, comment: 'This is driver1 comment and also test comment This is driver1 comment and also test comment', car_images: ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTk0ZS-mzIXylbTyBx7tlfIIhmEoakDPtgPtp0K_JK2KZe4zozi', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIsk5nWVjXsgQERUeDE9qUoyeJvdEJOiyAx65qKNWghOyU-1gYrA', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_IriZ3USxNaRDvvQZ17gZhNuaYiSQMprOgCZpFvYRjx7uVvmD']},
            //         { name: 'name2', phonenumber: '+123456789', rating: 3.3, distance: 11.2, comment: 'This is driver1 comment and also test commentasdf This is driver1 comment and also test comment', car_images: ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTk0ZS-mzIXylbTyBx7tlfIIhmEoakDPtgPtp0K_JK2KZe4zozi', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIsk5nWVjXsgQERUeDE9qUoyeJvdEJOiyAx65qKNWghOyU-1gYrA', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_IriZ3USxNaRDvvQZ17gZhNuaYiSQMprOgCZpFvYRjx7uVvmD']},
            //         { name: 'name3', phonenumber: '+123456789', rating: 2.3, distance: 4.2, comment: 'This is driver1 comment and also test comment tyrtThis is driver1 comment and also test comment', car_images: ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTk0ZS-mzIXylbTyBx7tlfIIhmEoakDPtgPtp0K_JK2KZe4zozi', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIsk5nWVjXsgQERUeDE9qUoyeJvdEJOiyAx65qKNWghOyU-1gYrA', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_IriZ3USxNaRDvvQZ17gZhNuaYiSQMprOgCZpFvYRjx7uVvmD']},
            //         { name: 'name4', phonenumber: '+123456789', rating: 4.3, distance: 11.2, comment: 'This is driver1 comment and also test commentdsfg This is driver1 comment and also test comment', car_images: ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTk0ZS-mzIXylbTyBx7tlfIIhmEoakDPtgPtp0K_JK2KZe4zozi', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIsk5nWVjXsgQERUeDE9qUoyeJvdEJOiyAx65qKNWghOyU-1gYrA', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_IriZ3USxNaRDvvQZ17gZhNuaYiSQMprOgCZpFvYRjx7uVvmD']},               
            //         { name: 'name5', phonenumber: '+123456789', rating: 5, distance: 1.2, comment: 'This is driver1 comment and also test commentdfg This is driver1 comment and also test comment', car_images: ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTk0ZS-mzIXylbTyBx7tlfIIhmEoakDPtgPtp0K_JK2KZe4zozi', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIsk5nWVjXsgQERUeDE9qUoyeJvdEJOiyAx65qKNWghOyU-1gYrA', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_IriZ3USxNaRDvvQZ17gZhNuaYiSQMprOgCZpFvYRjx7uVvmD']},
            //         { name: 'name6', phonenumber: '+123456789', rating: 4.3, distance: 11.2, comment: 'This is driver1 comment and also test comment63456 This is driver1 comment and also test comment', car_images: ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTk0ZS-mzIXylbTyBx7tlfIIhmEoakDPtgPtp0K_JK2KZe4zozi', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIsk5nWVjXsgQERUeDE9qUoyeJvdEJOiyAx65qKNWghOyU-1gYrA', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_IriZ3USxNaRDvvQZ17gZhNuaYiSQMprOgCZpFvYRjx7uVvmD']},
            //         { name: 'name7', phonenumber: '+123456789', rating: 4.3, distance: 9.2, comment: 'This is driver1 comment and also test comment 7867This is driver1 comment and also test comment', car_images: ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTk0ZS-mzIXylbTyBx7tlfIIhmEoakDPtgPtp0K_JK2KZe4zozi', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIsk5nWVjXsgQERUeDE9qUoyeJvdEJOiyAx65qKNWghOyU-1gYrA', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_IriZ3USxNaRDvvQZ17gZhNuaYiSQMprOgCZpFvYRjx7uVvmD']},
            //         { name: 'name8', phonenumber: '+123456789', rating: 4.3, distance: 11.2, comment: 'This is driver1 comment and also test commentertert This is driver1 comment and also test comment', car_images: ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTk0ZS-mzIXylbTyBx7tlfIIhmEoakDPtgPtp0K_JK2KZe4zozi', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIsk5nWVjXsgQERUeDE9qUoyeJvdEJOiyAx65qKNWghOyU-1gYrA', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_IriZ3USxNaRDvvQZ17gZhNuaYiSQMprOgCZpFvYRjx7uVvmD']},
            //         { name: 'name9', phonenumber: '+123456789', rating: 4.3, distance: 11.2, comment: 'This is driver1 comment and also test comment3453456 This is driver1 comment and also test comment', car_images: ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTk0ZS-mzIXylbTyBx7tlfIIhmEoakDPtgPtp0K_JK2KZe4zozi', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIsk5nWVjXsgQERUeDE9qUoyeJvdEJOiyAx65qKNWghOyU-1gYrA', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_IriZ3USxNaRDvvQZ17gZhNuaYiSQMprOgCZpFvYRjx7uVvmD']}
            //     ],
            //     [
            //         { name: 'name10', phonenumber: '+123456789', rating: 4.3, distance: 11.2, comment: 'This is driver1 comment and also test comment789789 This is driver1 comment and also test comment', car_images: ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTk0ZS-mzIXylbTyBx7tlfIIhmEoakDPtgPtp0K_JK2KZe4zozi', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIsk5nWVjXsgQERUeDE9qUoyeJvdEJOiyAx65qKNWghOyU-1gYrA', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_IriZ3USxNaRDvvQZ17gZhNuaYiSQMprOgCZpFvYRjx7uVvmD']},
            //         { name: 'name11', phonenumber: '+123456789', rating: 4.3, distance: 11.2, comment: 'This is driver1 comment and also test comment34525 This is driver1 comment and also test comment', car_images: ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTk0ZS-mzIXylbTyBx7tlfIIhmEoakDPtgPtp0K_JK2KZe4zozi', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIsk5nWVjXsgQERUeDE9qUoyeJvdEJOiyAx65qKNWghOyU-1gYrA', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_IriZ3USxNaRDvvQZ17gZhNuaYiSQMprOgCZpFvYRjx7uVvmD']},
            //         { name: 'name12', phonenumber: '+123456789', rating: 4.8, distance: 8.2, comment: 'This is driver1 comment and also test comment ,.;This is driver1 comment and also test comment', car_images: ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTk0ZS-mzIXylbTyBx7tlfIIhmEoakDPtgPtp0K_JK2KZe4zozi', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIsk5nWVjXsgQERUeDE9qUoyeJvdEJOiyAx65qKNWghOyU-1gYrA', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_IriZ3USxNaRDvvQZ17gZhNuaYiSQMprOgCZpFvYRjx7uVvmD']},                
            //         { name: 'name13', phonenumber: '+123456789', rating: 4.3, distance: 7.2, comment: 'This is driver1 comment and also test commenteewrt This is driver1 comment and also test comment', car_images: ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTk0ZS-mzIXylbTyBx7tlfIIhmEoakDPtgPtp0K_JK2KZe4zozi', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIsk5nWVjXsgQERUeDE9qUoyeJvdEJOiyAx65qKNWghOyU-1gYrA', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_IriZ3USxNaRDvvQZ17gZhNuaYiSQMprOgCZpFvYRjx7uVvmD']},
            //         { name: 'name14', phonenumber: '+123456789', rating: 3.3, distance: 0.2, comment: 'This is driver1 comment and also test commentghjbnh This is driver1 comment and also test comment', car_images: ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTk0ZS-mzIXylbTyBx7tlfIIhmEoakDPtgPtp0K_JK2KZe4zozi', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIsk5nWVjXsgQERUeDE9qUoyeJvdEJOiyAx65qKNWghOyU-1gYrA', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_IriZ3USxNaRDvvQZ17gZhNuaYiSQMprOgCZpFvYRjx7uVvmD']},
            //         { name: 'name15', phonenumber: '+123456789', rating: 4.3, distance: 11.2, comment: 'This is driver1 comment and also test commentxcvdfsg This is driver1 comment and also test comment', car_images: ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTk0ZS-mzIXylbTyBx7tlfIIhmEoakDPtgPtp0K_JK2KZe4zozi', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIsk5nWVjXsgQERUeDE9qUoyeJvdEJOiyAx65qKNWghOyU-1gYrA', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_IriZ3USxNaRDvvQZ17gZhNuaYiSQMprOgCZpFvYRjx7uVvmD']},
            //         { name: 'name16', phonenumber: '+123456789', rating: 4.3, distance: 11.2, comment: 'This is driver1 comment and also test comment98080 This is driver1 comment and also test comment', car_images: ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTk0ZS-mzIXylbTyBx7tlfIIhmEoakDPtgPtp0K_JK2KZe4zozi', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIsk5nWVjXsgQERUeDE9qUoyeJvdEJOiyAx65qKNWghOyU-1gYrA', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_IriZ3USxNaRDvvQZ17gZhNuaYiSQMprOgCZpFvYRjx7uVvmD']},
            //     ]
            // ],
            driver_data_array: [],

            latitude: 0.0,
            longitude: 0.0,

            ///  variables for ads
            ads_image: '',
            ads_link: '',
            ads_id: -1,


            currentAppState: AppState.currentState,
        };
    };

    showDetailDriverInfo = async(item) => {
        var vehicleImages_Array = item.car_images;
        var ratio_array = item.image_ratio;
        this.props.navigation.navigate('DriverDetail', {driverInfo: item, ratio_array: ratio_array});
    };

    signOut = async() => {

        var formData = new FormData();
        formData.append('type', 'user');
        formData.append('token', Global.token);

        this.setState({showIndicator: true});
        self = this;
        await fetch('https://cabgomaurice.com/api/logout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                // console.log('111111: sendgeolocation errororor' + JSON.stringify(data));
                if(data.status === 'fail') {
                    if(data.error_type === 'password_wrong') {
                        Alert.alert('Warning!', 'There is something wrong in server. Please try again.');
                    }
                } else if(data.status === 'success') {
                    // Global.token = data.data;
                    // Global.email = self.state.email;
                    // Global.password = self.state.password;
                    this.props.navigation.navigate('SignIn');
                }
            })
            .catch(function(error) {
                // console.log('111111: sendgeolocation errororor' + JSON.stringify(error));
                Alert.alert('Warning!', 'Network error.')
            })

        this.setState({showIndicator: false});
    };

    getDistance = async(destlat, destlng) => {
        var distance = 'hhhh';
        await fetch('https://maps.googleapis.com/maps/api/distancematrix/json?origins=' + this.state.latitude + ',' + this.state.longitude + '&destinations=' + destlat + ',' + destlng + '&key=' + APIkey)
            .then(response => response.json())
            .then(data => {
                // alert('111111: distance' + JSON.stringify(data));
                if(data.rows[0].elements[0].status === 'NOT_FOUND') {
                    distance = 'undefined';
                } else 
                    distance = data.rows[0].elements[0].distance.text;
            })
            .catch(function(error) {
                distance = 'undefined';
            });

        return distance;
    };

    getDeriversInfo = async() => {
        // console.log('1111111: getdriverinfor   ');

        self.setState({driver_data_array: []});

        var formData = new FormData();
        formData.append('type', 'user');
        formData.append('token', Global.token);

        this.setState({showIndicator: true});
        self = this;
        await fetch('https://cabgomaurice.com/api/get_drivers', {
                method: 'POST',
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                body: formData
            })
            .then(response => response.json())
            .then(async(data) => {
                // alert('111111: get driver Infor.  ' + JSON.stringify(data));
                if(data.status === 'fail') {
                    if(data.error_type === 'password_wrong') {
                        Alert.alert('Warning!', 'There is something wrong in server. Please try again.');
                    }
                } else if(data.status === 'success') {

                    var avatar = '';
                    var first_name = '';
                    var name = '';
                    var phonenumber = '';
                    var rating = 0.0;
                    var latitude = '';
                    var longitude = '';
                    var distance = '';
                    var comment = '';
                    var car_images = [];
                    var image_ratio = [];

                    var driverItem = {};
                    var drivers_page = [];
                    var driver_data_array = [];

                    var drivers = data.data;

                    var driversCount = 0;
                    
                    if(drivers.length > 0) {
                        for(i = 0; i < drivers.length; i ++) {
                            avatar = '';
                            first_name = '';
                            name = '';
                            phonenumber = '';
                            rating = 0.0;
                            latitude = '';
                            longitude = '';
                            distance = '';
                            comment = '';
                            car_images = [];
                            image_ratio = [];

                            driverItem = {};

                            driversCount ++;

                            if(drivers[i].avatar === '') {
                                avatar = '';
                            } else {
                                avatar = 'https://cabgomaurice.com/public/images/users/' + drivers[i].avatar;
                            }
                            first_name = drivers[i].first_name;
                            name = drivers[i].first_name + ' ' + drivers[i].last_name;
                            phonenumber = drivers[i].phone_number;
                            if(drivers[i].rate === null) {
                                rating = 0.0;
                            } else {
                                rating = drivers[i].rate;
                            };
                            latitude = drivers[i].latitude;
                            longitude = drivers[i].longitude;
                            // distance = '22222';
                            distance = await self.getDistance(latitude, longitude);

                            if(drivers[i].comment === null) {
                                comment = '';
                            } else {
                                comment = drivers[i].comment;
                            };
                            if(drivers[i].images.length > 0) {
                                for(j = 0; j < drivers[i].images.length; j ++) {
                                    car_images.push('https://cabgomaurice.com/public/images/users/' + drivers[i].images[j].name);
                                    image_ratio.push(drivers[i].images[j].width / drivers[i].images[j].height);
                                }
                            } else {
                                car_images = [];
                            };

                            driverItem = {'avatar': avatar, 'first_name': first_name, 'name': name, 'phonenumber': phonenumber, 'rating': rating, 'distance': distance, 'comment': comment, 'car_images': car_images, 'image_ratio': image_ratio};
                            drivers_page.push(driverItem);
                            if((driversCount === 9) || (i === drivers.length - 1)) {
                                // self.setState({driver_data_array: [...self.state.driver_data_array, drivers_page]});
                                driver_data_array.push(drivers_page);
                                drivers_page = [];
                                driversCount = 0;
                            };
                        };
                        self.setState({driver_data_array: driver_data_array});
                    } else {
                        Alert.alert('Notice!', 'No drivers!!!');
                    }
                }
            })
            .catch(function(error) {
                console.log('111111: get driver errororor' + JSON.stringify(error));
                Alert.alert('Warning!', 'Network error')
            })

        this.setState({showIndicator: false});
    };

    // watchID: ?number = null
    getCurrentLocation() {

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

        this.watchID = navigator.geolocation.getCurrentPosition((position) => 
        {
            var lat = parseFloat(position.coords.latitude);
            var lng = parseFloat(position.coords.longitude);
            this.setState({
                latitude: lat,
                longitude: lng
            });
        },
            (error) => this.setState({ error: error.message }),
            { enableHighAccuracy: false, timeout: 20000, maximumAge: 1000 },
        );

        setTimeout(async() => {
            await this.getDeriversInfo();
        }, 500);
    };

    componentDidMount() {
        self = this;
        // BackgroundTimer.runBackgroundTimer(() => { 
            
        // }, 5000);

    };

    componentWillMount() {
        this.initialListner =  this.props.navigation.addListener('willFocus', this.getCurrentLocation.bind(this));
        
    };

    componentWillUnmount() {
        this.initialListner.remove();
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
    }

    render() {
        return (
            // <DismissKeyboard>
                <ImageBackground style={styles.container} source = {require('../assets/images/background.jpg')}>
                {
                    this.state.showIndicator &&
                    <View style = {{position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, justifyContent: 'center', alignItems: 'center', backgroundColor: 'black', opacity: 0.5, zIndex: 100}}>
                        <View style = {{flex: 1}}>
                            <BallIndicator color = '#ffffff' size = {50} count = {8}/>
                        </View>
                    </View>
                }
                    <View style = {styles.pagetitle_part}>
                        <Text style = {{fontSize: 25, color: '#ffffff'}}> Drivers </Text>
                        <TouchableOpacity style = {{position: 'absolute', top: 30, left: 20}} onPress = {() => this.signOut()}>
                            <Text style = {{fontSize: 12, }}>Sign Out</Text>
                        </TouchableOpacity>
                    </View>
                    {/* <KeyboardAvoidingView behavior = 'padding'> */}
                        {/* <ScrollView style = {{width: deviceWidth, marginTop: 20}} keyboardShouldPersistTaps='handled'> */}
                            <View style = {styles.main_part}>
                                <View style = {{width: '90%', height: 40, marginLeft: '10%', alignItems: 'flex-start', justifyContent: 'center',}}>
                                    <Text style = {{fontSize: 20, color: '#ffffff'}}>Drivers Nearby</Text>
                                </View>
                                <View style = {styles.components_container}>
                                    <Swiper
                                        style = {{}}
                                        containerStyle={{ alignSelf: 'stretch' }}
                                        renderPagination = {renderPagination}
                                        loop = {false}
                                        removeClippedSubviews={false}
                                    >
                                    {
                                        this.state.driver_data_array.map((page_item, index) => 
                                            <View key = {index} style = {{width: deviceWidth * 0.9, height: deviceWidth * 0.9, justifyContent: 'center'}} title = {<Text> </Text>}>
                                                <GridView
                                                    itemDimension = {deviceWidth * 0.9 * 0.3}
                                                    items = {page_item}
                                                    style = {styles.gridView}
                                                    spacing = {0}
                                                    renderItem = {item => (
                                                        <TouchableOpacity style={styles.component_view} onPress = {() => this.showDetailDriverInfo(item)}>
                                                            <View style = {{width: '100%', height: '40%', alignItems: 'flex-start', justifyContent: 'center'}}>
                                                                <Text style={[styles.name_text, {marginLeft: '10%'}]}>{item.first_name}</Text>
                                                            </View>
                                                            <View  style = {{width: '100%', height: '20%', justifyContent: 'center', alignItems: 'center'}}>
                                                                <Text style={styles.small_text}>{item.phonenumber}</Text>
                                                            </View>
                                                            <View  style = {{width: '100%', height: '20%', justifyContent: 'center', alignItems: 'center'}}>
                                                                <Star
                                                                    style = {{width: deviceWidth * 0.9 * 0.3 * 0.8, height: deviceWidth * 0.9 * 0.3 * 0.8 * 0.2}}
                                                                    score={item.rating}
                                                                />
                                                            </View>
                                                            <View  style = {{width: '100%', height: '20%', justifyContent: 'center', alignItems: 'flex-end'}}>
                                                                <Text style={[styles.small_text, {marginRight: '10%'}]}>{item.distance}</Text>
                                                            </View>
                                                        </TouchableOpacity>
                                                    )}
                                                />
                                            </View>
                                        )
                                    }
                                    </Swiper>
                                </View>
                            </View>
                            <TouchableOpacity style = {styles.banner_section} onPress = {() => this.onClickAds()}>
                            {
                                (this.state.ads_image !== '')&&
                                <Image style = {{width: '100%', height: '100%'}} resizeMode = {'stretch'} source = {{uri: this.state.ads_image}}/>
                            }
                            </TouchableOpacity>
                        {/* </ScrollView> */}
                    {/* </KeyboardAvoidingView> */}
                </ImageBackground>
            // </DismissKeyboard>
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
        width: '100%',
        height: mainSectionHeight,
        justifyContent: 'center',
        alignItems: 'center',
    },
    components_container: {
        width: '90%',
        height: deviceWidth * 0.9,
        alignItems: 'center',
        justifyContent: 'center',
        // marginVertical: deviceWidth * 0.1 * 0.25,
    },
    component_view: {
        backgroundColor: '#0a0f2c',
        alignItems: 'center',
        justifyContent: 'center',
        // width: deviceWidth * 0.9 * 0.3,
        height: deviceWidth * 0.9 * 0.3,
        borderWidth: 1,
        borderColor: '#ffffff'
    },
    gridView: {
        // paddingTop: 25,
        flex: 1,
        
      },
    name_text: {
        fontSize: 15,
        color: '#ffffff'
    },
    small_text: {
        fontSize: 13,
        color: '#ffffff'
    } ,
    paginationStyle: {
        position: 'absolute',
        bottom: 10,
        right: 10
    },
    paginationText: {
        color: 'white',
        fontSize: 20
    },
    banner_section: {
        // position: 'absolute',
        width: '100%',
        height: bannerHeight,
        bottom: 0,
        // backgroundColor: '#392b59',
    },
});
