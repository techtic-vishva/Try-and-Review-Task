import React from "react";
import { ActivityIndicator, View, Dimensions, StyleSheet } from "react-native";

import { colors } from "../constants/colors";

const { height, width } = Dimensions.get("window");

function Loader({ isLoader }: { isLoader: boolean }) {
  return (
    <>
      {isLoader ? (
        <View style={styles.container}>
          <ActivityIndicator size="large" color={colors.white} />
        </View>
      ) : null}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    height: height,
    width: width,
    zIndex: 8,
    position: "absolute",
    justifyContent: "center",
    backgroundColor: colors.black30,
  },
});

export default Loader;
