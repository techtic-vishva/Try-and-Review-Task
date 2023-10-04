import React from "react";
import {
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSelector } from "react-redux";

import ProgressBar from "react-native-progress/Bar";
import { SafeAreaView } from "react-native-safe-area-context";
import Completion from "../../assets/images/completion.png";
import Avatar from "../../assets/images/avatar.png";
import Surveys from "../../assets/images/edit.png";
import Email from "../../assets/images/email.png";
import Phone from "../../assets/images/phone.png";
import Photos from "../../assets/images/photos.png";
import Picture from "../../assets/images/picture.png";
import Play from "../../assets/images/play.png";
import Polls from "../../assets/images/polls.png";
import Survery from "../../assets/images/survery.png";
import User from "../../assets/images/user.png";
import Videos from "../../assets/images/video.png";
import Loader from "../components/Loader";
import { colors } from "../constants/colors";
import { fonts } from "../constants/fonts";
import { strings } from "../constants/strings";
import { RootStackScreenProps, Routes } from "../navigation/types";
import { selectRoot } from "../redux/root/rootSlice";
import CustomButton from "../components/CustomButton";
import { setIsAuthenticated } from "../core/globalState";

function Profile({ navigation, route }: RootStackScreenProps<Routes.Profile>) {
  const { isLoading, error, user, surveyUIDs } = useSelector(selectRoot);

  if (isLoading && !user)
    return (
      <>
        <Loader isLoader={true} />
      </>
    );
  return (
    <SafeAreaView style={styles.safeareaView}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.darkGreen} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 50 }}
      >
        <View style={styles.profileContainer}>
          <Text style={styles.commonText}>{strings.myProfile}</Text>

          <View style={styles.profileDetailMainContainer}>
            <Image
              source={user?.pictures ? { uri: user?.pictures } : Avatar}
              style={styles.badgesImage}
            />
            <View style={styles.profileDetailContainer}>
              <Text style={styles.nameText}>
                {user?.first_name + " " + user?.last_name}
              </Text>
              <Text style={styles.usernameText}>{user?.username}</Text>
              <ProgressBar
                progress={0.7}
                width={300}
                height={10}
                borderRadius={20}
                borderWidth={2}
                borderColor={colors.black30}
                color={colors.royalBlue}
                style={{
                  marginTop: 12,
                  width: "100%",
                }}
              />
              <View style={styles.profileCompletionContainer}>
                <Text style={styles.profileCompletionText}>
                  80% {strings.profileCompletion}
                </Text>
                <Image
                  source={Completion}
                  style={styles.profileCompletionImage}
                />
              </View>
            </View>
          </View>
        </View>
        <View style={styles.profileVerifyMainContainer}>
          <View style={styles.profileVerifyContainer}>
            <Image source={Email} style={styles.verifyImage} />
            <Text style={styles.verifyCommonText}>{strings.verifyEmail}</Text>
          </View>
          <View style={styles.profileVerifyContainer}>
            <Image source={Phone} style={styles.verifyImage} />
            <Text style={styles.verifyCommonText}>
              {strings.verifyPhoneNumber}
            </Text>
          </View>

          <View style={styles.profileVerifyContainer}>
            <Image source={User} style={styles.verifyImage} />
            <Text style={styles.verifyCommonText}>{strings.viewProfile}</Text>
          </View>
        </View>
        <View style={styles.divider} />

        <View style={styles.commonContainer}>
          <Text style={styles.commonText}>{strings.myContributions}</Text>
          <View style={styles.contributionContainer}>
            <View style={styles.contributionItemContainer}>
              <Text style={styles.unlockText}>
                {user?._embedded?.aggregations?.count_reviews ?? 0}
              </Text>
              <Text style={styles.contributionItemTitleText}>
                {strings.surveys}
              </Text>
              <Image source={Surveys} style={styles.contributionImage} />
            </View>
            <View style={styles.contributionItemContainer}>
              <Text style={styles.unlockText}>
                {user?._embedded?.aggregations?.count_images ?? 0}
              </Text>
              <Text style={styles.contributionItemTitleText}>
                {strings.pictures}
              </Text>
              <Image source={Picture} style={styles.contributionImage} />
            </View>
            <View style={styles.contributionItemContainer}>
              <Text style={styles.unlockText}>
                {user?._embedded?.aggregations?.count_videos ?? 0}
              </Text>
              <Text style={styles.contributionItemTitleText}>
                {strings.videos}
              </Text>
              <Image source={Videos} style={styles.contributionImage} />
            </View>
          </View>
        </View>
        <View style={styles.divider} />

        <View style={styles.commonContainer}>
          <Text style={styles.commonText}>{strings.myBadges}</Text>
          <Text style={styles.unlockText}>{strings.unlockBadges}</Text>

          <View style={styles.badgesContainer}>
            <View style={styles.badgesItemContainer}>
              <Image source={Survery} style={styles.badgesImage} />
              <Text style={styles.unlockText}>{strings.surveys}</Text>
            </View>
            <View style={styles.badgesItemContainer}>
              <Image source={Polls} style={styles.badgesImage} />
              <Text style={styles.unlockText}>{strings.polls}</Text>
            </View>
            <View style={styles.badgesItemContainer}>
              <Image source={Photos} style={styles.badgesImage} />
              <Text style={styles.unlockText}>{strings.pictures}</Text>
            </View>
            <View style={styles.badgesItemContainer}>
              <Image source={Play} style={styles.badgesImage} />
              <Text style={styles.unlockText}>{strings.videos}</Text>
            </View>
          </View>
        </View>
        <View style={styles.divider} />
        <CustomButton
          onPress={() => setIsAuthenticated(false, true)}
          title="Logout"
          textStyle={styles.logoutButtonText}
          button={styles.logoutButton}
          buttonViewStyle={styles.logoutButtonView}
        />
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  safeareaView: {
    flex: 1,
    backgroundColor: colors.white,
    paddingTop: 70,
  },
  commonText: {
    fontSize: 14,
    color: colors.text.darkBlue,
    fontFamily: fonts.MulishBold,
    fontWeight: "500",
  },
  profileContainer: {
    paddingHorizontal: 30,
  },
  profileDetailMainContainer: {
    flexDirection: "row",
    marginTop: 10,
  },
  profileDetailContainer: {
    marginStart: 20,
    flex: 1,
  },
  nameText: {
    fontSize: 16,
    color: colors.text.darkBlue,
    fontFamily: fonts.MulishBold,
  },
  usernameText: {
    fontSize: 12,
    marginStart: 8,
    marginTop: 3,
    fontFamily: fonts.MulishRegular,
    color: colors.text.light,
  },
  profileCompletionText: {
    fontSize: 10,
    marginTop: 5,
    marginStart: 5,
    marginEnd: 10,
    color: colors.text.light,
    fontFamily: fonts.MulishRegular,
  },
  profileCompletionContainer: {
    flexDirection: "row",
    marginTop: 3,
  },
  profileCompletionImage: {
    height: 20,
    width: 20,
    resizeMode: "contain",
  },
  profileVerifyMainContainer: {
    flexDirection: "row",
    marginHorizontal: 7,
    marginTop: 20,
  },
  profileVerifyContainer: {
    flex: 1,
    flexDirection: "row",
    paddingVertical: 13,
    borderWidth: 1,
    justifyContent: "center",
    marginHorizontal: 3,
    borderColor: colors.border,
    backgroundColor: colors.app.secondary,
    borderRadius: 5,
  },
  verifyImage: {
    height: 12,
    width: 14,
    resizeMode: "contain",
  },
  verifyCommonText: {
    fontSize: 9,
    marginStart: 5,
    color: colors.text.title,
    fontFamily: fonts.MulishRegular,
  },
  commonContainer: {
    paddingHorizontal: 30,
  },

  unlockText: {
    fontSize: 14,
    marginTop: 10,
    color: colors.text.lightBlue,
    fontFamily: fonts.MulishRegular,
  },
  badgesContainer: {
    flexDirection: "row",
    marginTop: 30,
  },
  badgesItemContainer: {
    alignItems: "center",
    marginEnd: 30,
  },
  badgesImage: {
    height: 45,
    width: 45,
    borderRadius: 100,
    resizeMode: "stretch",
  },
  contributionContainer: {
    flexDirection: "row",
    alignContent: "center",
    marginTop: 20,
  },
  contributionItemContainer: {
    alignItems: "center",
    flex: 1,
    marginBottom: 10,
  },
  contributionItemTitleText: {
    fontSize: 12,
    marginTop: 6,
    marginBottom: 20,
    color: colors.text.light,
    fontFamily: fonts.MulishRegular,
  },
  contributionImage: {
    height: 30,
    width: 30,
    resizeMode: "contain",
  },
  divider: {
    height: 2,
    width: "100%",
    marginTop: 25,
    marginBottom: 30,
    backgroundColor: colors.divider,
  },
  logoutButton: {
    backgroundColor: "transparent",
    borderColor: colors.text.darkBlue,
    borderWidth: 1,
    borderRadius: 30,
  },
  logoutButtonView: {
    width: "25%",
  },
  logoutButtonText: {
    color: colors.app.primary,
  },
});

export default Profile;
