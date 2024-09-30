import { AntDesign, Ionicons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { View, TextInput, Button, StyleSheet, TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_BASE_URL } from '@env';
import Toast from 'react-native-toast-message';
const ResetPassword = ({ navigation }) => {
    const [Token, setToken] = useState('');
    const [NewPassword, setNewPassword] = useState('');
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [message, setMessage] = useState('');
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        const getEmail = async () => {
            try {
                const storedEmail = await AsyncStorage.getItem('resetEmail');
                if (storedEmail !== null) {
                    setEmail(storedEmail);
                }
            } catch (error) {
                console.log('Error retrieving email:', error);
            }
        };

        getEmail();
    }, []);

    const handleChangePassword = async () => {
        setLoading(true);
        setMessage('');
        setIsError(false);

        const payload = {
            email: email,
            token: Token,
            newPassword: NewPassword,
        };

        try {
            const response = await fetch(`${API_BASE_URL}/reset-password`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload), // Convert the payload to a JSON string
            });

            const result = await response.json();

            if (response.ok) {
                // setMessage('Password changed successfully!');
                Toast.show({
                    type: 'success',
                    text1: 'Success',
                    text2: 'Password changed successfully!',
                    visibilityTime: 5000,
                  });
                setToken('');
                setNewPassword('');
                setTimeout(() => {
                    navigation.navigate('Get'); // Navigate to the login screen after 4 seconds
                }, 4000);
            } else {
                // setMessage(result.message || 'Failed to reset password');
                Toast.show({
                    type: 'error',
                    text1: 'Error',
                    text2: result?.message || 'Failed to reset password',
                    visibilityTime: 5000,
                  });
                setIsError(true);
            }
        } catch (error) {
            setMessage('An error occurred. Please try again.');
            setIsError(true);
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => navigation.navigate('forget')} style={styles.iconContainer}>
                <AntDesign name="arrowleft" size={28} color="#1F2937" />
            </TouchableOpacity>
            <Text style={styles.text}>Reset password</Text>
            {message ? <Text style={[styles.message, isError && styles.errorMessage]}>{message}</Text> : null}
            <Text style={styles.input3}>{email}</Text>
            <TextInput
                style={styles.input}
                placeholder="Token"
                placeholderTextColor="grey"
                value={Token}
                onChangeText={setToken}
                keyboardType="numeric"
                maxLength={4}
            />

            <View style={styles.passwordContainer}>
                <TextInput
                    style={styles.input1}
                    placeholder="New Password"
                    placeholderTextColor="grey"
                    value={NewPassword}
                    onChangeText={setNewPassword}
                    secureTextEntry={!isPasswordVisible}
                />
                <TouchableOpacity
                    onPress={() => setIsPasswordVisible(!isPasswordVisible)}
                    style={styles.eyeIcon}
                >
                    <Ionicons
                        name={isPasswordVisible ? "eye-off" : "eye"}
                        size={24}
                        color="grey"
                    />
                </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.button} onPress={handleChangePassword} disabled={loading}>
                {loading ? (
                    <ActivityIndicator size="small" color="#ffffff" />
                ) : (
                    <Text style={styles.buttonText}>Reset password</Text>
                )}
            </TouchableOpacity>
            <Toast />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
        justifyContent: "center",
        padding: 20
    },
    iconContainer: {
        position: 'absolute',
        top: 20,
        left: 20,
        zIndex: 1,
        color: "white",
        fontSize: 20
    },
    text: {
        color: '#1F2937',
        fontSize: 24,
        marginBottom: 20,
        fontWeight: "300",
        textAlign: "center"
    },
    input: {
        backgroundColor: 'rgba(50, 50, 50, 0.1)',
        borderRadius: 15,
        marginVertical: 10,
        paddingHorizontal: 20,
        paddingVertical: 15,
        // borderWidth: 1,
        color: "black",
        fontSize: 18,
    },
    input1: {
        marginVertical: 10,
        paddingHorizontal: 20,
        paddingVertical: 5,
        color: "black",
        fontSize: 18,
    },
    input3: {
        backgroundColor: 'rgba(50, 50, 50, 0.1)',
        borderRadius: 15,
        marginVertical: 10,
        paddingHorizontal: 20,
        paddingVertical: 20,
        fontSize: 18,
        // borderWidth: 1,
        color: "black"
    },
    passwordContainer: {
        backgroundColor: 'rgba(50, 50, 50, 0.1)',
        flexDirection: 'row',
        justifyContent:"space-between",
        alignItems: 'center',
        marginVertical: 10,
        borderRadius: 15,
        fontSize: 18,
    },
    eyeIcon: {
        position: 'absolute',
        right: 20,
    },
    message: {
        color: 'green',
        textAlign: 'center',
        marginTop: 10,
    },
    errorMessage: {
        color: 'red',
    },
    button: {
        backgroundColor: "#1F2937",
        borderRadius: 15,
        paddingVertical: 15,
        paddingHorizontal: 20,
        marginTop: 10,
        borderWidth: 1,
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
        fontSize: 16,
        fontWeight: "500"
    }
});

export default ResetPassword;
