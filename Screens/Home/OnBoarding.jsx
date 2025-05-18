import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StatusBar,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import AppIntroSlider from "react-native-app-intro-slider";
import { COLORS, SIZES } from "../../Constants/Theme";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { slides } from "../../utils/data";

export default function OnBoarding({ navigation }) {
  const [showHomePage, setShowHomePage] = useState(true);

  const buttonLabel = (label) => {
    return (
      <View style={styles.buttonContainer}>
        <StatusBar backgroundColor={"white"} barStyle={"dark-content"} />
        <Text style={styles.buttonLabel}>{label}</Text>
      </View>
    );
  };

  if (showHomePage) {
    return (
      <SafeAreaView style={styles.container}>
        <AppIntroSlider
          data={slides}
          renderItem={({ item }) => {
            return (
              <View style={styles.introSlideContainer}>
                <Image
                  source={item.image}
                  style={styles.introSlideImage}
                  // resizeMode="contain"
                />
                <Text style={styles.introSlideTitle}>{item.title}</Text>
                <Text style={styles.introSlideDescription}>
                  {item.description}
                </Text>
              </View>
            );
          }}
          activeDotStyle={styles.activeDot}
          dotStyle={styles.inactiveDot}
          showSkipButton
          renderNextButton={() => buttonLabel("Next")}
          renderSkipButton={() => buttonLabel("Skip")}
          renderDoneButton={() => buttonLabel("Done")}
          onDone={() => {
            navigation.navigate("Home");
          }}
        />
      </SafeAreaView>
    );
  }

  return <></>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
    backgroundColor: "white",
  },
  buttonContainer: {
    height: "100%",
  },
  buttonLabel: {
    color: COLORS.black,
    fontWeight: "600",
    fontSize: SIZES.h4,
  },
  introSlideContainer: {
    flex: 1,
    alignItems: "center",
    backgroundColor: COLORS.white,
  },
  introSlideImage: {
    width: SIZES.width,
    height: SIZES.height * 0.6,
  },
  introSlideTitle: {
    fontWeight: "bold",
    color: COLORS.title,
    fontSize: SIZES.h1,
    color: COLORS.black,
  },
  introSlideDescription: {
    textAlign: "center",
    paddingTop: 5,
    color: COLORS.black,
    width: SIZES.width * 0.7,
    fontSize: 15,
  },
  activeDot: {
    backgroundColor: COLORS.blue,
    width: 30,
  },
  inactiveDot: {
    backgroundColor: COLORS.white,
    width: 30,
  },
});
