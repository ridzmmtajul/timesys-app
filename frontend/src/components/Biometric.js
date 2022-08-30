import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView, Button, Alert, TouchableHighlight } from 'react-native';
import React, { useState, useEffect } from 'react';
import * as LocalAuthentication from 'expo-local-authentication';

export default function App() {

  const [isBiometricSupported, setIsBiometricSupported] = useState(false);

  useEffect(() => {
    (async () => {
      const compatible = await LocalAuthentication.hasHardwareAsync();
      setIsBiometricSupported(compatible);
    })();
  });

  const fallBackToDefaultAuth = () => {
    console.log('fall back to password authentication');
  };

  const alertComponent = (title, mess, btnTxt, btnFunc) => {
    return Alert.alert(title, mess, [
      {
        text: btnTxt,
        onPress: btnFunc,
      }
    ]);
  };

  const TwoButtonAlert = () => {
    Alert.alert('Welcome To App', 'Subscribe Now', [
      {
        text: 'Back',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel'
      },
      {
        text: 'OK', 
        onPress: () => console.log('OK Pressed')
      },
    ]);
  }

  const handleBiometricAuth = async () => {
    const isBiometricAvailable = await LocalAuthentication.hasHardwareAsync();

    if(!isBiometricAvailable){
      return alertComponent(
        'Please Enter Your Password',
        'Biometric Auth not supported',
        'Ok',
        () => fallBackToDefaultAuth()
      );
    }

    let supportedBiometrics;
    if (!isBiometricAvailable){
      supportedBiometrics = await LocalAuthentication.supportedAuthenticationTypesAsync();
    }

    const savedBiometrics = await LocalAuthentication.isEnrolledAsync();
    if(!savedBiometrics){
      return alertComponent(
        'Biometric record not found',
        'Please login with password',
        'Ok',
        () => fallBackToDefaultAuth()
      );
    }

    const biometricAuth = await LocalAuthentication.authenticateAsync({
      promptMessage: 'Login with biometrics',
      cancelLabel: 'cancel',
      disableDeviceFallback: true,
    });

    if(biometricAuth) { TwoButtonAlert()};
    console.log({isBiometricAvailable});
    console.log({supportedBiometrics});
    console.log({savedBiometrics});
    console.log({biometricAuth});
  };
  
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Text>
            {isBiometricSupported
            ? 'Your Device is compatible with Biometrics'
            : 'Face or Fingerprint scanner is available on this device'
            }
        </Text>
        <TouchableHighlight
          style={{
            height:60,
            marginTop: 200
          }}
        >
          <Button
            title='Login with Biometrics'
            color='Black'
            onPress={handleBiometricAuth}
          />
        </TouchableHighlight>
        <StatusBar />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight
  },
});
