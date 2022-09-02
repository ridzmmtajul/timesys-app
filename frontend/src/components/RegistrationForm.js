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
} from "react-native";
import Icon from "react-native-ico-material-design";

function RegistrationForm(props) {
  const [adminSecretKey, setAdminSecretKey] = useState("");
  const [employeeNo, setEmployeeNo] = useState("");
  const [name, setName] = useState("");
  const [office, setOffice] = useState("");
  const [division, setDivision] = useState("");

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const SERVER_URL = "http://192.168.1.137:94";

  function login() {
    const formData = {
      email: email,
      password: password,
    };

    props.onLogin(formData);
    // setName('');
    // setEmail('');
    // setPassword('');
  }

  function cancel() {
    props.closeModal();
  }

  function checkEmployeeNo(value) {
    setEmployeeNo(value);

    axios
      .get(`${SERVER_URL}/employee/${value}`)
      .then((response) => {
        const employee = response.data.employee;

        var fullName =
          employee.last_name +
          ", " +
          employee.first_name +
          " " +
          employee.middle_name;

        setName(fullName ? fullName : "");
        setOffice(employee.office ? employee.office.name : "");
        setDivision(employee.office_division ? employee.office_division.code : "");
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <Modal>
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
            onChangeText={checkEmployeeNo}
            value={employeeNo}
          />

          <View style={styles.employee}>
            <Text style={{ fontSize: 20 }}>{name}</Text>
            <Text>
              {office} {division && "- " + division}
            </Text>
          </View>

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
  employee: {
    borderWidth: 1,
    borderColor: "gray",
    padding: 10,
    margin: 10,
    borderRadius: 5,
    backgroundColor: "#F8F8F8",
    borderStyle: "dashed",
  },
});

export default RegistrationForm;
