import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  StatusBar,
} from "react-native";
import { SIZES } from "../../Constants/Theme";
import { AntDesign } from "@expo/vector-icons";
import axiosInstance from "../../utils/axiosInstance";

const Appointments = ({ navigation }) => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const getAppointments = async () => {
      try {
        const response = await axiosInstance.get(`/single-appointment`);
        if (response.status === 200) {
          const { appointment } = response.data;
          setAppointments(appointment);
        }
      } catch (error) {
        if (error.response && error.response.status === 401) {
          const { message } = error.response.data;
          Alert.alert("401", message);
        }
      }
    };
    getAppointments();
  }, []);

  const formatDate = (dateString) => {
    const [month, day, year] = dateString.split("/").map(Number);
    const date = new Date(year, month - 1, day);

    const dayOfMonth = date.getDate();
    const monthName = date.toLocaleString("default", { month: "long" });

    const suffix = (day) => {
      if (day > 3 && day < 21) return "th";
      switch (day % 10) {
        case 1:
          return "st";
        case 2:
          return "nd";
        case 3:
          return "rd";
        default:
          return "th";
      }
    };

    return `${dayOfMonth}${suffix(dayOfMonth)} ${monthName}`;
  };

  const removeSeconds = (timeString) => {
    const [time, period] = timeString.split(" ");
    const [hours, minutes] = time.split(":");
    return `${hours}:${minutes} ${period}`;
  };

  const getTimeUntilAppointment = (dateString, timeString) => {
    const [month, day, year] = dateString.split("/").map(Number);
    const [time, period] = timeString.split(" ");
    let [hours, minutes] = time.split(":").map(Number);
    if (period === "PM" && hours !== 12) {
      hours += 12;
    }
    if (period === "AM" && hours === 12) {
      hours = 0;
    }

    const appointmentDate = new Date(year, month - 1, day, hours, minutes);
    const now = new Date();
    const diff = appointmentDate - now;

    const diffMinutes = Math.floor(diff / (1000 * 60));
    const diffHours = Math.floor(diffMinutes / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffDays > 0) {
      return `in ${diffDays} day${diffDays > 1 ? "s" : ""}`;
    } else if (diffHours > 0) {
      return `in ${diffHours} hour${diffHours > 1 ? "s" : ""}`;
    } else {
      return `in ${diffMinutes} minute${diffMinutes > 1 ? "s" : ""}`;
    }
  };

  return (
    <SafeAreaView styles={styles.container}>
      <StatusBar backgroundColor="white" barStyle="dark-content" />
      <View style={styles.itemsContainer}>
        <View style={styles.arrowContainer}>
          <Pressable onPress={() => navigation.goBack()}>
            <AntDesign name="arrowleft" size={24} color="blue" />
          </Pressable>
          <Text style={styles.appointmentText}>My Appointments</Text>
        </View>
        {appointments.map((item) => (
          <View style={styles.appointmentContainer} key={item?._id}>
            <View style={styles.itemContainer}>
              <Image
                source={require("../../assets/services/zaid.jpg")}
                style={styles.image}
              />
              <View style={styles.textContainer}>
                <Text style={styles.name}>{item?.doctor.name}</Text>
                <Text>{item?.doctor.role}</Text>
              </View>
              <View style={styles.border}></View>
            </View>
            <View style={styles.dateContainer}>
              <Text>
                {getTimeUntilAppointment(item?.date, removeSeconds(item?.time))}
              </Text>
              <Text style={styles.date}>
                {formatDate(item?.date) + ", " + removeSeconds(item?.time)}
              </Text>
            </View>
          </View>
        ))}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  itemsContainer: {
    paddingTop: SIZES.height * 0.015,
  },
  appointmentContainer: {
    padding: "2%",
    paddingHorizontal: 10,
    margin: "5%",
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 15,
    height: SIZES.height * 0.25,
    width: SIZES.width * 0.8,
    shadowColor: "#000",
    marginLeft: SIZES.width * 0.09,
    marginTop: SIZES.height * 0.04,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  image: {
    width: SIZES.width * 0.2,
    height: SIZES.height * 0.11,
    borderRadius: 50,
  },
  itemContainer: {
    flexDirection: "row",
    gap: SIZES.width * 0.07,
  },
  textContainer: {
    paddingTop: SIZES.height * 0.015,
  },
  border: {
    backgroundColor: "#0BDC39",
    width: SIZES.width * 0.035,
    height: SIZES.height * 0.02,
    borderRadius: 50,
    marginTop: SIZES.height * 0.02,
  },
  name: {
    fontWeight: "bold",
    fontSize: SIZES.width * 0.055,
  },
  dateContainer: {
    paddingLeft: SIZES.width * 0.045,
    paddingTop: SIZES.height * 0.02,
  },
  date: {
    fontWeight: "bold",
    fontSize: SIZES.width * 0.05,
  },
  arrowContainer: {
    flexDirection: "row",
    paddingTop: SIZES.height * 0.045,
    gap: SIZES.width * 0.2,
    paddingLeft: "7%",
  },
  appointmentText: {
    fontSize: SIZES.width * 0.05,
  },
});

export default Appointments;
