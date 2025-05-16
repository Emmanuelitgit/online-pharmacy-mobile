import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, Pressable, TextInput, StatusBar, Image } from 'react-native';
import { AntDesign} from '@expo/vector-icons';
import { SIZES } from '../../Constants/Theme';

const PaymentSuccess = ({navigation}) => {
  return (
<SafeAreaView style={styles.container}>
    <StatusBar backgroundColor={'white'} barStyle={'dark-content'} />
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
            <Text style={styles.headerText}>Your order ID: 036748373836</Text>
        </View>
        <View style={styles.imageContainer}>
            <Image source={require("../../assets/success.png")}/>
            <Text style={styles.successText}>Payment successful</Text>
        </View>
        <View  style={styles.buttonContainer}>
         <Pressable
          style={[styles.btn, styles.btnBlue]}
          onPress={()=>navigation.navigate("TrackProduct")}
          >
          <Text style={[styles.btnText, styles.btnTextWhite]}>Track your item</Text>
        </Pressable>
        <Pressable
          style={[styles.btn, styles.btnWhite]}
          onPress={()=>navigation.navigate("Products")}
          >
          <Text style={[styles.btnText, styles.btnTextBlack]}>Return Home</Text>
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

    },
    arrowIconContainer:{
        paddingTop:'5%',
        paddingRight:'80%',
        paddingLeft:'3%'
      },
      headerTextContainer:{
        alignItems:'center'
      },
      headerText:{
        fontSize:15
      },
      imageContainer:{
        alignItems:'center',
        paddingTop:'10%'
      },
      successText:{
        color:'#0BDC39',
        fontWeight:'bold',
        fontSize:20
      },
      buttonContainer:{
        paddingTop:'10%',
        width:'100%',
        alignItems:'center'
      },
      btn:{
        padding:'3.3%',
        width: '80%',
        borderRadius: 5, 
        paddingHorizontal: 10,
        marginBottom: '2%',
        alignItems:'center',
        marginTop:'10%'
      },
      btnText:{
        color:'white'
      },
      btnTextBlack:{
        color:'black'
      },
      btnTextWhite:{
        color:'white'
      },
      btnBlue:{
        backgroundColor:'blue',
      },
      btnWhite:{
        borderRadius: 10,
        backgroundColor: '#fff',
        shadowColor: '#000',
        elevation: 5,
      }
})


export default PaymentSuccess