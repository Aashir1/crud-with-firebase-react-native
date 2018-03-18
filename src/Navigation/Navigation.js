import React, { Component } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { StackNavigator, TabNavigator, TabBarBottom } from 'react-navigation';
import Setting from '../Component/setting';
import App from '../Component/App';
import Detail from '../Component/Detail';
import Signup from '../Component/signup';
import Welcome from '../Component/welcome';
import Login from '../Component/Login';

const HomeStack = StackNavigator({
    SignUp: {
        screen: Signup
    },
    LogIn:{
        screen: Login
    },
    Welcomes: {
        screen: Welcome
    },
    Home: {
        screen: App
    },
    Details: {
        screen: Detail
    },
});

const SettingStack = StackNavigator({
    Settings: {
        screen: Setting
    },
    Details: {
        screen: Detail
    },
    SingUp: {
        screen: Signup
    },
})

const RootStack = TabNavigator({
    Home: {
        screen: HomeStack,
    },
    Settings: {
        screen: SettingStack
    }
}
    // ,
    //     {
    //         initialRouteName: 'Details',
    //     }

    // );
    ,
    {
        navigationOptions: ({ navigation }) => ({
            tabBarIcon: ({ focused, tintColor }) => {
                const { routeName } = navigation.state;
                let iconName;
                if (routeName === 'Home') {
                    iconName = `ios-information-circle${focused ? '' : '-outline'}`;
                } else if (routeName === 'Details') {
                    iconName = `ios-options${focused ? '' : '-outline'}`;
                }

                // You can return any component that you like here! We usually use an
                // icon component from react-native-vector-icons
                return <Ionicons name={iconName} size={25} color={tintColor} />;
            },
        }),
        tabBarOptions: {
            activeTintColor: 'red',
            inactiveTintColor: 'gray',
        },
        tabBarComponent: TabBarBottom,
        tabBarPosition: 'bottom',
        animationEnabled: true,
        swipeEnabled: true,
    });


export default class Apps extends React.Component {
    render() {
        return <RootStack />
    }
}