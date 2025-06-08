import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import HomeScreen from './screens/HomeScreen';
import BookAppointmentScreen from './screens/client/BookAppointmentScreen';
import SelectTimeScreen from './screens/client/SelectTimeScreen';
import ProfileScreen from './screens/client/ProfileScreen';
import AdminDashboardScreen from './screens/admin/AdminDashboardScreen';
import ManageAppointmentsScreen from './screens/admin/ManageAppointmentsScreen';
import EditBusinessInfoScreen from './screens/admin/EditBusinessInfoScreen';
import ManageGalleryScreen from './screens/admin/ManageGalleryScreen';
import ManageTeamScreen from './screens/admin/ManageTeamScreen';
import SetWorkHoursScreen from './screens/admin/SetWorkHoursScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';

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
            <Stack.Screen name="UserProfile" component={ProfileScreen} />
            <Stack.Screen name="AdminDashboard" component={AdminDashboardScreen} />
            <Stack.Screen name="ManageAppointments" component={ManageAppointmentsScreen} />
            <Stack.Screen name="EditBusiness" component={EditBusinessInfoScreen} />
            <Stack.Screen name="ManageGallery" component={ManageGalleryScreen} />
            <Stack.Screen name="ManageTeam" component={ManageTeamScreen} />
            <Stack.Screen name="SetWorkHours" component={SetWorkHoursScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};