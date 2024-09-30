import React, { useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Text, Image, Switch, Clipboard } from 'react-native';
import { AntDesign, FontAwesome6 } from '@expo/vector-icons';

const FundWallet = ({ navigation }) => {
    const [phoneNumber, setPhoneNumber] = useState('0169889978'); // Dummy phone number for demonstration
    const [saveBeneficiary, setSaveBeneficiary] = useState(false); // State for the switch
    const [amount, setAmount] = useState('₦0.00'); // Default value for amount input
    const [selectedProvider, setSelectedProvider] = useState(null); // State to store selected provider
    const [showServicePlan, setShowServicePlan] = useState(false); // State to control service plan container visibility
    const [message, setMessage] = useState(null); // State for displaying message

    const toggleSwitch = () => {
        setSaveBeneficiary(previousState => !previousState);
    };

    const selectProvider = (provider) => {
        setSelectedProvider(provider);
    };

    const toggleServicePlanContainer = () => {
        setShowServicePlan(!showServicePlan);
    };

    const copyPhoneNumber = async () => {
        await Clipboard.setString(phoneNumber);
        setMessage('copied');
        setTimeout(() => {
            setMessage("");
        }, 2000); // Hide message after 2 seconds
    };

    return (
        <View style={styles.cont}>
            <TouchableOpacity onPress={() => navigation.navigate('wallet')} style={styles.iconContainer}>
                <AntDesign name="arrowleft" size={24} color="white" />
            </TouchableOpacity>
            <View style={styles.container}>
                <Text style={styles.text1}>Fund Tips</Text>
                <Text style={styles.text}>Transfer to the account number below to fund your wallet</Text>
                <View style={styles.container2}>
                    <View style={styles.contai}>
                        <Text style={styles.text1}>Virtual Account</Text>
                        <Text style={styles.text1}>Globus Bank</Text>
                    </View>
                    <View style={styles.conta}>
                        <Text style={styles.number}>0169889978</Text>
                        <TouchableOpacity onPress={copyPhoneNumber}>
                            <FontAwesome6 name="copy" size={20} color="white" />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.contai}>
                        <Text style={styles.text}>Faruq</Text>
                    </View>
                </View>
           <Text style={styles.message}>{message}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    cont: {
        padding: 25,
        paddingTop: 0,
        backgroundColor: "black",
        height: "100%"
    },

    container: {
        height: 130,
        marginTop: 10,
        borderRadius: 15,
        padding: 5,
    },
    container2: {
        backgroundColor: "#633eca",
        height: 150,
        borderRadius: 10
    },
    iconContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    contai: {
        padding: 15,
        paddingBottom: 0,
        flexDirection: "row",
        justifyContent: "space-between"
    },
    conta: {
        width: 130,
        backgroundColor: "#8266cd",
        margin: 15,
        marginTop: 0,
        flexDirection: "row",
        gap: 10,
        padding: 8,
        borderRadius: 6
    },
    text: {
        color: 'white',
        fontSize: 16,
        lineHeight: 24,
        fontWeight: "100",
        paddingBottom: 15
    },
    text1: {
        color: 'white',
        fontSize: 16,
        lineHeight: 24,
        fontWeight: "500",
        paddingBottom: 15
    },
    number: {
        color: 'white',
        fontSize: 16,
        lineHeight: 24,
        fontWeight: "500",
    },
    message: {
        position: 'absolute',
        top: 10,
        left: 0,
        right: 0,
        // backgroundColor: 'rgba(0, 0, 0, 0.7)',
        color: 'red',
        paddingVertical: 10,
        paddingHorizontal: 20,
        textAlign: 'center',
        borderRadius: 10,
        zIndex: 9999,
    },
});

export default FundWallet;
