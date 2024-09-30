import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Image, Linking, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { AntDesign, FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native'; // Import useFocusEffect hook from react-navigation
import Feather from '@expo/vector-icons/Feather';

const Profile = ({ navigation }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [email, setEmail] = useState('');

    useEffect(() => {
      const fetchEmail = async () => {
        const storedEmail = await AsyncStorage.getItem('userData');
        if (storedEmail) {
          setEmail(storedEmail);
        }
      };
      fetchEmail();
    }, []);

    // Use useFocusEffect to trigger spinner for 4 seconds when component gains focus
    useFocusEffect(
      React.useCallback(() => {
        setIsLoading(true); // Show spinner when component gains focus
        const timer = setTimeout(() => {
          setIsLoading(false); // Set loading to false after 4 seconds
        }, 4000);
  
        return () => clearTimeout(timer);
      }, [])
    );

    const handleLogout = async () => {
        setIsLoading(true);
        // Clear AsyncStorage
        await AsyncStorage.clear();
        setTimeout(() => {
            setIsLoading(false);
            navigation.navigate('Get');
        }, 4000); // 4 seconds delay
    };
   
    return (
        <View style={styles.profile}>
            {isLoading ? (
                <View style={styles.loaderContainer}>
                    <ActivityIndicator size="large" color="#1F2937" />
                </View>
            ) : (
                <>
                    <TouchableOpacity onPress={() => navigation.navigate('Dashboard')} style={styles.iconContainer}>
                        <AntDesign name="arrowleft" size={24} color="#1F2937" />
                    </TouchableOpacity>
                    <View style={styles.profileInfo}>
                        <View>
                            <Text style={styles.username}>{email}</Text>
                            <Text style={styles.username1}>+234 8107265575</Text>
                            <View style={styles.nationality}>
                                <Image
                                    source={require('../../assets/nigeria.png')}
                                    style={styles.country}
                                />
                                <Text style={styles.username2}>Nigeria</Text>
                            </View>
                        </View>
                        <Feather style={styles.user} name="user" size={84} color="white" />
                        {/* <Image
                            source={require('./assets/home.jpg')}
                            style={styles.profileImage}
                        /> */}
                    </View>

                    <View style={styles.profileInfo2}>
                        <Text style={styles.compliance} onPress={() => navigation.navigate('change')}>Change password</Text>
                        <MaterialCommunityIcons onPress={() => navigation.navigate('change')} name="greater-than" style={styles.edit} size={24} color="grey" fontWeight="100" />
                    </View>
                    <View style={styles.profileInfo2}>
                        <Text style={styles.compliance} onPress={() => navigation.navigate('notification')}>Notification</Text>
                        <MaterialCommunityIcons onPress={() => navigation.navigate('notification')} name="greater-than" style={styles.edit} size={24} color="grey" fontWeight="100" />
                    </View>
                    <View style={styles.profileInfo2}>
                        <Text style={styles.compliance} onPress={() => navigation.navigate('notification')}>Contact info</Text>
                        <MaterialCommunityIcons onPress={() => navigation.navigate('notification')} name="greater-than" style={styles.edit} size={24} color="grey" fontWeight="100" />
                    </View>
                    <View style={styles.profileInfo2}>
                        <Text style={styles.compliance}>Inbox</Text>
                        <MaterialCommunityIcons name="greater-than" style={styles.edit} size={24} color="#633eca" fontWeight="100" />
                    </View>
                    <View style={styles.profileInfo2}>
                        <Text style={styles.compliance} onPress={() => navigation.navigate('faq')}>FAQ</Text>
                        <MaterialCommunityIcons onPress={() => navigation.navigate('faq')} name="greater-than" style={styles.edit} size={24} color="grey" fontWeight="100" />
                    </View>
                    <View style={styles.profileInfo2}>
                        <Text style={styles.compliance} onPress={() => navigation.navigate('about')}>About us</Text>
                        <MaterialCommunityIcons onPress={() => navigation.navigate('about')} name="greater-than" style={styles.edit} size={24} color="grey" fontWeight="100" />
                    </View>
                    <View style={styles.profileInfo2}>
                        <Text style={styles.compliance}>Terms of Service</Text>
                        <MaterialCommunityIcons name="greater-than" style={styles.edit} size={24} color="grey" fontWeight="100" />
                    </View>
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

                    <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
                        <Text style={styles.logoutText}>Logout</Text>
                    </TouchableOpacity>
                </>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    profile: {
        backgroundColor: "white",
        flex: 1,
        padding: 25,
        justifyContent: "center"
    },
    profileImage: {
        width: 80,
        height: 80,
        borderRadius: 25,
        marginRight: 10,
    },
    country: {
        width: 15,
        height: 15,
        borderRadius: 25,
        marginRight: 10,
    },
    profileInfo: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderBottomWidth: 1,
        borderBottomStyle: 'dotted',
        borderBottomColor: '#D9D9D9',
        paddingBottom: 20
    },
    profileInfo2: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 10
    },
    profileInfo3: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginVertical: 40,
        gap: 20
    },
    iconContainer: {
        position: 'absolute',
        top: 20,
        left: 20,
        zIndex: 1,
        color: "white",
        fontSize: 20
    },
    user: {
      backgroundColor:"#1F2937",
      borderRadius: 10
    },
    username: {
        color: "#1F2937",
        fontSize: 30,
        fontWeight: "500"
    },
    username1: {
        color: "#1F2937",
        fontSize: 17,
        fontWeight: "400",
        marginTop: 5
    },
    username2: {
        color: "#1F2937",
        fontSize: 15,
        fontWeight: "400"
    },
    compliance: {
        color: "#1F2937",
        fontSize: 22,
        fontWeight: "400"
    },
    edit: {
        color: "#1F2937",
        fontSize: 15,
        fontWeight: "100",
        padding: 12,
        borderRadius: 5
    },
    edit1: {
        fontSize: 20,
        fontWeight: "100",
        backgroundColor: "rgba(50, 50, 50, 0.1)",
        padding: 18,
        borderRadius: 9
    },
    logoutButton: {
        backgroundColor: '#1F2937',
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderRadius: 5,
        marginTop: 10,
    },
    logoutText: {
        color: 'white',
        textAlign: 'center',
        fontWeight: '400',
    },
    profileImages: {
        width: 20,
        height: 20,
        borderRadius: 25,
    },
    nationality: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 5
    },
    profile1: {
        backgroundColor: "#23265A",
        position: "absolute",
        right: 90,
        top: 35,
        width: 200,
        zIndex: 1000,
        padding: 10,
        borderRadius: 10
    }
});

export default Profile;
