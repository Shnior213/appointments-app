import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, Linking, StyleSheet, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
// icons
import InstagramIcon from '../assets/icons/icons8-instagram-50.png';
import PhoneIcon from '../assets/icons/icons8-phone-50.png';
import AddressIcon from '../assets/icons/location.png';
import { ADDRESS_URL, INSTAGRAM_URL, PHONE_URL, SALON_ADDRESS, SALON_BIO, SALON_INSTAGRAM, SALON_NAME, SALON_PHONE } from '../utils/constants';
import { INSTAGRAM_URL1, ADDRESS_URL1, PHONE_URL1 } from '@env';

export default function ClientHomeScreen() {
  const navigation = useNavigation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [userName, setUserName] = useState();

  const handleProfileNavigation = () => {
    navigation.navigate('Profile');
  };

  return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => setMenuOpen(!menuOpen)}>
            <Text style={styles.menuButton}>≡</Text>
          </TouchableOpacity>
          <Text style={styles.title}>Menu</Text>
          <TouchableOpacity
            onPress={handleProfileNavigation}
            style={styles.headerLoginButton}
          >
            <Text style={styles.userText}>{userName == null ? 'Guest' : `welcome ${userName}`}</Text>
          </TouchableOpacity>
        </View>

        {menuOpen && (
          <View style={styles.sideMenu}>
            <TouchableOpacity onPress={() => navigation.navigate('BookAppointment')} style={{ padding: 10, alignItems: 'center' }}>
              <View style={{ alignItems: 'center' }}>
                <Text style={{ color: '#e85d04', fontWeight: 'bold', fontSize: 16 }}>Book Appointment</Text>
              </View>
            </TouchableOpacity>
          </View>
        )}

        <View style={styles.infoSection}>
          <Text style={styles.salonHeader}>{SALON_NAME}</Text>
          <Text style={styles.salonDescription}>{SALON_BIO}</Text>
        </View>

        <View style={styles.businessDetails}>
          <Text style={styles.businessDetailsTitle}>Business Info</Text>
          <View style={styles.iconRow}>
            <View style={styles.iconColumn}>
              <TouchableOpacity onPress={() => Linking.openURL(INSTAGRAM_URL1)}>
                <Image source={InstagramIcon} style={styles.iconImage} />
              </TouchableOpacity>
              <Text style={styles.iconLabel}>{SALON_INSTAGRAM || 'Instagram'}</Text>
            </View>

            <View style={styles.iconColumn}>
              <TouchableOpacity onPress={() => Linking.openURL(ADDRESS_URL1)}>
                <Image source={AddressIcon} style={styles.iconImage} />
              </TouchableOpacity>
              <Text style={styles.iconLabel}>{SALON_ADDRESS || 'Address'}</Text>
            </View>

            <View style={styles.iconColumn}>
              <TouchableOpacity onPress={() => Linking.openURL(PHONE_URL1)}>
                <Image source={PhoneIcon} style={styles.iconImage} />
              </TouchableOpacity>
              <Text style={styles.iconLabel}>{SALON_PHONE || 'Phone'}</Text>
            </View>
          </View>
        </View>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
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
  businessDetails: {
    paddingVertical: 15,
    paddingHorizontal: 1,
    paddingBottom: 55,
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
  iconRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 20,
    marginTop: 10,
  },
  iconColumn: {
    alignItems: 'center',
    width: 80,
  },
  iconLabel: {
    marginTop: 5,
    fontSize: 12,
    color: '#333',
  },
  iconImage: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
  userText: {
    color: '#fff',
    fontSize: 16,
    marginLeft: 'auto',
    fontWeight: 'bold',
  },
  headerLoginButton: {
    marginLeft: 'auto',
    paddingHorizontal: 10,
  },
});
