import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

export default function EditBusinessInfoScreen() {
  const navigation = useNavigation();
  const [name, setName] = useState('My Barbershop');
  const [address, setAddress] = useState('123 Main St');
  const [phone, setPhone] = useState('050-1234567');
  const [instagram, setInstagram] = useState('https://instagram.com/mybarbershop');

  const handleSave = () => {
    // בעתיד תוכל לשמור את הנתונים האלו ב-backend
    Alert.alert('Saved', `Business info updated:\nName: ${name}\nAddress: ${address}\nPhone: ${phone}\nInstagram: ${instagram}`);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={28} color="#e85d04" />
          <Text style={styles.backText}></Text>
        </TouchableOpacity>
      <Text style={styles.title}>Edit Business Name</Text>

      <TextInput
        style={styles.input}
        placeholder="Business Name"
        value={name}
        onChangeText={setName}
      />

      <TextInput
        style={styles.input}
        placeholder="Address"
        value={address}
        onChangeText={setAddress}
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
        placeholder="Instagram URL"
        value={instagram}
        onChangeText={setInstagram}
        keyboardType="url"
      />

      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>Save Name</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff7f0',
    padding: 20,
    justifyContent: 'center',
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    padding: 10,
    borderRadius: 5,
    zIndex: 1,
  },
  backButtonText: {
    fontSize: 16,
    color: '#333',
  },
  backButtonText: {
    fontSize: 16,
    color: '#333',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#e85d04',
    textAlign: 'center',
    marginBottom: 25,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ff8c42',
    borderRadius: 8,
    backgroundColor: '#fff',
    padding: 12,
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