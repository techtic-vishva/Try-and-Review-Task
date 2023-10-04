import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StyleSheet, View, Image } from "react-native";

import Home from "../screens/Home";
import { RootStackParamList, RootStackScreenProps, Routes } from "./types";
import Congratulation from "../screens/Congratulation";
import SurveyPoints from "../screens/SurveyPoints";
import Profile from "../screens/Profile";
import SurveyForm from "../screens/SurveyForm";
import { colors } from "../constants/colors";
import FlagIcon from "../../assets/images/country-flag.png";
import SearchIcon from "../../assets/images/search.png";

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator() {
  const HeaderBackground = () => {
    return <View style={headerStyles.headerBackground} />;
  };
  const HeaderRight = () => {
    return (
      <View style={headerStyles.headerRightView}>
        <Image source={SearchIcon} style={headerStyles.headerSearchIcon} />
        <Image source={FlagIcon} style={headerStyles.headerFlagIcon} />
      </View>
    );
  };
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={Routes.Home}
        component={Home}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={Routes.Congratulation}
        component={Congratulation}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={Routes.SurveyPoints}
        component={SurveyPoints}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={Routes.Profile}
        component={Profile}
        options={() => ({
          headerTransparent: true,
          headerTitle: "",
          headerShown: true,
          headerBackVisible: false,
          headerBackground: () => <HeaderBackground />,
          headerRight: () => <HeaderRight />,
        })}
      />
      <Stack.Screen
        name={Routes.SurveyForm}
        component={SurveyForm}
        options={() => ({
          headerTransparent: true,
          headerTitle: "",
          headerShown: true,
          headerBackVisible: false,
          headerBackground: () => <HeaderBackground />,
          headerRight: () => <HeaderRight />,
        })}
      />
    </Stack.Navigator>
  );
}

const headerStyles = StyleSheet.create({
  headerBackground: {
    height: "100%",
    backgroundColor: colors.app.secondary,
  },
  headerRightView: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerSearchIcon: {
    height: 20,
    width: 20,
    resizeMode: "stretch",
  },
  headerFlagIcon: {
    height: 30,
    width: 30,
    marginStart: 15,
    borderRadius: 50,
    resizeMode: "stretch",
  },
});
