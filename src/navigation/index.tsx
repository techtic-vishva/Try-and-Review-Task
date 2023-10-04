import { NavigationContainer } from "@react-navigation/native";
import { useState } from "react";
import { onIsAuthenticated } from "../core/event";
import { GlobalState } from "../core/globalState";
import AuthenticationNavigator from "./authStack";
import RootNavigator from "./rootStack";

export default function Navigation() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    GlobalState.isAuthenticated
  );

  onIsAuthenticated(setIsAuthenticated);

  let Navigator = RootNavigator;
  if (!isAuthenticated) Navigator = AuthenticationNavigator;

  return <NavigationContainer>{<Navigator />}</NavigationContainer>;
}
