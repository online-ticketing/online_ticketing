import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
    StatusBar,
    Image,
    SafeAreaView,
    ScrollView,
} from "react-native";
import {
    MaterialIcons,
  } from "@expo/vector-icons";
  import {Display} from './utils';
  import { Colors } from "../contents";
  import imagePath from '../constants/imagePath';

const FAQScreen = ({navigation}) => {
  return (
    <SafeAreaView style={styles.container}>
    <TouchableOpacity
            style={styles.header}
            onPress={() => navigation.navigate('Help')}>
          <View style={{flexDirection: "row", alignItems: "center", marginLeft: 15}}>
            <MaterialIcons name="keyboard-arrow-left" size={30} color="#000" />
                 <Text style={styles.Headertopic}>FAQ</Text>
           <View>
               <Image source={imagePath.projectlogo} style={[styles.Image]} resizeMode="cover"/>
            </View>
          </View>
        </TouchableOpacity>
        <ScrollView>
        <View style={styles.messageBox}>
                <Text style={styles.title}> Travel only if necessary</Text>
                <Text style={styles.text}>
                    We wish you safe travels, unforgettable experiences, and memories to last a lifetime.
                    We wish you safe travels, unforgettable experiences, and memories to last a lifetime.
                </Text>
                <Text style={styles.title}> Travel only if necessary</Text>
                <Text style={styles.text}>
                    We wish you safe travels, unforgettable experiences, and memories to last a lifetime.
                </Text>
                <Text style={styles.title}> Travel only if necessary</Text>
                <Text style={styles.text}>
                    We wish you safe travels, unforgettable experiences, and memories to last a lifetime.
                </Text>
                <Text style={styles.title}> Travel only if necessary</Text>
                <Text style={styles.text}>
                    We wish you safe travels, unforgettable experiences, and memories to last a lifetime.
                </Text>
                <Text style={styles.title}> Travel only if necessary</Text>
                <Text style={styles.text}>
                    We wish you safe travels, unforgettable experiences, and memories to last a lifetime.
                </Text>
                <Text style={styles.title}> Travel only if necessary</Text>
                <Text style={styles.text}>
                    We wish you safe travels, unforgettable experiences, and memories to last a lifetime.
                </Text>
                <Text style={styles.title}> Travel only if necessary</Text>
                <Text style={styles.text}>
                    We wish you safe travels, unforgettable experiences, and memories to last a lifetime.
                </Text>
                <Text style={styles.title}> Travel only if necessary</Text>
                <Text style={styles.text}>
                    We wish you safe travels, unforgettable experiences, and memories to last a lifetime.
                </Text>
            </View>
        </ScrollView>
     </SafeAreaView>
  );
};
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
    },
    
    header:{
      borderBottomColor: '#eee',
      justifyContent: "space-between",
      width: "100%",
      borderBottomWidth: 5,
      flexDirection: 'row',
      alignItems: 'center',
      paddingBottom: 12,
      marginLeft: 1,
      marginTop: 25,
      paddingHorizontal: 12,
      backgroundColor: Colors.DEFAULT_WHITE,
    },
    Headertopic: {
      flex: 1,
      fontSize: 20,
      textAlign: 'center',
      fontWeight: "bold",
  },
  messageBox: {
    width: '100%',
    backgroundColor: Colors.SECONDARY_BLACK,
    marginBottom: 2,
    shadowColor: Colors.DEFAULT_BLACK,
    shadowOffset: {
        width: 0,
        height: 5,
    },
    shadowOpacity: 0.121,
    shadowRadius: 9.11,
},
text: {
    fontSize: 15,
    color: Colors.DEFAULT_WHITE,
    marginLeft:"3%",
    marginRight:"3%"
},
title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.DEFAULT_WHITE,
    marginBottom: 10,
    marginTop: 10,
    marginLeft:"10%",
    marginRight:"10%"
},
    Image: {
  
      height: 30,
      width: 30,
      marginRight: 20,
  },
  });
export default FAQScreen;