import React, { useState, useEffect } from 'react'
import { View, Text, SafeAreaView, StyleSheet, Image, StatusBar, Pressable, ScrollView,Alert } from 'react-native'
import { SIZES } from '../../Constants/Theme'
import { Foundation } from '@expo/vector-icons';
import { AntDesign} from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axiosInstance from '../../utils/axiosInstance';
import * as Keychain from 'react-native-keychain';
import { AuthContext } from '../../Context/context';
import { useContext } from 'react';

const Product = ({navigation}) => {

    const [product, setProduct] = useState(null)

    const stars = [1,2,3,4]


    const {quantity, handleQuantityDecrement, handleQuantityIncrement} = useContext(AuthContext)
    

    useEffect(() => {
        const getProducts = async () => {
          try {
            const id = await AsyncStorage.getItem("product_id")
            const response = await axiosInstance.get(`/single-medicine/${id}`);
            if (response.status === 200) {
              const { medicine } = response.data;
              setProduct(medicine);
            } 
          } catch (error) {
            if(error.response.status === 401){
                const {message} = error.response.data
                Alert.alert("401",message)
              }
          }
        };
        getProducts();
      }, []);


  return (
    <SafeAreaView style={styles.container}>
        <StatusBar backgroundColor={'white'} barStyle={'dark-content'} />
        <ScrollView>
        <View style={styles.itemsContainer}>
        <Pressable style={styles.arrowIconContainer}>
         <AntDesign 
           name="arrowleft" 
           size={24} 
           color="black" 
           onPress={() => navigation.goBack()}
           />
        </Pressable> 
        <View style={styles.cardContainer}>
            <View style={styles.imageContainer}>
                <Image source={{uri:`https://pharmacy-ordering-server.onrender.com/${product?.file}`}} style={styles.image}/>
            </View>
            <View style={styles.starHeaderContainer}>
                <Text style={styles.title}>{product?.name}</Text>
               <View style={styles.starsContainer}>
               {stars.map((star)=>(
                    <Foundation name="star" size={15} color="orange" key={star} />
                ))}
               </View>
            </View>
            <Text style={styles.priceValue}>{product?.price}</Text>
        </View>
        <View style={styles.descContainer}>
            <Text style={styles.descHeader}>{product?.name}</Text>
            <Text style={styles.descText}>
               Lufart is a highly effective antimalarial 
               medication used to treat uncomplicated 
               malaria caused by Plasmodium falciparum. 
               This combination therapy contains 
               artemether and lumefantrine, which work 
               together to eliminate the malaria parasite 
               from the bloodstream.
            </Text>
        </View>
        <View style={styles.plusminusBtnsContainer}>
            <Pressable style={styles.plusminusBtn}
            onPress={handleQuantityIncrement}
            >
                <Text style={styles.plusminusBtnText}>+</Text>
            </Pressable>
            <Text style={styles.plusminusBtnValue}>{quantity}</Text>
            <Pressable style={styles.plusminusBtn}
            onPress={handleQuantityDecrement}
            disabled={quantity < 2 ? true: false}
            >
                <Text style={styles.plusminusBtnText}>-</Text>
            </Pressable>
        </View>
        <View style={styles.buttonContainer}>
        <Pressable
         style={styles.btnContainer}
         onPress={()=>navigation.navigate("Cart")}
         >
          <Text style={styles.btnText}>Add to cart</Text>
        </Pressable>
        </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center'
    },
    arrowIconContainer:{
        paddingRight:'80%',
        paddingLeft:'3%',
        paddingBottom:'2%'
      },
    itemsContainer:{
        paddingTop:"7%",
        width:"100%",
        height:'100%',
        alignItems:'center'
    },
    cardContainer:{
        height: SIZES.height * 0.3,
        width:SIZES.width*0.42,  
        borderRadius: 10,
        backgroundColor: '#fff',
        shadowColor: '#000',
        elevation: 5,
        paddingTop:-100,
    },
    imageContainer:{
        backgroundColor:"#ACC5F4",
        height:'65%',
        width:'100%',
        borderRadius: 10,
        alignItems:'center',
        justifyContent:'center'
    },
    image:{
        height:"70%",
        width:'70%'
    },
    starHeaderContainer:{
        display:'flex',
        justifyContent:'space-between',
        flexDirection:'row'
    },
    title:{
        color:'black',
        margin:'2%'
    },
    starsContainer:{
         display:'flex',
        justifyContent:'center',
        alignItems:'center',
        flexDirection:'row',
        margin:'2%'
    },
    priceValue:{
        fontSize:15,
        margin:'2%'
    },
    descContainer:{
        display:'flex',
        alignItems:'center',
        justifyContent:'center',
        gap:SIZES.height*0.01,
        paddingTop:SIZES.height*0.04
    },
    descHeader:{
        fontWeight:'bold',
        fontSize:20,
        paddingRight:"60%"
    },
    descText:{
        margin:SIZES.width*0.02
    },
    plusminusBtnsContainer:{
        display:'flex',
        alignItems:'center',
        justifyContent:'space-around',
        flexDirection:'row',
        paddingBottom:'10%',
        width:'100%',
        paddingTop:'7%'
    },
    plusminusBtn:{
        backgroundColor:'#0C07F1',
        borderRadius:50,
        width:'9%',
        padding:SIZES.height*0.0045,
        alignItems:"center"
    },
    plusminusBtnText:{
        color:'white',
        fontWeight:'bold',
        fontSize:17
    },
    plusminusBtnValue:{
        fontWeight:'bold',
        fontSize:25
    },
    buttonContainer:{
        width:'100%',
        alignItems:'center',
        paddingTop:'7%'
    },
    btnContainer:{
        backgroundColor:'blue',
        padding:'3%',
        width: '80%',
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5, 
        paddingHorizontal: 10,
        alignItems:'center',
      },
      btnText:{
        color:'white'
      },
})
export default Product