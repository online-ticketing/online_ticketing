import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Colors} from "../../contents";
import QRCode from 'react-native-qrcode-svg';
const DisplayTicket = ({ticketInfo}) => {
    return (
        <View style = {styles.T_container}>
            <Text style={styles.title}>VIP Bus Ticket</Text>
            <Text style={styles.text}>Route : {ticketInfo.route}</Text>
            <Text style={styles.text}>Departure Time : {ticketInfo.departure_time}</Text>
            <Text style={styles.text}>Fare : {ticketInfo.fare}</Text>
            <Text style={styles.text}>Bus no : {ticketInfo.bus_no}</Text>
            <Text style={styles.text}>Serial no: {ticketInfo.serial_no}</Text>
            <Text style={styles.text}>Barcode: {ticketInfo.barcode}</Text>
            <QRCode
                value={ticketInfo.serial_no}
                size={200}
                bgColor='#000000'
                fgColor='#FFFFFF'/>
        </View>
    )
}

const styles = StyleSheet.create({
    T_container:{
        width: '90%',
        backgroundColor: Colors.DEFAULT_WHITE,
        borderRadius: 20,
        padding: 20,
    },
    text: {
        color: Colors.DEFAULT_BLACK,
        fontSize: 15,
        fontWeight: "bold",
        marginBottom: 5,
        paddingLeft: 10,
    },
    title: {
        textAlign: "center",
        fontSize: 20,
        fontWeight: "bold",
        paddingTop: 10,
    },
});

export default DisplayTicket;