/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */
import { NativeStackScreenProps } from "@react-navigation/native-stack";

export enum Routes {
  Login = "Login",
  Home = "Home",
  Congratulation = "Congratulation",
  SurveyPoints = "SurveyPoints",
  Profile = "Profile",
  SurveyForm = "SurveyForm",
}

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export type RootStackParamList = {
  Home: undefined;
  Congratulation: undefined;
  SurveyPoints: undefined;
  Profile: undefined;
  SurveyForm: { uid: string };
};

export type AuthenticationStackParamList = {
  Login: undefined;
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, Screen>;

export type AuthenticationTabScreenProps<
  Screen extends keyof AuthenticationStackParamList
> = NativeStackScreenProps<AuthenticationStackParamList, Screen>;
