import React, { useEffect, useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Text, Image, ActivityIndicator } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_BASE_URL } from '@env';
import { DATA_BASE_URL } from '@env';
import { MOBILE_NIG_BASE_URL } from '@env';
const LocalAirtime = ({ navigation }) => {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [saveBeneficiary, setSaveBeneficiary] = useState(false);
    const [amount, setAmount] = useState('');
    const [selectedProvider, setSelectedProvider] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const toggleSwitch = () => {
        setSaveBeneficiary(previousState => !previousState);
    };

    const selectProvider = (provider) => {
        setSelectedProvider(provider);
    };

    const isFormValid = () => {
        return phoneNumber && amount !== '' && selectedProvider && parseFloat(amount) <= parseFloat(balance) && parseFloat(balance) >= 100;
    };

    const [userid, setUserid] = useState('');
    const [token, setToken] = useState('');
    const [balance, setBalance] = useState("");
    const [alert, setAlert] = useState("");

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
        } catch (error) {
            // console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, [userid, token]);

    useEffect(() => {
        if (parseFloat(amount) > parseFloat(balance)) {
            // setAlert("Insufficient balance. Please fund your wallet");
        } else {
            setAlert("");
        }
    }, [amount, balance]);

    const tokens = `${DATA_BASE_URL}`;
    const handleContinue = () => {
        setIsLoading(true);

        setTimeout(async () => {
            let payload = {
                phone_number: phoneNumber,
                amount: amount.replace('₦', ''),
            };

            if (selectedProvider === 'mtn') {
                payload = {
                    ...payload,
                    service_id: "BAD",
                    trans_id: 49304904903,
                    service_type: "STANDARD"
                };
            } else if (selectedProvider === '9mobile') {
                payload = {
                    ...payload,
                    service_id: "BAC",
                    trans_id: 9876543345678,
                    service_type: "STANDARD"
                };
            } else if (selectedProvider === 'glo') {
                payload = {
                    ...payload,
                    service_id: "BAB",
                    trans_id: 34832403388,
                    service_type: "STANDARD"
                };
            } else if (selectedProvider === 'airtel') {
                payload = {
                    ...payload,
                    service_id: "BAA",
                    trans_id: 2345665438,
                    service_type: "STANDARD"
                };
            }


            if (payload) {
                try {
                    const response = await fetch(`${MOBILE_NIG_BASE_URL}/services/`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${tokens}`
                        },
                        body: JSON.stringify(payload)
                    });

                    const data = await response.json();
                    // console.log('Success:', data);

                    if (response.ok) {
                        // Handle success, maybe navigate to another screen
                    } else {
                        // Handle error
                    }
                } catch (error) {
                    console.error('Error:', error);
                } finally {
                    setIsLoading(false);
                }
            }
        }, 3000);
    };

    return (
        <View style={styles.cont}>
            <Text style={styles.switchLabel}>Phone number</Text>
            <TextInput
                style={styles.input}
                placeholder="e.g +2348100000000"
                placeholderTextColor="grey"
                keyboardType="phone-pad"
                value={phoneNumber}
                onChangeText={text => setPhoneNumber(text)}
            />

            <View style={styles.container}>
                <Text style={styles.text}>Service Provider</Text>
                <View style={styles.iconContainer}>
                    <TouchableOpacity
                        style={[styles.iconWrapper, selectedProvider === 'mtn' && { borderColor: '#633eca', borderWidth: 2 }]}
                        onPress={() => selectProvider('mtn')}
                    >
                        <Image
                            source={require('../../assets/mtn.png')}
                            style={styles.country}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.iconWrapper, selectedProvider === 'glo' && { borderColor: '#633eca', borderWidth: 2 }]}
                        onPress={() => selectProvider('glo')}
                    >
                        <Image
                            source={require('../../assets/Glo.png')}
                            style={styles.country}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.iconWrapper, selectedProvider === 'airtel' && { borderColor: '#633eca', borderWidth: 2 }]}
                        onPress={() => selectProvider('airtel')}
                    >
                        <Image
                            source={require('../../assets/airtel.png')}
                            style={styles.country}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.iconWrapper, selectedProvider === '9mobile' && { borderColor: '#633eca', borderWidth: 2 }]}
                        onPress={() => selectProvider('9mobile')}
                    >
                        <Image
                            source={require('../../assets/9mobile.png')}
                            style={styles.country}
                        />
                    </TouchableOpacity>
                </View>
            </View>
            <Text style={styles.switchLabel}>Amount</Text>
            <TextInput
                style={styles.input}
                placeholder="₦"
                placeholderTextColor="#1F2937"
                keyboardType="phone-pad"
                value={amount}
                onChangeText={text => setAmount(text)}
            />
            <Text style={styles.alert}>{alert}</Text>

            {isFormValid() && (
                <TouchableOpacity style={styles.button} onPress={handleContinue} disabled={isLoading}>
                    {isLoading ? (
                        <ActivityIndicator size="small" color="#FFF" />
                    ) : (
                        <Text style={styles.buttonText}>Buy</Text>
                    )}
                </TouchableOpacity>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    cont: {
        padding: 25,
        paddingTop: 0
    },
    input: {
        backgroundColor: 'rgba(50, 50, 50, 0.1)',
        borderRadius: 15,
        marginVertical: 10,
        paddingHorizontal: 20,
        paddingVertical: 15,
        // borderWidth: 1,
        color: "black",
        fontSize: 18
    },
    container: {
        height: 130,
        marginTop: 10,
        borderRadius: 15,
        padding: 5,
    },
    country: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginBottom: 20,
    },
    iconContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    iconWrapper: {
        width: 70,
        height: 70,
        alignItems: 'center',
        backgroundColor: "rgba(50, 50, 50, 0.1)",
        padding: 10,
        borderRadius: 10
    },
    iconText: {
        color: '#1F2937',
        marginTop: 5,
        fontSize: 12,
        fontWeight: "400"
    },
    text: {
        color: '#1F2937',
        fontSize: 16,
        lineHeight: 24,
        fontWeight: "400",
        paddingBottom: 15
    },
    switchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 5,
    },
    switchLabel: {
        color: '#1F2937',
        marginLeft: 5,
        fontSize: 16,
        marginTop: 20,
        fontWeight: "400"
    },
    button: {
        backgroundColor: "#1F2937",
        borderRadius: 5,
        paddingVertical: 15,
        paddingHorizontal: 20,
        marginTop: 10,
        borderRadius: 15,
        // borderWidth: 1
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
        fontSize: 16,
        fontWeight: "400"
    },
    alert: {
        color: "red"
    }
});

export default LocalAirtime;
