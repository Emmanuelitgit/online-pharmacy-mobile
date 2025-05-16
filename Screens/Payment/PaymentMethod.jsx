// import React, { useState, useEffect, useContext } from 'react';
// import { View, Text, StyleSheet, SafeAreaView, Pressable, StatusBar, Image, Alert } from 'react-native';
// import { WebView } from 'react-native-webview';
// import { AntDesign } from '@expo/vector-icons';
// import { SIZES } from '../../Constants/Theme';
// import axios from 'axios';
// import authContext from '../../Context/context';

// const PaymentMethod = ({ navigation }) => {
//     const { quantity } = useContext(authContext);
//     const [paymentUrl, setPaymentUrl] = useState(null);
//     const [paymentVerified, setPaymentVerified] = useState(false);
//     const [reference, setReference] = useState('');

//     const initiatePayment = async () => {
//         try {
//             const response = await axios.post('https://pharmacy-ordering-server.onrender.com/payment', {
//                 email: 'eyidana001@gmail.com',
//                 amount: 5000, // Amount in Naira
//             });
//             setPaymentUrl(response.data.data.authorization_url);
//             setReference(response.data.data.reference);
//             console.log(response.data.data)
//         } catch (error) {
//             console.error('Error initiating payment:', error);
//         }
//     };


//     const verifyPayment = async (reference) => {
//         try {
//             const response = await axios.get(`https://pharmacy-ordering-server.onrender.com/verify-payment/${reference}`);
//             if (response.data.data.status === 'success') {
//                 setPaymentVerified(true);
//                 Alert.alert('Payment Successful', 'Your payment was verified successfully.');
//             } else {
//                 Alert.alert('Payment Failed', response.data.data.gateway_response || 'The transaction was not completed');
//             }
//         } catch (error) {
//             console.error('Error verifying payment:', error);
//         }
//     };


//     useEffect(() => {
//         if (reference && !paymentUrl) {
//             verifyPayment(reference);
//         }
//     }, [reference]);


//     return (
//         <SafeAreaView style={{
//           flex:1,          
//         }}>
//             {paymentUrl ? (
//                     <WebView
//                         source={{ uri: paymentUrl }}
//                         originWhitelist={['*']}
//                         javaScriptEnabled={true}
//                         domStorageEnabled={true}
//                         startInLoadingState={true}
//                         onNavigationStateChange={(navState) => {
//                             if (navState.url.includes('callback_url')) {
//                                 setPaymentUrl(null);  
//                                 verifyPayment(reference);
//                             }
//                         }}
//                         onError={(syntheticEvent) => {
//                             const { nativeEvent } = syntheticEvent;
//                             console.warn('WebView error: ', nativeEvent);
//                             Alert.alert('WebView Error', nativeEvent.description);
//                         }}
//                         onHttpError={(syntheticEvent) => {
//                             const { nativeEvent } = syntheticEvent;
//                             console.warn('WebView HTTP error: ', nativeEvent);
//                             Alert.alert('WebView HTTP Error', `HTTP error: ${nativeEvent.statusCode}`);
//                         }}
//                     />
//                 ) : (
//                     <View style={styles.buttonContainer}>
//                         <Pressable
//                             style={styles.btn}
//                            onPress={initiatePayment}
//                         >
//                             <Text style={styles.btnText}>Make payment</Text>
//                         </Pressable>
//                     </View>
//                 )}
//                 {paymentVerified && <Text>Payment Verified!</Text>}
            {/* <StatusBar backgroundColor={'white'} barStyle={'dark-content'} />
            <View style={styles.itemsContainer}>
                <Pressable style={styles.arrowIconContainer}>
                    <AntDesign 
                        name="arrowleft" 
                        size={24} 
                        color="black"
                        onPress={() => navigation.goBack()} 
                    />
                </Pressable>         
                <View style={styles.headerTextContainer}>
                    <Text style={styles.headerText}>Select payment method</Text>
                </View>
                <View style={styles.paymentMethodContainer}>
                    <View style={styles.paymentMethod}>
                        <Text style={styles.paymentText}>MTN momo</Text>
                        <Image source={require("../../assets/momo.png")} />
                    </View>
                    <View style={styles.paymentMethod}>
                        <Text style={styles.paymentText}>Debit card</Text>
                        <Image source={require("../../assets/debit card.png")} />
                    </View>
                </View>
            </View> */}
        {/* </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    itemsContainer: {
        paddingTop: '7%'
    },
    arrowIconContainer: {
        paddingTop: '5%',
        paddingRight: '80%',
        paddingLeft: '3%'
    },
    headerTextContainer: {
        alignItems: 'center'
    },
    headerText: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    paymentMethodContainer: {
        width: '100%',
        alignItems: 'center',
        paddingTop: '7%'
    },
    paymentMethod: {
        margin: '5%',
        width: '80%',
        padding: SIZES.width * 0.025,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 10,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: SIZES.width * 0.35
    },
    paymentText: {},
    buttonContainer: {
        paddingTop: '120%',
        width: '100%',
        alignItems: 'center',
        justifyContent:'center'
    },
    btn: {
        backgroundColor: 'blue',
        padding: '4%',
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
    }
});
export default PaymentMethod; */}


