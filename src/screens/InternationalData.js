import React, { useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Text, Image, Switch, ScrollView } from 'react-native';
import { AntDesign, Octicons } from '@expo/vector-icons';

// Define an array containing country codes and flag images
const countries = [
    { code: '+1', flag: require('../../assets/us.png') }, // Nigeria
    { code: '+44', flag: require('../../assets/uk.png') }, // United Kingdom
    { code: '+81', flag: require('../../assets/japan.png') }, // Japan
    { code: '+27', flag: require('../../assets/south.png') }, // South Africa
    { code: '+254', flag: require('../../assets/kenya.png') }, // Kenya
    { code: '+234', flag: require('../../assets/nigeria.png') }, // Nigeria
    { code: '+256', flag: require('../../assets/uganda.png') }, // Uganda
    { code: '+233', flag: require('../../assets/ghana.png') }, // Ghana
];

const InterData = ({ navigation }) => {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [selectedCountry, setSelectedCountry] = useState(countries[0]); // Default selected country

    const [saveBeneficiary, setSaveBeneficiary] = useState(false); // State for the switch
    const [amount, setAmount] = useState('₦0.00'); // Default value for amount input
    const [showCountryPopup, setShowCountryPopup] = useState(false);

    const toggleCountryPopup = () => {
        setShowCountryPopup(!showCountryPopup);
    };
    const ClosetoggleServicePlanContainer = () => {
        setShowCountryPopup(false);
    };
    const selectCountry = (index) => {
        setSelectedCountry(countries[index]);
        setShowCountryPopup(false); // Close the popup after selecting a country
    };

    return (
        <View>
            <View style={styles.cont}>
                <Text style={styles.switchLabel}>Phone number</Text>
                <View style={styles.inputContainer}>
                    {/* Display selected country code and flag */}
                    <TouchableOpacity style={styles.countryselect} onPress={toggleCountryPopup}>
                        <Image source={selectedCountry.flag} style={styles.flagImage} />
                        <Text style={styles.countryCode}>{selectedCountry.code}</Text>
                        <AntDesign name="down" size={10} color="grey" />
                    </TouchableOpacity>
                    <TextInput
                        style={styles.input}
                        placeholder="9000000000"
                        placeholderTextColor="grey"
                        keyboardType="phone-pad"
                        value={phoneNumber}
                        onChangeText={text => setPhoneNumber(text)}
                    />
                </View>
                {/* <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>Continue</Text>
                </TouchableOpacity> */}
            </View>
            {showCountryPopup && (
                 <View style={styles.countryPopupContainer}>
                     <View style={styles.closeContainer}>
                        <Octicons  onPress={ClosetoggleServicePlanContainer} name="dash" size={54} color="black" />
                    </View>
                 <ScrollView>
                     {/* Map over the countries array to render country codes and flags */}
                     {countries.map((country, index) => (
                         <TouchableOpacity key={index} style={styles.countryItem} onPress={() => selectCountry(index)}>
                             <Image source={country.flag} style={styles.flagImage} />
                             <Text style={styles.countryCode}>{country.code}</Text>
                         </TouchableOpacity>
                     ))}
                 </ScrollView>
             </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    cont: {
        height: "100%",
        position: "relative",
        width: "100%",
        padding: 25,
        paddingTop: 0
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    input: {
        flex: 1,
        backgroundColor: 'rgba(50, 50, 50, 0.1)',
        borderRadius: 10,
        paddingHorizontal: 15,
        paddingVertical: 12,
        // borderWidth: 1,
        color: "balck",
        fontSize: 18
    },
    countryPopupContainer: {
        position: 'absolute',
        top: 390,
        right: 0,
        bottom: 0,
        width: "100%",
        height: "100%",
        backgroundColor: 'white',
        zIndex: 100,
        borderTopLeftRadius: 15,
        borderTopEndRadius: 15,
        // borderTopWidth: 2, 
        // borderTopColor: '#1F2937', 
      
    },
    countryselect:{
        display:"flex",
        flexDirection:"row",
        justifyContent:"center",
        alignItems:"center",
        backgroundColor: 'rgba(50, 50, 50, 0.1)',
        borderRadius: 10,
        paddingHorizontal: 7,
        paddingVertical: 15,
        // fontSize: 20
        // borderWidth: 1,
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
        color: '#1F2937',
        textAlign: 'center',
        fontSize: 16,
        fontWeight: "100"
    },
    switchLabel: {
        color: 'w',
        marginLeft: 5,
        fontSize: 18,
        marginBottom: 10,
        fontWeight: "400"
    },
    countryItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
    flagImage: {
        width: 20,
        height: 12,
        marginRight: 10,
    },
    countryCode: {
        color: '#1F2937',
        fontSize: 18,
    },
    closeContainer: {
        flexDirection: "row",
        justifyContent: "center",
    }
});

export default InterData;
