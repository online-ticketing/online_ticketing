import React, {useEffect, useState} from "react";
import {View, Text, SafeAreaView, StyleSheet, StatusBar, Pressable, TouchableOpacity,Image, ScrollView} from "react-native";
import {MaterialIcons} from "@expo/vector-icons";
import {Colors} from "../contents";
import _ from "underscore";
const moment = require('moment-timezone');
moment.tz.setDefault('UTC');
import {fetchTickets} from "../apis/tickets";
import projectlogo from "../assets/images/projectLogo.png";
import {updateError} from '../utils';
import DisplayTrip from "../components/CustomInput/DisplayTrip";


const Trips = ({navigation}) => {
    const [error, setError] = useState("");
    const [trips, setTrips] = useState([]);
    const [numTrips, setNumTrips] = useState("0");
    const prepareTrips = (trips) => {
        const result = trips.map(trip => ({
            booking_id: trip.booking_id,
            route: trip.route,
            departure_time: trip.departure_time
        }));
        const uniqueBookings = _.uniq(result, function (x) {
            return x["booking_id"];
        });
        const sorted = _.sortBy(uniqueBookings, "departure_time").reverse();
        return sorted.map(trip => ({
            key: trip.booking_id,
            title: trip.route + " (" + moment(trip.departure_time).format('DD/MM/YYYY mm:hh A') + ")"
        }));
    };
    useEffect(() => {
        async function populateData() {
            try {
                const userTickets = await fetchTickets();
                const trips = prepareTrips(userTickets);
                if (trips && trips.length > 0) {
                    setTrips(trips);
                    setNumTrips(trips.length)
                }
            } catch (e) {
                return updateError(e, setError);
            }
        }

        populateData().catch();
    }, []);

    return (
        <SafeAreaView style={{flex: 1, backgroundColor: "#e6e7e8"}}>
             <StatusBar
        barStyle="light-content"
        backgroundColor={Colors.DEFAULT_GREEN}
        translucent
      />
  <View style={styles.header}>
        <Pressable  
            onPress={() => navigation.navigate('Account')}>
            <View style={{flexDirection: "row", alignItems: "center", marginLeft: 15}}>
                <MaterialIcons name="keyboard-arrow-left" size={30} color="#000" /> 
            </View>
        </Pressable>
            <View>
                <Text style={styles.Headertopic}>Trips ({numTrips}) </Text>
            </View>
            <View>
                <Image source={projectlogo} style={[styles.Image]} resizeMode="cover"/>
            </View>
    </View>
       
        {error ? (
                <Text style={{color: Colors.Red, fontSize: 12, textAlign: "center"}}>
                    {error}
                </Text>
            ) : null}

            <ScrollView>

                     <View >
                          {trips.map(trip => {
                        return <DisplayTrip title={trip.title} key={trip.key}></DisplayTrip>
                            })}
                    </View>

            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
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
        paddingTop: 25,
        paddingHorizontal: 12,
        backgroundColor: Colors.DEFAULT_WHITE,
      },
      Headertopic: {
        flex: 1,
        fontSize: 20,
        textAlign: 'center',
        fontWeight: "bold",
    },

      Image: {

        height: 30,
        width: 30,
        marginRight: 20,
    },

      titleContainer:{
        flex: 1,
      },

})
export default Trips;
