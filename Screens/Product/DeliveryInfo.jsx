import React, { useState } from 'react'
import { AntDesign} from '@expo/vector-icons';
import { Text, View, SafeAreaView, StyleSheet, TextInput, Pressable, StatusBar} from 'react-native';
import { SIZES } from '../../Constants/Theme';
import { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const DeliveryInfo = ({navigation}) => {

  const [profile, setProfile] = useState({
    name:'',
    email:'',
    phone:''
  })
  const [location , setLocation] = useState('')

  const handleDeliveryInfo = async()=>{
    await AsyncStorage.setItem("location", location)
    navigation.navigate("PaymentMethod")
  }

  useEffect(() => {
    const getProfile = async () => {
      const quantity = await AsyncStorage.getItem("quantity");
      const results = await AsyncStorage.multiGet([
        "userName",
        "userEmail",
        "phone",
      ]);
      const name = results[0][1];
      const email = results[1][1];
      const phone = results[2][1];

      setProfile({
        name,
        email,
        phone
      }); 
    };
    getProfile();
  }, []);

  return (
    <SafeAreaView>
        <StatusBar backgroundColor={'white'} barStyle={'dark-content'} />
        <View style={styles.itemsContainer}>
        <Pressable style={styles.arrowIconContainer}>
         <AntDesign 
          name="arrowleft" 
          size={24} 
          color="black" 
          onPress={() => navigation.goBack()}
          />
         <Text style={styles.headerText}>Checkout</Text>
        </Pressable>
        <View style={styles.infoTextContainer}>
          <Text style={styles.infoText}>Delivery Information</Text>
        </View>
         <View style={styles.inputsContainer}>
         <View style={styles.inputContainer}>
          <TextInput placeholder='Name' 
           style={styles.input}
           value={profile.name}
           />
        </View>
        <View style={styles.inputContainer}>
          <TextInput placeholder='Email' 
           style={styles.input}
           value={profile.email}
           />
        </View>
        <View style={styles.inputContainer}>
          <TextInput placeholder='Phone' 
           style={styles.input}
           value={profile.phone}
           
           />
        </View>
        <View style={styles.inputContainer}>
        <TextInput
          placeholder="Location"
          style={styles.input}
          onChangeText={(text) => {
          setLocation(text);
        }}
        value={location}
      />
        </View>
         </View>
         <View  style={styles.buttonContainer}>
         <Pressable
          style={styles.btn}
          onPress={handleDeliveryInfo}
          >
          <Text style={styles.btnText}>Proceed</Text>
        </Pressable>
         </View>
        </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    container:{
        backgroundColor: '#fff',
        height:'100%'
      },
      arrowIconContainer:{
        paddingTop:'3%',
        flexDirection:'row',
        gap:SIZES.width*0.25,
        paddingRight:'30%'
      },
      itemsContainer:{
        alignItems: 'center',
        width:'100%',
        height:'100%',
        paddingTop:'15%'
      },
      infoTextContainer:{
        display:'flex',
        paddingBottom:'5%',
        paddingTop:SIZES.height*0.04
      },
      infoText:{

      },
      headerText:{
        fontSize:20,
        fontWeight:'bold'
      },
      inputsContainer:{
        width:'100%',
        alignItems:'center'
      },
      inputContainer:{
        margin:'5%',
        width:'80%',
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5, 
        paddingHorizontal: 10,
        marginBottom: 10,
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
      },
      input:{
        padding:'3%',
        width: '92%',
        paddingHorizontal: 10,
      },
      buttonContainer:{
        paddingTop:'8%',
        width:'100%',
        alignItems:'center'
      },
      btn:{
        backgroundColor:'blue',
        padding:'3%',
        width: '80%',
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5, 
        paddingHorizontal: 10,
        marginBottom: '7%',
        alignItems:'center',
      },
      btnText:{
        color:'white'
      },
})
export default DeliveryInfo