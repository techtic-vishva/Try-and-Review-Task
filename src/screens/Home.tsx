import React, { useEffect } from "react";
import {
  Image,
  ImageBackground,
  Platform,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";

import DummyProduct from "../../assets/images/dummy-product.png";
import HomeBackground from "../../assets/images/home-bg.png";
import Rating from "../../assets/images/rating.png";
import Loader from "../components/Loader";
import { colors } from "../constants/colors";
import { fonts } from "../constants/fonts";
import { strings } from "../constants/strings";
import { RootStackScreenProps, Routes } from "../navigation/types";
import { fetchUserProfile } from "../redux/root/rootActions";
import { selectRoot } from "../redux/root/rootSlice";
import { EACH_SURVEY_POINT } from "../constants/constant";

function Home({ navigation, route }: RootStackScreenProps<Routes.Home>) {
  const dispatch = useDispatch();
  const { isLoading, error, user, surveyUIDs } = useSelector(selectRoot);

  /*-----------------------------------------------------------
  Function/Method Name : fetchUserProfile
  Creation Date : 10/04/2023
  Purpose : User can fetch profile details
  -----------------------------------------------------------*/
  useEffect(() => {
    dispatch(fetchUserProfile());
  }, []);

  if (isLoading && !user)
    return (
      <>
        <Loader isLoader={true} />
      </>
    );
  return (
    <View>
      <StatusBar barStyle="dark-content" backgroundColor={colors.statusColor} />
      <ImageBackground source={HomeBackground} style={styles.imageBackground}>
        <View style={styles.headerContainer}>
          <Text style={styles.usernameText}>Hi {user?.first_name},</Text>
          <Text style={styles.headerDes}>
            Complete minimum 10 surveys and quizzes {`&`} stand a change to win
            1,000 points this month!
          </Text>
        </View>

        <View style={styles.container}>
          <ScrollView>
            <Pressable
              style={styles.surveyCountContainer}
              onPress={() => navigation.navigate(Routes.SurveyPoints)}
            >
              <Text style={styles.surveyCountText}>15</Text>
              <View>
                <View style={styles.surveyTextContainer}>
                  <Text style={styles.surveyText}>{strings.surveys}</Text>
                </View>
                <Text style={styles.surveyTotalCountText}>/100</Text>
              </View>
            </Pressable>
            <Text style={styles.surveyDescText}>
              {strings.surveysCanBeUsed}
            </Text>

            <Pressable
              onPress={() => navigation.navigate(Routes.Profile)}
              style={styles.surveyFeatureResContainer}
            >
              <Image source={DummyProduct} style={styles.productFeatureImage} />
              <Text style={styles.surveyFeatureResText}>
                {strings.featuredRespondantFor}
              </Text>
            </Pressable>
            <Text style={styles.reviewCommunityText}>
              {strings.tryandReviewCommunity}
            </Text>
            <View style={styles.productContainer}>
              {surveyUIDs.map((item, index) => (
                <Pressable
                  onPress={() =>
                    navigation.navigate(Routes.SurveyForm, { uid: item })
                  }
                  key={index}
                  style={styles.productListContainer}
                >
                  <Image source={DummyProduct} style={styles.ratingImage} />
                  <Image source={Rating} style={styles.productImage} />
                  <Text style={styles.surveyPointsText}>
                    {EACH_SURVEY_POINT} Points
                  </Text>
                </Pressable>
              ))}
            </View>
          </ScrollView>
        </View>
      </ImageBackground>
    </View>
  );
}
const styles = StyleSheet.create({
  imageBackground: {
    height: "100%",
    width: "100%",
    paddingTop: Platform.OS == "ios" ? 50 : 0,
  },
  headerContainer: {
    margin: 20,
  },
  usernameText: {
    color: colors.white,
    fontSize: 15,
    fontFamily: fonts.MulishExtraBold,
  },
  headerDes: {
    color: colors.white,
    marginTop: 10,
    fontSize: 13,
    fontFamily: fonts.MulishBold,
  },
  container: {
    flex: 1,
    backgroundColor: colors.white,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    marginTop: 10,
    alignItems: "center",
  },
  surveyCountContainer: {
    flexDirection: "row",
    marginTop: 40,
    alignSelf: "center",
  },
  surveyCountText: {
    fontSize: 45,
    color: colors.text.darkBlue,
    fontFamily: fonts.MulishRegular,
  },
  surveyTextContainer: {
    marginTop: 12,
    marginHorizontal: 4,
    color: colors.white,
    alignItems: "center",
    borderRadius: 20,
    paddingBottom: 1,
    backgroundColor: colors.royalBlue,
    fontFamily: fonts.MulishRegular,
  },
  surveyTotalCountText: {
    fontSize: 27,
    marginTop: 8,
    color: colors.text.title,
    fontFamily: fonts.MulishRegular,
  },

  surveyText: {
    color: colors.white,
    fontSize: 9,
    fontFamily: fonts.MulishBold,
  },

  surveyDescText: {
    paddingHorizontal: 50,
    marginVertical: 20,
    fontSize: 13,
    color: colors.text.lightBlue,
    fontFamily: fonts.MulishRegular,
  },

  surveyFeatureResContainer: {
    height: 95,
    backgroundColor: colors.lightPink,
    alignSelf: "center",
    marginHorizontal: 30,
    borderRadius: 20,
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  surveyFeatureResText: {
    flex: 1,
    color: colors.text.light,
    fontSize: 13,
    marginHorizontal: 10,
    fontFamily: fonts.MulishBold,
  },
  reviewCommunityText: {
    marginTop: 45,
    fontSize: 14,
    marginHorizontal: 25,
    marginBottom: 20,
    color: colors.text.lightBlue,
    fontFamily: fonts.MulishBold,
  },
  productContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginLeft: 17,
  },
  productListContainer: {
    flexBasis: "21%",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 20,
    marginStart: 5,
    marginEnd: 5,
    height: 80,
  },
  ratingImage: {
    height: "100%",
    width: "100%",
    borderRadius: 30,
    marginStart: 10,
  },
  productFeatureImage: {
    height: "100%",
    width: 110,
    borderRadius: 20,
    marginEnd: 10,
  },
  productImage: {
    position: "absolute",
    left: -1,
    resizeMode: "contain",
    top: -15,
    height: 30,
    width: 30,
  },

  surveyPointsText: {
    fontSize: 14,
    color: colors.text.lightBlue,
    fontWeight: "600",
    marginTop: 5,
    textAlign: "center",
    justifyContent: "center",
    fontFamily: fonts.MulishExtraBold,
    marginStart: 10,
  },
});

export default Home;
