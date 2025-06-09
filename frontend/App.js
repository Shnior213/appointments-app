import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import HomeScreen from './screens/Home-Screen';
import BookAppointmentScreen from './screens/client/Book-Appointment';
import SelectTimeScreen from './screens/client/Select-Time';
import ProfileScreen from './screens/client/Profile';
import AdminDashboardScreen from './screens/admin/Admin-Dashboard';
import ManageAppointmentsScreen from './screens/admin/Manage-Appointments';
import ManageTeamScreen from './screens/admin/Manage-Team';
import SetWorkHoursScreen from './screens/admin/Set-Work-Hours';
import LoginScreen from './screens/Login-Screen';
import RegisterScreen from './screens/Register-Screen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1, backgroundColor: '#fff7f0' }} edges={['top', 'right', 'left']}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
            <Stack.Screen name="BookAppointment" component={BookAppointmentScreen} />
            <Stack.Screen name="SelectTime" component={SelectTimeScreen} />
            <Stack.Screen name="Profile" component={ProfileScreen} />
            <Stack.Screen name="AdminDashboard" component={AdminDashboardScreen} />
            <Stack.Screen name="ManageAppointments" component={ManageAppointmentsScreen} />
            <Stack.Screen name="ManageTeam" component={ManageTeamScreen} />
            <Stack.Screen name="SetWorkHours" component={SetWorkHoursScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};