import { AntDesign, FontAwesome } from '@expo/vector-icons';
import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, TouchableOpacity, Text, Linking } from 'react-native';

const ComplianceForm = ({ navigation }) => {
  const [fullName, setFullName] = useState('');
  const [bvn, setBvn] = useState('');
  const [confirmNin, setConfirmNin] = useState('');
  const [address, setAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleSubmission = () => {
    // Handle submission logic here
    console.log('Form submitted!');
  };

  return (
    <View style={styles.container}>
        <TouchableOpacity onPress={() => navigation.navigate('profile')} style={styles.iconContainer}>
        <AntDesign name="arrowleft" size={24} color="white" />
      </TouchableOpacity>
      <Text style={styles.text}>Compliance</Text>
      <TextInput
        style={styles.input}
        placeholder="Full Name"
        placeholderTextColor="white"
        value={fullName}
        onChangeText={text => setFullName(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="BVN"
        placeholderTextColor="white"
        value={bvn}
        onChangeText={text => setBvn(text)}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="NIN"
        placeholderTextColor="white"
        value={confirmNin}
        onChangeText={text => setConfirmNin(text)}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Address"
        placeholderTextColor="white"
        value={address}
        onChangeText={text => setAddress(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Phone Number"
        placeholderTextColor="white"
        value={phoneNumber}
        onChangeText={text => setPhoneNumber(text)}
        keyboardType="phone-pad"
      />
      <TouchableOpacity style={styles.button} >
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
          {/* <View style={styles.profileInfo3}>
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
</View> */}
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
      iconContainer: {
        position: 'absolute',
        top: 20,
        left: 20,
        zIndex: 1,
        color:"white",
        fontSize: 20
      },
      text: {
        color: 'white',
        fontSize: 24,
        marginBottom: 20,
        fontWeight:"100",
        textAlign:"start"
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
      profileInfo3:{
        flexDirection:"row",
        justifyContent:"center",
        alignItems:"center",
        margin: 40,
        gap: 20
      
      },
      edit1:{
        fontSize: 15,
        fontWeight: "100",
        backgroundColor:"#23265A",
        padding: 18,
        borderRadius: 9
      },
});

export default ComplianceForm;
