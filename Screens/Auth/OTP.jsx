import React, { useState, useEffect, useRef } from 'react';
import { SafeAreaView, View, StyleSheet, StatusBar, Text, TextInput, Pressable, ScrollView, Alert } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { SIZES } from '../../Constants/Theme';
import { LoadingModal } from 'react-native-loading-modal';

const OTP = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [user, setUser] = useState({
    id: '',
    email: ''
  });

  const inputRefs = useRef([]); // Create a ref array

  useEffect(() => {
    const getProfile = async () => {
      const results = await AsyncStorage.multiGet(['user_id', 'email']);
      const id = results[0][1];
      const email = results[1][1];
      setUser({
        id: id,
        email: email
      });
    };
    getProfile();
  }, []);

  const handleChange = (index, value) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value.length === 1 && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleOtpVerification = async () => {
    try {
      setLoading(true);
      const response = await axios.post(`https://pharmacy-ordering-server.onrender.com/verify-otp/${user.id}`, {
        otp: otp.join('') // Join the array into a single string
      });

      if (response.status === 200) {
        navigation.navigate('Login');
        Alert.alert('Success✔️', 'Verification Success');
      }
    } catch (error) {
      console.log(error);
      Alert.alert('Invalid⚠️', 'Incorrect OTP');
    } finally {
      setLoading(false);
    }
  };

  const inputItems = [1, 2, 3, 4, 5, 6];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <StatusBar backgroundColor="white" barStyle="dark-content" />
        <Pressable style={styles.arrowIconContainer}
        onPress={() => navigation.goBack()} 
        >
          <AntDesign name="arrowleft" size={24} color="black" />
        </Pressable>
        <View style={styles.itemsContainer}>
          <View style={styles.verifyTextContainer}>
            <Text style={styles.verifyHeader}>Verify your identity</Text>
            <Text style={styles.verifyText}>
              Please enter the 6-digit OTP code we sent to your email {user.email}
            </Text>
            <Text style={styles.time}>3:00</Text>
          </View>
          <View style={styles.inputDetailsContainer}>
            <View style={styles.inputContainer}>
              {inputItems.map((item, index) => (
                <TextInput
                  key={index}
                  style={styles.inputField}
                  onChangeText={(value) => handleChange(index, value)}
                  value={otp[index]}
                  maxLength={1} // Ensure only one character per input field
                  keyboardType="numeric" // Numeric input for OTP
                  ref={el => inputRefs.current[index] = el} // Attach ref to each TextInput
                />
              ))}
            </View>
            <Text>Didn’t receive the code? Resend OTP</Text>
            <Pressable style={styles.btnContainer} onPress={handleOtpVerification}>
              <Text style={styles.btnText}>Continue</Text>
            </Pressable>
          </View>
          {loading && <LoadingModal modalVisible={true} />}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  itemsContainer: {
    paddingTop: SIZES.height * 0.02
  },
  verifyTextContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: SIZES.height * 0.07
  },
  verifyHeader: {
    fontWeight: 'bold',
    fontSize: 25
  },
  verifyText: {
    width: '70%',
    textAlign: 'center',
    fontSize: 14
  },
  inputDetailsContainer: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    paddingTop: SIZES.height * 0.09,
    gap: SIZES.height * 0.035
  },
  inputField: {
    margin: '2%',
    width: '12%',
    padding: SIZES.height * 0.01,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    paddingHorizontal: 10
  },
  inputContainer: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row'
  },
  time: {
    color: '#0BDC39',
    fontSize: 20
  },
  btnContainer: {
    backgroundColor: 'blue',
    padding: '3%',
    width: '80%',
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: '7%',
    alignItems: 'center'
  },
  btnText: {
    color: 'white'
  },
  arrowIconContainer: {
    marginLeft: '7%',
    paddingTop: '10%'
  }
});

export default OTP;