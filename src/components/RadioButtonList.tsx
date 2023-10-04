import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Image,
} from "react-native";
import { colors } from "../constants/colors";
import RadioButtonActive from "../../assets/images/radio-active.png";
import RadioButtonInActive from "../../assets/images/radio-inactive.png";
import { Answers } from "../redux/root/rootSlice";
import { fonts } from "../constants/fonts";

const RadioButtonList = ({
  data,
  selected,
  onChange,
}: {
  data: Answers[];
  selected: string;
  onChange: (answer: string, id?: number) => void;
}) => {
  return (
    <View style={styles.container}>
      {data.map((item, index) => {
        const isSelected = selected === item?.answer;
        return (
          <TouchableOpacity
            key={index}
            style={styles.radioButtonRow}
            onPress={() => onChange(item?.answer, item?.id)}
          >
            <Image
              source={isSelected ? RadioButtonActive : RadioButtonInActive}
              style={styles.radioButton}
            />
            <Text style={styles.radioButtonLable}>{item?.answer}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 20,
  },
  radioButtonRow: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 16,
    marginBottom: 16,
    width: "45%",
  },
  radioButton: {
    width: 24,
    height: 24,
    borderRadius: 30,
    resizeMode: "contain",
  },
  radioButtonLable: {
    marginStart: 10,
    color: colors.black,
    fontSize: 17,
    fontFamily: fonts.MulishRegular,
  },
});
export default RadioButtonList;
