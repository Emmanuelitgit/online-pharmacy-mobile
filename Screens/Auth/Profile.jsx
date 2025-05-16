import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, Pressable, TextInput, StatusBar, Image } from 'react-native';
import { AntDesign, Feather} from '@expo/vector-icons';
import { FontAwesome5, FontAwesome6, Fontisto } from '@expo/vector-icons';
import { SIZES } from '../../Constants/Theme';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useContext } from "react"
import { AuthContext } from '../../Context/context';

const Profile = ({navigation}) => {

  const{logout} = useContext(AuthContext);

  const [profile, setProfile] = useState({
    name:'',
    email:'',
    file:''
  })

  const handleLogout = async e =>{
    e.preventDefault()
    try{
        await logout()
          navigation.navigate("Home")
    }catch(err){
        console.log(err)
    }
}

  useEffect(() => {
    const getProfile = async () => {
      const quantity = await AsyncStorage.getItem("quantity");
      const results = await AsyncStorage.multiGet([
        "userName",
        "userEmail",
        "userImage",
        "phone",
      ]);
      const name = results[0][1];
      const email = results[1][1];
      const file = results[2][1];
      const phone = parseInt(results[3][1], 10);
      setProfile({
        name,
        email,
        file,
        phone
      }); 
      // setImage(file)
    };
    getProfile();
  }, []);


  return (
    <SafeAreaView style={styles.container}>
        <StatusBar backgroundColor={'#0C07F1CC'} barStyle={'light-content'} />
        <View style={styles.itemsContainer}>
        <Pressable style={styles.arrowIconContainer}
        onPress={()=>navigation.goBack()}
        >
         <AntDesign name="arrowleft" size={24} color="white" />
        </Pressable>
        <View style={styles.userNameContainer}>
            <View style={styles.profileImageContainer}>
              {
                profile.file && 
                <Image 
                source={{uri:`https://pharmacy-ordering-server.onrender.com/${profile?.file}`}}
                resizeMode="cover" 
                style={styles.profile} 
                />
              }

              {
                !profile.file && 
                <Image 
                source={require("../../assets/profile.png")}
                style={styles.profile} 
                />
              }      
            </View>
            <View>
                <Text>{profile?.name}</Text>
                <Text>{profile?.phone}</Text>
            </View>
        </View>
        <View style={styles.accountInfoContainer}>
        <View style={styles.myAccountContainer}>
            <Text>My Account</Text>
        </View>
            <Pressable style={styles.accountInfo}
            onPress={()=>navigation.navigate("Doctors")}
            >
            <Fontisto name="doctor" size={24} color="blue" />
            <Text>Doctors/Specialist</Text>
            </Pressable>
            <Pressable style={styles.accountInfo}
            onPress={()=>navigation.navigate("Appointments")}
            >
            <Fontisto name="date" size={24} color="blue" />
            <Text>My Appointmnet</Text>
            </Pressable>
            <Pressable style={styles.accountInfo}
            onPress={()=>navigation.navigate("Orders")}
            >
            <FontAwesome6 name="cart-arrow-down" size={24} color="blue" />
            <Text>My Orders</Text>
            </Pressable>
            <Pressable style={styles.accountInfo}
            onPress={handleLogout}
            >
            <Feather name="log-out" size={24} color="blue" />
            <Text>Logout</Text>
            </Pressable>
        </View>
        </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    container:{
        flex:1
    },
    itemsContainer:{
        width:'100%',
        height:'100%'
    },
    arrowIconContainer:{
        paddingTop:'4%',
        paddingRight:'80%',
        paddingLeft:'3%',
        backgroundColor:'#0C07F1CC',
        padding:'25%',
      },
      userNameContainer:{
        height: SIZES.height * 0.17,
        width:SIZES.width*0.65,  
        borderRadius: 10,
        backgroundColor: '#fff',
        shadowColor: '#000',
        elevation: 5,
        position:'absolute',
        top:'15%',
        left:'20%',
        alignItems:'center',
        flexDirection:'row',
        gap:SIZES.width*0.05
      },
      myAccountContainer:{
        position:'absolute',
        top:'50%',
        left:'5%'
      },
      profileImageContainer:{
        paddingLeft:'5%'
      },
      accountInfoContainer:{
        paddingTop:'43%',
        paddingLeft:'7%',
        gap:SIZES.height*0.045
      },
      accountInfo:{
        flexDirection:'row',
        gap:SIZES.width*0.05
      },
      profile:{
        height:SIZES.height*0.075,
        width:SIZES.width*0.15,
        borderRadius:50
      }
})

export default Profile