import { useNavigation } from "@react-navigation/native";
import { useEffect } from "react";
import { StatusBar, StyleSheet, Text, View } from "react-native";

const App = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigateToGetPage();
    }, 2000); // Set timeout to 2 seconds (2000 milliseconds)

    return () => clearTimeout(timer); // Cleanup timer on component unmount
  }, []); // Empty dependency array ensures useEffect runs only once after initial render

  const navigateToGetPage = () => {
    navigation.navigate('Get'); // Navigate to the 'Get' screen
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="white" barStyle="dark-content" />

      <View style={styles.middle}>
        <Text style={styles.text}>DakieoPay</Text>
        <Text style={styles.text2}>SmartPay Solutions!</Text>
      </View>

      <View style={styles.bottom}>
        {/* You can add any additional content for the bottom section */}
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottom: {
    backgroundColor: "white",
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#1F2937',
    fontSize: 50,
    fontWeight: "bold",
    // letterSpacing: 10
  },
  text2: {
    color: "#1F2937",
    letterSpacing: 10,
    marginBottom: 100,
    fontWeight: "500",
    textAlign: "center",
    lineHeight: 40,
  },
});

export default App;
