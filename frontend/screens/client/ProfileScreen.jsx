import React, { useState, useEffect } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { BASE_URL } from '../../utils/constants';

export default function ProfileScreen() {
  const navigation = useNavigation();
  // User state
  const [user, setUser] = useState(null);
  const [appointments, setAppointments] = useState([
    { id: 1, date: '2025-06-10T10:00:00', staff: 'Dana' },
    { id: 2, date: '2025-06-06T14:00:00', staff: 'Avi' },
  ]);
  const [isEditing, setIsEditing] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);

  useEffect(() => {
    fetch(`${BASE_URL}/api/user`)
      .then(res => res.json())
      .then(data => setUser(data))
      .catch(err => console.error('Failed to load user:', err));
  }, []);

  if (!user) {
    return <Text>Loading...</Text>;
  }

  const handleSave = () => {
    const nameRegex = /^[A-Za-z\s]+$/;
    if (!user.name || !nameRegex.test(user.name)) {
      Alert.alert('Invalid Name', 'Please enter a valid name without numbers.');
      return;
    }

    const date = new Date(user.birthDate);
    if (isNaN(date.getTime())) {
      Alert.alert('Invalid Birth Date', 'Please enter a valid birth date (e.g. 2000-01-01).');
      return;
    }

    fetch(`${BASE_URL}/api/user`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user),
    })
      .then(res => res.json())
      .then(() => setIsEditing(false))
      .catch(err => console.error('Failed to update user:', err));
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={24} color="#e85d04" />
      </TouchableOpacity>
      {!isEditing && (
        <TouchableOpacity style={styles.editIcon} onPress={() => setIsEditing(true)}>
          <Ionicons name="create-outline" size={22} color="#e85d04" />
        </TouchableOpacity>
      )}
      <Text style={styles.title}>Profile</Text>

      {isEditing ? (
        <>
          <View style={styles.infoBox}>
            <Text style={styles.label}>Name:</Text>
            <TextInput
              style={styles.input}
              value={user.name}
              onChangeText={(text) => setUser({ ...user, name: text })}
            />
          </View>

          <View style={styles.infoBox}>
            <Text style={styles.label}>Birth Date:</Text>
            <TouchableOpacity
              style={styles.input}
              onPress={() => setShowDatePicker(true)}
            >
              <Text>{user.birthDate}</Text>
            </TouchableOpacity>
            {showDatePicker && (
              <DateTimePicker
                value={new Date(user.birthDate)}
                mode="date"
                display="default"
                onChange={(event, selectedDate) => {
                  setShowDatePicker(false);
                  if (selectedDate) {
                    const isoDate = selectedDate.toISOString().split('T')[0];
                    setUser({ ...user, birthDate: isoDate });
                  }
                }}
              />
            )}
          </View>

          <TouchableOpacity
            style={styles.saveButton}
            onPress={handleSave}
          >
            <Text style={styles.saveButtonText}>Save Changes</Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <View style={styles.infoBox}>
            <Text style={styles.label}>Name:</Text>
            <Text style={styles.value}>{user.name}</Text>
          </View>

          <View style={styles.infoBox}>
            <Text style={styles.label}>Phone:</Text>
            <Text style={styles.value}>{user.phone}</Text>
          </View>

          <View style={styles.infoBox}>
            <Text style={styles.label}>Birth Date:</Text>
            <Text style={styles.value}>{user.birthDate}</Text>
          </View>
        </>
      )}

      <Text style={styles.sectionTitle}>Your Appointments:</Text>
      {appointments.map((appt) => {
        const apptDate = new Date(appt.date);
        const now = new Date();
        const canCancel = (apptDate - now) / (1000 * 60 * 60 * 24) > 1;
        return (
          <View key={appt.id} style={styles.appointmentBox}>
            <Text style={styles.appointmentText}>
              {apptDate.toLocaleDateString()} at {apptDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} with {appt.staff}
            </Text>
            {canCancel && (
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() =>
                  Alert.alert(
                    'Cancel Appointment',
                    'Are you sure you want to cancel this appointment?',
                    [
                      { text: 'No', style: 'cancel' },
                      {
                        text: 'Yes',
                        onPress: () => {
                          fetch(`${BASE_URL}/api/appointments/${appt.id}`, {
                            method: 'DELETE',
                          })
                            .then(() => {
                              setAppointments(appointments.filter(a => a.id !== appt.id));
                            })
                            .catch(err => console.error('Failed to cancel appointment:', err));
                        },
                      },
                    ]
                  )
                }
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
            )}
          </View>
        );
      })}
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
    zIndex: 1,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#e85d04',
    marginBottom: 30,
  },
  infoBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffe5d0',
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
  },
  label: {
    fontWeight: 'bold',
    color: '#333',
    width: 90,
  },
  value: {
    color: '#333',
    flex: 1,
    marginLeft: 10,
  },
  input: {
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 6,
    flex: 1,
    marginLeft: 10,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  saveButton: {
    backgroundColor: '#e85d04',
    padding: 12,
    borderRadius: 8,
    marginTop: 10,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 30,
    marginBottom: 10,
    color: '#e85d04',
  },
  appointmentBox: {
    backgroundColor: '#ffe5d0',
    padding: 12,
    marginBottom: 10,
    borderRadius: 8,
  },
  appointmentText: {
    color: '#333',
  },
  cancelButton: {
    marginTop: 5,
    backgroundColor: '#ff4d4d',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  cancelButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  editIcon: {
    position: 'absolute',
    top: 40,
    right: 20,
    zIndex: 1,
    padding: 8,
  },
});
