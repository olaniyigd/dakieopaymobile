import React, { useState, useEffect } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Text, Image, ActivityIndicator, ScrollView } from 'react-native';
import { AntDesign, Octicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_BASE_URL } from '@env';
import { DATA_BASE_URL } from '@env';
import { MOBILE_NIG_BASE_URL } from '@env';
const Cable = ({ navigation }) => {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [saveBeneficiary, setSaveBeneficiary] = useState(false);
    const [amount, setAmount] = useState('₦0.00');
    const [selectedProvider, setSelectedProvider] = useState(null);
    const [showServicePlan, setShowServicePlan] = useState(false);
    const [servicePlans, setServicePlans] = useState([]);
    const [selectedServicePlan, setSelectedServicePlan] = useState('');
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
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
                throw new Error('Network response was not ok');
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

    const tokens = `${DATA_BASE_URL}`;

    const sendPostRequest = async () => {
        let payload;
        setShowServicePlan(true);
        setLoading(true);
        if (selectedProvider === 'airtel') {
            payload = {
                service_id: 'AKA'
                // requestType: 'SME'
            };
        } else if (selectedProvider === 'mtn') {
            payload = {
                service_id: 'AKC'
                // requestType: 'SME'
            };
        } else if (selectedProvider === '9mobile') {
            payload = {
                service_id: 'AKB'
                // requestType: 'SME'
            };
        } else if (selectedProvider === 'glo') {
            payload = {
                service_id: 'AKA',
                // requestType: 'SME'
            };
        }

        // console.log(payload);

        try {
            for (let i = 0; i < 2; i++) {
                const response = await fetch(`${MOBILE_NIG_BASE_URL}/services/packages`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${tokens}`
                    },
                    body: JSON.stringify(payload)
                });

                if (response.ok) {
                    const data = await response.json();
                    // console.log('Response:', data?.details);
                    setServicePlans(data?.details);
                } else {
                    // console.error('Response not OK:', response.statusText);
                }
            }
        } catch (error) {
            // console.error('Error:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (selectedProvider === 'mtn' || selectedProvider === 'airtel' || selectedProvider === '9mobile' || selectedProvider === 'glo') {
            sendPostRequest();
        }
    }, [selectedProvider]);

    const selectProvider = (provider) => {
        setSelectedProvider(provider);
    };

    const toggleServicePlanContainer = () => {
        if (!selectedProvider) {
            setErrorMessage('Please select a provider.');
            setTimeout(() => {
                setErrorMessage('');
            }, 3000); // Set timeout for 3 seconds
            return;
        }
        setShowServicePlan(!showServicePlan);
        sendPostRequest();
    };

    const selectServicePlan = (plan) => {
        setSelectedServicePlan(plan.name);
        setAmount(`${parseInt(plan.price)}`);
        setShowServicePlan(false);
    };

    const ClosetoggleServicePlanContainer = () => {
        setShowServicePlan(false);
    };

    useEffect(() => {
        if (parseFloat(amount) > parseFloat(balance)) {
            // setAlert("Insufficient balance. Please fund your wallet");
        } else {
            setAlert("");
        }
    }, [amount, balance]);
    return (
        <View style={styles.cont}>
            <TouchableOpacity onPress={() => navigation.navigate('Dashboard')} style={styles.iconContainer}>
        <AntDesign name="arrowleft" size={28} color="#1F2937" />
      </TouchableOpacity>
            <View style={styles.container}>
                <Text style={styles.text}>Service Provider</Text>
                <View style={styles.iconContainer}>
                    <TouchableOpacity
                        style={[styles.iconWrapper, selectedProvider === 'mtn' && { borderColor: '#1F2937', borderWidth: 2 }]}
                        onPress={() => selectProvider('mtn')}
                    >
                        <Image
                            source={require('../../assets/dstv.png')}
                            style={styles.country}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.iconWrapper, selectedProvider === 'glo' && { borderColor: '#1F2937', borderWidth: 2 }]}
                        onPress={() => selectProvider('glo')}
                    >
                        <Image
                            source={require('../../assets/gotv.png')}
                            style={styles.country}
                        />
                    </TouchableOpacity>
                    {/* <TouchableOpacity
                        style={[styles.iconWrapper, selectedProvider === 'airtel' && { borderColor: '#633eca', borderWidth: 2 }]}
                        onPress={() => selectProvider('airtel')}
                    >
                        <Image
                            source={require('./assets/showmax.png')}
                            style={styles.country}
                        />
                    </TouchableOpacity> */}
                    <TouchableOpacity
                        style={[styles.iconWrapper, selectedProvider === '9mobile' && { borderColor: '#1F2937', borderWidth: 2 }]}
                        onPress={() => selectProvider('9mobile')}
                    >
                        <Image
                            source={require('../../assets/startime.jpg')}
                            style={styles.country}
                        />
                    </TouchableOpacity>
                </View>
                {errorMessage !== '' && <Text style={styles.error}>{errorMessage}</Text>}
            </View>
            <Text style={styles.switchLabel}>Decoder number</Text>
            <TextInput
                style={styles.input}
                placeholder="e.g 000000000"
                placeholderTextColor="grey"
                keyboardType="phone-pad"
                value={phoneNumber}
                onChangeText={text => setPhoneNumber(text)}
                // maxLength={11}
            />

            <TouchableOpacity style={styles.servicePlanContainer} onPress={toggleServicePlanContainer}>
                <Text style={styles.selectedPlanText}>{selectedServicePlan || "service plan"}</Text>
                <TouchableOpacity style={styles.dropdownIcon} >
                    <AntDesign name="down" size={15} color="#1F2937" />
                </TouchableOpacity>
            </TouchableOpacity>
            {showServicePlan && (
                <View style={styles.servicePlan}>
                     <View style={styles.closeContainer}>
                        <Octicons  onPress={ClosetoggleServicePlanContainer} name="dash" size={54} color="black" />
                    </View>
                    {loading ? (
                        <View style={styles.loadingContainer}>
                            <ActivityIndicator size="large" color="#1F2937" />
                        </View>
                    ) : (
                        <ScrollView>
                            {servicePlans.map((plan, index) => (
                                <TouchableOpacity key={index} style={styles.planContainer} onPress={() => selectServicePlan(plan)}>
                                    <Text style={styles.planText}>{plan.name}</Text>
                                    <Text style={styles.planText}>₦{parseInt(plan.price)}</Text>
                                </TouchableOpacity>
                            ))}
                        </ScrollView>
                    )}
                </View>
            )}

            <Text style={styles.switchLabel}>Amount</Text>
            <View style={styles.servicePlanContainer}>
                <Text style={styles.switchLabel}>{`${amount}`}</Text>
            </View>
            <Text style={styles.alert}>{alert}</Text>

            {selectedProvider && selectedServicePlan && phoneNumber.trim() && parseFloat(amount) < parseFloat(balance) ? (
            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Continue</Text>
            </TouchableOpacity>
        ) : null}
        </View>
    );
};
const styles = StyleSheet.create({
    cont: {
        padding: 25,
        paddingTop: 0,
        backgroundColor:"white",
        height:"100%"
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
        width: 80,
        height: 50,
        borderRadius: 5,
        marginBottom: 20,
    },
    iconContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    iconWrapper: {
        width: 86,
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
        fontSize: 18,
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
        fontWeight: "400"
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
    servicePlanContainer: {
        backgroundColor: 'rgba(50, 50, 50, 0.1)',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 20,
        borderRadius: 10,
        marginVertical: 10
    },
    dropdownIcon: {
        // padding: 10,
    },
    servicePlan: {
        position: "absolute",
        backgroundColor: "white",
        bottom: -190,
        width: "120%",
        zIndex: 1,
        height: "90%",
        borderTopEndRadius: 10,
        borderTopRightRadius: 10
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    planText: {
        color: '#1F2937',
        padding: 12,
    },
    planContainer:{
        flexDirection: "row",
        padding: 10,
       
    },
    selectedPlanText: {
        color: '#1F2937',
        fontSize: 16,
        fontWeight: "400"
    },
    error:{
        color:"red"
    },
    alert: {
        color: "red"
    },
    closeContainer: {
        flexDirection: "row",
        justifyContent: "center",
    }
});

export default Cable;
