import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function RegisterScreen() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [password, setPassword] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const navigation = useNavigation();

  const handleRegister = () => {
    if (!name || !phone || !birthDate || !password) {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }
    const nameRegex = /^[A-Za-zא-ת\s]+$/;
    if (!nameRegex.test(name)) {
      Alert.alert('Invalid Name', 'Name must not contain numbers or special characters');
      return;
    }

    Alert.alert('Success', 'Registered successfully');
    navigation.navigate('Home');
  };

  return (
    <View style={styles.container}>
      <View style={styles.backButtonContainer}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#e85d04" />
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
      <TouchableOpacity style={styles.input} onPress={() => setShowDatePicker(true)}>
        <View pointerEvents="none">
          <TextInput
            placeholder="Birth Date"
            style={{ color: birthDate ? '#000' : '#999' }}
            value={birthDate}
            editable={false}
          />
        </View>
      </TouchableOpacity>
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      {showDatePicker && (
        <DateTimePicker
          value={new Date()}
          mode="date"
          display="default"
          maximumDate={new Date(new Date().setFullYear(new Date().getFullYear() - 16))}
          onChange={(event, selectedDate) => {
            setShowDatePicker(false);
            if (selectedDate) {
              const day = selectedDate.getDate().toString().padStart(2, '0');
              const month = (selectedDate.getMonth() + 1).toString().padStart(2, '0');
              const year = selectedDate.getFullYear();
              setBirthDate(`${day}/${month}/${year}`);
            }
          }}
        />
      )}

      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Register</Text>
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