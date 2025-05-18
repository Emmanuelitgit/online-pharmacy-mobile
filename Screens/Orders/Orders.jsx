import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  Pressable,
  ScrollView,
  StyleSheet,
  StatusBar,
  Image,
  Alert,
} from "react-native";
import { SIZES } from "../../Constants/Theme";
import { AntDesign } from "@expo/vector-icons";
import axiosInstance from "../../utils/axiosInstance";

const Orders = ({ navigation }) => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const getOrders = async () => {
      try {
        const response = await axiosInstance.get(`/user-orders`);
        if (response.status === 200) {
          const { orders } = response.data;
          setOrders(orders);
        }
      } catch (error) {
        if (error.response && error.response.status === 401) {
          const { message } = error.response.data;
          Alert.alert("401", message);
        }
      }
    };
    getOrders();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="white" barStyle="dark-content" />
      <View style={styles.itemsContainer}>
        <View style={styles.arrowContainer}>
          <Pressable
            style={styles.arrowIconContainer}
            onPress={() => navigation.goBack()}
          >
            <AntDesign name="arrowleft" size={24} color="blue" />
          </Pressable>
          <Text style={styles.ordersText}>My Orders</Text>
        </View>
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          {orders?.map((order) => (
            <View style={styles.orderContainer} key={order?._id}>
              <View style={styles.itemContainer}>
                <Image
                  source={{
                    uri: `https://pharmacy-ordering-server.onrender.com/${order?.file}`,
                  }}
                  style={styles.image}
                />
                <View style={styles.textContainer}>
                  <Text>{order?.name}</Text>
                  <Text>Ghc{order?.price}</Text>
                </View>
              </View>
              <Text style={styles.status}>Delivering..</Text>
            </View>
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  itemsContainer: {
    paddingBottom: SIZES.height * 0.1,
  },
  orderContainer: {
    backgroundColor: "#E3E3FA",
    height: SIZES.height * 0.13,
    flexDirection: "row",
    gap: SIZES.width * 0.3,
    alignItems: "center",
    justifyContent: "center",
    marginTop: SIZES.height * 0.05,
  },
  image: {
    width: SIZES.width * 0.2,
    height: SIZES.height * 0.11,
    borderRadius: 50,
  },
  status: {
    color: "#2AA846",
  },
  itemContainer: {
    flexDirection: "row",
  },
  textContainer: {
    justifyContent: "center",
    marginLeft: "7%",
  },
  arrowContainer: {
    flexDirection: "row",
    paddingTop: SIZES.height * 0.055,
    gap: SIZES.width * 0.2,
    paddingLeft: "7%",
  },
  ordersText: {
    color: "blue",
    fontSize: SIZES.width * 0.055,
  },
});

export default Orders;
