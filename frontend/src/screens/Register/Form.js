import React, { useState } from "react";
import { View, Button, SafeAreaView, StyleSheet, TextInput, } from "react-native";
import tw from 'tailwind-react-native-classnames';
import { useNavigation } from "@react-navigation/native";

const FormInputGroup = ({children}) => {
    return (
        <View style={tw`my-5`}>
            {children}
        </View>
    )
}

export default function Form({signup, onSubmit, error}) {
    const navigation = useNavigation(),
    screen = signup ? "Home" : "Registration";

    const [name, setName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");

    return(
        <SafeAreaView>
            <TextInput
                style={styles.input}
                onChangeText={setName}
                placeholder="Full Name"
                value={name}
            />

            <TextInput
                style={styles.input}
                onChangeText={setEmail}
                placeholder="Email Address"
                value={email}
            />

            <TextInput
                style={styles.input}
                onChangeText={setPassword}
                placeholder="Password"
                value={password}
                secureTextEntry={true}
            />

            <Button 
                text="Register" 
                onPress={onSubmit}
            />
        </SafeAreaView>
        /* <SafeAreaView>
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
        </SafeAreaView> */
    );
}

const styles = StyleSheet.create({
    input: {
      height: 40,
      margin: 12,
      borderWidth: 1,
      padding: 10,
    },
  });