

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';

const AppointmentCard = ({ appointment, onCancel }) => {
  const { date, time, staffName, treatment } = appointment;

  const handleCancel = () => {
    Alert.alert(
      'Cancel Appointment',
      'Are you sure you want to cancel this appointment?',
      [
        { text: 'No', style: 'cancel' },
        { text: 'Yes', onPress: () => onCancel(appointment._id) },
      ]
    );
  };

  return (
    <View style={styles.card}>
      <Text style={styles.title}>{staffName}</Text>
      <Text style={styles.detail}>Treatment: {treatment}</Text>
      <Text style={styles.detail}>Date: {date}</Text>
      <Text style={styles.detail}>Time: {time}</Text>
      <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
        <Text style={styles.cancelButtonText}>Cancel</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 16,
    marginVertical: 8,
    elevation: 2,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  detail: {
    fontSize: 16,
    marginBottom: 2,
  },
  cancelButton: {
    marginTop: 10,
    backgroundColor: '#ff4444',
    paddingVertical: 8,
    borderRadius: 6,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default AppointmentCard;