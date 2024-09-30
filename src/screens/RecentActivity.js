import React, { useState, useEffect } from 'react';
import { StatusBar, StyleSheet, Text, View, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_BASE_URL } from '@env';
const RecentActivity = ({ navigation, transaction }) => {
  const [sortedTransactions, setSortedTransactions] = useState([]);
  const [userid, setUserid] = useState('');
  const [token, setToken] = useState('');
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
    fetchAll();
  }, [userid, token]);
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
      setSortedTransactions(data?.transactions);
    } catch (error) {
      // console.error('Error fetching data:', error);
    }
  };
  // console.log(sortedTransactions, "recent activity")
useEffect(() => {
  if (transaction && transaction.length > 0) {
    const sorted = [...transaction].sort((a, b) => {
      return new Date(b.date) - new Date(a.date); // Sort in descending order
    });
    setSortedTransactions(sorted);
  }
}, [transaction]);

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = String(date.getFullYear()).slice(-2);
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');

  return `${day}/${month}/${year}, ${hours}:${minutes}`;
};


const renderTransactionItem = ({ item }) => {

  let statusText = item.description;
  let statusStyle = styles.transactionText;

  if (item.description === "Added to available balance") {
    statusText = "Deposited";
    statusStyle = [styles.transactionText, styles.credited];
  } else if (item.description === "Deducted from available balance") {
    statusText = "Debited";
    statusStyle = [styles.transactionText, styles.debited];
  }

  return (
    <View style={styles.transactionRow}>
    <View style={styles.transactionRow}>
      <Ionicons style={styles.image} name="bag-handle-outline" size={24} color="#1F2937" />
      <View style={styles.transactionCol}>
        <Text style={statusStyle}>{statusText}</Text>
        <Text style={styles.transactionText}>{formatDate(item.date)}</Text>
      </View>
    </View>
    <View>
      <Text style={styles.transactionText3}>NGN{item.amount}</Text>
    </View>
  </View>
  );
};

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="white" barStyle="dark-content" />
      <View style={styles.header}>
        <Text style={styles.text}>Wallet Transactions</Text>
      </View>
      {sortedTransactions && sortedTransactions.length > 0 ? (
        <View style={styles.scrollContainer}>
          
          <View style={styles.flatListContainer}>
          <FlatList
              data={sortedTransactions}
              renderItem={renderTransactionItem}
              keyExtractor={(item) => item._id.toString()}
            />
          </View>
        </View>
      ) : (
        <View style={styles.iconContainer}>
          <Ionicons style={styles.icon} name="notifications-outline" size={45} color="#1F2937" />
          <Text style={styles.noActivityText}>Looks like no recent activity to show here. Get started by making a transaction.</Text>
        </View>
      )}
    </View>
  );
};

export default RecentActivity;

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    borderRadius: 15,
    padding: 10,
    flex: 1, // Ensure the container takes up all available space
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  text: {
    color: 'black',
    fontSize: 18,
    lineHeight: 24,
    fontWeight: '700',
  },
  iconContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 80,
  },
  icon: {
    backgroundColor: 'rgba(50, 50, 50, 0.1)',
    padding: 30,
    borderRadius: 10,
  },
  noActivityText: {
    color: 'white',
    fontSize: 16,
    marginLeft: 10,
    // textAlign: 'center',
    paddingTop: 10,
    fontWeight: '100',
    lineHeight: 30,
  },
  tableHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(50, 50, 50, 0.1)',
    backgroundColor: '#1F2937',
    borderRadius: 10,
    paddingHorizontal: 5,
  },
  headerText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    flex: 1,
    // textAlign: 'center',
  },
  transactionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    paddingVertical: 5,
    
    alignContent: "center",
    alignItems: "center",
    gap: 9
  },
  transactionCol: {
    flexDirection: "column",
    justifyContent: "flex-start"
  },
  transactionText: {
    color: '#1F2937',
    fontSize: 13,

    // textAlign: 'center',
  },
  transactionText3: {
    color: '#1F2937',
    fontSize: 18,

    // textAlign: 'center',
  },
  credited: {
    color: '#1F2937',
    fontSize: 20,
    fontWeight: "500"
  },
  debited: {
    color: '#1F2937',
    fontSize: 20,
    fontWeight: "500"
  },
  scrollContainer: {
    flex: 1, // Ensure this view takes up all available space
  },
  
  image:{
    backgroundColor:"rgba(50, 50, 50, 0.1)",
    padding: 20,
    borderRadius: 100
  },
  flatListContainer:{
    marginBottom: 60
  }
});
