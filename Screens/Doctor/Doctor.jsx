import React from 'react';
import { SafeAreaView, View, Text, ImageBackground, StyleSheet, StatusBar, Pressable } from 'react-native';
import { AntDesign, Feather} from '@expo/vector-icons';
import Entypo from '@expo/vector-icons/Entypo';
import { SIZES } from '../../Constants/Theme';
import axiosInstance from '../../utils/axiosInstance';
import {useState, useEffect} from "react"
import AsyncStorage from '@react-native-async-storage/async-storage';

const Doctor = ({navigation}) => {

  const [doctor, setDoctor] = useState([])

  useEffect(() => {
    const getDoctor = async () => {
      try {
        const id = await AsyncStorage.getItem("doctor_id")
        const response = await axiosInstance.get(`/single-doctor/${id}`);
        if (response.status === 200) {
          const { doctor } = response.data;
          setDoctor(doctor);
        }
      } catch (error) {
        if (error.response && error.response.status === 401) {
          const { message } = error.response.data;
          Alert.alert("401", message);
        }
      }
    };
    getDoctor();
  }, []);


  return (
    <SafeAreaView style={styles.container}>
         <StatusBar
          translucent={true} 
          backgroundColor="transparent" 
          barStyle="light-content" 
      />
      <ImageBackground
        source={{uri:`https://pharmacy-ordering-server.onrender.com/${doctor?.file}`}}
        style={styles.background}
        resizeMode="cover"
      >
       <View style={styles.arrowRatingContainer}>
       <Pressable style={styles.arrowIconContainer}
           onPress={()=>navigation.goBack()}
            >
            <AntDesign name="arrowleft" size={24} color="blue" />
        </Pressable>
        <View style={styles.ratingContainer}>
             <Text style={styles.rate}>4.5 <Entypo name="star" size={24} style={styles.rateIcon} /></Text>
        </View>
       </View>
       <View style={styles.nameContainer}>
          <View style={styles.nameItems}>
          <Text style={styles.nameText}>{doctor?.name}</Text>
          <Text style={styles.nameText}>{doctor?.role}</Text>
          </View>
       </View>
       <View style={styles.consultationVisitContainer}>
         <View style={styles.consultationContainer}>
            <Text style={styles.consultationText}>Online Consultation</Text>
            <Text style={styles.consultationText}>9:00 AM - 1:00 PM</Text>
            <View style={styles.blue}></View>
         </View>
         <View style={styles.visitContainer}>
            <Text style={styles.consultationText}>Online Consultation</Text>
            <Text style={styles.consultationText}>9:00 AM - 1:00 PM</Text>
            <View style={styles.visitblue}></View>
         </View>
       </View>
       <View style={styles.biographyContainer}>
          <View style={styles.biographyItem}>
            <Text style={styles.biographyTitle}>Biography</Text>
            <Text style={styles.biographyText}>{doctor?.biography}</Text>
          </View>
       </View>
       <View style={styles.buttonContainer}>
       <Pressable style={styles.buttonItem}
       onPress={()=>navigation.navigate("AppointmentTime")}
       >
         <Text style={styles.btnText}>Schedule Appointmnet</Text>
       </Pressable>
       </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
  },
  text: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  ratingContainer:{
    backgroundColor:"#08075ECC",
    width:'20%',
    borderRadius:20
},
rate:{
    color:'#0BDC39',
    fontSize:SIZES.width*0.06,
    borderRadius:10,
    width:SIZES.width*0.2,
},
rateIcon:{
    color:'#0BDC39',
    fontSize:SIZES.width*0.06
},
arrowRatingContainer:{
    flexDirection:'row',
    paddingTop:'12%',
    gap:SIZES.width*0.65,
    paddingLeft:'7%',
},
nameContainer:{
    paddingTop:'15%'
},
nameItems:{
    backgroundColor:'#00000080',
    flexDirection:'row',
    gap:SIZES.width*0.3,
    height:SIZES.height*0.07,
    alignItems:'center',
    justifyContent:'center'
},
nameText:{
    color:'white',
    fontSize:SIZES.width*0.05,
    fontWeight:'bold'
},
consultationContainer:{
    backgroundColor:"white",
    width:SIZES.width*0.45,
    height:SIZES.height*0.16,
    gap:SIZES.height*0.055,
    borderTopLeftRadius:10,
    borderBottomLeftRadius:10,
    alignItems:'center',
    shadowColor: "#000",
    shadowOffset: {
    width: 0,
    height: 2,
   },
   shadowOpacity: 0.25,
   shadowRadius: 3.84,
   elevation: 5,
},
visitContainer:{
    backgroundColor:"white",
    width:SIZES.width*0.45,
    height:SIZES.height*0.16,
    gap:SIZES.height*0.055,
    borderTopRightRadius:10,
    borderBottomRightRadius:10,
    alignItems:'center',
    shadowColor: "#000",
    shadowOffset: {
    width: 0,
    height: 2,
   },
   shadowOpacity: 0.25,
   shadowRadius: 3.84,
   elevation: 5,
},
consultationText:{
    color:'#0C07F1'
},
consultationVisitContainer:{
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center',
    paddingTop:'15%'
},
blue:{
    backgroundColor:'blue',
    width:SIZES.width*0.45,
    height:SIZES.height*0.05,
    position:'absolute',
    top:'85%',
    left:'0.2%',
    // borderTopLeftRadius:10,
    borderBottomLeftRadius:10,
},
visitblue:{
    backgroundColor:'blue',
    width:SIZES.width*0.45,
    height:SIZES.height*0.05,
    position:'absolute',
    top:'85%',
    left:'0.2%',
    borderBottomRightRadius:10,
},
biographyContainer:{
    alignItems:'center',
    justifyContent:'center',
    paddingTop:'10%'
},
biographyItem:{
    backgroundColor:"white",
    width:SIZES.width*0.9,
    height:SIZES.height*0.31,
    gap:SIZES.height*0.01,
    borderRadius:10,
    // alignItems:'center',
    shadowColor: "#000",
    shadowOffset: {
    width: 0,
    height: 2,
   },
   shadowOpacity: 0.25,
   shadowRadius: 3.84,
   elevation: 5,
},
biographyText:{
    color:'#0C07F1',
    margin:'2%',
},
biographyTitle:{
    color:'#0C07F1',
    fontWeight:'bold',
    fontSize:SIZES.width*0.05,
    margin:'1%'
},
buttonItem:{
    backgroundColor:'blue',
    width:SIZES.width*0.5,
    padding:SIZES.height*0.015,
    borderRadius:10,
    alignItems:'center'
},
buttonContainer:{
    alignItems:'center',
    paddingTop:'7%'
},
btnText:{
    color:'white'
}
});

export default Doctor;