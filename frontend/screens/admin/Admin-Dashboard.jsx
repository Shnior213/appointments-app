import jwtDecode from 'jwt-decode';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SUPER_ADMIN_PHONE } from '../../utils/constants';

export default function AdminDashboardScreen({ navigation }) {
  const [isSuperManager, setIsSuperManager] = useState(false);
  
  useEffect(() => {
    const fetchRole = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        if (token) {
          const base64Payload = token.split('.')[1];
          const decodedPayload = JSON.parse(atob(base64Payload));
          setIsSuperManager(decodedPayload.phone === SUPER_ADMIN_PHONE);
        }
      } catch (err) {
        console.log('Failed to decode token', err);
      }
    };

    fetchRole();
  }, []);

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={28} color="#e85d04" />
          <Text style={styles.backText}></Text>
        </TouchableOpacity>
      <Text style={styles.title}>Admin Dashboard</Text>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('SetWorkHours')}>
        <Text style={styles.buttonText}>🕒 Set Work Hours</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('ManageAppointments')}>
        <Text style={styles.buttonText}>📅 Manage Appointments</Text>
      </TouchableOpacity>

      {isSuperManager && (
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('ManageTeam')}>
          <Text style={styles.buttonText}>👥 Manage Team</Text>
        </TouchableOpacity>
      )}

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff7f0',
    padding: 20,
    paddingTop: 60,
    justifyContent: 'center',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#e85d04',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    color: '#555',
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#ff8c42',
    padding: 15,
    marginBottom: 15,
    borderRadius: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 16,
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
});