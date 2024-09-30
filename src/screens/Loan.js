import React, { useState, useEffect } from "react";
import { Animated, Easing, StatusBar, StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native"; // Import useNavigation hook from React Navigation

const Loan = () => {
  const [animation] = useState(new Animated.Value(0));
  const navigation = useNavigation(); // Initialize useNavigation hook

  useEffect(() => {
    Animated.loop(
      Animated.timing(animation, {
        toValue: 1,
        duration: 2000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();

    // Navigate to LoanOption after 5 seconds
    const timer = setTimeout(() => {
      // navigation.navigate("loanOption"); 
    }, 5000);

    // Clear the timeout if the component unmounts before 5 seconds
    return () => clearTimeout(timer);
  }, []);

  const interpolateY = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 20],
  });

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="white" barStyle="dark-content" />

      <View style={styles.middle}>
        <Animated.Text style={[styles.text, { transform: [{ translateY: interpolateY }] }]}>
          "Unlock your dreams with our lending service offering just 1% annual interest. Whether it's travel, business, or personal goals, we're here to make it happen."
        </Animated.Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
  },
  middle: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "#1F2937",
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    lineHeight: 50
  },
});

export default Loan;
