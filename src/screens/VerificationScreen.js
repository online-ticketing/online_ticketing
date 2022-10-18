import React, {useRef} from "react";
import {
    View,
    Text,
    StyleSheet,
    StatusBar,
    TouchableOpacity,
    TextInput,
    SafeAreaView,
    Dimensions,
} from "react-native";
import Separator from "../components/WelcomeCard/Separator";
import Ionicons from "react-native-vector-icons/Ionicons";
import Feather from "react-native-vector-icons/Feather";
import {Colors, Image} from "../contents";
import {Display} from "./utils";
import {useState} from "react";
import CustomNotification from "./utils/PushNotification";
import {VerifyOTP} from "../apis/reset";
import {updateError} from "../utils";
import {MaterialIcons} from "@expo/vector-icons";

const {height} = Dimensions.get("window");

const Otp = Array(4).fill("");

const VerificationScreen = ({navigation, route}) => {
    const [loading, setLoading] = useState(false);
    const otpInput = useRef([]);
    const [error, setError] = useState("");

    const data = route.params;
    const email = data.email;
    const fromScreen = data.fromScreen;

    const [otp, setOtp] = useState({0: "", 1: "", 2: "", 3: ""});

    const handleChangeText = (text, index) => {
        Otp[index] = text;
        setOtp({...otp, [index]: text});
        if (text !== "") {
            if (index !== 3) {
                otpInput[index + 1].focus();
            } else {
                otpInput[index].blur();
            }
        } else {
            if (index !== 0) {
                otpInput[index - 1].focus();
            }
        }
    };

    const handleOTP = () => {
        setLoading(true);
        let otpString = Object.values(otp).toString().split(",").join("");
        if (otpString.length === 4) {
            const otp = otpString;
            const p = VerifyOTP(email, otp);
            p.then(function (r) {
                setLoading(false);
                if(fromScreen && fromScreen === "ForgotPassword"){
                    navigation.replace("ResetPassword",{email,otp}) && alert("OTP Verified")
                }else{
                    navigation.replace("Signin") && alert("OTP Verified")
                }
            }).catch(function (e) {
                setLoading(false);
                console.log("error",e);
                return updateError("Invalid OTP!", setError);
            });
        } else {
            setLoading(false);
            return updateError("Please enter the OTP sent to you via email!", setError);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <TouchableOpacity
                style={styles.arrowContainer}
                onPress={() => navigation.goBack()}>
                <MaterialIcons name="keyboard-arrow-left" size={30} color="#000"/>

            </TouchableOpacity>
            <View style={styles.contentContainer}>
                <Separator height={10}/>

                <Text style={styles.headerTitle}>OTP Verification</Text>
                <Separator height={40}/>

                <Text style={styles.content}>
                    Enter the OTP number sent to
                    <Text style={styles.phoneNumberText}> {data?.email}</Text>
                </Text>
                <View style={styles.otpBox}>
                    {Otp.map((num, index) => (
                        <TextInput
                            key={index}
                            style={styles.otpInput}
                            keyboardType="phone-pad"
                            placeholder="0"
                            maxLength={1}
                            value={otp[index]}
                            ref={(ref) => (otpInput[index] = ref)}
                            onChangeText={(text) => handleChangeText(text, index)}
                        />
                    ))}
                </View>
                <TouchableOpacity style={styles.verifyButton} onPress={handleOTP}>
                    <Text style={styles.verifyButtonText}>Verify</Text>
                </TouchableOpacity>
                {/*<CustomNotification*/}
                {/*    textStyle={styles.verifyButtonText}*/}
                {/*    touchStyle={styles.verifyButton}*/}
                {/*    otpString={Object.values(otp).toString().split(",").join("")}*/}
                {/*    otp={data?.otp}*/}
                {/*/>*/}
                <View>
                    <Text
                        style={{
                            color: Colors.DEFAULT_BLACK,
                            justifyContent: "center",
                            fontSize: 20,
                            marginTop: 10,
                            marginBottom: 10,
                            paddingHorizontal: 60,
                        }}
                    >
                        Didn't receive any code?
                    </Text>
                    <TouchableOpacity style={styles.resendBtn} onPress={handleOTP}>
                        <Text style={styles.resendText}> Resend Code.</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.DEFAULT_WHITE,
    },

    headerTitle: {
        Colors: Colors.DEFAULT_BLACK,
        fontSize: 30,
        fontWeight: "bold",
    },
    title: {
        fontSize: 20,
        lineHeight: 20 * 1.4,
        marginTop: 50,
        marginBottom: 10,
        marginHorizontal: 20,
    },
    contentContainer: {
        paddingTop: 50,
        paddingHorizontal: 20,
    },
    content: {
        fontSize: 20,
        marginTop: 10,
        marginBottom: 10,
        paddingHorizontal: 10,
        justifyContent: "space-between",
    },
    phoneNumberText: {
        fontSize: 18,
        lineHeight: 18 * 1.4,
        color: Colors.Red,
    },
    otpBox: {
        justifyContent: "space-evenly",
        alignItems: "center",
        flexDirection: "row",
    },
    otpInput: {
        width: 50,
        height: 50,
        borderRadius: 6,
        borderColor: Colors.DEFAULT_GREEN,
        borderWidth: 1,
        textAlign: "center",
        fontSize: 20,
    },
    otpText: {
        fontSize: 25,
        color: Colors.DEFAULT_BLACK,
        padding: 0,
        textAlign: "center",
        paddingHorizontal: 18,
        paddingVertical: 10,
    },
    verifyButton: {
        backgroundColor: Colors.DEFAULT_GREEN,
        borderRadius: 8,
        marginHorizontal: 20,
        height: Display.setHeight(6),
        justifyContent: "center",
        alignItems: "center",
        marginTop: 20,
    },
    verifyButtonText: {
        color: Colors.DEFAULT_WHITE,
        fontSize: 18,
        lineHeight: 18 * 1.4,
    },
    resendBtn: {
        backgroundColor: Colors.SECONDARY_WHITE,
        borderRadius: 8,
        marginHorizontal: 20,
        height: Display.setHeight(6),
        justifyContent: "center",
        alignItems: "center",
        marginTop: 10,
    },
    resendText: {
        fontSize: 16,
        alignItems: "center",
    },
});

export default VerificationScreen;
