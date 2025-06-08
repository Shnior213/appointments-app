import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

export default function ManageGalleryScreen() {
  const navigation = useNavigation();
  const [images, setImages] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/api/gallery')
      .then(res => res.json())
      .then(data => setImages(data))
      .catch(err => console.error('Failed to load gallery:', err));
  }, []);

  const handleDelete = (id) => {
    Alert.alert(
      'Delete Image',
      'Are you sure you want to delete this image?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            fetch(`http://localhost:3001/api/gallery/${id}`, {
              method: 'DELETE',
            })
              .then(() => {
                setImages(prev => prev.filter(img => img._id !== id));
              })
              .catch(err => console.error('Failed to delete image:', err));
          },
        },
      ]
    );
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.uri }} style={styles.image} />
      <TouchableOpacity style={styles.deleteButton} onPress={() => handleDelete(item._id)}>
        <Text style={styles.deleteText}>Delete</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={28} color="#e85d04" />
          <Text style={styles.backText}></Text>
        </TouchableOpacity>
      <Text style={styles.title}>Manage Gallery</Text>
      <FlatList
        data={images}
        keyExtractor={(item) => item._id}
        renderItem={renderItem}
        numColumns={2}
        contentContainerStyle={styles.gallery}
      />
      <TouchableOpacity style={styles.addButton} onPress={() => {}}>
        <Text style={styles.addText}>Add Image</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff7f0',
    padding: 20,
  },
  backButton: {
    alignSelf: 'flex-start',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginBottom: 10,
  },
  backText: {
    color: '#333',
    fontSize: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#e85d04',
    textAlign: 'center',
    marginBottom: 20,
  },
  gallery: {
    alignItems: 'center',
  },
  card: {
    margin: 10,
    alignItems: 'center',
  },
  image: {
    width: 150,
    height: 100,
    borderRadius: 10,
    marginBottom: 8,
  },
  deleteButton: {
    backgroundColor: '#ff4d4d',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  deleteText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  addButton: {
    backgroundColor: '#ff8c42',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  addText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
