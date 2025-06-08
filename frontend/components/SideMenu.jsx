

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const SideMenu = ({ isAdmin }) => {
  const navigation = useNavigation();

  const menuItems = [
    { label: 'Home', screen: 'Home' },
    { label: 'Profile', screen: 'Profile' },
    { label: 'Appointments', screen: 'Appointments' },
    { label: 'Gallery', screen: 'Gallery' },
  ];

  if (isAdmin) {
    menuItems.push({ label: 'Manage Team', screen: 'ManageTeam' });
    menuItems.push({ label: 'Manage Gallery', screen: 'ManageGallery' });
    menuItems.push({ label: 'Manage Appointments', screen: 'ManageAppointments' });
  }

  return (
    <View style={styles.container}>
      {menuItems.map((item) => (
        <TouchableOpacity
          key={item.screen}
          style={styles.menuItem}
          onPress={() => navigation.navigate(item.screen)}
        >
          <Text style={styles.menuText}>{item.label}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 60,
    paddingHorizontal: 20,
    backgroundColor: '#FFE0B2',
    flex: 1,
  },
  menuItem: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#FFB74D',
  },
  menuText: {
    fontSize: 18,
    color: '#F57C00',
    fontWeight: 'bold',
  },
});

export default SideMenu;