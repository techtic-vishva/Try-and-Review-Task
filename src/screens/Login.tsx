import {
  GoogleSignin,
  statusCodes,
} from "@react-native-google-signin/google-signin";
import React, { useEffect, useState } from "react";
import {
  Image,
  ImageBackground,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";

import Flag from "../../assets/images/country-flag.png";
import Google from "../../assets/images/google.png";
import CustomButton from "../components/CustomButton";
import CustomInput from "../components/CustomInput";
import Loader from "../components/Loader";
import { showErrorMessage } from "../components/Toast";
import { colors } from "../constants/colors";
import { fonts } from "../constants/fonts";
import { strings } from "../constants/strings";
import { AuthenticationTabScreenProps, Routes } from "../navigation/types";
import { googleLogin, login } from "../redux/apiUrls";
import { Credentials, loginUser } from "../redux/auth/authActions";
import { selectAuth } from "../redux/auth/authSlice";
import Background from "../../assets/images/login-bg.png";

function Login({
  navigation,
  route,
}: AuthenticationTabScreenProps<Routes.Login>) {
  const [userName, setUserName] = useState<string>();
  const [password, setPassword] = useState<string>();

  const dispatch = useDispatch();
  const { isLoading, error, user } = useSelector(selectAuth);
  GoogleSignin.configure();

  /*-----------------------------------------------------------
  Function/Method Name : handleLogin
  Creation Date : 10/03/2023
  Purpose : User can perform login action
  -----------------------------------------------------------*/
  const handleLogin = () => {
    // @ts-ignore
    dispatch(loginUser({ username: userName, password: password }, login));
  };

  /*-----------------------------------------------------------
  Function/Method Name : loginValidate
  Creation Date : 10/02/2023
  Purpose : User login validation check
  -----------------------------------------------------------*/
  const loginValidate = () => {
    if (!userName) {
      showErrorMessage(strings.errorUsername);
    } else if (!password) {
      showErrorMessage(strings.errorPassword);
    } else {
      handleLogin();
    }
  };

  const onLogin = () => {
    loginValidate();
  };

  /*-----------------------------------------------------------
  Function/Method Name : onGoogleLogin
  Creation Date : 10/03/2023
  Purpose : User can perform Google social login
  -----------------------------------------------------------*/
  const onGoogleLogin = async () => {
    GoogleSignin.signOut();
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      const getToken = await GoogleSignin.getTokens();
      if (userInfo.user) {
        callGoogleApi({
          googleId: userInfo.user.id,
          email: userInfo.user.email,
          firstName: userInfo.user.givenName ?? "",
          lastName: userInfo.user.familyName ?? "",
        });
      }
    } catch (error: any) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log("Google Cancel ", { error });
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log("Google In Progress ", { error });
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log("Google Not Available ", { error });
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
  };

  /*-----------------------------------------------------------
  Function/Method Name : callGoogleApi
  Creation Date : 10/03/2023
  Purpose : User can perform Google social login Api
  -----------------------------------------------------------*/
  const callGoogleApi = async (credentials: Partial<Credentials>) => {
    // @ts-ignore
    dispatch(loginUser(credentials, googleLogin));
  };

  useEffect(() => {
    if (error) {
      showErrorMessage(error);
    }
  }, [error]);

  return (
    <SafeAreaView style={styles.safeareaView}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={colors.app.secondary}
      />

      <View style={styles.container}>
        <Image
          resizeMode="stretch"
          source={Background}
          style={styles.background}
        />

        <Image source={Flag} style={styles.flagIcon} />
        <View style={styles.loginContainer}>
          <View style={styles.loginView}>
            <Text style={styles.loginText}>{strings.login}</Text>
            <CustomInput
              placeholder={strings.email}
              keyboardType="email-address"
              returnKeyType="next"
              value={userName}
              inputContainer={{ backgroundColor: colors.backgroundInput }}
              onChangeText={(text) => setUserName(text)}
            />
            <CustomInput
              placeholder={strings.password}
              isPassword={true}
              value={password}
              returnKeyType="done"
              inputContainer={{ backgroundColor: colors.backgroundInput }}
              onChangeText={(text) => setPassword(text)}
            />
            <Text style={styles.forgotPass}>{strings.forgotPassword}</Text>
            <CustomButton
              onPress={onLogin}
              title={strings.signIn}
              buttonViewStyle={styles.signInButton}
            />
            <Text style={styles.orText}>{strings.or}</Text>
            <>
              <CustomButton
                button={styles.orangeLightButton}
                textStyle={styles.fbButtonText}
                isLeftIcon={true}
                leftIcon={
                  <Image source={Google} style={styles.buttonLeftIcon} />
                }
                title={strings.signInViaGoogle}
                buttonViewStyle={styles.fbButton}
                onPress={onGoogleLogin}
              />
            </>
          </View>
          <Text style={styles.dontHaveAccountText}>
            {strings.dontHaveAccount}
            <Text style={styles.signUpText}>{strings.signUp}</Text>
          </Text>
        </View>

        <Text style={styles.allRightsReservedText}>
          {strings.allRightReserved}
        </Text>
        <Loader isLoader={isLoading} />
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: colors.white,
  },
  background: {
    height: "100%",
    width: "100%",
    position: "absolute",
  },
  safeareaView: {
    flex: 1,
    backgroundColor: colors.app.secondary,
  },
  loginContainer: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  flagIcon: {
    height: 35,
    width: 35,
    resizeMode: "contain",
    borderRadius: 50,
    borderColor: colors.border,
    borderWidth: 1,
    marginTop: 20,
    marginEnd: 20,
    alignSelf: "flex-end",
  },
  loginView: {
    width: "90%",
    backgroundColor: colors.white,
    borderRadius: 10,
    borderWidth: 2,
    marginTop: -20,
    borderColor: colors.border,
    padding: 20,
  },
  loginText: {
    color: colors.app.primary,
    fontSize: 20,
    textAlign: "center",
    fontWeight: "800",
    fontFamily: fonts.MulishBold,
  },
  forgotPass: {
    marginTop: 20,
    color: colors.orange,
    fontSize: 11,
    fontFamily: fonts.MulishBold,
    textDecorationLine: "underline",
  },
  signInButton: {
    marginTop: 20,
  },
  buttonLeftIcon: {
    marginRight: 10,
    height: 20,
    width: 20,
    resizeMode: "contain",
  },
  orText: {
    textAlign: "center",
    marginTop: 10,
    fontSize: 11,
    color: colors.text.subTitle,
    fontFamily: fonts.MulishMedium,
  },
  fbButton: {
    marginTop: 10,
  },
  fbButtonText: {
    color: colors.orange,
  },
  orangeLightButton: {
    backgroundColor: colors.lightOrange,
    borderColor: colors.orange,
    borderWidth: 1,
  },
  dontHaveAccountText: {
    marginTop: 20,
    textAlign: "center",
    textAlignVertical: "center",
    fontFamily: fonts.MulishMedium,
    color: colors.text.subTitle,
  },
  signUpText: {
    color: colors.orange,
    fontWeight: "800",
    fontFamily: fonts.MulishSemiBold,
  },
  allRightsReservedText: {
    position: "absolute",
    fontFamily: fonts.MulishMedium,
    color: colors.text.subTitle,
    bottom: 20,
  },
});

export default Login;
