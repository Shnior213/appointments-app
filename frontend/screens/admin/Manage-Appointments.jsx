import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../../utils/api';

export default function ManageAppointmentsScreen() {
  const navigation = useNavigation();

  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        const { data } = await api.get('api/appointments', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setAppointments(data);
      } catch (err) {
        console.error('Failed to fetch appointments:', err);
      }
    };

    fetchAppointments();
  }, []);

  const handleDelete = (id) => {
    Alert.alert(
      'Delete Appointment',
      'Are you sure you want to delete this appointment?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            const token = await AsyncStorage.getItem('token');
            api.delete(`api/appointments/${id}`, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            })
              .then(() => {
                setAppointments(prev => prev.filter(app => app._id !== id));
              })
              .catch(err => console.error('Failed to delete appointment:', err));
          },
        },
      ]
    );
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <View>
        <Text style={styles.name}>Client: {item.client?.name || 'Unknown'}</Text>
        <Text style={styles.details}>
          {new Date(item.dateTime).toLocaleString()}
        </Text>
        <Text style={styles.details}>Service: {item.serviceType}</Text>
      </View>
      <TouchableOpacity style={styles.deleteButton} onPress={() => handleDelete(item._id)}>
        <Text style={styles.deleteText}>Delete</Text>
      </TouchableOpacity>
    </View>
  );
  
  return (
    <View style={styles.container}>

      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={28} color="#e85d04" />
          <Text style={styles.backText}></Text>
        </TouchableOpacity>
      </View>
      
      <Text style={styles.title}>Manage Appointments</Text>
      <FlatList
        data={appointments}
        keyExtractor={(item) => item._id}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff7f0',
    padding: 20,
  },
  header: {
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#e85d04',
    textAlign: 'center',
    marginBottom: 20,
  },
  list: {
    paddingBottom: 20,
  },
  card: {
    backgroundColor: '#ffe5d0',
    padding: 15,
    marginBottom: 12,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  details: {
    color: '#555',
  },
  updateButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginTop: 5,
  },
  updateText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  deleteButton: {
    backgroundColor: '#ff4d4d',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  deleteText: {
    color: '#fff',
    fontWeight: 'bold',
  },
backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  backText: {
    fontSize: 18,
    color: '#e85d04',
  },
});