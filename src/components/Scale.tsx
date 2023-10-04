import { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import Slider from "@react-native-community/slider";
import { colors } from "../constants/colors";
import { fonts } from "../constants/fonts";

const Scale = ({
  maximumValue,
  value,
  onChange,
}: {
  maximumValue: number;
  value: string;
  onChange: (value: number) => void;
}) => {
  return (
    <>
      <Slider
        style={styles.slider}
        value={value ? Number(value) : 0}
        onValueChange={(newValue) => onChange(newValue)}
        minimumValue={0}
        maximumValue={maximumValue}
        step={1}
        thumbTintColor={colors.orange}
        minimumTrackTintColor={colors.orange}
        maximumTrackTintColor={colors.InputText}
      />
      <Text style={styles.selectedScaleText}>{value ?? 0}</Text>
    </>
  );
};

const styles = StyleSheet.create({
  selectedScaleText: {
    color: colors.orange,
    alignSelf: "center",
    marginTop: 5,
    fontSize: 18,
    fontFamily: fonts.MulishRegular,
  },
  slider: {
    marginTop: 20,
  },
});

export default Scale;
