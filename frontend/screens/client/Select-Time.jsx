import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert, TouchableOpacity, Image, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

import API from '../../utils/api'; 
import { SALON_IMAGE } from '../../utils/constants';

export default function SelectTimeScreen({ route }) {
  const navigation = useNavigation();
  const { staff } = route.params;
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(null);
  const [availableTimes, setAvailableTimes] = useState([]);
  const [selectedTreatment, setSelectedTreatment] = useState('');
  const [treatments, setTreatments] = useState(["haircut : 60₪", "beard : 40₪" , "Shave : 40₪" , "Haircut + Beard : 70₪"]);

  const [availableDates, setAvailableDates] = useState([]);

  
  useEffect(() => {
    const today = new Date();
    const dates = [];
    for (let i = 0; i < 7; i++) {
      const nextDate = new Date(today);
      nextDate.setDate(today.getDate() + i);
      dates.push(nextDate);
    }
    setAvailableDates(dates);
  }, []);

useEffect(() => {
  const fetchAvailability = async () => {
    try {
      const res = await API.get(`/api/work-hours/manager/${staff._id}`);
      const workHours = res.data.times; 

      const selectedDay = selectedDate.getDay(); 

      const todayHours = workHours.find(hour => Number(hour.dayOfWeek) === selectedDay);

      if (!todayHours || !todayHours.from || !todayHours.to) {
        setAvailableTimes([]);
        return;
      }

      const [fromHour, fromMinute] = todayHours.from.split(':').map(Number);
      const [toHour, toMinute] = todayHours.to.split(':').map(Number);

      const times = [];
      let currentHour = fromHour;
      let currentMinute = fromMinute;

      while (currentHour < toHour || (currentHour === toHour && currentMinute < toMinute)) {
        const hourStr = currentHour.toString().padStart(2, '0');
        const minStr = currentMinute.toString().padStart(2, '0');
        times.push(`${hourStr}:${minStr}`);

        currentMinute += 30;
        if (currentMinute >= 60) {
          currentMinute = 0;
          currentHour += 1;
        }
      }


      const now = new Date();
      const isToday = selectedDate.toDateString() === now.toDateString();

      const filteredTimes = isToday
        ? times.filter(time => {
            const [hour, minute] = time.split(':').map(Number);
            return hour > now.getHours() || (hour === now.getHours() && minute > now.getMinutes());
          })
        : times;

      setAvailableTimes(filteredTimes);

      const resAppointments = await API.get(`/api/appointments/manager/${staff._id}?date=${selectedDate.toISOString().split('T')[0]}`);
      const takenTimes = resAppointments.data.map(appt => {
        const apptDate = new Date(appt.dateTime);
        return apptDate.toTimeString().slice(0, 5); 
      });

      const finalAvailableTimes = filteredTimes.filter(time => !takenTimes.includes(time));

      setAvailableTimes(finalAvailableTimes);
    } catch (err) {
      console.error('Failed to load availability', err);
      setAvailableTimes([]);
    }
  };

  fetchAvailability();
}, [selectedDate, staff._id]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Ionicons name="arrow-back" size={24} color="#e85d04" />
      </TouchableOpacity>
      <View style={styles.profileContainer}>
        <Image
          source={{ uri: staff.image || SALON_IMAGE }}
          style={styles.profileImage}
        />
      </View>
      <Text style={styles.title}>Book with {staff.name}</Text>
      
      <Text style={styles.subtitle}>Select Treatment</Text>

      <View style={styles.treatmentOptions}>
        {treatments.map((treatment) => (
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

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginVertical: 10 }}>
        {availableDates.map(date => (
          <TouchableOpacity
            key={date.toDateString()}
            style={[
              styles.dayButton,
              selectedDate.toDateString() === date.toDateString() && styles.selectedTimeButton
            ]}
            onPress={() => setSelectedDate(date)}
          >
            <Text style={styles.dayButtonText}>{date.toDateString().slice(0, 10)}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <Text style={styles.selectedDate}>Selected: {selectedDate.toDateString()}</Text>

      <Text style={styles.subtitle}>Available Times</Text>

      <View style={styles.timesContainer}>
        {availableTimes.length === 0 ? (
          <View style={styles.closeContainer}>
            <Text style={styles.closeText}>CLOSE</Text>
          </View>
        ) : (
          availableTimes.map(time => (
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
          ))
        )}
      </View>
      <TouchableOpacity
        style={styles.confirmButton}
        onPress={async () => {
          if (selectedTime && selectedTreatment) {
            console.log('staff:', staff);
            console.log('staff._id', staff._id);

            try {
              const token = await AsyncStorage.getItem('token');
              console.log('📦 token from AsyncStorage:', token);

              await API.post('/api/appointments', {
                manager: staff._id,
                dateTime: new Date(`${selectedDate.toISOString().split('T')[0]}T${selectedTime}:00`),
                serviceType: selectedTreatment,
              }, {
                headers: {
                  Authorization: `Bearer ${token}`
                }
              });

              Alert.alert(
                'Appointment Confirmed',
                `With ${staff.name}\nDate: ${selectedDate.toDateString()}\nTime: ${selectedTime}\nTreatment: ${selectedTreatment}`
              );
              setAvailableTimes(availableTimes.filter(time => time !== selectedTime));
              setSelectedTime(null);
              setSelectedTreatment('');
            } catch (error) {
              console.error('Failed to create appointment', error);
              Alert.alert('Error', 'Failed to confirm appointment. Please try again.');
            }
          } else {
            Alert.alert('Error', 'Please select a treatment and time first');
          }
        }}
      >
        <Text style={styles.confirmButtonText}>Confirm Appointment</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
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
  dayButton: {
    width: 100,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    marginHorizontal: 5,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  dayButtonText: {
    fontSize: 14,
    color: '#333',
  },
  closeContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 60,
    marginVertical: 10,
  },
  closeText: {
    fontSize: 20,
    color: '#e85d04',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});