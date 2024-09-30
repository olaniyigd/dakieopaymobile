import React, { useState, useCallback } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Image, KeyboardAvoidingView, Platform, ScrollView, ActivityIndicator, Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useFocusEffect } from '@react-navigation/native';
import { API_BASE_URL } from '@env';
export default function Getstarted({ navigation }) {
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [buttonLoading, setButtonLoading] = useState(false);
  const [message, setMessage] = useState('');

  useFocusEffect(
    useCallback(() => {
      setLoading(true);
      const timer = setTimeout(() => {
        setLoading(false);
      }, 1000);
      return () => clearTimeout(timer);
    }, [])
  );
  const handleLogin = async () => {
    setButtonLoading(true);
    let hasError = false;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email) {
      setEmailError('Email is required');
      hasError = true;
    } else if (!emailRegex.test(email)) {
      setEmailError('Please enter a valid email');
      hasError = true;
    } else {
      setEmailError('');
    }

    if (!password) {
      setPasswordError('Password is required');
      hasError = true;
    } else {
      setPasswordError('');
    }

    if (hasError) {
      setButtonLoading(false);
      setTimeout(() => {
        setEmailError('');
        setPasswordError('');
      }, 3000);
      return;
    }
   
    try {
      const response = await fetch(`${API_BASE_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      const data = await response.json();

      setButtonLoading(false);
      if (response.ok) {
        await AsyncStorage.setItem('userData', data?.user?.username);
        await AsyncStorage.setItem('token', data?.token);
        await AsyncStorage.setItem('user_id', data?.user?.id);

        navigation.navigate('Dashboard');
      } else {
        setMessage(data.message);
        setTimeout(() => {
          setMessage('');
        }, 3000);
      }
    } catch (error) {
      // console.error('Error:', error);
      setButtonLoading(false);
      setMessage('An error occurred, please try again later.');
      setTimeout(() => {
        setMessage('');
      }, 3000);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#1F2937" />
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('Reg')} style={styles.iconContainer}>
          <Text style={styles.getstarted}>Sign Up</Text>
        </TouchableOpacity>
        <View style={styles.overlay}>
          {/* <Image
            source={require('./assets/login.png')}
            style={styles.country}
          /> */}
          <Text style={styles.text3}>DakieoPay</Text>
          <Text style={styles.text}>Please Log into your existing account, if not, Sign up.</Text>
          <Text style={styles.error2}>{message || ''}</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Enter your email"
              keyboardType="email-address"
              placeholderTextColor="grey"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
            />
            {emailError ? <Text style={styles.error}>{emailError}</Text> : null}
            <View style={styles.passwordContainer}>
              <TextInput
                style={styles.inputPassword}
                placeholderTextColor="grey"
                placeholder="Enter your Password"
                secureTextEntry={!passwordVisible}
                value={password}
                onChangeText={setPassword}
              />
              <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)}>
                <Icon name={passwordVisible ? 'eye-slash' : 'eye'} size={20} color="grey" />
              </TouchableOpacity>
            </View>
            {passwordError ? <Text style={styles.error}>{passwordError}</Text> : null}
            <TouchableOpacity style={styles.button} onPress={handleLogin}>
              {buttonLoading ? (
                <ActivityIndicator size="small" color="#ffffff" />
              ) : (
                <Text style={styles.buttonText}>Login</Text>
              )}
            </TouchableOpacity>
          </View>
          <Text style={styles.textforgot}>Forgot your password?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('forget')}>
            <Text style={styles.textforgot1}>Click Here</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconContainer: {
    position: 'absolute',
    top: 20,
    right: 20,
    zIndex: 1,
    color: '#1F2937',
    fontSize: 20,
  },
  getstarted: {
    color: '#1F2937',
    fontSize: 20,
    fontWeight:"500",
    paddingHorizontal: 20,
  },
  overlay: {
    backgroundColor: 'white',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 20,
  },
  text3: {
    color: '#1F2937',
    fontSize: 30,
    fontWeight: "bold",
    // letterSpacing: 10
  },
  text: {
    color: '#1F2937',
    fontSize: 16,
    marginTop: 10,
    textAlign: 'center',
    lineHeight: 24,
    fontWeight: '300',
  },
  country: {
    width: 150,
    height: 150,
    borderRadius: 25,
    marginBottom: 20,
  },
  textforgot: {
    color: '#1F2937',
    fontSize: 16,
    marginTop: 30,
    textAlign: 'center',
    lineHeight: 24,
    fontWeight: '300',
  },
  textforgot1: {
    color: '#1F2937',
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
    fontWeight: '700',
  },
  inputContainer: {
    width: '100%',
    alignItems: 'center',
  },
  input: {
    backgroundColor: 'rgba(50, 50, 50, 0.1)',
    borderRadius: 15,
    marginVertical: 10,
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderWidth: 1,
    borderColor: 'rgba(50, 50, 50, 0.0)',
    color: 'black',
    width: '95%',
    fontSize: 18,
    letterSpacing: 1,
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
    borderColor: 'rgba(50, 50, 50, 0.0)',
    width: '95%',
  },
  inputPassword: {
    color: 'black',
    fontSize: 18,
    letterSpacing: 1,
    flex: 1,
  },
  button: {
    backgroundColor: '#1F2937',
    paddingVertical: 18,
    marginTop: 10,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#1F2937',
    width: '95%',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '500',
  },
  error: {
    color: 'red',
    textAlign: 'left',
    fontSize: 14,
    width: '95%',
    marginTop: 5,
  },
  error2: {
    color: 'red',
    textAlign: 'center',
    fontSize: 14,
    width: '95%',
    marginTop: 5,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
});
