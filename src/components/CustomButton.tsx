import React from "react";
import {
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  ViewStyle,
  View,
  TextStyle,
} from "react-native";

import { colors } from "../constants/colors";
import { fonts } from "../constants/fonts";

export default function ({
  onPress,
  title,
  disabled,
  buttonViewStyle,
  textStyle,
  button,
  isLeftIcon,
  leftIcon,
}: {
  onPress?: () => void;
  title: string;
  disabled?: boolean;
  buttonViewStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  button?: StyleProp<ViewStyle>;
  isLeftIcon?: boolean;
  leftIcon?: any;
}) {
  return (
    <Pressable
      style={[styles.button, buttonViewStyle]}
      onPress={onPress}
      disabled={disabled}
    >
      <View style={[styles.buttonView, button]}>
        {isLeftIcon && leftIcon && <>{leftIcon}</>}
        <Text style={[styles.buttonText, textStyle]}>{title}</Text>
      </View>
    </Pressable>
  );
}
const styles = StyleSheet.create({
  button: {
    height: 44,
    width: "100%",
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },
  buttonView: {
    height: 44,
    width: "100%",
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.orange,
    flexDirection: "row",
  },
  buttonText: {
    fontSize: 12,
    textAlign: "center",
    color: colors.white,
    fontFamily: fonts.MulishBold,
  },
});
