import React, { Component } from 'react';
import { Button, View, Text } from 'react-native';

export class Home extends Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Button
          title="Go to Registration"
          onPress={() => this.props.navigation.navigate('Registration')}
        />
      </View>
    )
  }
}

export default Home;