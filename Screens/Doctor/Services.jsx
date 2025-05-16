import React from 'react'
import { SafeAreaView, View, Text, Image, StyleSheet, Pressable, StatusBar, TextInput } from 'react-native'
import DoctorServices from '../../Components/DoctorServices'
import { AntDesign, Feather} from '@expo/vector-icons';
import { SIZES } from '../../Constants/Theme';
import { useState } from 'react';
import { services } from '../../utils/data';



const Services = ({navigation}) => {

    const [search, setSearch] = useState('')
  return (
    <SafeAreaView style={styles.container}>
        <StatusBar backgroundColor={'#0C07F1CC'} barStyle={'light-content'} />

            <View style={styles.statusBarContainer}>
              <Pressable style={styles.arrowIconContainer}
               onPress={()=>navigation.goBack()}
               >
                <AntDesign name="arrowleft" size={24} color="white" />
              </Pressable>
              <View style={styles.statusBarTextContainer}>
                   <Text style={styles.stusBarText}>
                    Doctors
                   </Text>
                </View>
            </View>

            <View style={styles.inputContainer}>
              <TextInput placeholder='Search for specialist...' 
               style={styles.input}
               value={search}
             />
           </View>

           <DoctorServices/>

    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
    },
    statusBarContainer:{
        backgroundColor:"#0C07F1CC",
        paddingLeft:"5%",
        height:"22%",
        gap:SIZES.height*0.025
    },
    arrowIconContainer:{
        paddingTop:'5%',
        paddingRight:'80%',
        paddingLeft:'3%',
      },
      statusBarTextContainer:{
        paddingLeft:SIZES.width*0.03
      },
      stusBarText:{
        color:"white",
        fontWeight:"bold",
        fontSize:SIZES.width*0.06
      },
      inputContainer:{
       position:'absolute',
       width:"100%",
       top:"15%",
       left:"5%",
      },
      input:{
        padding:'2%',
        width: '92%',
        paddingHorizontal: 10,
        margin:'5%',
        width:'80%',
        backgroundColor:'white',
        borderWidth: 1,
        borderColor: 'white',
        borderRadius: 15, 
        paddingHorizontal: 10,
        marginBottom: 10,
        shadowColor: "#000",
        shadowOffset: {
        width: 0,
        height: 2,
       },
       shadowOpacity: 0.25,
       shadowRadius: 3.84,
       elevation: 5,
      },
})

export default Services;