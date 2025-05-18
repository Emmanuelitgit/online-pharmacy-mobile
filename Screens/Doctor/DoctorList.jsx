import React from "react";
import {
  SafeAreaView,
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  Pressable,
  StatusBar,
  TextInput,
  RefreshControl,
} from "react-native";
import { AntDesign, Feather } from "@expo/vector-icons";
import { SIZES } from "../../Constants/Theme";
import { useState, useEffect } from "react";
import Doctors from "../../Components/Doctors";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axiosInstance from "../../utils/axiosInstance";

const DoctorList = ({ navigation }) => {
  const [search, setSearch] = useState("");

  const [doctors, setDoctors] = useState([]);
  const [refreshing, setRefreshing] = React.useState(false);

  const handleNavigate = (id, name, file, role) => {
    navigation.navigate("Doctor");
    AsyncStorage.setItem("doctor_id", id);
    AsyncStorage.setItem("doctor_profile", file);
    AsyncStorage.setItem("doctor_name", name);
    AsyncStorage.setItem("doctor_role", role);
  };

  useEffect(() => {
    const getDoctors = async () => {
      try {
        const response = await axiosInstance.get(`/all-doctor`);
        if (response.status === 200) {
          const { doctor } = response.data;
          setDoctors(doctor);
        }
      } catch (error) {
        if (error.response && error.response.status === 401) {
          const { message } = error.response.data;
          Alert.alert("401", message);
        }
      }
    };
    getDoctors();
  }, []);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={"#0C07F1CC"} barStyle={"light-content"} />

      <View style={styles.statusBarContainer}>
        <View style={styles.statusItems}>
          <Pressable
            style={styles.arrowIconContainer}
            onPress={() => navigation.goBack()}
          >
            <AntDesign name="arrowleft" size={24} color="white" />
          </Pressable>
          <View style={styles.statusBarTextContainer}>
            <Text style={styles.stusBarText}>Doctors</Text>
          </View>
        </View>
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Search for a doctor here..."
          style={styles.input}
          value={search}
        />
      </View>

      <FlatList
        data={doctors}
        renderItem={({ item }) => (
          <Doctors
            name={item?.name}
            profile={item?.file}
            fee={item?.fee}
            role={item?.role}
            epxperience={item?.epxperience}
            handleNavigate={() =>
              handleNavigate(item?._id, item?.name, item?.file, item?.role)
            }
          />
        )}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.contentContainer}
        scrollEnabled={true}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  statusBarContainer: {
    backgroundColor: "#0C07F1CC",
    paddingLeft: "5%",
    height: "22%",
    flexDirection: "row",
    gap: SIZES.width * 0.2,
  },
  arrowIconContainer: {
    paddingTop: SIZES.height * 0.015,
  },
  statusBarTextContainer: {
    paddingLeft: SIZES.width * 0.03,
    paddingTop: SIZES.height * 0.015,
  },
  stusBarText: {
    color: "white",
    fontWeight: "bold",
    fontSize: SIZES.width * 0.06,
  },
  statusItems: {
    flexDirection: "row",
    gap: SIZES.width * 0.2,
    paddingTop: SIZES.height * 0.03,
  },
  inputContainer: {
    position: "absolute",
    width: "100%",
    top: "9%",
    left: "5%",
  },
  input: {
    padding: "2%",
    width: "92%",
    paddingHorizontal: 10,
    margin: "5%",
    width: "80%",
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "white",
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
  contentContainer: {
    display: "flex",
    gap: SIZES.width * 0.09,
    // marginLeft:"5.5%",
    paddingTop: "9%",
    paddingBottom: "10%",
  },
});

export default DoctorList;
