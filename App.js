// /**
//  * Sample React Native App
//  * https://github.com/facebook/react-native
//  *
//  * @format
//  * @flow
//  */

// import React, {Component} from 'react';
// import {Platform, StyleSheet, Text, View} from 'react-native';

// const instructions = Platform.select({
//   ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
//   android:
//     'Double tap R on your keyboard to reload,\n' +
//     'Shake or press menu button for dev menu',
// });

// type Props = {};
// export default class App extends Component<Props> {
//   render() {
//     return (
//       <View style={styles.container}>
//         <Text style={styles.welcome}>Welcome to React ggggggggg!</Text>
//         <Text style={styles.instructions}>To get started, edit App.js</Text>
//         <Text style={styles.instructions}>{instructions}</Text>
//       </View>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#F5FCFF',
//   },
//   welcome: {
//     fontSize: 20,
//     textAlign: 'center',
//     margin: 10,
//   },
//   instructions: {
//     textAlign: 'center',
//     color: '#333333',
//     marginBottom: 5,
//   },
// });



import React, {Component} from 'react';
import { StyleSheet, Text, View, Navigator, BackHandler, Alert } from 'react-native';

import { createStackNavigator, createAppContainer} from 'react-navigation';

import SignIn from './src/pages/SignIn';
import SignUp from './src/pages/SignUp';
import Home from './src/pages/Home';
import DriverDetail from './src/pages/DriverDetail';
import ForgetPassword from './src/pages/ForgetPassword';
import DisplayImage from './src/pages/DisplayImage';


const AppStackNavigation = createStackNavigator(
    {
        SignIn: {screen: SignIn},
        SignUp: {screen: SignUp},
        Home: {screen: Home},
        DriverDetail: {screen: DriverDetail},
        ForgetPassword: {screen: ForgetPassword},
        DisplayImage: {screen: DisplayImage}
    }
)

const AppContainer = createAppContainer(AppStackNavigation);

function getActiveRouteName(navigationState) {
    if (!navigationState) {
      return null;
    }
    const route = navigationState.routes[navigationState.index];
    // dive into nested navigators
    if (route.routes) {
      return getActiveRouteName(route);
    }
    return route.routeName;
} 

export default class App extends Component {

    constructor(props) {
        super(props);

    };

    componentDidMount() {
        this.backButtonListener = BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
    };

    handleBackButton = () => {
        Alert.alert('Notice!', 'Do you really want to exit?',
            [
                {text: 'Cancel', onPress: null},
                {text: 'Ok', onPress: () => BackHandler.exitApp()}
            ],
            { cancelable: true }
        );
        return true;
};

    render() {
        return(
            <AppContainer
                onNavigationStateChange={(prevState, currentState) => {
                    const currentScreen = getActiveRouteName(currentState);
                    if(currentScreen !== 'Home') {
                        this.backButtonListener.remove();
                    } else {
                        this.backButtonListener = BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
                    }
                    // console.log(Global.currentScreen);
                }}
            />
        )
    }

}

// export default AppContainer;
