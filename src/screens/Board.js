import React, { useState, useEffect } from 'react';
import { StatusBar, StyleSheet, Text, View, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { Ionicons, FontAwesome, EvilIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RecentActivity from './RecentActivity';
import { API_BASE_URL } from '@env';
const Board = ({ navigation }) => {
  const [balance, setBalance] = useState("");
  const [balanceVisible, setBalanceVisible] = useState(true);
  const [loading, setLoading] = useState(false);
  const [userid, setUserid] = useState('');
  const [token, setToken] = useState('');
  const [transact, setTransact] = useState();
  const [opan, setOpen] = useState(true);

  useEffect(() => {
    const fetchEmail = async () => {
      const storedEmail = await AsyncStorage.getItem('user_id');
      if (storedEmail) {
        setUserid(storedEmail);
      }
    };
    fetchEmail();
  }, []);

  useEffect(() => {
    const fetchToken = async () => {
      const storedToken = await AsyncStorage.getItem('token');
      if (storedToken) {
        setToken(storedToken);
      }
    };
    fetchToken();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/wallet/${userid}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        // throw new Error('Network response was not ok');
      }
      const data = await response.json();
      // console.log(data);
      setBalance(data?.wallet?.availableBalance);
      setLoading(false);
    } catch (error) {
      // console.error('Error fetching balance:', error);
      setLoading(false);
    }
  };

  const fetchAll = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/wallet/${userid}/transactions`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setTransact(data?.transactions);
    } catch (error) {
      // console.error('Error fetching transactions:', error);
    }
  };
  
  useEffect(() => {
    fetchAll();
    fetchData();
  }, [userid, token]);

  const formatCurrency = (value) => {
    if (typeof value !== 'number') {
      return value;
    }
    const formattedValue = parseFloat(value).toFixed(2); // Format to 2 decimal places
    return formattedValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","); // Add comma as thousand separator
  };

  const toggleBalanceVisibility = () => {
    setBalanceVisible(!balanceVisible);
  };

  const refreshBalance = () => {
    fetchData();
    fetchAll();
  };

  const renderedBalance = balanceVisible ? formatCurrency(balance) : '****';

  return (
    <>
      {opan ? (
        <View style={styles.container}>
          <StatusBar backgroundColor="white" barStyle="dark-content" />
          {loading && (
            <View style={styles.spinnerContainer}>
              <ActivityIndicator size="large" color="#ffffff" />
            </View>
          )}
          <View style={styles.middle}>
            <View style={styles.iconContainer1}>
              <Image
                source={require('../../assets/nigeria.png')}
                style={styles.country}
              />
              <Text style={styles.text}>Wallet balance</Text>
            </View>
            <TouchableOpacity style={styles.iconContainer} onPress={refreshBalance}>
              <EvilIcons name="refresh" size={24} color="white" />
              <Text style={styles.text}>Refresh balance</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.middle1}>
            <View style={styles.iconContainer1}>
              <Text style={styles.text}>{`NGN ${renderedBalance}`}</Text>
            </View>
            <TouchableOpacity style={styles.iconContainer1} onPress={toggleBalanceVisibility}>
              {balanceVisible ? (
                <Ionicons name="eye" size={26} color="white" />
              ) : (
                <FontAwesome name="eye-slash" size={26} color="white" />
              )}
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <RecentActivity transaction={transact} />
      )}
    </>
  );
};

export default Board;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#1F2937",
    height: 130,
    marginTop: 20,
    borderRadius: 15,
    padding: 20,
    position: 'relative',
  },
  middle: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  country: {
    width: 19,
    height: 19,
    borderRadius: 25,
    marginRight: 10,
  },
  middle1: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 10,
  },
  text: {
    color: 'white',
    fontSize: 17,
    lineHeight: 24,
    fontWeight: "400",
  },
  iconContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1F2937",
    padding: 5,
    borderRadius: 5,
  },
  iconContainer1: {
    flexDirection: "row",
    alignItems: "center",
    padding: 5,
    borderRadius: 5,
  },
  spinnerContainer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
});
