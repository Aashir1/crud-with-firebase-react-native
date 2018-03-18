import React from 'react';
import { View, Text, TouchableOpacity, TextInput, Platform, Button } from 'react-native';
import firebase from './firebase';

export default class Signup extends React.Component {
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
        firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then(user =>{
            console.log(this.props.navigation);
            user.updateProfile({
                displayName: 'Aashir Khan'
            })
            .then(users=>{
                this.setState({currentUser: firebase.auth().currentUser._user});
                console.log(user);
                this.props.navigation.navigate('Welcomes', {name: this.state.currentUser.displayName});
            })
        })
        .catch(error=>{
            console.log(error.message);
        })
    }
    render() {
        // let { navigation } = this.props;
        return (
            <View style={{ flex: 1 }}>
                <Text>SignUp</Text>
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
                <Button onPress={this._signIn} title="Signup" />
            </View>
        );
    }
}

