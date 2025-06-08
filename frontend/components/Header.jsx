

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Header = ({ businessName, user }) => {
  const navigation = useNavigation();

  const handleLoginPress = () => {
    navigation.navigate('Login');
  };

  return (
    <View style={styles.header}>
      <Text style={styles.title}>{businessName || 'Our Salon'}</Text>
      {user?.name ? (
        <Text style={styles.user}>{user.name}</Text>
      ) : (
        <TouchableOpacity onPress={handleLoginPress}>
          <Text style={styles.login}>Login</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    paddingTop: 50,
    paddingBottom: 15,
    paddingHorizontal: 20,
    backgroundColor: '#FFA726',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white',
  },
  login: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
  },
  user: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
  },
});

export default Header;