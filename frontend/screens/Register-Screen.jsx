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
      Alert.alert('שגיאה', 'אנא מלא את כל השדות');
      return;
    }

    setLoading(true);
    try {
      const res = await API.post('/api/auth/register', { name, phone, password });

      if (res.status === 201) {
        Alert.alert('הצלחה', 'נרשמת בהצלחה!');
        navigation.navigate('Home');
      }
    } catch (error) {
      console.log('Register error:', error?.response?.data || error.message);
    
      if (error.response?.status === 400) {
        Alert.alert('שגיאה', 'המשתמש כבר קיים או שהנתונים שגויים');
      } else {
        Alert.alert('שגיאה', 'שגיאה בשרת, נסה שוב מאוחר יותר');
      }
    }finally {
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