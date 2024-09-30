import { AntDesign, FontAwesome } from '@expo/vector-icons';
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Linking } from 'react-native';

const FAQItem = ({ question, answer, expanded, toggleExpand }) => {
  return (
    <View style={styles.itemContainer}>
      <TouchableOpacity onPress={toggleExpand}>
        <View style={styles.header}>
          <Text style={styles.question}>{question}</Text>
          <AntDesign name={expanded ? 'upcircleo' : 'downcircleo'} size={20} color="#1F2937" />
        </View>
      </TouchableOpacity>
      {expanded && <Text style={styles.answer}>{answer}</Text>}
    </View>
  );
};

const FAQ = ({ navigation }) => {
  const [expandedIndex, setExpandedIndex] = useState(null);

  const toggleExpand = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const faqs = [
    {
      question: 'What is DPay?',
      answer: 'DPay is a convenient mobile app that allows you to recharge airtime, subscribe to data plans, pay electricity bills, and subscribe to services like GOtv, DStv, and Showmax, all in one place.'
    },
    {
      question: 'How do I download and install DPay?',
      answer: 'You can download DPay from the Google Play Store for Android devices and the Apple App Store for iOS devices. Simply search for "DPay" and follow the installation instructions.'
    },
    {
      question: 'How do I create an account on DPay?',
      answer: 'Open the app, click on the "Sign Up" button, and follow the prompts to enter your personal details such as name, email address, and phone number. You will then receive a verification code to complete the registration process.'
    },
    {
      question: 'Is my personal and financial information safe on DPay?',
      answer: 'Yes, DPay uses advanced encryption technology to ensure that all your personal and financial information is securely stored and protected. We adhere to strict data privacy and security standards.'
    },
    {
      question: 'How do I recharge my airtime using DPay?',
      answer: 'Open the DPay app, select "Airtime," choose your mobile network, enter the phone number, select the amount, and complete the payment using your preferred payment method.'
    },
    {
      question: 'Can I set up recurring payments for my subscriptions and bills?',
      answer: 'Yes, DPay allows you to set up recurring payments for services like data subscriptions, electricity bills, and TV subscriptions to ensure you never miss a payment.'
    },
    {
      question: 'What should I do if I encounter a problem while using DPay?',
      answer: ' If you encounter any issues, you can contact our customer support team through the in-app chat feature, email us at support@dakieo.com, or call our hotline at [Customer Support Number]. We are available 24/7 to assist you.'
    },
    {
      question: 'How can I track my transaction history on DPay?',
      answer: 'To view your transaction history, go to the "Transactions" section in the app. Here you can see a detailed record of all your past transactions, including dates, amounts, and statuses.'
    }
  ];
  

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate('profile')} style={styles.iconContainer}>
        <AntDesign name="arrowleft" size={24} color="#1F2937" />
      </TouchableOpacity>
      <Text style={styles.text}>FAQ</Text>
      {faqs.map((faq, index) => (
        <FAQItem
          key={index}
          question={faq.question}
          answer={faq.answer}
          expanded={expandedIndex === index}
          toggleExpand={() => toggleExpand(index)}
        />
      ))}
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
    backgroundColor: "white",
    justifyContent: "center",
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
    fontSize: 18,
    fontWeight: "100",
    backgroundColor:"rgba(50, 50, 50, 0.1)",
    padding: 18,
    borderRadius: 9
  },
  text: {
    color: '#1F2937',
    fontSize: 24,
    marginBottom: 20,
    fontWeight:"500",
    textAlign:"center"
  },
  itemContainer: {
    backgroundColor:"rgba(50, 50, 50, 0.1)",
    marginBottom: 10,
    borderWidth: 1,
    borderColor: 'rgba(50, 50, 50, 0.1)',
    padding: 10,
    borderRadius: 10
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  question: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 5,
    color:"#1F2937"
  },
  answer: {
    fontSize: 16,
    color:"#1F2937",
    fontWeight:"300",
    lineHeight: 30
  },
  iconContainer: {
    position: 'absolute',
    top: 20,
    left: 20,
    zIndex: 1,
    color: "white",
    fontSize: 20
  },
});

export default FAQ;
