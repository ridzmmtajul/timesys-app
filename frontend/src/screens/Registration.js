import React from "react";
import { Button, SafeAreaView, StyleSheet, TextInput } from "react-native";
import axios from 'axios';
import {BASE_URL} from '@env';

const Registration = () => {
    const register = (name, email, password) => {
        axios.post(`${BASE_URL}/api/register`).then(response => {
            console.log(response.data);
        }).catch(e => {
            console.log(e.message);
        })
    }

  const [name, onChangeText] = React.useState(null);
  const [email, onChangeEmail] = React.useState(null);
  const [password, onChangeNumber] = React.useState(null);

  return (
    <SafeAreaView>
      <TextInput
        style={styles.input}
        onChangeText={onChangeText}
        placeholder="Full Name"
        value={name}
      />
      <TextInput
        style={styles.input}
        onChangeText={onChangeEmail}
        placeholder="Email Address"
        value={email}
      />
      <TextInput
        style={styles.input}
        onChangeText={onChangeNumber}
        value={password}
        placeholder="Password"
        keyboardType="numeric"
      />
      <Button
        title="Register"
        onPress={register}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});

export default Registration;