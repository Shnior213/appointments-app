import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity, Image, Linking, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import InstagramIcon from '../assets/icons/icons8-instagram-50.png';
import PhoneIcon from '../assets/icons/icons8-phone-50.png';
import AddressIcon from '../assets/icons/location.png';

export default function HomeScreen() {
  const navigation = useNavigation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [userType, setUserType] = useState(null);
  const [userName, setUserName] = useState('');
  const [loadingUser, setLoadingUser] = useState(false);

  useEffect(() => {
    if (userType) {
      fetchUserName();
    }
  }, [userType]);

  const fetchUserName = async () => {
    setLoadingUser(true);
    try {
      const BASE_URL = 'http://192.168.X.X:3001/api'; // יש לעדכן לכתובת השרת שלך
      const response = await axios.get(`${BASE_URL}/user`);
      setUserName(response.data.name || '');
    } catch (error) {
      console.error('Failed to load user:', error);
      setUserName('');
    } finally {
      setLoadingUser(false);
    }
  };

  const salonName = userType === 'admin' ? 'Admin Panel' : '';

  if (!userType) {
    return (
      <View style={[styles.container, { backgroundColor: '#fff7f0' }]}>
        <View style={styles.introHeader}>
          <Text style={styles.introTitle}>Welcome to</Text>
          <Text style={styles.businessName}>Johnson barbershop</Text>
        </View>
        <View style={styles.roleButtons}>
          <TouchableOpacity
            style={styles.roleButton}
            activeOpacity={0.7}
            onPress={() => setUserType('client')}
          >
            <Text style={styles.roleButtonText}>Login as Client</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.roleButton}
            activeOpacity={0.7}
            onPress={() => setUserType('admin')}
          >
            <Text style={styles.roleButtonText}>Login as Admin</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  if (userType === 'admin') {
    return (
      <View style={[styles.container, { backgroundColor: '#fff7f0', padding: 20 }]}>
        <Text style={styles.adminTitle}> Admin Dashboard</Text>
        <View style={styles.adminButtonWrapper}>
          <TouchableOpacity style={styles.adminButton} onPress={() => navigation.navigate('ManageAppointments')}>
            <Text style={styles.adminButtonText}>📅 Manage Appointments</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.adminButton} onPress={() => navigation.navigate('EditBusiness')}>
            <Text style={styles.adminButtonText}>🏢 Edit Business Info</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.adminButton} onPress={() => navigation.navigate('ManageGallery')}>
            <Text style={styles.adminButtonText}>🖼️ Manage Gallery</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.adminButton} onPress={() => navigation.navigate('ManageTeam')}>
            <Text style={styles.adminButtonText}>👥 Manage Staff</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.adminButton} onPress={() => navigation.navigate('SetWorkHours')}>
            <Text style={styles.adminButtonText}>⏰ Set Work Hours</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => setMenuOpen(!menuOpen)}>
          <Text style={styles.menuButton}>≡</Text>
        </TouchableOpacity>
        <Text style={styles.title}>{salonName}</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate(userType ? 'Profile' : 'Login')}
          style={styles.headerLoginButton}
        >
          {loadingUser ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.userText}>{userType ? (userName || 'User') : 'Login'}</Text>
          )}
        </TouchableOpacity>
      </View>

      {/* Side Menu */}
      {menuOpen && (
        <View style={styles.sideMenu}>
          {userType === 'client' && (
            <>
              <TouchableOpacity onPress={() => navigation.navigate('BookAppointment')} style={{ padding: 10, alignItems: 'center' }}>
                <View style={{ alignItems: 'center' }}>
                  <Text style={{ color: '#e85d04', fontWeight: 'bold', fontSize: 16 }}>Book Appointment</Text>
                </View>
              </TouchableOpacity>
            </>
          )}
          {userType === 'admin' && (
            <Button title="Admin Dashboard" onPress={() => navigation.navigate('AdminDashboard')} />
          )}
        </View>
      )}

      {/* Info Section */}
      <View style={styles.infoSection}>
        <Text style={styles.salonHeader}>Johnson barbershop</Text>
        <Text style={styles.salonDescription}>
          A professional barbering experience in the heart of Tel Aviv. Book appointments, view styles, and get updates directly from our salon.
        </Text>
        {userType === null && (
          <TouchableOpacity
            style={styles.loginBelowButton}
            activeOpacity={0.7}
            onPress={() => navigation.navigate('Login')}
          >
            <Text style={styles.loginBelowText}>Login</Text>
          </TouchableOpacity>
        )}
        <View style={styles.imagePlaceholder}>
          <Text style={{ color: '#aaa' }}>Image gallery coming soon...</Text>
        </View>
      </View>

      {userType === 'client' && (
        <>
          <View style={styles.businessDetails}>
            <Text style={styles.businessDetailsTitle}>Business Info</Text>
            <View style={styles.iconRow}>

            <View style={styles.iconColumn}>
                <TouchableOpacity onPress={() => Linking.openURL('https://www.instagram.com/your_business')}>
                  <Image source={InstagramIcon} style={styles.iconImage} />
                </TouchableOpacity>
                <Text style={styles.iconLabel}>Instagram</Text>
              </View> 

              <View style={styles.iconColumn}>
                <TouchableOpacity onPress={() => Linking.openURL('https://maps.google.com/?q=123 Main Street, Tel Aviv')}>
                  <Image source={AddressIcon} style={styles.iconImage} />
                </TouchableOpacity>
                <Text style={styles.iconLabel}>Tel Aviv</Text>
              </View>

              <View style={styles.iconColumn}>
                <TouchableOpacity onPress={() => Linking.openURL('tel:0501234567')}>
                  <Image source={PhoneIcon} style={styles.iconImage} />
                </TouchableOpacity>
                <Text style={styles.iconLabel}>050-123-4567</Text>
              </View>

            </View>
          </View>
          
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 15,
  },
  header: {
    height: 60,
    backgroundColor: '#ff8c42',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  title: {
    color: '#fff',
    fontSize: 20,
    marginLeft: 15,
    fontWeight: 'bold',
  },
  menuButton: {
    fontSize: 28,
    color: '#fff',
  },
  sideMenu: {
    backgroundColor: '#ffeadb',
    padding: 10,
    borderRightWidth: 1,
    borderColor: '#ff8c42',
  },
  infoSection: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  salonHeader: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#e85d04',
    marginBottom: 15,
    textAlign: 'center',
  },
  salonDescription: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
    marginBottom: 30,
  },
  imagePlaceholder: {
    width: '90%',
    height: 150,
    backgroundColor: '#f2f2f2',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sliderWrapper: {
    width: '90%',
    height: 150,
    borderRadius: 12,
    overflow: 'hidden',
  },
  slideImage: {
    width: '100%',
    height: 150,
    resizeMode: 'cover',
  },
  roleButtons: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  introHeader: {
    marginTop: 100,
    alignItems: 'center',
  },
  introTitle: {
    fontSize: 22,
    color: '#ff8c42',
    marginBottom: 5,
  },
  businessName: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#e85d04',
  },
  roleButton: {
    backgroundColor: '#ff8c42',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  roleButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  businessDetails: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderTopWidth: 1,
    borderColor: '#ff8c42',
    backgroundColor: '#fff7f0',
    alignItems: 'center',
  },
  businessDetailsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  businessDetail: {
    fontSize: 16,
    marginBottom: 5,
  },
  iconRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 30,
    marginTop: 10,
  },
  iconColumn: {
    alignItems: 'center',
    marginHorizontal: 10,
  },
  iconLabel: {
    marginTop: 5,
    fontSize: 12,
    color: '#333',
  },
  icon: {
    fontSize: 20,
    backgroundColor: '#ffe5d0',
    padding: 10,
    borderRadius: 50,
    textAlign: 'center',
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#ff8c42',
  },
  userText: {
    color: '#fff',
    fontSize: 16,
    marginLeft: 'auto',
    fontWeight: 'bold',
  },
  userWrapper: {
    position: 'absolute',
    top: 10,
    right: 15,
    zIndex: 10,
  },
  headerLoginButton: {
    marginLeft: 'auto',
    paddingHorizontal: 10,
  },
  loginBelowButton: {
    backgroundColor: '#e85d04',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
    alignSelf: 'center',
    marginTop: 10,
  },
  loginBelowText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  adminTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#e85d04',
    marginBottom: 30,
    textAlign: 'center',
  },
  adminButtonWrapper: {
    gap: 15,
  },
  adminButton: {
    backgroundColor: '#ff8c42',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  adminButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  iconImage: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
});
