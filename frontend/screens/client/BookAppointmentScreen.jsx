import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

import API from '../../utils/api';

export default function BookAppointmentScreen() {
  const navigation = useNavigation();
  const goBack = () => navigation.goBack();

  const [staffMembers, setStaffMembers] = useState([]);

  useEffect(() => {
    const fetchStaff = async () => {
      try {
        const response = await API.get('/staff');
        setStaffMembers(response.data);
      } catch (error) {
        console.error('Failed to load staff:', error);
      }
    };
    fetchStaff();
  }, []);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={goBack} style={styles.backButton}>
        <Ionicons name="arrow-back" size={24} color="#e85d04" />
      </TouchableOpacity>
      <Text style={styles.title}>Choose Your Stylist</Text>
      <View style={styles.staffList}>
        {staffMembers.map(member => (
          <TouchableOpacity
            key={member.id}
            style={styles.staffCard}
            onPress={() => navigation.navigate('SelectTime', { staff: member })}
          >
            <Image
              source={{ uri: member.image }}
              style={styles.staffImage}
            />
            <Text style={styles.staffName}>{member.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
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
    zIndex: 10,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#e85d04',
    marginBottom: 30,
  },
  staffList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 20,
  },
  staffCard: {
    alignItems: 'center',
    margin: 10,
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  staffImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  staffName: {
    fontSize: 16,
    color: '#333',
  },
});