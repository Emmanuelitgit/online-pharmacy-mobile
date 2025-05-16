import {
  Text,
  View,
  SafeAreaView,
  StyleSheet,
  Image,
  TextInput,
  Pressable,
  StatusBar,
  Alert,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { LoadingModal } from "react-native-loading-modal";
import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import * as Keychain from "react-native-keychain";
import { useContext } from "react";
import { AuthContext } from "../../Context/context";

const Login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [loading, setLoading] = useState(false)
  const { login, loading, isLoggedIn } = useContext(AuthContext);

  const handleChange = (key, value) => {
    if (key === "email") {
      setEmail(value);
    } else if (key === "password") {
      setPassword(value);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      if (isLoggedIn) {
        navigation.navigate("Products");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="white" barStyle="dark-content" />
      <Pressable
        style={styles.arrowIconContainer}
        onPress={() => navigation.goBack()}
      >
        <AntDesign name="arrowleft" size={24} color="black" />
      </Pressable>
      <View style={styles.itemsContainer}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>Log in to your account</Text>
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Email"
            style={styles.input}
            onChangeText={(value) => handleChange("email", value)}
            value={email}
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Password"
            style={styles.input}
            //  secureTextEntry
            onChangeText={(value) => handleChange("password", value)}
            value={password}
          />
          <Feather
            name="eye"
            size={24}
            color="black"
            style={styles.inputIcon}
          />
        </View>
        <View style={styles.forgotContainer}>
          <Text style={styles.forgotText}>Forgot password?</Text>
          <Text style={styles.clickHere}>click here</Text>
        </View>
        <Pressable onPress={handleLogin} style={styles.btnContainer}>
          <Text style={styles.btnText}>Login</Text>
        </Pressable>
        <Pressable
          onPress={() => navigation.navigate("Login")}
          style={styles.googleBtnContainer}
        >
          <View style={styles.googleTextImgContainer}>
            <Text style={styles.googlebtnText}>Login with Google</Text>
            <Image source={require("../../assets/google.png")} />
          </View>
        </Pressable>
        <View style={styles.dontHaveAccountContainer}>
          <Text>Dont have an account?</Text>
          <Text
            onPress={() => navigation.navigate("Register")}
            style={{
              color: "blue",
            }}
          >
            Register
          </Text>
        </View>
        {/* {loading && <LoadingModal modalVisible={true} />} */}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    height: "100%",
  },
  arrowIconContainer: {
    marginLeft: "7%",
    paddingTop: "10%",
  },
  itemsContainer: {
    alignItems: "center",
    width: "100%",
    height: "100%",
    paddingTop: "15%",
  },
  headerContainer: {
    display: "flex",
    paddingBottom: "5%",
  },
  headerText: {
    fontSize: 20,
  },
  inputContainer: {
    margin: "5%",
    width: "80%",
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    padding: "3%",
    width: "92%",
    paddingHorizontal: 10,
  },
  inputIconContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  forgotContainer: {
    marginRight: "24%",
    paddingTop: "3%",
    paddingBottom: "4%",
    display: "flex",
    flexDirection: "row",
  },
  forgotText: {},
  clickHere: {
    color: "blue",
    paddingLeft: "1%",
  },
  btnContainer: {
    backgroundColor: "blue",
    padding: "3%",
    width: "80%",
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: "7%",
    alignItems: "center",
  },
  googleBtnContainer: {
    backgroundColor: "white",
    padding: 5,
    width: "80%",
    height: 40,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
    alignItems: "center",
  },
  googleTextImgContainer: {
    display: "flex",
    flexDirection: "row",
    gap: 10,
  },
  btnText: {
    color: "white",
  },
  googlebtnText: {
    color: "black",
  },
  dontHaveAccountContainer: {
    display: "flex",
    flexDirection: "row",
    gap: 5,
  },
});
export default Login;
