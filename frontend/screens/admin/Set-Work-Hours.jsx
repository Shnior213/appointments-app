import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

export default function SetWorkHoursScreen() {
  const navigation = useNavigation();
  const [hours, setHours] = useState({
    Sunday: { open: '', close: '' },
    Monday: { open: '', close: '' },
    Tuesday: { open: '', close: '' },
    Wednesday: { open: '', close: '' },
    Thursday: { open: '', close: '' },
    Friday: { open: '', close: '' },
  });

  const handleChange = (day, type, value) => {
    setHours(prev => ({
      ...prev,
      [day]: {
        ...prev[day],
        [type]: value
      }
    }));
  };

  const handleSave = () => {
    console.log('Saved hours:', hours);
  };

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={28} color="#e85d04" />
        <Text style={styles.backText}></Text>
      </TouchableOpacity>
      <Text style={styles.title}>Set Work Hours</Text>
      <Text style={styles.subtitle}>Set opening and closing hours for each day:</Text>

      {Object.entries(hours).map(([day, time]) => (
        <View key={day} style={styles.dayContainer}>
          <Text style={styles.dayTitle}>{day}</Text>
          <View style={styles.inputRow}>
            <TextInput
              style={styles.input}
              placeholder="Open (e.g. 09:00)"
              value={time.open}
              onChangeText={text => handleChange(day, 'open', text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Close (e.g. 18:00)"
              value={time.close}
              onChangeText={text => handleChange(day, 'close', text)}
            />
          </View>
        </View>
      ))}

      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Save Work Hours</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 20,
    backgroundColor: '#fff7ed',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#555',
    marginBottom: 20,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    padding: 8,
    marginBottom: 10,
  },
  backText: {
    color: '#e85d04',
    fontSize: 16,
    marginLeft: 5,
  },
  dayContainer: {
    marginBottom: 15,
  },
  dayTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 5,
  },
  inputRow: {
    flexDirection: 'row',
    gap: 10,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    fontSize: 14,
  },
  saveButton: {
    backgroundColor: '#e85d04',
    padding: 15,
    borderRadius: 10,
    marginTop: 30,
    marginBottom: 40,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});