import { AntDesign, FontAwesome, FontAwesome5, Fontisto } from "@expo/vector-icons";
import { Linking, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native"

const Notification = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate('profile')} style={styles.iconContainer}>
        <AntDesign name="arrowleft" size={28} color="#1F2937" />
      </TouchableOpacity>
      <Text style={styles.text}>Notification</Text>
      <View style={styles.notify}>
        <View style={styles.notice}>
          <Fontisto style={styles.notificationicon} name="email" size={28} color="#1F2937" />
          <Text style={styles.notificationtext}>
            Email
          </Text>
        </View>
        <Text style={styles.notificationbtn1}>
          Disable
        </Text>
      </View>

      <View style={styles.notify}>
        <View style={styles.notice}>
          <FontAwesome5 style={styles.notificationicon} name="sms" size={28} color="#1F2937" />
          <Text style={styles.notificationtext}>
            SMS
          </Text>
        </View>
        <Text style={styles.notificationbtn}>
          Enable
        </Text>
      </View>
      <Text style={styles.text}>Contact info</Text>
      <TextInput
        style={styles.input}
        placeholder="Disput Email"
        placeholderTextColor="grey"
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TouchableOpacity style={styles.button} >
        <Text style={styles.buttonText}>Save changes</Text>
      </TouchableOpacity>

    </View>
  )
}




const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    justifyContent: "center",
    paddingHorizontal: 20,
    height: "100%"
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
  profileInfo3: {
    position: "absolute",
    bottom: 0,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 40,
    gap: 20,
    left: 50

  },
  edit1: {
    fontSize: 15,
    fontWeight: "100",
    backgroundColor: "#23265A",
    padding: 18,
    borderRadius: 9
  },

  iconContainer: {
    position: 'absolute',
    top: 20,
    left: 20,
    zIndex: 1,
    color: "#1F2937",
    fontSize: 20
  },

  text: {
    color: '#1F2937',
    fontSize: 24,
    marginVertical: 20,
    textAlign: "start",
    fontWeight: "400"
  },
  notify: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20
  },
  notice: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10
  },
  notificationicon: {
    color: "black",
    backgroundColor: "rgba(50, 50, 50, 0.1)",
    padding: 10,
    borderRadius: 10
  },
  notificationtext: {
    color: "white",
    fontSize: 20,
    fontWeight: "100"
  },
  notificationbtn: {
    backgroundColor: "#1F2937",
    color: "white",
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 10,
    fontSize: 18
  },
  notificationbtn1: {
    backgroundColor: "rgba(50, 50, 50, 0.1)",
    color: "black",
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 10,
    fontSize: 18
  },
  button: {
    backgroundColor: "#1F2937",
    borderRadius: 5,
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginTop: 10,
    borderRadius: 10,
    borderWidth: 1
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: "400"
  },

});
export default Notification;