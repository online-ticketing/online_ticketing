import { MaterialIcons } from "@expo/vector-icons";

import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  StatusBar,
  SafeAreaView,
  TextInput,
} from "react-native";
import BookingTextField from "../components/CustomBookingInput";
import ReadOnlyField from "../components/CustomInput/ReadOnlyField";
import { Colors } from "../contents";
const moment = require('moment-timezone');
moment.tz.setDefault('UTC');
import { RequestRoutes } from "../apis/booking";
import {updateError} from "../utils";
const { height, width } = Dimensions.get("window");

const Bookings = ({ navigation }) => {
  const [error, setError] = useState("");
  const [data, setData] = useState({
    today: moment().format('dddd MMMM Do YYYY, h:mm:ss a'),
    routes: null,
  });

  useEffect(() => {
    async function populateData() {
      try {
        const routes = await RequestRoutes();
        setData({
          today: moment().format('dddd MMMM Do YYYY, h:mm:ss a'),
          routes: routes,
        });
      } catch (ee) {
        return updateError(ee, setError);
      }
    }
    populateData().catch();
  }, []);
  return (
    <SafeAreaView style={styles.wrapper}>
     <StatusBar
        barStyle="light-content"
        backgroundColor={Colors.DEFAULT_GREEN}
        translucent
      />
      {error ? (
          <Text style={{color: Colors.Red, fontSize: 12, textAlign: "center"}}>
            {error}
          </Text>
      ) : null}
      <TouchableOpacity
        style={styles.arrowContainer}
        onPress={() => navigation.goBack()}
      >
        <MaterialIcons name="keyboard-arrow-left" size={30} color="#000" />
      </TouchableOpacity>

      <View style={styles.container}>
        <ReadOnlyField
          style={styles.input}
          editable={false}
          placeholderTextColor={"black"}
          placeholder={data.today}
          label="Date"
        />
        <BookingTextField placeholder={"Kumasi - Accra"} label="Route" />

        <BookingTextField placeholder={"8:00 am"} label="Time" />
        <BookingTextField placeholder={"Ejisu"} label="Bus Stop" />
        <BookingTextField numOfPassenger={true} label="Number of passengers" />
        <ReadOnlyField
          style={styles.input}
          editable={false}
          placeholderTextColor={"black"}
          placeholder={"Ghc 150"}
          label="Total Amount"
        />
        <TouchableOpacity
          style={styles.btn}
          onPress={() =>
            navigation.navigate('Payment', {
            booking: bookingId,amount: amountToPay
          })
        }
        >
          <Text style={styles.btnText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  arrowContainer: {
    height: 40,
    width: 40,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.SECONDARY_WHITE,
    borderRadius: 10,
    marginLeft: 10,
    shadowColor: Colors.DEFAULT_BLACK,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.121,
    shadowRadius: 9.11,
    elevation: 5,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: height,
  },
  input: {
    alignItems: "center",
    fontSize: 15,
    paddingHorizontal: 50,
    backgroundColor: Colors.LIGHT_GREY2,
    width: "90%",
    height: 50,
    borderRadius: 50,
    shadowColor: Colors.DEFAULT_BLACK,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.121,
    shadowRadius: 9.11,
    elevation: 5,
  },
  inputContainer: {
    backgroundColor: Colors.Silver,
    paddingHorizontal: 20,
    marginHorizontal: 20,
    borderRadius: 8,
    borderWidth: 0.5,
    borderColor: Colors.DEFAULT_GREY,
    justifyContent: "center",
  },
  btn: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: Colors.DEFAULT_GREEN,
    width: width - 40,
    height: 50,
    borderRadius: 50,
    shadowColor: Colors.DEFAULT_BLACK,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.121,
    shadowRadius: 9.11,
    elevation: 5,
  },
  btnText: {
    color: Colors.SECONDARY_WHITE,
    fontSize: 15,
    fontWeight: "bold",
  },
});

export default Bookings;
