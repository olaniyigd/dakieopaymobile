import { AntDesign, FontAwesome } from '@expo/vector-icons';
import React, { useState, useRef } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Text, ActivityIndicator } from 'react-native';

const CodeVerification = ({ navigation }) => {
  const [code, setCode] = useState('');
  const [continueLoading, setContinueLoading] = useState(false);
  const inputRefs = useRef([]);

  const handleChangeText = (text, index) => {
    if (text.length <= 1) {
      setCode(prevCode => {
        const newCode = prevCode.split('');
        newCode[index] = text;
        return newCode.join('');
      });

      if (text.length === 1 && index < 3) { // Update the condition to reflect 4 inputs (0 to 3)
        inputRefs.current[index + 1].focus();
      }
    }
  };

  const handleBackspace = (index) => {
    if (index > 0) {
      setCode(prevCode => {
        const newCode = prevCode.split('');
        newCode[index - 1] = '';
        return newCode.join('');
      });
      inputRefs.current[index - 1].focus();
    }
  };

  const handleContinue = () => {
    setContinueLoading(true);
    setTimeout(() => {
      setContinueLoading(false);
      navigation.navigate('Dashboard');
    }, 4000); // Simulate a 4-second loading process
  };

  return (
    <View style={styles.container1}>
      <TouchableOpacity onPress={() => navigation.navigate('Get')} style={styles.iconContainer}>
        <AntDesign name="arrowleft" size={24} color="white" />
      </TouchableOpacity>
      <Text style={styles.text}>Verify your account</Text>
      <View style={styles.container}>
        {Array.from({ length: 4 }).map((_, index) => (
          <TextInput
            key={index}
            ref={ref => (inputRefs.current[index] = ref)}
            style={styles.input}
            keyboardType="numeric"
            maxLength={1}
            onChangeText={text => handleChangeText(text, index)}
            value={code[index] ? code[index] : ''}
            onKeyPress={({ nativeEvent }) => {
              if (nativeEvent.key === 'Backspace') {
                handleBackspace(index);
              }
            }}
          />
        ))}
      </View>
      <TouchableOpacity style={styles.button} onPress={handleContinue}>
        {continueLoading ? (
          <ActivityIndicator size="small" color="#ffffff" />
        ) : (
          <Text style={styles.buttonText}>Continue</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container1: {
    backgroundColor: "black",
    flex: 1,
    padding: 25,
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
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconContainer: {
    position: 'absolute',
    top: 20,
    left: 20,
    zIndex: 1,
    color: "white",
    fontSize: 20
  },
  text: {
    color: 'white',
    fontSize: 24,
    paddingTop: 50,
    marginBottom: 20,
    textAlign: "center",
    fontWeight: "100"
  },
  input: {
    borderWidth: 1,
    backgroundColor: "rgba(50, 50, 50, 0.5)",
    borderColor: 'rgba(50, 50, 50, 0.5)',
    width: 65,
    height: 65,
    margin: 5,
    textAlign: 'center',
    fontSize: 20,
    color: "white"
  },
  button: {
    backgroundColor: "#633eca",
    borderRadius: 5,
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginTop: 30,
    borderRadius: 15,
    borderWidth: 1,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
    fontWeight:"100"
  },
});

export default CodeVerification;
