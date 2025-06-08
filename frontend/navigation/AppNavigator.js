import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import ClientWelcomeScreen from '../screens/client/ClientWelcomeScreen';
import BookAppointmentScreen from '../screens/client/BookAppointmentScreen';
import StaffProfile from '../screens/client/StaffProfile';
import AdminDashboardScreen from '../screens/admin/AdminDashboardScreen';
import EditBusinessInfoScreen from '../screens/admin/EditBusinessInfoScreen';
import SetWorkHoursScreen from '../screens/admin/SetWorkHoursScreen';
import ManageAppointmentsScreen from '../screens/admin/ManageAppointmentsScreen';
import ManageTeamScreen from '../screens/admin/ManageTeamScreen';
import ManageGalleryScreen from '../screens/admin/ManageGalleryScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ title: 'קביעת תורים' }}
      />
      <Stack.Screen
        name="ClientWelcome"
        component={ClientWelcomeScreen}
        options={{ title: 'Welcome' }}
      />
      <Stack.Screen
        name="BookAppointment"
        component={BookAppointmentScreen}
        options={{ title: 'Book Appointment' }}
      />
      <Stack.Screen
        name="StaffProfile"
        component={StaffProfile}
        options={{ title: 'Staff Member' }}
      />
      <Stack.Screen
        name="AdminDashboard"
        component={AdminDashboardScreen}
        options={{ title: 'Admin Dashboard' }}
      />
      <Stack.Screen
        name="EditBusinessInfo"
        component={EditBusinessInfoScreen}
        options={{ title: 'Edit Business Info' }}
      />
      <Stack.Screen
        name="SetWorkHours"
        component={SetWorkHoursScreen}
        options={{ title: 'Set Work Hours' }}
      />
      <Stack.Screen
        name="ManageAppointments"
        component={ManageAppointmentsScreen}
        options={{ title: 'Manage Appointments' }}
      />
      <Stack.Screen
        name="ManageTeam"
        component={ManageTeamScreen}
        options={{ title: 'Manage Team' }}
      />
      <Stack.Screen
        name="ManageGallery"
        component={ManageGalleryScreen}
        options={{ title: 'Manage Gallery' }}
      />
    </Stack.Navigator>
  );
}