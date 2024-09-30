import { AntDesign } from '@expo/vector-icons';
import React, { useState, useEffect } from 'react';
import { View, TextInput, Alert, StyleSheet, TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ChangePasswordScreen = ({ navigation }) => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [showOldPassword, setShowOldPassword] = useState(false); // State to toggle visibility of old password
  const [showNewPassword, setShowNewPassword] = useState(false); // State to toggle visibility of new password
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false); // State to toggle visibility of confirm new password
  const [isLoading, setIsLoading] = useState(false);
  const [token, setToken] = useState('');
  useEffect(() => {
    const fetchToken = async () => {
      const storedToken = await AsyncStorage.getItem('token');
      if (storedToken) {
        setToken(storedToken);
      }
    };
    fetchToken();
  }, []);

  const handleChangePassword = () => {
    setIsLoading(true); // Set spinner to true when request starts
  
    // Debugging: Log payload before sending request
    console.log("Payload:", JSON.stringify({
      currentPassword: oldPassword,
      newPassword: newPassword
    }));
  
    // Fetch API to send POST request
    fetch('https://dakieoapis.onrender.com/change-password', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        currentPassword: oldPassword,
        newPassword: newPassword
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Something went wrong');
        }
        return response.json();
      })
      .then((data) => {
        setIsLoading(false); // Set spinner to false when request succeeds
        // Handle successful response
        Alert.alert('Password changed successfully!');
        // Clear input fields after submission
        setOldPassword('');
        setNewPassword('');
        setConfirmNewPassword('');
      })
      .catch((error) => {
        setIsLoading(false); // Set spinner to false when request fails
        Alert.alert('Failed to change password. Please try again.');
        console.error('Error:', error);
      });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate('profile')} style={styles.iconContainer}>
        <AntDesign name="arrowleft" size={28} color="#1F2937" />
      </TouchableOpacity>
      <Text style={styles.text}>Change password</Text>
      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.input}
          placeholder="Old Password"
          placeholderTextColor="grey"
          value={oldPassword}
          onChangeText={setOldPassword}
          secureTextEntry={!showOldPassword} // Toggles secure entry based on showOldPassword state
        />
        <TouchableOpacity onPress={() => setShowOldPassword(!showOldPassword)} style={styles.eyeIcon}>
          <AntDesign name={showOldPassword ? "eye" : "eyeo"} size={24} color="grey" />
        </TouchableOpacity>
      </View>
      {/* Repeat the same pattern for New Password and Confirm New Password */}
      {/* I'm showing only New Password here as an example */}
      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.input}
          placeholder="New Password"
          placeholderTextColor="grey"
          value={newPassword}
          onChangeText={setNewPassword}
          secureTextEntry={!showNewPassword}
        />
        <TouchableOpacity onPress={() => setShowNewPassword(!showNewPassword)} style={styles.eyeIcon}>
          <AntDesign name={showNewPassword ? "eye" : "eyeo"} size={24} color="grey" />
        </TouchableOpacity>
      </View>
    
      <TouchableOpacity style={styles.button} onPress={handleChangePassword}>
        {isLoading ? (
          <ActivityIndicator size="small" color="white" />
        ) : (
          <Text style={styles.buttonText}>Change password</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white", 
    justifyContent:"center",
    padding: 20
  },
  iconContainer: {
    position: 'absolute',
    top: 20,
    left: 20,
    zIndex: 1,
    color:"white",
    fontSize: 20
  },
  text: {
    color: '#1F2937',
    fontSize: 24,
    marginBottom: 20,
    fontWeight:"400",
    textAlign:"center"
  },
  input: {
    backgroundColor: 'rgba(50, 50, 50, 0.1)',
    borderRadius: 15,
    marginVertical: 10,
    paddingHorizontal: 20,
    paddingVertical: 15,
    // borderWidth: 1,
    color:"black",
    flex: 1,
    fontSize: 18
  },
  button: {
    backgroundColor: "#1F2937",
    borderRadius: 5,
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginTop: 10,
    borderRadius: 10,
    borderWidth: 1
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  eyeIcon: {
    position: 'absolute',
    right: 15,
  },
});

export default ChangePasswordScreen;
