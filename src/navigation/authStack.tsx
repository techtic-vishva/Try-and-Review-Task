import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Login from "../screens/Login";
import { AuthenticationStackParamList, Routes } from "./types";

const AuthenticationStack =
  createNativeStackNavigator<AuthenticationStackParamList>();

export default function AuthenticationNavigator() {
  return (
    <AuthenticationStack.Navigator>
      <AuthenticationStack.Screen
        name={Routes.Login}
        component={Login}
        options={{ headerShown: false }}
      />
    </AuthenticationStack.Navigator>
  );
}
