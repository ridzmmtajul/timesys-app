import axios from "axios";
import { StyleSheet, Text, View, Image, Linking } from "react-native";
import Form from "./Form";
import {BASE_URL} from "@env";

function Login() {

  function onLogin(email, password) {
    console.log(email, password, BASE_URL);
    axios.post(`https://821e-58-71-12-18.ap.ngrok.io/api/login`, { params: {'email': email, 'password': password}})
    .then((response) => {
      console.log(response)
    })
    .catch((error) => {
      console.log(error)
    })
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.inline}>
          <Text style={styles.headerText1}>
            <Image
              style={styles.headerLogo}
              source={require("./../../../assets/logo-mini.png")}
            />
            Time
            <Text style={styles.headerText2}>Sys</Text>
          </Text>
        </View>
        <View style={styles.center}>
          <Image
            style={styles.bg2}
            source={require("./../../../assets/bg2.png")}
          />
        </View>
      </View>

      <View style={{ backgroundColor: "#0040C3", flex: 1 }}>
        <View style={styles.CircleShape1} />
        <View style={styles.CircleShape2} />
        <View style={{ marginTop: 15 }}>
          <Text style={styles.text1}>Login</Text>
          <Text style={styles.text2}>Please sign-in to continue</Text>
        </View>

        <Form onLogin={onLogin} />

        <View style={styles.inline}>
          <Text style={{ color: "white", marginLeft: 25 }}>
            Not yes registered?
            <Text
              style={styles.link}
              onPress={() => Linking.openURL("http://google.com")}
            >
              Register Now
            </Text>
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0040C3",
    justifyContent: "center",
  },
  bg2: {
    width: "80%",
    height: "80%",
    resizeMode: "contain",
    marginLeft: 25,
    marginTop: -50,
  },
  bgimage: {
    flex: 1,
    justifyContent: "center",
  },
  inline: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 10,
  },
  headerText1: {
    color: "#6B9FD0",
    fontSize: 30,
    fontWeight: "bold",
    padding: 25,
    marginTop: 30,
    marginBottom: 10,
  },
  headerText2: {
    color: "#2E266D",
    fontSize: 30,
    fontWeight: "bold",
  },
  headerLogo: {
    width: 30,
    height: 30,
    resizeMode: "stretch",
  },
  header: {
    backgroundColor: "white",
    flex: 1,
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
    zIndex: 1,
  },
  text1: {
    textAlign: "center",
    color: "white",
    fontSize: 30,
    fontWeight: "bold",
  },
  text2: {
    textAlign: "center",
    color: "white",
  },
  CircleShape1: {
    width: 150,
    height: 150,
    borderRadius: 150 / 2,
    backgroundColor: "rgba(0,0,0,0.1)",
    zIndex: 0,
    position: "absolute",
    marginLeft: 250,
    marginTop: -50,
  },
  CircleShape2: {
    width: 280,
    height: 280,
    borderRadius: 290 / 2,
    backgroundColor: "rgba(0,0,0,0.1)",
    zIndex: 0,
    position: "absolute",
    marginLeft: 120,
    marginTop: 30,
  },
  link: {
    color: "white",
    fontWeight: "bold",
    textDecorationLine: "underline",
  },
  center: {
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Login;
