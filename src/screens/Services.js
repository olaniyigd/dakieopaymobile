import React, { useState, useEffect } from 'react';
import { ActivityIndicator, StatusBar, StyleSheet, Text, View, TouchableOpacity, Modal, Alert, Button } from 'react-native';
import { Ionicons, FontAwesome, MaterialCommunityIcons, MaterialIcons, Entypo, FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const Service = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  const handleUnavailableService = () => {
    setModalVisible(true);
  };

  return (
    <View style={styles.container1}>
      {loading ? (
        <View style={[styles.container, styles.loadingContainer]}>
          <ActivityIndicator size="large" color="#1F2937" />
        </View>
      ) : (
        <>
          <View style={styles.container}>
            <StatusBar backgroundColor="white" barStyle="dark-content" />
            <Text style={styles.text}>Services</Text>
            <Text style={styles.text1}>Explore our range of services designed to simplify your life.</Text>
            <View style={styles.iconContainer}>
              <TouchableOpacity style={styles.iconWrapper} onPress={() => navigation.navigate('airtime')}>
                <Ionicons name="phone-portrait" size={35} color="#1F2937" />
                <Text style={styles.iconText}>Airtime</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.iconWrapper} onPress={() => navigation.navigate('data')}>
                <Ionicons name="wifi" size={35} color="#1F2937" />
                <Text style={styles.iconText}>Data</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.iconWrapper} onPress={() => navigation.navigate('cable')}>
                <FontAwesome name="tv" size={35} color="#1F2937" />
                <Text style={styles.iconText}>CableTv</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.container}>
            <View style={styles.iconContainer}>
              <TouchableOpacity style={styles.iconWrapper} onPress={handleUnavailableService}>
                {/* <Ionicons name="phone-portrait" size={35} color="#1F2937" /> */}
                <Entypo name="light-up" size={35} color="#1F2937" />
                <Text style={styles.iconText}>Electricity</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.iconWrapper} onPress={handleUnavailableService}>
                <FontAwesome5 name="dice-six" size={35} color="#1F2937" />
                <Text style={styles.iconText}>Betting</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.iconWrapper} onPress={handleUnavailableService}>
                <MaterialIcons name="card-giftcard" size={35} color="#1F2937" />
                <Text style={styles.iconText}>Giftcard</Text>
              </TouchableOpacity>
             
            </View>
          </View>
          <View style={styles.container}>
            <View style={styles.iconContainer}>
                           <TouchableOpacity style={styles.iconWrapper} onPress={handleUnavailableService}>
                <MaterialIcons name="flight" size={35} color="#1F2937" />
                <Text style={styles.iconText}>Book flight</Text>
              </TouchableOpacity>
            <TouchableOpacity style={styles.iconWrapper} onPress={() => navigation.navigate('loan')}>
        <FontAwesome name="money" size={35} color="#1F2937" />
          <Text style={styles.iconText}>Loan</Text>
        </TouchableOpacity>
            </View>
          </View>
         
        </>
      )}
     
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>
            This service is currently unavailable. You will be notified when it becomes available. In the meantime, please check and use our other available services.
              </Text>
            <Button
              title="Close"
              onPress={() => setModalVisible(!modalVisible)}
              color="#1F2937"
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Service;

const styles = StyleSheet.create({
  container: {
    borderRadius: 15,
    paddingVertical: 10
  },
  container1: {
    height: "100%",
    backgroundColor:"white"
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  iconContainer: {
    flexDirection: 'row',
    gap: 10,
    // justifyContent: 'space-between',
    alignItems: 'center',
  },
  iconWrapper: {
    width: 120,
    height: 100,
    alignItems: 'center',
    backgroundColor:"rgba(50, 50, 50, 0.1)",
    padding: 15,
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
    fontSize: 20,
    lineHeight: 24,
    fontWeight: "700",
    paddingBottom: 5
  },
  text1: {
    color: '#1F2937',
    fontSize: 16,
    lineHeight: 24,
    fontWeight: "400",
    paddingBottom: 25
  },
  bottomNavigation: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: 'transparent',
    paddingVertical: 10,
    borderTopWidth: 2,
    borderTopColor: 'rgba(50, 50, 50, 0.1)',
    position: 'absolute',
    bottom: 0,
    width: 450,
  },
  bottomIcon: {
    alignItems: 'center',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22
    
  },
  modalView: {
    margin: 20,
    width:"70%",
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 60,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    color: 'black',
  },
});
