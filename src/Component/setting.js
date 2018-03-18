import React from 'react';
import { View, Text, TouchableOpacity, Button } from 'react-native';

export default class Setting extends React.Component {
    render() {
        let { navigation } = this.props;
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>Setting Screen</Text>
                <Button
                    onPress={() => navigation.navigate('Home')}
                    title="GoTo Home"
                />
                <TouchableOpacity
                    onPress={() => navigation.navigate('Details', { name: 'Aashir', id: 68 })}
                >
                    <Text>
                        Go to Details
                    </Text>
                </TouchableOpacity>
            </View>
        );
    }
}