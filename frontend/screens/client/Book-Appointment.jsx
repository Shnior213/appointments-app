import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';


export default function BookAppointmentScreen() {
  const navigation = useNavigation();
  const goBack = () => navigation.goBack();

  const [staffMembers, setStaffMembers] = useState([]);

  useEffect(() => {
    const sampleStaff = [
      {
        id: '1',
        name: 'Lemal Yamal',
        image: 'https://img.a.transfermarkt.technology/portrait/big/937958-1746563945.jpg?lm=1',
      },
      {
        id: '2',
        name: 'Lionel Messi',
        image: 'https://images.mykhel.com/webp/images/football/players/4/19054.jpg?v=4',
      },
    ];
    setStaffMembers(sampleStaff);
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