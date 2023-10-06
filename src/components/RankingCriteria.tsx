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
import CheckboxActive from "../../assets/images/checkboc-active.png";
import CheckboxInActive from "../../assets/images/checkbox-inactive.png";
import { Answers } from "../redux/root/rootSlice";
import { fonts } from "../constants/fonts";

const RankingCriteria = ({
  data,
  selected,
  onChange,
}: {
  data: Answers[];
  selected: { id: number; answer: string }[];
  onChange: (answer: string, id: number) => void;
}) => {
  return (
    <View style={styles.container}>
      {data.map((item, index) => {
        const isSelected = selected.some((i) => i?.id === item?.id);
        return (
          <TouchableOpacity
            key={index}
            style={styles.checkboxRow}
            onPress={() => onChange(item?.answer, item?.id)}
          >
            <Image
              source={isSelected ? CheckboxActive : CheckboxInActive}
              style={styles.checkbox}
            />
            <Text style={styles.checkboxLable}>{item?.answer}</Text>
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
  checkboxRow: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 16,
    marginBottom: 16,
    width: "45%",
  },
  checkbox: {
    width: 24,
    height: 24,
  },
  checkboxLable: {
    marginStart: 10,
    color: colors.black,
    fontSize: 17,
    fontFamily: fonts.MulishRegular,
  },
});
export default RankingCriteria;
