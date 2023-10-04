import React, { useState } from "react";
import { Pressable, StyleSheet, Text } from "react-native";
import DatePicker from "react-native-date-picker";
import { colors } from "../constants/colors";

const DatePickerDialog = ({selectedDate,onChange}:{selectedDate:string,onChange:(date:Date)=>void}) => {
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  return (
    <Pressable onPress={() => setOpen(true)} style={styles.container}>
      <Text>{selectedDate ? selectedDate : "Select Date"}</Text>
      <DatePicker
        modal
        mode={"date"}
        open={open}
        date={date}
        maximumDate={new Date()}
        onConfirm={(date) => {
          setOpen(false);
          onChange(date)
        }}
        onCancel={() => {
          setOpen(false);
        }}
      />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 0,
    paddingLeft: 12,
    paddingRight: 12,
    alignItems: "center",
    height: 40,
    backgroundColor: colors.backgroundInput,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: colors.border,
    marginTop: 20,
  },
});

export default DatePickerDialog;
