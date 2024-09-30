import { AntDesign, FontAwesome } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Linking } from 'react-native';

const banksInNigeria = [
  "Access Bank",
  "Zenith Bank",
  "Guaranty Trust Bank",
  "First Bank of Nigeria",
  // Add more banks as needed
];

const BankForm = ({ navigation }) => {
  const [fullName, setFullName] = useState('');
  const [selectedBank, setSelectedBank] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [bvn, setBvn] = useState('');

  const handleSubmit = () => {
    // Handle form submission here
    console.log("Form submitted with data:", {
      fullName,
      selectedBank,
      accountNumber,
      bvn
    });
  };

  return (
    <View style={styles.container}>
        <TouchableOpacity onPress={() => navigation.navigate('Dashboard')} style={styles.iconContainer}>
        <AntDesign name="arrowleft" size={24} color="white" />
      </TouchableOpacity>
      <Text style={styles.title}>Add new account</Text>
      <TextInput
        style={styles.input}
        onChangeText={text => setFullName(text)}
        value={fullName}
        placeholderTextColor="white"
        placeholder="Full Name"
      />
    <View style={styles.select}>

      <Picker
        selectedValue={selectedBank}
        style={styles.selec}
        onValueChange={(itemValue) => setSelectedBank(itemValue)}>
        <Picker.Item label="Select a Bank" value=""  style={styles.item} />
        {banksInNigeria.map((bank, index) => (
          <Picker.Item key={index} label={bank} value={bank}  />
        ))}
      </Picker>
    </View>
  
      <TextInput
        style={styles.input}
        onChangeText={text => setAccountNumber(text)}
        value={accountNumber}
        keyboardType="numeric"
        placeholderTextColor="white"
            placeholder="Account Number"
      />
     
      <TextInput
        style={styles.input}
        onChangeText={text => setBvn(text)}
        value={bvn}
        keyboardType="numeric"
        placeholderTextColor="white"
        placeholder="BVN"
      />
      <TextInput
        style={styles.input}
       
        keyboardType="numeric"
        placeholderTextColor="white"
        placeholder="Card Number"
      />
      <View style={styles.valid}>
      <TextInput
        style={styles.inpu}
       
        keyboardType="numeric"
        placeholderTextColor="white"
        placeholder="Valid Thru (MM/YY)"
      />
      <TextInput
        style={styles.inpu}
        keyboardType="numeric"
        placeholderTextColor="white"
        placeholder="CVV"
      />
      </View>

       <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Add account</Text>
          </TouchableOpacity>
          <View style={styles.profileInfo3}>
  <TouchableOpacity onPress={() => Linking.openURL('https://twitter.com/your_username')}>
    <FontAwesome name="twitter" style={styles.edit1} size={24} color="#1DA1F2" />
  </TouchableOpacity>
  <TouchableOpacity onPress={() => Linking.openURL('whatsapp://send?text=Hello Dakieo&phone=+2348107265575')}>
    <FontAwesome name="whatsapp" style={styles.edit1} size={24} color="#25D366" />
  </TouchableOpacity>
  <TouchableOpacity onPress={() => Linking.openURL('https://www.facebook.com/your_profile')}>
    <FontAwesome name="facebook" style={styles.edit1} size={24} color="#4267B2" />
  </TouchableOpacity>
  <TouchableOpacity onPress={() => Linking.openURL('https://www.instagram.com/your_username')}>
    <FontAwesome name="instagram" style={styles.edit1} size={24} color="#C13584" />
  </TouchableOpacity>
  <TouchableOpacity onPress={() => Linking.openURL('https://www.linkedin.com/in/olaniyi-gbadegesin-63898517b/')}>
    <FontAwesome name="linkedin" style={styles.edit1} size={24} color="#0077B5" />
  </TouchableOpacity>
</View>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#121433",
      justifyContent:"center",
      padding: 20
    },
    profileInfo3:{
        flexDirection:"row",
        justifyContent:"center",
        alignItems:"center",
        marginVertical: 40,
        gap: 20
      
      },
      edit1:{
        fontSize: 15,
        fontWeight: "100",
        backgroundColor:"#23265A",
        padding: 18,
        borderRadius: 9
      },
    iconContainer: {
        position: 'absolute',
        top: 20,
        left: 20,
        zIndex: 1,
        color:"white",
        fontSize: 20
      },
    title:{
        color:"white",
        paddingVertical: 20,
        textAlign:"center",
        fontSize: 30,
        fontWeight:"100"
    },
    input: {
        backgroundColor: '#23265A',
        borderRadius: 15,
        marginVertical: 10,
        paddingHorizontal: 20,
        paddingVertical: 15,
        borderWidth: 1,
        color:"white"
      },
      inpu: {
        backgroundColor: '#23265A',
        borderRadius: 15,
        marginVertical: 10,
        paddingHorizontal: 20,
        paddingVertical: 15,
        borderWidth: 1,
        color:"white",
        width: 175
      },
      select:{
        backgroundColor: '#23265A',
        borderRadius: 15,
        marginVertical: 10,
        paddingHorizontal: 2,
        paddingVertical: 5,
        borderWidth: 1,
       
      },
      selec:{
        color:"white"
      },
      item:{
        color:"black",
        backgroundColor: "#23265A"
      },
      button: {
        backgroundColor: "#2567F9",
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
      },
      valid:{
        flexDirection:"row",
        justifyContent:"center",
        gap: 25
      }
   
  });
  

export default BankForm;
