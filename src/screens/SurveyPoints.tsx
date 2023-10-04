import React from "react";
import { StatusBar, StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";

import { colors } from "../constants/colors";
import { strings } from "../constants/strings";
import { RootStackScreenProps, Routes } from "../navigation/types";
import { selectRoot } from "../redux/root/rootSlice";
import { fonts } from "../constants/fonts";

function SurveyPoints({
  navigation,
  route,
}: RootStackScreenProps<Routes.SurveyPoints>) {
  const { surveyPoints } = useSelector(selectRoot);

  return (
    <SafeAreaView style={styles.safeareaView}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.white} />
      <Text style={styles.totalOfSurveyText}>{strings.totalOfSurvey}</Text>
      <Text style={styles.totalSurveyPointsText}>{surveyPoints}</Text>
      <Text style={styles.surveyDesText}>{strings.surveysCanBeUsed}</Text>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  safeareaView: {
    flex: 1,
    alignItems: "center",
    backgroundColor: colors.white,
    paddingTop: 40,
  },
  totalOfSurveyText: {
    fontSize: 13,
    color: colors.app.secondary,
    fontFamily: fonts.MulishBold,
  },
  totalSurveyPointsText: {
    fontSize: 90,
    marginTop: -20,
    color: colors.app.primary,
    fontFamily: fonts.MulishMedium,
  },
  surveyDesText: {
    paddingHorizontal: 50,
    marginTop: 10,
    fontSize: 13,
    color: colors.app.primary,
    fontFamily: fonts.MulishRegular,
  },
});

export default SurveyPoints;
