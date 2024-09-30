import { AntDesign } from '@expo/vector-icons';
import React, { useState, useEffect } from 'react';
import { View, TextInput, Text, StyleSheet, ActivityIndicator, TouchableOpacity, Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native'; // Import useFocusEffect hook from react-navigation
import { API_BASE_URL } from '@env';
import Toast from 'react-native-toast-message';
const { width, height } = Dimensions.get('window'); // Get the screen dimensions

const EmailForm = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(true); // State for controlling the initial page loading spinner
  const [submitLoading, setSubmitLoading] = useState(false); // State for controlling the submit button loading spinner
  const [error, setError] = useState(''); // State for managing the error message
  const [successMessage, setSuccessMessage] = useState(''); // State for managing the success message

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false); // Set loading to false after 4 seconds
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  // Use useFocusEffect to trigger spinner for 4 seconds when component gains focus
  useFocusEffect(
    React.useCallback(() => {
      setLoading(true); // Show spinner when component gains focus
      const timer = setTimeout(() => {
        setLoading(false); // Set loading to false after 4 seconds
      }, 4000);

      return () => clearTimeout(timer);
    }, [])
  );

  const handleEmailChange = (text) => {
    setEmail(text);
    setError(''); // Clear error message when user starts typing
    setSuccessMessage(''); // Clear success message when user starts typing
  };

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleSubmit = async () => {
    if (!validateEmail(email)) {
      setError('Enter a valid email.');
      setTimeout(() => {
        setError(''); // Clear error message after 4 seconds
      }, 4000);
      return;
    }

    setSubmitLoading(true); // Show spinner on the submit button

    try {
      // Store email in AsyncStorage
      await AsyncStorage.setItem('resetEmail', email);

      const response = await fetch(`${API_BASE_URL}/request-password-reset`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitLoading(false);
        // setSuccessMessage('Token has been sent successfully to your email!');
        Toast.show({
          type: 'success',
          text1: 'Success',
          text2: 'Token has been sent successfully to your email!',
          visibilityTime: 5000,
        });
        setTimeout(() => {
          setSuccessMessage(''); // Hide success message after 4 seconds
          navigation.navigate('resetpassword');
        }, 4000);
      } else {
        setSubmitLoading(false);
        // setError(data.message || 'Failed to send email');
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: data?.message || 'Failed to send email',
          visibilityTime: 5000,
        });
        setTimeout(() => {
          setError(''); // Clear error message after 4 seconds
        }, 4000);
      }
    } catch (error) {
      setSubmitLoading(false);
      setError('An error occurred while sending the email');
      setTimeout(() => {
        setError(''); // Clear error message after 4 seconds
      }, 4000);
    } finally {
      setSubmitLoading(false); // Hide spinner after request is complete
    }
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="#1F2937" />
        </View>
      ) : (
        <>
          <TouchableOpacity onPress={() => navigation.navigate('Get')} style={styles.iconContainer}>
            <AntDesign name="arrowleft" size={28} color="#1F2937" />
          </TouchableOpacity>
          
          <Text style={styles.text}>Reset your password</Text>
          {successMessage ? <Text style={styles.successText}>{successMessage}</Text> : null}
          <TextInput
            style={styles.input}
            placeholder="Enter your email"
            keyboardType="email-address"
            onChangeText={handleEmailChange}
            value={email}
            placeholderTextColor="gray"
          />
          {error ? <Text style={styles.errorText}>{error}</Text> : null}
          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            {submitLoading ? (
              <ActivityIndicator size="small" color="#ffffff" />
            ) : (
              <Text style={styles.buttonText}>Submit</Text>
            )}
          </TouchableOpacity>
          <Toast />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
    paddingHorizontal: width * 0.05, // 5% of screen width for horizontal padding
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
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
  label: {
    marginBottom: 5,
    fontSize: 16,
    fontWeight: 'bold',
  },
  iconContainer: {
    position: 'absolute',
    top: height * 0.03, // 3% of screen height from the top
    left: width * 0.05, // 5% of screen width from the left
    zIndex: 1,
    color: "white",
    fontSize: 20
  },
  input: {
    backgroundColor: 'rgba(50, 50, 50, 0.1)',
    borderRadius: 15,
    marginVertical: height * 0.01, // 1% of screen height for vertical margin
    paddingHorizontal: width * 0.05, // 5% of screen width for horizontal padding
    paddingVertical: height * 0.02, // 2% of screen height for vertical padding
    borderWidth: 1,
    color: "black",
    borderColor: 'rgba(50, 50, 50, 0.0)',
    fontSize: 18,
    letterSpacing: 1,
  },
  successText: {
    color: 'green',
    marginBottom: height * 0.01, // 1% of screen height for bottom margin
    textAlign: 'center',
  },
  errorText: {
    color: 'red',
    marginTop: height * 0.01, // 1% of screen height for top margin
    textAlign: 'left', // Align text to the left
    fontSize: 15, // Adjust the font size for better readability
    width: '95%', // Ensure the error message aligns with the input fields
  },
  text: {
    color: '#1F2937',
    fontSize: width * 0.06, // 6% of screen width for font size
    marginBottom: height * 0.02, // 2% of screen height for bottom margin
    textAlign: "center",
    fontWeight: "300"
  },
  button: {
    backgroundColor: "#1F2937",
    borderRadius: 5,
    paddingVertical: height * 0.02, // 2% of screen height for vertical padding
    paddingHorizontal: width * 0.05, // 5% of screen width for horizontal padding
    marginTop: height * 0.01, // 1% of screen height for top margin
    borderRadius: 15,
    borderWidth: 1,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16, // 4% of screen width for font size
    fontWeight: "500"
  },
});

export default EmailForm;
