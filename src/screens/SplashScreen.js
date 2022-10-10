import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect } from "react";
import { View, Text, StyleSheet, StatusBar, Image } from "react-native";
import { Colors, image } from "../contents";
import { Display } from "./utils";

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    // const user = AsyncStorage.getItem("user");
    setTimeout(() => {
      navigation.navigate("Welcome");
    }, 1500);
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={Colors.DEFAULT_GREEN}
        translucent
      />
      <Image source={image.Bus} resizeMode="contain" style={styles.image} />

      <Text style={styles.titleText}>VIP Bus Online Booking</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.DEFAULT_GREEN,
  },
  image: {
    height: Display.setHeight(30),
    width: Display.setWidth(60),
  },
  titleText: {
    color: Colors.DEFAULT_WHITE,
    fontSize: 32,
  },
});

export default SplashScreen;
