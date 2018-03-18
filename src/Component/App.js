import React from 'react';
import { View, Text, TouchableOpacity, Button } from 'react-native';

export default class App extends React.Component {
  render() {
    let { navigation } = this.props;
    let { params } = this.props.navigation.state;
    let name = params ? params.name : null;
    let id = params ? params.id : 0;
    console.log(params);
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Home Screen</Text>
        <Text>Name: {JSON.stringify(name)}</Text>
        <Text>Id: {JSON.stringify(id)}</Text> 
        <Button 
          onPress={()=> navigation.navigate('Settings') } 
          title = "GoTo Settings"  
        />
        <Button 
          onPress={()=> navigation.navigate('SignUp') } 
          title = "GoTo SignUp"  
        />
        <Button 
          onPress={()=> navigation.navigate('LogIn') } 
          title = "GoTo Login"  
        />
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Details')
          }}
        >
          <Text>
            Go to Details
          </Text>
        </TouchableOpacity>
      </View>
        );
  }
}