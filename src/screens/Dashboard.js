import React, { useState, useEffect } from 'react';
import { StatusBar, StyleSheet, Text, View, TouchableOpacity, Linking, ActivityIndicator, Dimensions } from 'react-native';
import { Ionicons, FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import Board from './Board';
import QuickService from './QuickService';
import RecentActivity from './RecentActivity';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native'; // Import useFocusEffect hook from react-navigation
import Service from './Services';

const { width, height } = Dimensions.get('window'); // Get the screen dimensions

const Dashboard = ({ route, navigation }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showDropdown1, setShowDropdown1] = useState(false);
  const [showBalance, setShowBalance] = useState(false);
  const [loading, setLoading] = useState(true); // State for controlling the loading spinner
  const balance = showBalance ? 'NGN ***' : 'NGN 100,000';
  const [greeting, setGreeting] = useState('');
  const [email, setEmail] = useState('');
  const [selectedTab, setSelectedTab] = useState('Home'); // State to track the selected tab

  useEffect(() => {
    const fetchEmail = async () => {
      const storedEmail = await AsyncStorage.getItem('userData');
      if (storedEmail) {
        setEmail(storedEmail);
      }
    };
    fetchEmail();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false); // Set loading to false after 3 seconds
    }, 3000);

    // Get current time
    const currentTime = new Date().getHours();

    // Set greeting based on current time
    if (currentTime >= 12 && currentTime < 16) {
      setGreeting('Good Afternoon!');
    } else if (currentTime >= 16 && currentTime < 24) {
      setGreeting('Good Evening!');
    } else {
      setGreeting('Good Morning!');
    }

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

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
    setShowDropdown1(false);
  };
  const toggleDropdown1 = () => {
    setShowDropdown1(!showDropdown1);
    setShowDropdown(false);
  };

  const handleRefresh = () => {
    setLoading(true);
    // Perform your refresh logic here, like fetching new data
    setTimeout(() => {
      setLoading(false);
    }, 2000); // Simulating loading for 2 seconds
  };

  const handleWhatsAppPress = () => {
    const phoneNumber = '2348107265575'; // Replace with your WhatsApp number
    const url = `whatsapp://send?phone=${phoneNumber}`;
    Linking.openURL(url).catch(err => console.error('An error occurred', err));
  };

  return (
    <View style={styles.container}>
      {loading ? ( // Display spinner loader if loading is true
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="#1F2937" />
        </View>
      ) : (
        <>
          <StatusBar backgroundColor="white" barStyle="black-content" />
          
          {selectedTab === 'Home' && (
            <>
              <View style={styles.middle}>
                <View style={styles.iconContainer}>
                  <Ionicons name="person-circle-outline" onPress={() => navigation.navigate('profile')} size={45} color="#1F2937" />
                  <View>
                    <Text style={styles.text}>Hi, {email}</Text>
                    <Text style={styles.text}>{greeting}</Text>
                  </View>
                </View>
                <TouchableOpacity onPress={handleWhatsAppPress}>
                  <FontAwesome name="whatsapp" size={40} color="#1F2937" />
                </TouchableOpacity>
              </View>
              <Board />
              <QuickService />
              <RecentActivity />
            </>
          )}
          {selectedTab === 'Services' && (
            <View>
              <Service />
            </View>
          )}
          
          <View style={styles.bottomNavigation}>
            <TouchableOpacity style={styles.bottomIcon} onPress={() => setSelectedTab('Home')}>
              <Ionicons name="home-outline" size={30} color={selectedTab === 'Home' ? '#1F2937' : '#BDBDBD'} />
              <Text style={[styles.iconText, selectedTab === 'Home' && { color: '#1F2937' }]}>Home</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.bottomIcon} onPress={() => setSelectedTab('Services')}>
              <MaterialCommunityIcons name="room-service-outline" size={30} color={selectedTab === 'Services' ? '#1F2937' : '#BDBDBD'} />
              <Text style={[styles.iconText, selectedTab === 'Services' && { color: '#1F2937' }]}>Services</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.bottomIcon} onPress={() => navigation.navigate('wallet')}>
              <Ionicons name="wallet-outline" size={30} color="#BDBDBD" />
              <Text style={styles.iconText}>Wallet</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
    padding: width * 0.05, // 5% of screen width for padding
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  middle: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  text: {
    color: '#1F2937',
    fontSize: width * 0.04, // 4% of screen width for font size
    lineHeight: width * 0.06, // 6% of screen width for line height
    fontWeight: "400",
  },
  iconContainer: {
    flexDirection: "row",
    gap: width * 0.02, // 2% of screen width for gap
    alignItems: "center",
  },
  serviceContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: height * 0.3, // Adjust as needed for vertical centering
  },
  bottomNavigation: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: 'white',
    paddingVertical: height * 0.02, // 2% of screen height for vertical padding
    borderTopWidth: 2, // Adding a border top
    borderTopColor: 'rgba(50, 50, 50, 0.1)', // Setting the border top color to grey
    position: 'absolute',
    bottom: 0,
    width: width, // 100% of screen width
  },
  bottomIcon: {
    alignItems: 'center',
  },
  iconText: {
    color: '#BDBDBD',
    marginTop: height * 0.01, // 1% of screen height for top margin
    fontSize: 18, // 3% of screen width for font size
  },
});
