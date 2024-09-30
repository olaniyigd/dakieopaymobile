import { FontAwesome } from '@expo/vector-icons';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Image, ActivityIndicator } from 'react-native';

export default function LoanForm({ navigation }) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [loading, setLoading] = useState(true); 

  
  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholderTextColor="grey"
                placeholder="Enter your username"
                value={username}
                onChangeText={text => setUsername(text)}
              />
              <TextInput
                style={styles.input}
                placeholder="Enter your email"
                placeholderTextColor="grey"
                value={email}
                onChangeText={text => setEmail(text)}
              />
              <TextInput
                style={styles.input}
                placeholder="e.g +2348100000000"
                placeholderTextColor="grey"
                keyboardType="phone-pad"
                value={phoneNumber}
                onChangeText={text => setPhoneNumber(text)}
              />
               <TextInput
                style={styles.input}
                placeholder="enter your NIN"
                placeholderTextColor="grey"
                keyboardType="phone-pad"
                value={phoneNumber}
                onChangeText={text => setPhoneNumber(text)}
              />
              <TextInput
                style={styles.input}
                placeholder="purpose of loan"
                placeholderTextColor="grey"
                keyboardType="phone-pad"
                value={phoneNumber}
                onChangeText={text => setPhoneNumber(text)}
              />
              <TouchableOpacity style={styles.button}>
                
                  <Text style={styles.buttonText}>Submit</Text>
            
              </TouchableOpacity>
            </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  iconContainer: {
    position: 'absolute',
    top: 20,
    right: 20,
    zIndex: 1,
    color: "white",
    fontSize: 20
  },
  profileInfo3: {
    position: "absolute",
    bottom: 0,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 40,
    gap: 20,
    left: 50
  },
  edit1: {
    fontSize: 15,
    fontWeight: "100",
    backgroundColor: "#23265A",
    padding: 18,
    borderRadius: 9
  },
  getstarted: {
    color: "#1F2937",
    fontSize: 18,
    paddingHorizontal: 20
  },
  overlay: {
    backgroundColor: "black",
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#1F2937',
    fontSize: 16,
    marginBottom: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 100,
    textAlign: "center",
    lineHeight: 24,
    fontWeight: "100"
  },
  country: {
    width: 150,
    height: 150,
    borderRadius: 25,
    marginBottom: 20,
  },
  inputContainer: {
    padding: 10,
    width: '100%',
  },
  label: {
    color: '#1F2937',
    marginBottom: 5,
  },
  input: {
    backgroundColor: 'rgba(50, 50, 50, 0.1)',
    borderRadius: 15,
    marginVertical: 10,
    paddingHorizontal: 20,
    paddingVertical: 15,
    // borderWidth: 1,
    color: "black"
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(50, 50, 50, 0.1)',
    borderRadius: 15,
    marginVertical: 10,
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderWidth: 1,
    width: '99%',
  },
  inputPassword: {
    color: "white",
    fontSize: 15,
    letterSpacing: 1,
    flex: 1
  },
  button: {
    backgroundColor: "#1F2937",
    borderRadius: 5,
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginTop: 10,
    borderRadius: 15,
    borderWidth: 1,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: "100"
  },
  error: {
    color: 'red',
    fontSize: 14,
    marginBottom: 5,
  },
  successContainer: {
    position: 'absolute',
    top: 10,
    left: 0,
    right: 0,
    zIndex: 2,
    backgroundColor: 'green',
    padding: 10,
  },
  successMessage: {
    color: 'green',
    textAlign: 'center',
    fontSize: 16,
  },
  errorMessage: {
    color: 'red',
    textAlign: 'center',
    fontSize: 16,
  },
});
