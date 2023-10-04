import React, { useState } from "react";
import {
  StyleProp,
  StyleSheet,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import DropDownIcon from "../../assets/images/down-arrow.svg";
import { colors } from "../constants/colors";
import { fonts } from "../constants/fonts";

interface DropdownProps {
  data: any;
  onChangeText: (text: string, label?: any) => void;
  renderLeftIcon?: any;
  customDropdown?: StyleProp<ViewStyle>;
  selectedTextStyle?: StyleProp<TextStyle>;
  itemTextStyle?: StyleProp<TextStyle>;
  selectedTextProps?: any;
  placeholder?: string;
  minHeight?: number;
  isRight?: boolean;
  placeholderStyle?: any;
  isCheckGrid?: boolean;
}
const DropdownView = (props: DropdownProps) => {
  const [value, setValue] = useState(null);

  return (
    <Dropdown
      style={[styles.dropdown, props.customDropdown]}
      placeholderStyle={[styles.placeholderStyle, props.placeholderStyle]}
      selectedTextStyle={[styles.selectedTextStyle, props.selectedTextStyle]}
      data={props.data}
      labelField={!props.isCheckGrid ? "answer" : "title"}
      valueField={!props.isCheckGrid ? "id" : "title"}
      placeholder={props?.placeholder ? props.placeholder : "Select"}
      value={value}
      showsVerticalScrollIndicator={false}
      onChange={(item: any) => {
        setValue(!props.isCheckGrid ? item?.answer : item?.title);
        if (!props.isCheckGrid) props.onChangeText(item?.answer, item?.id);
        else props.onChangeText(item?.title, item?.title);
      }}
      maxHeight={200}
      minHeight={props.minHeight}
      selectedTextProps={props.selectedTextProps}
      itemContainerStyle={styles.itemContainerStyle}
      itemTextStyle={[styles.itemTextStyle, props.itemTextStyle]}
      renderRightIcon={() =>
        !props.isRight ? (
          <View>
            <DropDownIcon />
          </View>
        ) : null
      }
      renderLeftIcon={props.renderLeftIcon}
    />
  );
};

export default DropdownView;

export const styles = StyleSheet.create({
  dropdown: {
    height: 50,
    borderColor: colors.textBoxBoarder,
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginTop: 8,
    backgroundColor: colors.backgroundInput,
  },
  icon: {
    marginRight: 5,
  },
  placeholderStyle: {
    flex: 1,
    paddingVertical: 5,
    fontSize: 14,
    color: colors.InputText,
    fontWeight: "400",
  },
  selectedTextStyle: {
    flex: 1,
    paddingVertical: 5,
    fontSize: 14,
    color: colors.InputText,
    fontFamily: fonts.MulishRegular,
  },
  itemContainerStyle: {
    height: 55,
    backgroundColor: colors.backgroundInput,
  },
  itemTextStyle: {
    flex: 1,
    fontSize: 14,
    color: colors.InputText,
    fontFamily: fonts.MulishRegular,
  },
});
