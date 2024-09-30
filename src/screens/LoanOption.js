import React, { useState } from 'react';
import { StatusBar, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const LoanOption = () => {
  const navigation = useNavigation();
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  const handleContinue = () => {
    // Navigate to LoanForm screen
    navigation.navigate('loanForm');
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="white" barStyle="dark-content" />
      <Text style={styles.text}>Available Loan</Text>
      <View style={styles.iconContainer}>
        <TouchableOpacity
          style={[
            styles.iconWrapper,
            selectedOption === '1,000 - 5,000' && styles.selectedIcon,
          ]}
          onPress={() => handleOptionSelect('1,000 - 5,000')}>
          <Text style={styles.iconText}>1,000 - 5,000</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.iconWrapper,
            selectedOption === '5,000 - 10,000' && styles.selectedIcon,
          ]}
          onPress={() => handleOptionSelect('5,000 - 10,000')}>
          <Text style={styles.iconText}>5,000 - 10,000</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.iconWrapper,
            selectedOption === '10,000 - 50,000' && styles.selectedIcon,
          ]}
          onPress={() => handleOptionSelect('10,000 - 50,000')}>
          <Text style={styles.iconText}>10,000 - 50,000</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.iconContainer}>
        <TouchableOpacity
          style={[
            styles.iconWrapper,
            selectedOption === '50,000 - 100,000' && styles.selectedIcon,
          ]}
          onPress={() => handleOptionSelect('50,000 - 100,000')}>
          <Text style={styles.iconText}>50,000 - 100,000</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.iconWrapper,
            selectedOption === '100,000 - 200,000' && styles.selectedIcon,
          ]}
          onPress={() => handleOptionSelect('100,000 - 200,000')}>
          <Text style={styles.iconText}>100,000 - 200,000</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.iconWrapper,
            selectedOption === '200,000 - 500,000' && styles.selectedIcon,
          ]}
          onPress={() => handleOptionSelect('200,000 - 500,000')}>
          <Text style={styles.iconText}>200,000 - 500,000</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.iconContainer}>
        <TouchableOpacity
          style={[
            styles.iconWrapper,
            selectedOption === '500,000 - 700,000' && styles.selectedIcon,
          ]}
          onPress={() => handleOptionSelect('500,000 - 700,000')}>
          <Text style={styles.iconText}>500,000 - 700,000</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.iconWrapper,
            selectedOption === '700,000 - 1,000,000' && styles.selectedIcon,
          ]}
          onPress={() => handleOptionSelect('700,000 - 1,000,000')}>
          <Text style={styles.iconText}>700,000 - 1,000,000</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.iconWrapper,
            selectedOption === '1,000,000 - 2,000,000' && styles.selectedIcon,
          ]}
          onPress={() => handleOptionSelect('1,000,000 - 2,000,000')}>
          <Text style={styles.iconText}>1,000,000 - 2,000,000</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.iconContainer}>
        <TouchableOpacity
          style={[
            styles.iconWrapper,
            selectedOption === '2,000,000 - 3,000,000' && styles.selectedIcon,
          ]}
          onPress={() => handleOptionSelect('2,000,000 - 3,000,000')}>
          <Text style={styles.iconText}>2,000,000 - 3,000,000</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.iconWrapper,
            selectedOption === '3,000,000 - 5,000,000' && styles.selectedIcon,
          ]}
          onPress={() => handleOptionSelect('3,000,000 - 5,000,000')}>
          <Text style={styles.iconText}>3,000,000 - 5,000,000</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.iconWrapper,
            selectedOption === '5,000,000 - 10,000,000' && styles.selectedIcon,
          ]}
          onPress={() => handleOptionSelect('5,000,000 - 10,000,000')}>
          <Text style={styles.iconText}>5,000,000 - 10,000,000</Text>
        </TouchableOpacity>
      </View>
      {selectedOption && (
        <TouchableOpacity style={styles.button} onPress={handleContinue}>
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default LoanOption;

const styles = StyleSheet.create({
  container: {
    height: '100%',
    padding: 20,
    backgroundColor: 'white',
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  iconWrapper: {
    width: 120,
    height: 100,
    flexDirection: 'row',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(50, 50, 50, 0.1)',
    padding: 15,
    borderRadius: 10,
  },
  selectedIcon: {
    borderColor: '#1F2937',
    borderWidth: 2,
  },
  iconText: {
    color: '#1F2937',
    marginTop: 5,
    fontSize: 14,
    fontWeight: '600',
  },
  text: {
    color: '#1F2937',
    fontSize: 18,
    lineHeight: 24,
    fontWeight: '700',
    paddingBottom: 15,
  },
  button: {
    backgroundColor: "#1F2937",
    borderRadius: 5,
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginTop: 10,
    borderRadius: 15,
    borderWidth: 1
},
buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: "100"
},
});
