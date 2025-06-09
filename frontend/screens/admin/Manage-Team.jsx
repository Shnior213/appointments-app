import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert, TextInput } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { BASE_URL } from '../../utils/constants';

export default function ManageTeamScreen() {
  const navigation = useNavigation();
  const [team, setTeam] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newMember, setNewMember] = useState({ name: '', role: '', profileImage: ''});

  useEffect(() => {
    axios.get(`${BASE_URL}/staff`)
      .then(res => setTeam(res.data))
      .catch(err => console.error('Failed to fetch staff:', err));
  }, []);

  const handleDelete = (id) => {
    Alert.alert(
      'Remove Team Member',
      'Are you sure you want to remove this person?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Remove',
          style: 'destructive',
          onPress: async () => {
            try {
              await axios.delete(`${BASE_URL}/staff/${id}`);
              setTeam(prev => prev.filter(member => member._id !== id));
            } catch (err) {
              console.error('Failed to delete:', err);
            }
          },
        },
      ]
    );
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <View>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.role}>{item.role}</Text>
      </View>
      <TouchableOpacity style={styles.deleteButton} onPress={() => handleDelete(item._id)}>
        <Text style={styles.deleteText}>Remove</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#e85d04" />
          <Text style={styles.backText}></Text>
        </TouchableOpacity>
      <Text style={styles.title}>Manage Team</Text>
      <TouchableOpacity style={styles.addButton} onPress={() => setShowModal(true)}>
        <Text style={styles.addButtonText}>+ Add Team Member</Text>
      </TouchableOpacity>
      <FlatList
        data={team}
        keyExtractor={(item) => item._id}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
      />
      {showModal && (
        <View style={styles.modal}>
          <Text style={styles.modalTitle}>New Team Member</Text>
          <TextInput
            style={styles.input}
            placeholder="Name"
            value={newMember.name}
            onChangeText={(text) => setNewMember({ ...newMember, name: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Role"
            value={newMember.role}
            onChangeText={(text) => setNewMember({ ...newMember, role: text })}
          />
          <TouchableOpacity style={styles.imagePicker}>
            <Text style={styles.imagePickerText}>Upload Profile Image</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.imagePicker}>
            <Text style={styles.imagePickerText}>Upload Gallery Images</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.saveButton}
            onPress={async () => {
              try {
                const res = await axios.post(`${BASE_URL}/staff`, newMember);
                setTeam([...team, res.data]);
                setNewMember({ name: '', role: '', profileImage: '', gallery: [] });
                setShowModal(false);
              } catch (err) {
                console.error('Failed to add member:', err);
              }
            }}
          >
            <Text style={styles.saveButtonText}>Save</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  backText: {
    fontSize: 16,
    color: '#e85d04',
    marginLeft: 5,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff7f0',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#e85d04',
    textAlign: 'center',
    marginBottom: 20,
  },
  addButton: {
    alignSelf: 'center',
    backgroundColor: '#e85d04',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginBottom: 15,
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
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
  role: {
    color: '#555',
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
  modal: {
    position: 'absolute',
    top: 100,
    left: 20,
    right: 20,
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  imagePicker: {
    backgroundColor: '#f2f2f2',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  imagePickerText: {
    color: '#555',
  },
  saveButton: {
    backgroundColor: '#e85d04',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});