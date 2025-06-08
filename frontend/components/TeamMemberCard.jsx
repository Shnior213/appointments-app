import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const TeamMemberCard = ({ member }) => {
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.navigate('TeamMemberProfile', { member });
  };

  return (
    <TouchableOpacity style={styles.card} onPress={handlePress}>
      <Image source={{ uri: member.image }} style={styles.image} />
      <Text style={styles.name}>{member.name}</Text>
      <Text style={styles.role}>{member.role}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    alignItems: 'center',
    backgroundColor: '#fff3e0',
    borderRadius: 12,
    padding: 12,
    margin: 10,
    width: 140,
    elevation: 3,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 8,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#e65100',
  },
  role: {
    fontSize: 14,
    color: '#a1887f',
  },
});

export default TeamMemberCard;
