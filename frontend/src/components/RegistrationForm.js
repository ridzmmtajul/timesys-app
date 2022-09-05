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
import AwesomeAlert from "react-native-awesome-alerts";
import { BASE_URL } from "@env";
import ScanAdminSecretKey from "./ScanAdminSecretKey";

function RegistrationForm(props) {
  const [adminSecretKey, setAdminSecretKey] = useState("");
  const [employeeNo, setEmployeeNo] = useState("");
  const [name, setName] = useState("");
  const [office, setOffice] = useState("");
  const [division, setDivision] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [showAlert, setShowAlert] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const [showDetail, setShowDetail] = useState(false);
  const [showScanner, setShowScanner] = useState(false);

  const SERVER_URL = "http://192.168.1.137:94";

  function register() {
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

        setShowDetail(true);
        setName(fullName ? fullName : "");
        setOffice(employee.office ? employee.office.name : "");
        setDivision(
          employee.office_division ? employee.office_division.code : ""
        );
      })
      .catch((error) => {
        console.log(error);

        setShowDetail(false);
      });
  }

  function getAdminSecretKey(value) {
    setAdminSecretKey(value);
    setShowScanner(false);
    console.log(value);
  }

  return (
    <Modal>
      <InputScrollView>
        <TouchableHighlight onPress={cancel} underlayColor="none">
          <Icon name="left-arrow-key" style={styles.closeButton} />
        </TouchableHighlight>

        <View style={{ margin: 50, marginLeft: 40 }}>
          <Text style={styles.title}>Registration</Text>
          <Text>Please enter all required fields</Text>
        </View>
        <View>
          <Text style={styles.label}>
            Admin Secret Key
            <Text style={styles.requiredInput}> *</Text>
          </Text>
          <View style={styles.scanSection}>
            <TextInput
              style={styles.scanIinput}
              placeholder="Admin Secret Key"
              onChangeText={setAdminSecretKey}
              value={adminSecretKey}
            />
            <TouchableHighlight
              onPress={() => setShowScanner(true)}
              underlayColor="gray"
            >
              <Icon
                name="switch-to-full-screen-button"
                style={styles.scanIcon}
                size={20}
                color="#000"
              />
            </TouchableHighlight>
          </View>

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

          {showDetail && (
            <View style={styles.employee}>
              <Text style={{ fontSize: 20 }}>{name}</Text>
              <Text>
                {office} {division && "- " + division}
              </Text>
            </View>
          )}

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

        <TouchableHighlight onPress={register} underlayColor="none">
          <Text style={styles.registerButton}>Register</Text>
        </TouchableHighlight>
      </InputScrollView>

      {showScanner && (
        <ScanAdminSecretKey setAdminSecretKey={getAdminSecretKey} />
      )}

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
    marginLeft: 30,
    marginRight: 30,
    marginTop: 10,
    borderWidth: 1,
    borderColor: "gray",
    padding: 15,
    fontSize: 20,
    backgroundColor: "white",
    borderRadius: 5,
  },
  registerButton: {
    backgroundColor: "#6B9FD0",
    padding: 10,
    color: "white",
    margin: 30,
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
    marginLeft: 30,
    marginTop: 10,
    marginBottom: -5,
  },
  requiredInput: {
    color: "red",
  },
  alert: {
    width: 200,
    height: 100,
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
  scanSection: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    marginTop: 15
  },
  scanIcon: {
    padding: 10,
    marginRight: 25,
    padding: 15,
    borderRadius: 5,
  },
  scanIinput: {
    flex: 1,
    padding: 10,
    backgroundColor: "#fff",
    color: "#424242",
    height: 50,
    marginLeft: 30,
    marginRight: 10,
    borderWidth: 1,
    borderColor: "gray",
    fontSize: 20,
    borderRadius: 5,
  },
});

export default RegistrationForm;
