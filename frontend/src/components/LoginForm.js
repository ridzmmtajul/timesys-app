import { useState } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  TouchableHighlight,
  Text,
} from "react-native";

function LoginForm(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function login(){
    const formData = {
      email: email,
      password: password
    }
    
    props.onLogin(formData);
    // setEmail('');
    // setPassword('');
  }

  return (
    <View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          onChangeText={setEmail}
          value={email}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          onChangeText={setPassword}
          value={password}
          secureTextEntry={true}
        />
      </View>

      <TouchableHighlight onPress={login} underlayColor="none">
        <Text style={styles.loginButton}>Login</Text>
      </TouchableHighlight>
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "column",
    margin: 20,
  },
  input: {
    height: 50,
    margin: 12,
    // borderWidth: 1,
    padding: 15,
    fontSize: 20,
    backgroundColor: "white",
    borderRadius: 15,
  },
  loginButton: {
    backgroundColor: "#6B9FD0",
    padding: 10,
    color: "white",
    marginLeft: 30,
    marginRight: 30,
    borderRadius: 10,
    fontSize: 20,
    textAlign: "center",
  },
});

export default LoginForm;
