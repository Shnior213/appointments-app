

import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import API from '../utils/api';

export default function LoginScreen({ navigation }) {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (!id || !password) {
      Alert.alert('Error', 'Please enter both ID and password');
      return;
    }

    try {
      const response = await API.post('/auth/login', {
        phone: id,
        password
      });

      if (response.status === 200) {
        Alert.alert('Success', 'Logged in successfully');
        // ניתן לשמור את פרטי המשתמש כאן
        navigation.navigate('Home');
      } else {
        Alert.alert('Error', 'Login failed');
      }
    } catch (error) {
      Alert.alert('Error', error.response?.data?.message || 'Login failed');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Login</Text>

      <TextInput
        style={styles.input}
        placeholder="ID"
        value={id}
        onChangeText={setId}
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

      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
        <Text style={styles.link}>Don't have an account? Register</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff7f0',
    justifyContent: 'center',
    padding: 20,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#e85d04',
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ff8c42',
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#ff8c42',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  link: {
    color: '#e85d04',
    textAlign: 'center',
    marginTop: 15,
    textDecorationLine: 'underline',
  },
});