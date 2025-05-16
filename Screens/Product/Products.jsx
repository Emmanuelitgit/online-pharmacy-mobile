import React from 'react';
import { View, Text, SafeAreaView, StyleSheet, StatusBar, Pressable, Image, ScrollView } from 'react-native';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import { SIZES } from '../../Constants/Theme';
import Card from '../../Components/Card';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, useEffect } from 'react';
import { useContext } from "react"
import { AuthContext } from '../../Context/context';


const Products = ({ navigation }) => {

    const btns = [
        {
        id:1,
        name:"First Aid",
        cat:"aid"
    },
    {
        id:2,
        name:"Pain Relief",
        cat:"pain"
    },
    {
        id:3,
        name:"Cold Flu",
        cat:"cold"
    }
];
   
    const{handleProductFilter, handleViewAllProducts} = useContext(AuthContext);

    const [quantity, setQuantity] = useState(null);
    const [profile, setProfile] = useState(null)


    const handleNavigate = (id, price) =>{
        navigation.navigate("Product");
        AsyncStorage.setItem('product_id', id)
        AsyncStorage.setItem("price", price.toString())
    }

    useEffect(() => {
        const getProfile = async () => {
          const quantity = await AsyncStorage.getItem("quantity");
          const results = await AsyncStorage.multiGet([
            "userName",
            "userEmail",
            "userImage",
            "refreshToken",
            "token",
          ]);
          const name = results[0][1];
          const email = results[1][1];
          const file = results[2][1];
          const refreshToken = results[3][1];
          const token = results[4][1];
          setProfile(file); 
          setQuantity(quantity);
        };
        getProfile();
      }, []);


    return (
        <SafeAreaView style={styles.container}>
            <StatusBar backgroundColor="white" barStyle="dark-content" />
            <View style={styles.itemsContainer}>
                <View style={styles.iconContainer}>
                    {/* <AntDesign name="shoppingcart" size={24} color="black" />
                    <MaterialIcons name="notifications" size={24} color="black" />
                    <View style={styles.badge}>
                        <Text style={styles.badgeValue}>1</Text>
                    </View> */}
                    {/* {!profile && 
                     <Pressable
                     style={styles.profile}
                     onPress={()=>navigation.navigate("Profile")}
                     >
                    <Image 
                     source={require("../../assets/profile.png")}
                     style={styles.profileImage}
                     />
                     </Pressable>
                    }
                    {profile && 
                    <Pressable
                     style={styles.profile}
                     onPress={()=>navigation.navigate("Profile")}
                    >
                    <Image 
                     source={{uri:`https://pharmacy-ordering-server.onrender.com/${profile}`}}
                     style={styles.profileImage}
                     />
                    </Pressable>
                    } */}
                </View>
                <View style={styles.navBtnsContainer}>
                    {btns.map((btn) => (
                        <Pressable style={styles.btnContainer} key={btn?.id}
                        onPress={()=>handleProductFilter(btn?.cat)}
                        >
                            <Text style={styles.btnText}>{btn?.name}</Text>
                        </Pressable>
                    ))}
                </View>
                <View style={styles.topImageContainer}>
                    <Image source={require("../../assets/slider.png")} style={styles.image} />
                    <View style={styles.topImageTextContainer}>
                        <Text style={styles.topimageHeader}>Licensed pharmacists</Text>
                        <Text style={styles.topImageText}>Expert advice at your finger tips</Text>
                    </View>
                </View>
                <View style={styles.popularViewAllContainer}>
                    <Pressable  onPress={handleViewAllProducts}>
                    <Text style={styles.popularText}>Popular products</Text>
                    </Pressable>
                    <Pressable onPress={handleViewAllProducts}>
                    <Text style={styles.viewAllText}>View all</Text>
                    </Pressable>
                </View>
                <ScrollView contentContainerStyle={styles.scrollViewContent}>
                    <Card 
                    handleNavigate={(id, price) => handleNavigate(id, price)} 
                    />
                </ScrollView>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    itemsContainer: {
        flex: 1,
        paddingTop: SIZES.height * 0.01,
    },
    iconContainer: {
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
        flexDirection: 'row',
        gap: SIZES.width * 0.05,
        // paddingTop: SIZES.height * 0.01,
        marginRight:SIZES.width*0.03
    },
    badge: {
        backgroundColor: 'red',
        width: '6%',
        height: '53%',
        borderRadius: 50,
        position: 'absolute',
        right: '20%',
        bottom:'35%'
    },
    badgeValue: {
        color: 'white',
        textAlign: "center",
    },
    viewProfileContainer:{
        position:'absolute',
        top:'800%'
    },
    profile:{
    },
    profileImage:{
        borderRadius:50,
        height:SIZES.height*0.06,
        width:SIZES.width*0.12
    },
    navBtnsContainer: {
        display: 'flex',
        alignItems: 'center',
        flexDirection: "row",
        gap: SIZES.width * 0.05,
        justifyContent: 'center',
        paddingTop: "5%",
    },
    btnContainer: {
        backgroundColor: 'blue',
        padding: '3%',
        width: '27%',
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
        paddingHorizontal: 10,
        alignItems: 'center',
    },
    btnText: {
        color: 'white',
        fontSize: SIZES.width * 0.035,
    },
    topImageContainer: {
        backgroundColor: '#ACC5F4',
        width: '90%',
        height: '17%',
        borderRadius: 7,
        display: 'flex',
        flexDirection: 'row',
        marginLeft: '5%',
        marginTop: "5%",
        marginBottom: '7%',
    },
    image: {
        width: '50%',
        height: '100%',
        borderRadius: 7,
    },
    topImageTextContainer: {
        display: 'flex',
        flexDirection: 'column',
        gap: SIZES.height * 0.01,
        paddingTop: SIZES.height * 0.04,
    },
    topimageHeader: {
        color: '#0C07F1CC',
        position: 'absolute',
        right: '43%',
        top: "10%",
        fontSize: SIZES.width * 0.05,
    },
    topImageText: {
        width: "65%",
        textAlign: 'center',
        paddingTop: SIZES.height * 0.02,
        fontSize: SIZES.width * 0.05,
    },
    popularViewAllContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        marginHorizontal: SIZES.width * 0.035,
        marginBottom: '5%',
    },
    viewAllText: {
        color: '#0C07F1CC',
        fontSize: 15,
    },
    popularText: {
        fontSize: 15,
    },
    scrollViewContent: {
        flexGrow: 1,
    },
});

export default Products;
