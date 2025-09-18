import React, { useState, useEffect } from 'react';
import API from '../../utils/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { SALON_IMAGE } from '../../utils/constants';


export default function BookAppointmentScreen() {
  const navigation = useNavigation();
  const goBack = () => navigation.goBack();

  const [staffMembers, setStaffMembers] = useState([]);

useEffect(() => {
  const fetchStaff = async () => {
    try {
      const [managersRes, usersRes] = await Promise.all([
        API.get('/api/managers'),
        API.get('/api/auth/users'),
      ]);

      const userMap = usersRes.data.reduce((acc, user) => {
        acc[user._id] = user;
        return acc;
      }, {});

      const staffWithDetails = managersRes.data.map(manager => {
        const user = userMap[manager.user._id || manager.user] || {};
        return {
          _id: manager.managerId || manager._id,
          userId: manager.user._id || manager.user,
          name: user.name || 'Unknown',
          image: user.profileImage || '',
          managerId: manager._id,
        };
      });

      setStaffMembers(staffWithDetails);
    } catch (err) {
      console.error('Failed to load staff members:', err);
    }
  };

  fetchStaff();
}, []);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={goBack} style={styles.backButton}>
        <Ionicons name="arrow-back" size={28} color="#e85d04" />
      </TouchableOpacity>
      <Text style={styles.title}>Choose Your Stylist</Text>
      <View style={styles.staffList}>
        {staffMembers.map(member => (
          <TouchableOpacity
            key={member._id}
            style={styles.staffCard}
            onPress={() => {
              console.log('Going to SelectTime with managerId:', member.managerId, 'userId:', member.userId);
                navigation.navigate('SelectTime', {
                staff: { _id: member.managerId, name: member.name, image: member.image }
              });
            }}
          >
            <Image
              source={{ uri: member.image || SALON_IMAGE }}
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
    width: 140,
  },
  staffImage: {
    width: 120,
    height: 120,
    borderRadius: 50,
    marginBottom: 10,
  },
  staffName: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
  },
});