import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, Alert, SafeAreaView, TouchableOpacity } from 'react-native';
import { Paystack, paystackProps } from 'react-native-paystack-webview';
import { useRef } from 'react';
import { SIZES } from '../../Constants/Theme';
import { LoadingModal } from "react-native-loading-modal";
import axiosInstance from "../../utils/axiosInstance";
import { AuthContext } from '../../Context/context';
import { useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { PAYSTACK_PUBLIC_KEY, PAYSTACK_SECRET_KEY } from '@env'


const PaymentMethod = ({ navigation }) => {
  const [showPaystack, setShowPaystack] = useState(false);
  const [loading, setLoading] = useState(false)
  const [profile, setProfile] = useState({
    name:"",
    email:"",
    phone:"",
    price:"",
    location:""
  })

  const paystackWebViewRef = useRef(paystackProps.PayStackRef) 
  const {quantity} = useContext(AuthContext)

  const handleShowPayStack = () =>{
    setShowPaystack(true)
  }

  const handlePaymentSuccess = async() => {
    try {
      const id = await AsyncStorage.getItem("product_id")
      const response = await axiosInstance.post(`/place-order/${id}`, {
        quantity:quantity,
        location:profile.location
      });
      if (response.status === 201) {
        Alert.alert('Payment Successful', 'Your payment was verified successfully.');
        navigation.navigate('PaymentSuccess'); 
      } 
    } catch (error) {
      console.log(error)
    }
  };

  const handlePaymentCancel = (response) => {
    Alert.alert('Payment Cancelled', 'You have cancelled the payment.');
  };

  useEffect(() => {
    const getProfile = async () => {
      const results = await AsyncStorage.multiGet([
        "userName",
        "userEmail",
        "phone",
        "price",
        "location"
      ]);
      const name = results[0][1];
      const email = results[1][1];
      const phone = results[2][1];
      const price = results[3][1];
      const location = results[4][1];
      setProfile({
        name:name,
        email:email,
        phone:phone,
        price:parseInt(price),
        location:location
      }); 
    };
    getProfile();
  }, []);


  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.text}>
          Thanks for choosing us. 
          You are almost at the end stage. 
          Please kindly hit the "Pay Now" button to initiate the payment process.
        </Text>
      </View>
        <Paystack
          paystackKey={PAYSTACK_PUBLIC_KEY}
          paystackSecretKey={PAYSTACK_SECRET_KEY}
          amount={quantity*profile.price} 
          billingEmail={profile.email}
          billingMobile={profile.phone}
          billingName={profile.name}
          currency="GHS"
          activityIndicatorColor='white'
          onCancel={(e) => {
            // setShowPaystack(false);
            handlePaymentCancel(e);
          }}
          onSuccess={(e) => {
            handlePaymentSuccess(e)
          }}
          ref={paystackWebViewRef}
          autoStart={showPaystack}
        />
        <TouchableOpacity onPress={()=> paystackWebViewRef.current.startTransaction()}
         style={styles.buttonContainer}
          >
          <Text style={styles.buttonText}>Pay Now</Text>
        </TouchableOpacity>
        {loading && <LoadingModal modalVisible={true} />}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems:'center',
    justifyContent:'center',
    gap:SIZES.height*0.1
  },
  buttonContainer:{
    backgroundColor:'blue',
    padding:'3%',
    width:'50%',
    alignItems:"center",
    borderRadius:5,
  },
  buttonText:{
    color:'white'
  },
  textContainer:{
    marginHorizontal:'5%',
  },
  text:{
    textAlign:"justify",
    fontSize:SIZES.width*0.05
  }
});

export default PaymentMethod;