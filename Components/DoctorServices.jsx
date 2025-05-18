import React from "react";
import {
  View,
  StyleSheet,
  Image,
  Text,
  Dimensions,
  ScrollView,
  RefreshControl,
} from "react-native";
import { services } from "../utils/data";
import { SIZES } from "../Constants/Theme";

const DoctorServices = ({ name, image }) => {
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={styles.services}>
          {services?.map((item) => (
            <View key={item.id} style={styles.itemsContainer}>
              <Image source={item.image} style={styles.image} />
              <Text style={styles.text}>{item.name}</Text>
            </View>
          ))}
        </View>
        <View style={styles.moreContainer}>
          <Text style={styles.moreText}>More</Text>
          <Image source={require("../assets/services/more.png")} />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  itemsContainer: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    gap: SIZES.width * 0.02,
    paddingTop: "5%",
  },
  services: {
    flexDirection: "row",
    gap: SIZES.width * 0.045,
    alignItems: "center",
    paddingTop: "15%",
    flexDirection: "row",
    flexWrap: "wrap",
    paddingLeft: "10%",
  },
  image: {
    width: SIZES.width * 0.24,
    height: SIZES.height * 0.12,
    borderRadius: 50,
  },
  text: {},
  moreContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingTop: "5%",
    gap: SIZES.height * 0.01,
  },
  moreText: {
    fontSize: SIZES.width * 0.06,
  },
});

export default DoctorServices;
