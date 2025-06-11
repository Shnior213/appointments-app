import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { ADMIN_USER, CLIENT_USER } from "../utils/constants";
import API from "../utils/api";

export default function LoginScreen({ navigation }) {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("");

  useEffect(() => {
    if (userType === "admin") {
      navigation.navigate("Login");
    }
  }, [userType]);

  const handleLogin = () => {
    // דוגמה לבדיקה בסיסית לפי טלפון/סיסמה
    if (
      phone === `${ADMIN_USER.phone}` &&
      password === `${ADMIN_USER.password}`
    ) {
      navigation.navigate("AdminDashboard");
    } else if (
      phone === `${CLIENT_USER.phone}` &&
      password === `${CLIENT_USER.password}`
    ) {
      navigation.navigate("Home");
    } else {
      Alert.alert("Error", "Invalid credentials");
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="arrow-back" size={24} color="#e85d04" />
      </TouchableOpacity>
      <Text style={styles.header}>Login</Text>

      <TextInput
        style={styles.input}
        placeholder="Phone Number"
        value={phone}
        onChangeText={setPhone}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Register")}
      >
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff7f0",
    justifyContent: "center",
    padding: 20,
  },
  backButton: {
    position: "absolute",
    top: 50,
    left: 20,
    zIndex: 1,
  },
  header: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#e85d04",
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ff8c42",
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 8,
    marginBottom: 15,
  },
  button: {
    backgroundColor: "#ff8c42",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  link: {
    color: "#e85d04",
    textAlign: "center",
    marginTop: 15,
    textDecorationLine: "underline",
  },
});
