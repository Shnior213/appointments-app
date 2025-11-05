import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import API from '../utils/api';

export default function RegisterScreen() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const handleRegister = async () => {
    if (!name || !phone || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    setLoading(true);
    try {
      await API.post('/api/auth/send-code', { phone });

      const handleVerification = () => {
        let attempts = 0;
        const verifyLoop = () => {
          if (attempts >= 3) {
            Alert.alert('Error', 'Too many incorrect attempts. Please request a new code.');
            setLoading(false);
            return;
          }
          Alert.prompt(
            'Phone Verification',
            'Enter the verification code you received via SMS',
            [
              {
                text: 'Confirm',
                onPress: async (code) => {
                  if (!code || code.length !== 4) {
                    Alert.alert('Error', 'Please enter a 4-digit code', [
                      { text: 'Try Again', onPress: () => verifyLoop() },
                      { text: 'Resend Code', onPress: async () => {
                        setLoading(true);
                        try {
                          await API.post('/api/auth/send-code', { phone });
                          Alert.alert('Success', 'Verification code resent');
                        } catch (err) {
                          Alert.alert('Error', 'Failed to resend code. Please try again later.');
                        }
                        setLoading(false);
                        attempts = 0;
                        verifyLoop();
                      }},
                    ]);
                    setLoading(false);
                    return;
                  }
                  try {
                    const verifyRes = await API.post('/api/auth/verify', { phone, code });
                    if (verifyRes.status === 200) {
                      try {
                        const res = await API.post('/api/auth/register', { name, phone, password });
                        if (res.status === 201) {
                          Alert.alert('Success', 'Registration and verification completed successfully!', [
                            { text: 'OK', onPress: () => navigation.navigate('Home') }
                          ]);
                        } else {
                          Alert.alert('Error', 'Registration failed');
                        }
                      } catch (regErr) {
                        Alert.alert('Error', 'Registration failed');
                      }
                      setLoading(false);
                    } else {
                      attempts++;
                      if (attempts >= 3) {
                        Alert.alert('Error', 'Too many incorrect attempts. Please request a new code.');
                        setLoading(false);
                        return;
                      }
                      Alert.alert('Error', 'Incorrect code', [
                        { text: 'Try Again', onPress: () => verifyLoop() },
                        { text: 'Resend Code', onPress: async () => {
                          setLoading(true);
                          try {
                            await API.post('/api/auth/send-code', { phone });
                            Alert.alert('Success', 'Verification code resent');
                          } catch (err) {
                            Alert.alert('Error', 'Failed to resend code. Please try again later.');
                          }
                          setLoading(false);
                          attempts = 0;
                          verifyLoop();
                        }},
                      ]);
                      setLoading(false);
                    }
                  } catch (err) {
                    if (err.response?.status === 403) {
                      Alert.alert('Error', 'Too many attempts. Your account was deleted. Please register again.');
                    } else if (err.response?.status === 400) {
                      attempts++;
                      if (attempts >= 3) {
                        Alert.alert('Error', 'Too many incorrect attempts. Please request a new code.');
                        setLoading(false);
                        return;
                      }
                      Alert.alert('Error', 'Incorrect code.', [
                        { text: 'Try Again', onPress: () => verifyLoop() },
                        { text: 'Resend Code', onPress: async () => {
                          setLoading(true);
                          try {
                            await API.post('/api/auth/send-code', { phone });
                            Alert.alert('Success', 'Verification code resent');
                          } catch (err) {
                            Alert.alert('Error', 'Failed to resend code. Please try again later.');
                          }
                          setLoading(false);
                          attempts = 0;
                          verifyLoop();
                        }},
                      ]);
                    } else {
                      Alert.alert('Error', 'Server error, please try again.');
                    }
                    setLoading(false);
                  }
                }
              }
            ],
            'plain-text',
            '',
            'number-pad'
          );
        };
        verifyLoop();
      };

      if (Alert.prompt) {
        handleVerification();
      } else {
        Alert.alert(
          'Verification Required',
          'Code input function is not supported on this device. Please contact support.'
        );
        setLoading(false);
      }
    } catch (error) {
      console.log('Send code error:', error?.response?.data || error.message);
      Alert.alert('Error', 'Failed to send verification code. Please try again later.');
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.backButtonContainer}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={28} color="#e85d04" />
        </TouchableOpacity>
      </View>
      <Text style={styles.header}>Register</Text>

      <TextInput
        style={styles.input}
        placeholder="Full Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Phone Number"
        value={phone}
        onChangeText={setPhone}
        keyboardType="phone-pad"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity style={styles.button} onPress={handleRegister} disabled={loading}>
        <Text style={styles.buttonText}>
          {loading ? 'Register...' : 'Register'}
        </Text>
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
  backButtonContainer: {
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 1,
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
});