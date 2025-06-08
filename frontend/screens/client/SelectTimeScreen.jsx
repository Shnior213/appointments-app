import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert, Platform, TouchableOpacity, Image, ScrollView } from 'react-native';
// import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

export default function SelectTimeScreen({ route }) {
  const navigation = useNavigation();
  const { staff } = route.params;
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [selectedTime, setSelectedTime] = useState(null);
  const [availableTimes, setAvailableTimes] = useState(['09:00', '10:00', '11:00', '14:00', '15:00']);
  const [selectedTreatment, setSelectedTreatment] = useState('');

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Ionicons name="arrow-back" size={24} color="#e85d04" />
      </TouchableOpacity>
      <View style={styles.profileContainer}>
        <Image
          source={{ uri: staff.image || 'https://via.placeholder.com/100' }}
          style={styles.profileImage}
        />
      </View>
      <Text style={styles.title}>Book with {staff.name}</Text>
      <TouchableOpacity
        style={styles.viewProfileButton}
        onPress={() => navigation.navigate('StaffProfile', { staff })}
      >
        <Text style={styles.viewProfileButtonText}>View Full Profile</Text>
      </TouchableOpacity>
      <Text style={styles.subtitle}>Select Treatment</Text>
      <View style={styles.treatmentOptions}>
        {['Haircut', 'Shave', 'Hair Color'].map((treatment) => (
          <TouchableOpacity
            key={treatment}
            style={[
              styles.treatmentButton,
              selectedTreatment === treatment && styles.selectedTreatmentButton,
            ]}
            onPress={() => setSelectedTreatment(treatment)}
          >
            <Text
              style={[
                styles.treatmentText,
                selectedTreatment === treatment && styles.selectedTreatmentText,
              ]}
            >
              {treatment}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity style={styles.confirmButton} onPress={() => setShowPicker(true)}>
        <Text style={styles.confirmButtonText}>Choose Date</Text>
      </TouchableOpacity>
      {showPicker && (
        <View style={styles.pickerContainer}>
          <DateTimePicker
            value={selectedDate}
            mode="date"
            display="default"
            minimumDate={new Date()}
            onChange={(event, date) => {
              setShowPicker(false);
              if (date) setSelectedDate(date);
            }}
          />
        </View>
      )}
      <Text style={styles.selectedDate}>Selected: {selectedDate.toDateString()}</Text>

      <Text style={styles.subtitle}>Available Times</Text>
      <View style={styles.timesContainer}>
        {availableTimes.map(time => (
          <TouchableOpacity
            key={time}
            style={[
              styles.timeButton,
              selectedTime === time && styles.selectedTimeButton
            ]}
            onPress={() => setSelectedTime(time)}
          >
            <Text style={styles.timeButtonText}>{time}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <TouchableOpacity
        style={styles.confirmButton}
        onPress={() => {
          if (selectedTime && selectedTreatment) {
            Alert.alert(
              'Appointment Confirmed',
              `With ${staff.name}\nDate: ${selectedDate.toDateString()}\nTime: ${selectedTime}\nTreatment: ${selectedTreatment}`
            );
            setAvailableTimes(availableTimes.filter(time => time !== selectedTime));
            setSelectedTime(null);
            setSelectedTreatment('');
          } else {
            Alert.alert('Error', 'Please select a treatment and time first');
          }
        }}
      >
        <Text style={styles.confirmButtonText}>Confirm Appointment</Text>
      </TouchableOpacity>
      <Text style={styles.subtitle}>Gallery</Text>
      <ScrollView horizontal style={styles.galleryContainer}>
        {[1, 2, 3].map((_, index) => (
          <Image
            key={index}
            source={{ uri: 'https://via.placeholder.com/150' }}
            style={styles.galleryImage}
          />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff7f0',
    paddingVertical: 40,
    paddingHorizontal: 20,
    justifyContent: 'flex-start',
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 10,
  },
  profileContainer: {
    alignItems: 'center',
    marginBottom: 10,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: '#e85d04',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#e85d04',
    marginBottom: 20,
    textAlign: 'center',
  },
  selectedDate: {
    textAlign: 'center',
    marginTop: 10,
    fontSize: 16,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#e85d04',
    marginVertical: 15,
    textAlign: 'center',
  },
  timesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  pickerContainer: {
    alignItems: 'center',
    marginVertical: 10,
  },
  timeButton: {
    backgroundColor: '#fff',
    borderRadius: 15,
    paddingVertical: 8,
    paddingHorizontal: 12,
    margin: 5,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  selectedTimeButton: {
    backgroundColor: '#ffe8d6',
    borderColor: '#e85d04',
  },
  timeButtonText: {
    color: '#333',
    fontWeight: '500',
  },
  confirmButton: {
    backgroundColor: '#f78c2b',
    paddingVertical: 12,
    borderRadius: 20,
    marginTop: 25,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  confirmButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 15,
  },
  galleryContainer: {
    marginTop: 20,
  },
  galleryImage: {
    width: 150,
    height: 100,
    borderRadius: 10,
    marginRight: 10,
  },
  treatmentOptions: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 20,
  },
  treatmentButton: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    backgroundColor: '#fff',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 20,
    margin: 5,
  },
  selectedTreatmentButton: {
    backgroundColor: '#ffe8d6',
    borderColor: '#e85d04',
  },
  treatmentText: {
    fontSize: 14,
    color: '#333',
  },
  selectedTreatmentText: {
    color: '#e85d04',
    fontWeight: 'bold',
  },
  viewProfileButton: {
    backgroundColor: '#e85d04',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    alignSelf: 'center',
    marginBottom: 10,
  },
  viewProfileButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 14,
  },
});