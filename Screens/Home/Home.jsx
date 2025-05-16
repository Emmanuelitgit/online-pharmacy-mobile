import React from 'react';
import { View, Text, Image, SafeAreaView, StyleSheet, Pressable } from 'react-native';

const Home = ({navigation}) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.itemsContainer}>
        <View style={styles.imageContainer}>
            <Image
             source={require("../../assets/Frame 4.png")} 
             style={styles.image}/>
        </View>
        <View style={styles.btnContainer}>
        <Pressable 
         onPress={()=>navigation.navigate("Register")}
         style={[styles.btn,styles.registerBtn]}
         >
          <Text style={styles.btnText}>Register</Text>
        </Pressable>
        <Pressable
         onPress={()=>navigation.navigate("Login")} 
         style={[styles.btn, styles.loginBtn]}
         >
          <Text style={styles.loginBtnText}>Login</Text>
        </Pressable>
        </View>
       </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        width:'100%',
        height:'100%',
        backgroundColor:'white'
    },
    itemsContainer:{
        paddingTop:'1%'
    },
    imageContainer:{},
    image:{},
    btnContainer:{
        display:'flex',
        alignItems:'center',
        justifyContent:'center',
        flexDirection:'column',
        paddingTop:'5%',
    },
    registerBtn:{
        backgroundColor:'blue',
    },
    loginBtn:{
        backgroundColor:'white',
        borderColor:'blue',
        borderWidth:1
    },
    loginBtnText:{
        color:'blue'
    },
    btn:{
        padding:'3%',
        width: '80%',
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5, 
        paddingHorizontal: 10,
        marginBottom: '7%',
        alignItems:'center',
        justifyContent:'center'
      },
      btnText:{
        color:'white'
      },
})

export default Home