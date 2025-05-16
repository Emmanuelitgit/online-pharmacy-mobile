import React from 'react'
import { SafeAreaView, View, StyleSheet, Image,StatusBar,Text, Pressable } from 'react-native'
import { SIZES } from '../../Constants/Theme'

const AppointmnetSuccess = ({navigation}) => {
  return (
    <SafeAreaView style={styles.container}>
         <StatusBar
          backgroundColor="blue" 
          barStyle="light-content" 
      />
        <View style={styles.itemsContainer}>
            <Image source={require("../../assets/services/success.png")} style={styles.image}/>
             <View style={styles.textContainer}>
               <Text style={styles.text}>Appointment Booked</Text>
               <Text style={styles.timeText}>
                4th June 2023
                 01:00 pm
                 </Text>
             </View>
             <Pressable style={styles.buttonItem}
              onPress={()=>navigation.navigate("Products")}
             >
                <Text style={styles.btnText}>Back Home</Text>
            </Pressable>
        </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    container:{
      backgroundColor:'blue',
      flex:1
    },
    itemsContainer:{
      alignItems:'center',
      paddingTop:'20%'
    },
    image:{
      width:SIZES.width*0.4,
      height:SIZES.height*0.2
    },
    textContainer:{
      paddingTop:'15%',
      alignItems:"center"
    },
    text:{
      color:'white',
      fontWeight:"bold",
      fontSize:SIZES.width*0.07
    },
    timeText:{
      color:'white',
      fontWeight:"bold",
      fontSize:SIZES.width*0.07,
      paddingTop:'25%'
    },
    buttonItem:{
      backgroundColor:'white',
      width:SIZES.width*0.4,
      padding:SIZES.height*0.017,
      borderRadius:10,
      alignItems:'center',
      marginTop:SIZES.height*0.15
  },
  buttonContainer:{
      alignItems:'center',
      paddingTop:'20%'
  },
  btnText:{
      color:'black'
  }
})

export default AppointmnetSuccess
