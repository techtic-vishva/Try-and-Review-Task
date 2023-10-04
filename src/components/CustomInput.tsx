import React, { forwardRef, useState } from "react";
import {
  KeyboardTypeOptions,
  Pressable,
  StyleProp,
  StyleSheet,
  TextInput,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";

import { colors } from "../constants/colors";
import EyeOffIcon from "../../assets/images/eye-off.svg";
import EyeIcon from "../../assets/images/eye.svg";
import { fonts } from "../constants/fonts";

interface CustomInputType {
  secureTextEntry: boolean;
  placeholder: string;
  inlineImageLeft: string;
  onChangeText: (text: string) => void;
  value: string;
  returnKeyType?:
    | "none"
    | "done"
    | "search"
    | "default"
    | "go"
    | "next"
    | "send"
    | "previous";
  onBlur: () => void;
  autoFocus: boolean;
  textInputStyle: StyleProp<TextStyle>;
  isPassword: boolean;
  keyboardType: KeyboardTypeOptions | undefined;
  inputContainer?: StyleProp<ViewStyle>;
  editable: boolean;
  multiline: boolean;
  numberOfLines: number;
  maxLength: number;
  blurOnSubmit?: boolean;
  onSubmitEditing: () => void;
  onReEnterPass: (visible: boolean) => void;
  key: string;
  isEyeNotVisible: boolean;
  isReEnterTrue: boolean;
  defaultValue: string;
}

const CustomInput = forwardRef((props: Partial<CustomInputType>, ref: any) => {
  const [eyeOpen, setEyeOpen] = useState(false);
  return (
    <>
      <View style={[styles.inputContainer, props.inputContainer]}>
        <TextInput
          textAlignVertical={props.multiline ? "top" : "auto"}
          ref={ref}
          style={[styles.textInput, props.textInputStyle]}
          placeholder={props.placeholder}
          placeholderTextColor={colors.text.light}
          value={props.value}
          {...props}
          autoFocus={props.autoFocus}
          onBlur={props.onBlur}
          returnKeyType={props.returnKeyType}
          secureTextEntry={props.isPassword && !eyeOpen}
          keyboardType={props.keyboardType}
          editable={props.editable}
          multiline={props.multiline}
          numberOfLines={props.numberOfLines}
          autoCapitalize="none"
          maxLength={props.maxLength}
          blurOnSubmit={props.blurOnSubmit}
          onSubmitEditing={props.onSubmitEditing}
          key={props.key}
          defaultValue={props.defaultValue}
        />

        {props.isPassword && !props.isEyeNotVisible && (
          <Pressable
            style={styles.iconContainer}
            onPress={() => {
              setEyeOpen(!eyeOpen);
              props.isReEnterTrue &&
                props.onReEnterPass &&
                props.onReEnterPass(!eyeOpen);
            }}
          >
            {eyeOpen ? <EyeIcon /> : <EyeOffIcon />}
          </Pressable>
        )}
      </View>
    </>
  );
});

export default CustomInput;

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    padding: 0,
    paddingHorizontal: 15,
    justifyContent: "space-between",
    height: 40,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: colors.border,
    marginTop: 20,
  },
  textInput: {
    flex: 1,
    paddingVertical: 5,
    fontSize: 14,
    color: colors.black,
    fontFamily: fonts.MulishRegular,
  },
  iconContainer: {
    alignSelf: "center",
  },
});
