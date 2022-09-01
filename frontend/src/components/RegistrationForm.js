import axios from "axios";
import { useState } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  TouchableHighlight,
  Text,
  Modal,
  ImageBackground,
  ScrollView,
  Alert,
} from "react-native";
import Icon from "react-native-ico-material-design";
import InputScrollView from "react-native-input-scroll-view";
import AwesomeAlert from 'react-native-awesome-alerts';
import { BASE_URL } from "@env";

function RegistrationForm(props) {
  const [adminSecretKey, setAdminSecretKey] = useState("");
  const [employeeNo, setEmployeeNo] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [showAlert, setShowAlert] = useState(false);
  const [showLoader, setShowLoader] = useState(false);

  function login() {
    setShowLoader(true);

    const formData = {
      admin_secret_key: adminSecretKey,
      employee_no: employeeNo,
      username: username,
      password: password,
    };

    axios
      .post(`${BASE_URL}/api/register`, formData)
      .then((response) => {
        console.log(response.data);
        setShowLoader(false);
        setShowAlert(true);
      })
      .catch((error) => {
        setShowLoader(false);
        console.log(error);
      });
  }

  function cancel() {
    props.closeModal();
  }

  return (
    <Modal>
      <InputScrollView>
        <ImageBackground
          source={require("./../../assets/bg1.png")}
          resizeMode="cover"
        >
          <TouchableHighlight onPress={cancel} underlayColor="none">
            <Icon name="left-arrow-key" style={styles.closeButton} />
          </TouchableHighlight>

          <View style={{ margin: 50, marginLeft: 40 }}>
            <Text style={styles.title}>Registration</Text>
            <Text>Please enter all required fields</Text>
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>
              Admin Secret Key
              <Text style={styles.requiredInput}> *</Text>
            </Text>
            <TextInput
              style={styles.input}
              placeholder="Admin Secret Key"
              onChangeText={setAdminSecretKey}
              value={adminSecretKey}
            />

            <Text style={styles.label}>
              Employee No.
              <Text style={styles.requiredInput}> *</Text>
            </Text>
            <TextInput
              style={styles.input}
              placeholder="Employee No."
              onChangeText={setEmployeeNo}
              value={employeeNo}
            />

            <Text style={styles.label}>
              Username
              <Text style={styles.requiredInput}> *</Text>
            </Text>
            <TextInput
              style={styles.input}
              placeholder="Username"
              onChangeText={setUsername}
              value={username}
            />

            <Text style={styles.label}>
              Password
              <Text style={styles.requiredInput}> *</Text>
            </Text>
            <TextInput
              style={styles.input}
              placeholder="Password"
              onChangeText={setPassword}
              value={password}
              secureTextEntry={true}
            />
          </View>

          <TouchableHighlight onPress={login} underlayColor="none">
            <Text style={styles.loginButton}>Register</Text>
          </TouchableHighlight>
        </ImageBackground>
      </InputScrollView>

      <AwesomeAlert
          show={showLoader}
          showProgress={true}
          closeOnTouchOutside={false}
          closeOnHardwareBackPress={false}
          title="Loading, please wait"
      />
      <AwesomeAlert
          show={showAlert}
          showProgress={false}
          title="Success"
          message="User successfully registered"
          closeOnTouchOutside={false}
          closeOnHardwareBackPress={false}
          contentStyle={styles.alert}
          showConfirmButton={true}
          confirmText="OK"
          confirmButtonColor="green"
          onConfirmPressed={cancel}
        />
    </Modal>
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
    borderWidth: 1,
    borderColor: "gray",
    padding: 15,
    fontSize: 20,
    backgroundColor: "white",
    borderRadius: 5,
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
  title: {
    color: "#6B9FD0",
    fontSize: 30,
    fontWeight: "bold",
  },
  closeButton: {
    fontSize: 30,
    marginTop: 20,
    marginLeft: 20,
    color: "gray",
  },
  label: {
    marginLeft: 15,
  },
  requiredInput: {
    color: "red",
  },
  alert: {
    width: 200,
    height: 100,
  }
});

export default RegistrationForm;
