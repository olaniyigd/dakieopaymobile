import React, { useState, useRef, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, ActivityIndicator, PanResponder } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import LocalData from './LocalData';
import InterData from './InternationalData';

const Data = ({ navigation }) => {
  const [displayText, setDisplayText] = useState('local'); // Set default display text to 'local'
  const [loading, setLoading] = useState(true); // State for controlling the loading spinner

  const localRef = useRef(null);
  const internationalRef = useRef(null);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (evt, gestureState) => {
        if (gestureState.dx > 50) {
          handleButtonPress('international'); // Swipe right, display 'international'
        } else if (gestureState.dx < -50) {
          handleButtonPress('local'); // Swipe left, display 'local'
        }
      },
    })
  ).current;

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false); // Set loading to false after 4 seconds
    }, 4000); // 4 seconds timeout

    return () => clearTimeout(timer); // Cleanup timer on component unmount
  }, []); // Empty dependency array means this effect runs only once, on component mount

  const handleButtonPress = (text) => {
    setLoading(true);
    setTimeout(() => {
      setDisplayText(text);
      setLoading(false);
    }, 4000); // Simulate a 4-second loading process
  };

  return (
    <View style={styles.container1} {...panResponder.panHandlers}>
      <TouchableOpacity onPress={() => navigation.navigate('Dashboard')} style={styles.iconContainer}>
        <AntDesign name="arrowleft" size={24} color="#1F2937" />
      </TouchableOpacity>

      <View style={styles.container}>
        <TouchableOpacity ref={localRef} style={[styles.button, displayText === 'local' && styles.activeButton]} onPress={() => handleButtonPress('local')}>
          <Text style={[styles.buttonText, displayText === 'local' && styles.activeButtonText]}>Local</Text>
        </TouchableOpacity>
        <TouchableOpacity ref={internationalRef} style={[styles.button, displayText === 'international' && styles.activeButton]} onPress={() => handleButtonPress('international')}>
          <Text style={[styles.buttonText, displayText === 'international' && styles.activeButtonText]}>International</Text>
        </TouchableOpacity>
      </View>

      {loading ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="#1F2937" />
        </View>
      ) : (
        <>
          {displayText === 'local' && <LocalData />}
          {displayText === 'international' && <InterData />}
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container1: {
    backgroundColor: "white",
    flex: 1,
    // padding: 25,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: "space-between",
    marginBottom: 0,
    marginTop: 40,
    padding: 25,
  },
  iconContainer: {
    position: 'absolute',
    top: 20,
    left: 20,
    zIndex: 1,
    color: "#1F2937",
    fontSize: 20
  },
  text: {
    color: '#1F2937',
    fontSize: 24,
    textAlign: "center",
    fontWeight: "100"
  },
  button: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginHorizontal: 10,
    // borderWidth: 1,
  },
  activeButton: {
    borderBottomColor: '#1F2937', // Border bottom color for active button
    borderBottomWidth: 2, // Add a border bottom to indicate active state
  },
  buttonText: {
    color: '#1F2937',
    textAlign: 'center',
    fontSize: 19,
  },
  activeButtonText: {
    fontWeight: '500', // Style for active button text
  },
});

export default Data;
