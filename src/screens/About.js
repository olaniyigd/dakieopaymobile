import { AntDesign, FontAwesome } from '@expo/vector-icons';
import React, { useState, useRef } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Text, ActivityIndicator } from 'react-native';

// Introduction component
const Introduction = () => {
    return (
        <View style={styles.introContainer}>
            <Text style={styles.introText1}>
                Introducing DPay: Your All-in-One SmartPay Solution
            </Text>
        </View>
    );
};

// Airtime Recharge component
const AirtimeRecharge = () => {
    return (
        <View style={styles.sectionContainer}>
            <Text style={styles.sectionHeader}>Airtime Recharge</Text>
            <Text style={styles.sectionText}>
                Say goodbye to the hassle of hunting down scratch cards or rushing to the store to top up your phone credit. With DPay, you can effortlessly recharge your airtime anytime, anywhere, ensuring that you stay connected without interruption.
            </Text>
        </View>
    );
};

// Data Subscription component
const DataSubscription = () => {
    return (
        <View style={styles.sectionContainer}>
            <Text style={styles.sectionHeader}>Data Subscription</Text>
            <Text style={styles.sectionText}>
                Never run out of data again with DPay's swift and secure data subscription service. Whether you're streaming your favorite music, staying updated on social media, or sending important emails, DPay ensures that you're always online and connected to the digital world.
            </Text>
        </View>
    );
};

// Electricity Bill Payment component
const ElectricityBillPayment = () => {
    return (
        <View style={styles.sectionContainer}>
            <Text style={styles.sectionHeader}>Electricity Bill Payment</Text>
            <Text style={styles.sectionText}>
                Skip the long queues and tedious paperwork associated with paying your electricity bills. DPay allows you to settle your electricity bills with just a few taps on your smartphone, ensuring that your lights stay on and your home stays powered.
            </Text>
        </View>
    );
};

// Entertainment Subscriptions component
const EntertainmentSubscriptions = () => {
    return (
        <View style={styles.sectionContainer}>
            <Text style={styles.sectionHeader}>Entertainment Subscriptions</Text>
            <Text style={styles.sectionText}>
                Dive into a world of endless entertainment with DPay's seamless subscription services for GOtv, DStv, and Showmax. Whether you're craving the latest blockbuster movies, binge-worthy TV shows, or thrilling sports events, DPay grants you access to a treasure trove of content at your convenience.
            </Text>
        </View>
    );
};

const About = ({ navigation }) => {
    return (
        <View style={styles.container1}>
            <TouchableOpacity onPress={() => navigation.navigate('profile')} style={styles.iconContainer}>
                <AntDesign name="arrowleft" size={24} color="#1F2937" />
            </TouchableOpacity>
            <Introduction />
            <AirtimeRecharge />
            <DataSubscription />
            <ElectricityBillPayment />
            <EntertainmentSubscriptions />
        </View>
    );
};

const styles = StyleSheet.create({
    container1: {
        backgroundColor: "white",
        flex: 1,
        padding: 25,
    },
    iconContainer: {
        position: 'absolute',
        top: 20,
        left: 20,
        zIndex: 1,
        color: "#1F2937",
        fontSize: 20
    },
    introContainer: {
        paddingTop: 50,
    },
    introText: {
        color: "#1F2937",
        textAlign: "justify",
        lineHeight: 25,
        marginBottom: 20,
    },
    introText1: {
        color: "#1F2937",
        textAlign: "center",
        fontSize: 20,
        lineHeight: 25,
        marginBottom: 20,
    },
    sectionContainer: {
        marginBottom: 20,
    },
    sectionHeader: {
        color: "#1F2937",
        fontSize: 18,
        fontWeight: "300",
        marginBottom: 10,
    },
    sectionText: {
        color: "#1F2937",
        textAlign: "justify",
        lineHeight: 25,
    },
});

export default About;
