import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import firebase from './firebase';

export default class Detail extends React.Component {
    render() {
        let { navigation } = this.props;
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>Details Screen</Text>
                {/* <TouchableOpacity
                    onPress={() => navigation.navigate('Home', {name: 'Aashir', id: 68})}
                >
                    <Text>
                        Go to Home
                    </Text>
                </TouchableOpacity> */}
            </View>
        );
    }
}