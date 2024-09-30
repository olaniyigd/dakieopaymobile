import React from 'react';
import { StatusBar, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const QuickService = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="white" barStyle="dark-content" />
      <Text style={styles.text}>Quick Action</Text>
      <View style={styles.iconContainer}>
        <TouchableOpacity style={styles.iconWrapper} onPress={() => navigation.navigate('airtime')}>
          <Ionicons name="phone-portrait" size={20} color="#1F2937" />
          <Text style={styles.iconText}>Airtime</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconWrapper} onPress={() => navigation.navigate('data')}>
          <Ionicons name="wifi" size={20} color="#1F2937" />
          <Text style={styles.iconText}>Data</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconWrapper} onPress={() => navigation.navigate('cable')}>
          <FontAwesome name="tv" size={20} color="#1F2937" />
          <Text style={styles.iconText}>CableTv</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconWrapper} onPress={() => navigation.navigate('loan')}>
        <FontAwesome name="money" size={24} color="#1F2937" />
          <Text style={styles.iconText}>Loan</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.bottomIconContainer}>
        <TouchableOpacity style={styles.iconWrapper} onPress={() => navigation.navigate('service')}>
        <Ionicons name="ellipsis-horizontal" size={20} color="#1F2937" />
          <Text style={styles.iconText}>More</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default QuickService;

const styles = StyleSheet.create({
  container: {
    height: 200, // Increased height to accommodate the new icon
    marginTop: 10,
    borderRadius: 15,
    padding: 5,
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10, // Added margin bottom to create space between top and bottom icons
  },
  bottomIconContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  iconWrapper: {
    width: 85,
    height: 70,
    alignItems: 'center',
    backgroundColor:"rgba(50, 50, 50, 0.1)",
    padding: 15,
    borderRadius: 10
  },
  iconText: {
    color: '#1F2937',
    marginTop: 5,
    fontSize: 15,
    fontWeight: "400"
  },
  text: {
    color: 'white',
    fontSize: 18,
    lineHeight: 24,
    fontWeight: "700",
    paddingBottom: 15
  },
});
