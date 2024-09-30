import React, { useState, useEffect, useRef } from 'react';
import { ActivityIndicator, StatusBar, StyleSheet, Text, View, TouchableOpacity, TextInput, Alert } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import RecentTransaction from './RecentTransaction';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Paystack, paystackProps } from 'react-native-paystack-webview';
import { API_BASE_URL } from '@env';
import { PAYSTACK_URL } from '@env';
import { PAYSTACK_EMAIL } from '@env';
import { PAYSTACK_NO } from '@env';

const Wallet = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);
  const [amount, setAmount] = useState(0);
  const paystackWebViewRef = useRef(paystackProps.PayStackRef);
  const [isButtonEnabled, setIsButtonEnabled] = useState(true); // Start with true to enable button
  const [userid, setUserid] = useState('');
  const [token, setToken] = useState('');
  const [balance, setBalance] = useState("");
  const [alert, setAlert] = useState("");
  const [transact, setTransact] =useState([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

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

  useEffect(() => {
    fetchData();
    fetchAll();
  }, [userid, token]);

  const fetchData = async () => {
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
      setBalance(formatCurrency(data?.wallet?.availableBalance));
    } catch (error) {
      // console.error('Error fetching data:', error);
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
      // console.error('Error fetching data:', error);
    }
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 2,
    }).format(value);
  };

  const handle = async () => {
    if (amount <= 0) {
      Alert.alert('Error', 'Please enter a valid amount to fund your wallet.');
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/wallet/${userid}/balance`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ availableBalance: amount }),
      });

      if (response.ok) {
        const data = await response.json();
        // console.log('Wallet funded successfully', data);
        setAmount(0);
        fetchData(); // Optionally, update the balance after successful funding
        fetchAll();
      } else {
        // throw new Error('Failed to fund wallet');
      }
    } catch (error) {
      // console.error('Error funding wallet:', error);
      // Alert.alert('Error', 'Failed to fund wallet.');
    }
  };

  const handleAmountChange = (text) => {
    const numericAmount = parseFloat(text.replace(/,/g, ''));
    setAmount(isNaN(numericAmount) ? 0 : numericAmount);
  };

  return (
    <View style={styles.container1}>
      {loading ? (
        <View style={[styles.container, styles.loadingContainer]}>
          <ActivityIndicator size="large" color="#1F2937" />
        </View>
      ) : (
        <>
          <View style={styles.container}>
            <StatusBar backgroundColor="white" barStyle="dark-content" />
            <Text style={styles.text}>My Wallet</Text>
            <Text style={styles.text1}>Your central hub for managing your funds, and back your wallet history.</Text>

            <View style={styles.contain}>
              <View>
                <Text style={styles.text2}>Wallet Balance</Text>
                <Text style={styles.text3}>{balance}</Text>
              </View>
            </View>
            <Text style={styles.switchLabel}>Amount</Text>
            <TextInput
              style={styles.input}
              placeholder="₦"
              placeholderTextColor="white"
              keyboardType="phone-pad"
              value={amount.toLocaleString()}
              onChangeText={handleAmountChange}
            />
            {/* paystack integration */}
            <Paystack
              paystackKey="pk_test_d55a4f27e91dfe7f12a575df0f42a8c13dfc13b0"
              amount={amount}
              billingEmail="pharuqgbadegesin5@gmail.com"
              billingMobile={PAYSTACK_NO}
              billingName="Dakieo"
              currency="NGN"
              activityIndicatorColor="green"
              onCancel={(e) => {
                // handle response here
              }}
              onSuccess={handle}
              autoStart={false}
              ref={paystackWebViewRef}
            />
          <TouchableOpacity 
  onPress={() => paystackWebViewRef.current.startTransaction()}
  style={[styles.contain1, { backgroundColor: "#1F2937", display: amount > 0 ? 'flex' : 'none' }]}
>
  <Text style={styles.text2}>Fund Wallet</Text>
</TouchableOpacity>
          </View>
          <RecentTransaction transaction={transact}/>
        </>
      )}
     
    </View>
  );
};

export default Wallet;

const styles = StyleSheet.create({
  container: {
    borderRadius: 15,
    padding: 20,
  },
  container1: {
    height: "100%",
    backgroundColor: "white",
    borderRadius: 10
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  input: {
    marginTop: 20,
    backgroundColor: 'rgba(50, 50, 50, 0.1)',
    borderRadius: 15,
    marginVertical: 10,
    paddingHorizontal: 20,
    paddingVertical: 15,
    // borderWidth: 1,
    color: "black",
    fontSize: 18
  },
  switchLabel: {
    color: '#1F2937',
    marginLeft: 5,
    fontSize: 16,
    marginTop: 20,
    fontWeight: "400"
  },
  text: {
    color: '#1F2937',
    fontSize: 20,
    lineHeight: 24,
    fontWeight: "700",
    paddingBottom: 5
  },
  text1: {
    color: '#1F2937',
    fontSize: 16,
    lineHeight: 24,
    fontWeight: "400",
    paddingBottom: 25
  },
  text2: {
    color: 'white',
    fontSize: 20,
    fontWeight: "100",
    textAlign: "center"
  },
  text3: {
    color: 'white',
    fontSize: 18,
    fontWeight: "500",
    textAlign: "center",
    marginTop: 20
  },
  contain: {
    backgroundColor: "#1F2937",
    height: 140,
    borderRadius: 10,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  contain1: {
    backgroundColor: "#1F2937",
    height: 50,
    marginTop: 10,
    borderRadius: 3,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  }
});
