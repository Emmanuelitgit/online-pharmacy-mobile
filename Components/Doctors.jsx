import React from 'react'
import { View, StyleSheet, Text, Image, Pressable } from 'react-native';
import { SIZES } from '../Constants/Theme';
import Entypo from '@expo/vector-icons/Entypo';


export const Doctors = ({name, role, fee, profile, epxperience, handleNavigate}) => {

  console.log(profile)

  return (
    <View style={styles.container}>
        <Pressable style={styles.doctorContainer}
        onPress={handleNavigate}
        >
           <View style={styles.imageContainer}>
           <Image source={{uri:`https://pharmacy-ordering-server.onrender.com/${profile}`}} style={styles.image}/>
           </View>
           <View style={styles.textContainer}>
           <Text style={styles.text}>{name}</Text>
           <Text style={styles.text}>{role}</Text>
           <Text style={styles.text}>Experience {epxperience} yers</Text>
           <Text style={styles.text}>Consultation fee: {fee}</Text>
           </View>
           <View style={styles.ratingContainer}>
             <Text style={styles.rate}>4.5 <Entypo name="star" size={24} style={styles.rateIcon} /></Text>
           </View>
        </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
    },
    doctorContainer:{
        backgroundColor:"#3A19AE",
        borderRadius:10,
        flexDirection:'row',
        alignItems:"center",
        // justifyContent:'center',
        width:SIZES.width*0.85,
        height:SIZES.height*0.21,
        gap:SIZES.width*0.03,
    },
    image: {
      width: SIZES.width * 0.2,
      height: SIZES.height * 0.11,
      borderRadius: 50,
  },
    text:{
        color:"white"
    },
    imageContainer:{},
    textContainer:{},
    ratingContainer:{
        paddingBottom:"30%",
    },
    rate:{
        color:'#0BDC39',
        fontSize:SIZES.width*0.06
    },
    rateIcon:{
        color:'#0BDC39',
        fontSize:SIZES.width*0.06
    }
})

export default Doctors;
