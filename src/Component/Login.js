import React from 'react';
import { View, Text, TouchableOpacity, TextInput, Platform, Button } from 'react-native';
import firebase from './firebase';

export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            currentUser: ''
        }
        let { navigation } = this.props;
        console.log(navigation);
        // let { params } = this.props.navigation.state;
        // let name = params? params.name : null;
    }
    _onChangeText = (value, name) => {
        let obj = {};
        obj[`${name}`] = value;
        this.setState(obj);
    }
    _onSubmit = () => {
        alert('button clicked');
    }
    _signIn = () => {
        firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
        .then(user =>{
                this.setState({currentUser: firebase.auth().currentUser._user});
                this.props.navigation.navigate('Welcomes', {name: this.state.currentUser.displayName});
        })
        .catch(error=>{
            console.log(error.message);
        })
    }
    render() {
        // let { navigation } = this.props;
        return (
            <View style={{ flex: 1 }}>
                <Text>Login</Text>
                <TextInput
                    style={{ height: Platform.OS == 'android' ? 70 : 20 }}
                    onChangeText={(ev) => this._onChangeText(ev, 'email')}
                    placeholder="Email"
                    value={this.state.email}
                // onSubmitEditing={this._onSubmit}
                // underlineColorAndroid='transparent'
                />
                <TextInput
                    secureTextEntry={true}
                    style={{ height: Platform.OS == 'android' ? 70 : 20 }}
                    onChangeText={(ev) => this._onChangeText(ev, 'password')}
                    placeholder="Password"
                    value={this.state.password}
                // onSubmitEditing={this._onSubmit}
                // underlineColorAndroid='transparent'
                />
                <Button onPress={this._signIn} title="Login" />
            </View>
        );
    }
}