import React from "react";
import { Image, StatusBar, StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import Star from "../../assets/images/star.png";
import CustomButton from "../components/CustomButton";
import { colors } from "../constants/colors";
import { fonts } from "../constants/fonts";
import { strings } from "../constants/strings";
import { RootStackScreenProps, Routes } from "../navigation/types";

function Congratulation({
  navigation,
  route,
}: RootStackScreenProps<Routes.Congratulation>) {
  return (
    <SafeAreaView style={styles.safeareaView}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={colors.app.secondary}
      />
      <Image source={Star} style={styles.image} />
      <Text style={styles.congratulationText}>{strings.congratulations}</Text>
      <Text style={styles.disYouKnowText}>{strings.didYouKnowThat}</Text>
      <CustomButton
        onPress={() => navigation.pop(2)}
        title={strings.backToHompage}
        buttonViewStyle={styles.backToHomeButtonView}
        button={styles.backToHomeButton}
        textStyle={styles.backToHomeText}
      />
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  safeareaView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.app.secondary,
  },
  image: {
    height: 160,
    width: 160,
    resizeMode: "contain",
  },
  congratulationText: {
    marginTop: 35,
    color: colors.text.lightBlue,
    fontWeight: "600",
    fontSize: 33,
    fontFamily: fonts.MulishBold,
  },
  disYouKnowText: {
    marginTop: 30,
    color: colors.text.darkBlue,
    fontWeight: "300",
    fontSize: 18,
    textAlign: "center",
    fontFamily: fonts.MulishRegular,
  },
  backToHomeButtonView: {
    marginTop: 70,
    paddingHorizontal: 100,
  },
  backToHomeButton: {
    backgroundColor: colors.text.lightBlue,
    height: 44,
    borderRadius: 0,
  },
  backToHomeText: {
    fontSize: 15,
    fontFamily: fonts.MulishMedium,
  },
});

export default Congratulation;
