import { FontAwesome } from '@expo/vector-icons';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Image, ActivityIndicator } from 'react-native';
import { API_BASE_URL } from '@env';
import Toast from 'react-native-toast-message';
// jjj
export default function Register({ navigation }) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [usernameError, setUsernameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [phoneNumberError, setPhoneNumberError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [loading, setLoading] = useState(true); // State for controlling the page loading spinner
  const [signUpLoading, setSignUpLoading] = useState(false); // State for controlling the sign up button loading spinner
  const [successMessage, setSuccessMessage] = useState(''); // State for success message
  const [errorMessage, setErrorMessage] = useState(''); // State for error message

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false); // Set loading to false after 3 seconds
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (usernameError) {
      const timer = setTimeout(() => setUsernameError(''), 3000);
      return () => clearTimeout(timer);
    }
  }, [usernameError]);

  useEffect(() => {
    if (emailError) {
      const timer = setTimeout(() => setEmailError(''), 3000);
      return () => clearTimeout(timer);
    }
  }, [emailError]);

  useEffect(() => {
    if (phoneNumberError) {
      const timer = setTimeout(() => setPhoneNumberError(''), 3000);
      return () => clearTimeout(timer);
    }
  }, [phoneNumberError]);

  useEffect(() => {
    if (passwordError) {
      const timer = setTimeout(() => setPasswordError(''), 3000);
      return () => clearTimeout(timer);
    }
  }, [passwordError]);

  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => setSuccessMessage(''), 4000);
      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  useEffect(() => {
    if (errorMessage) {
      const timer = setTimeout(() => setErrorMessage(''), 4000);
      return () => clearTimeout(timer);
    }
  }, [errorMessage]);

  const handleChangePassword = (text) => {
    if (text.length > 10) {
      setPasswordError('Password should not be more than 10 characters.');
    } else {
      setPasswordError('');
      setPassword(text);
    }
  };

  const handleSubmit = async () => {
    let hasError = false;
    if (!username) {
      setUsernameError('Username is required');
      hasError = true;
    }
    if (!email) {
      setEmailError('Email is required');
      hasError = true;
    }
    if (!phoneNumber) {
      setPhoneNumberError('Phone number is required');
      hasError = true;
    }
    if (!password) {
      setPasswordError('Password is required');
      hasError = true;
    }
  
    if (hasError) {
      return;
    }
    setSignUpLoading(true);
  
    try {
      const response = await fetch(`${API_BASE_URL}/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          email,
          phoneNumber,
          password,
        }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        // Handle successful sign up here
        setUsername('');
        setEmail('');
        setPhoneNumber('');
        setPassword('');
        setSignUpLoading(false);
        // setSuccessMessage('Sign up successful!');
        Toast.show({
          type: 'success',
          text1: 'Success',
          text2: 'Sign up successful!',
          visibilityTime: 5000,
        });
      } else {
        // Handle errors here
        // setErrorMessage(data?.message);
        setSignUpLoading(false);
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: data?.message || 'Something went wrong!',
          visibilityTime: 5000,
        });
      }
    } catch (error) {
      // console.error('Fetch error:', error);
      setErrorMessage(error.toString());
      setSignUpLoading(false);
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: error.toString(),
        visibilityTime: 4000,
      });
    }
  };
  

  return (
    <View style={styles.container}>
      {loading ? ( // Display spinner loader if loading is true
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="#1F2937" />
        </View>
      ) : (
        <>
          <TouchableOpacity onPress={() => navigation.navigate('Get')} style={styles.iconContainer}>
            <Text style={styles.getstarted}>Login</Text>
          </TouchableOpacity>
          <View style={styles.overlay}>
            {/* <Image
              source={require('./assets/login.png')}
              style={styles.country}
            /> */}
             <Text style={styles.text3}>DakieoPay</Text>
            <Text style={styles.text}>Please fill in the information below.</Text>
            {successMessage ? (
              <Text style={styles.successMessage}>{successMessage}</Text>
            ) : null}
            {errorMessage ? (
              <Text style={styles.errorMessage}>{errorMessage}</Text>
            ) : null}
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholderTextColor="grey"
                placeholder="Enter your username"
                value={username}
                onChangeText={text => setUsername(text)}
              />
              {usernameError ? <Text style={styles.error}>{usernameError}</Text> : null}
              <TextInput
                style={styles.input}
                placeholder="Enter your email"
                placeholderTextColor="grey"
                value={email}
                onChangeText={text => setEmail(text)}
              />
              {emailError ? <Text style={styles.error}>{emailError}</Text> : null}
              <TextInput
                style={styles.input}
                placeholder="e.g +2348100000000"
                placeholderTextColor="grey"
                keyboardType="phone-pad"
                value={phoneNumber}
                onChangeText={text => setPhoneNumber(text)}
              />
              {phoneNumberError ? <Text style={styles.error}>{phoneNumberError}</Text> : null}
              <View style={styles.passwordContainer}>
                <TextInput
                  style={styles.inputPassword}
                  placeholderTextColor="grey"
                  placeholder="Enter your password"
                  secureTextEntry={!passwordVisible}
                  value={password}
                  onChangeText={handleChangePassword}
                />
                <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)}>
                  <FontAwesome name={passwordVisible ? "eye-slash" : "eye"} size={20} color="grey" />
                </TouchableOpacity>
              </View>
              {passwordError ? <Text style={styles.error}>{passwordError}</Text> : null}
              <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                {signUpLoading ? (
                  <ActivityIndicator size="small" color="#ffffff" />
                ) : (
                  <Text style={styles.buttonText}>Sign Up</Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
          <Toast />
        </>
      )}
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
  text3: {
    color: '#1F2937',
    fontSize: 30,
    fontWeight: "bold",
    // letterSpacing: 10
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
    color: '#1F2937',
    fontSize: 20,
    fontWeight:"500",
    paddingHorizontal: 15,
  },
  overlay: {
    backgroundColor: "white",
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
    fontWeight: "300",
    marginTop: 10
  },
  country: {
    width: 150,
    height: 150,
    borderRadius: 25,
    marginBottom: 20,
  },
  inputContainer: {
    width: '90%',
  },
  label: {
    color: 'white',
    marginBottom: 5,
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
    width: '98%',
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
    width: '98%',
  },
  inputPassword: {
    color: "black",
    fontSize: 18,
    letterSpacing: 1,
    flex: 1
  },
  button: {
    backgroundColor: '#1F2937',
    paddingVertical: 18,
    marginTop: 10,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#1F2937',
    width: '98%',
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
