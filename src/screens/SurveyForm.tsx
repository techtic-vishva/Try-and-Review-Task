import { format } from "date-fns";
import React, { useEffect, useRef } from "react";
import {
  FlatList,
  Image,
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import RenderHTML from "react-native-render-html";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";

import LeftArrow from "../../assets/images/left-arrow.png";
import CheckboxGrid from "../components/CheckboxGrid";
import CustomButton from "../components/CustomButton";
import CustomInput from "../components/CustomInput";
import DatePickerDialog from "../components/DatePickerDialog";
import DropdownView from "../components/DropdownView";
import Loader from "../components/Loader";
import RadioButtonList from "../components/RadioButtonList";
import RatingBar from "../components/RatingBar";
import Scale from "../components/Scale";
import { showErrorMessage } from "../components/Toast";
import { colors } from "../constants/colors";
import { EACH_SURVEY_POINT } from "../constants/constant";
import { fonts } from "../constants/fonts";
import { strings } from "../constants/strings";
import { RootStackScreenProps, Routes } from "../navigation/types";
import { fetchSurvey, submitSurveyForm } from "../redux/root/rootActions";
import {
  QuestionData,
  QuestionObject,
  selectRoot,
  updateSurvey,
  updateSurveyPoints,
} from "../redux/root/rootSlice";

/* To check the text is html or not */
const isHTML = (text: string) => /<\/?[a-z][\s\S]*>/i.test(text);

function SurveyForm({
  navigation,
  route,
}: RootStackScreenProps<Routes.SurveyForm>) {
  const dispatch = useDispatch();
  const uid = route.params.uid;
  const { isLoading, surveys, user, isSurveySubmitted, error } =
    useSelector(selectRoot);
  const refInputs = useRef<string[]>([""]);

  useEffect(() => {
    dispatch(fetchSurvey(uid));
  }, []);

  /*-----------------------------------------------------------
  Function/Method Name : getSurveyComponet
  Creation Date : 10/04/2023
  Purpose : To render componenet according to survey answer type
  -----------------------------------------------------------*/
  const getSurveyComponet = (
    item: QuestionData,
    index: number,
    parentQuetionId?: number
  ) => {
    if (
      item?.question?.answer_type === "text" ||
      item?.question?.answer_type === "textarea"
    ) {
      return (
        <CustomInput
          defaultValue={refInputs?.current[item?.id] ?? ""}
          placeholder="Enter Text"
          inputContainer={{ backgroundColor: colors.backgroundInput }}
          onChangeText={(text) => {
            const inputs = refInputs?.current;
            inputs[item.id] = text;
          }}
        />
      );
    } else if (item?.question?.answer_type === "numeric") {
      return (
        <CustomInput
          defaultValue={refInputs?.current[item?.id] ?? ""}
          keyboardType="numeric"
          placeholder="Enter Number"
          inputContainer={{ backgroundColor: colors.backgroundInput }}
          onChangeText={(text) => {
            const inputs = refInputs?.current;
            inputs[item.id] = text;
          }}
        />
      );
    } else if (item?.question?.answer_type === "checkbox") {
      return (
        <CheckboxGrid
          onChange={(answer, id) => {
            dispatch(
              updateSurvey({
                userResponseStr: answer,
                userResponseQuestionId: id,
                userResponseArr: [],
                id: item?.id,
                originAnswer: item?.originAnswer,
                parentQuetionId: parentQuetionId,
              })
            );
          }}
          data={item?.question?.answers ?? []}
          selected={item?.userResponseStr ? [item?.userResponseStr] : []}
        />
      );
    } else if (item?.question?.answer_type === "rankingOfCriteria") {
      return (
        <CheckboxGrid
          onChange={(answer, id) => {
            var list = item?.userResponseArr?.slice() ?? [];
            if (list.includes(answer)) {
              list = list.filter((ans) => ans !== answer);
            } else {
              list.push(answer);
            }
            dispatch(
              updateSurvey({
                userResponseStr: undefined,
                userResponseQuestionId: id,
                userResponseArr: list,
                id: item?.id,
                originAnswer: item?.originAnswer,
                parentQuetionId: parentQuetionId,
              })
            );
          }}
          data={item?.question?.answers ?? []}
          selected={item?.userResponseArr ?? []}
        />
      );
    } else if (item?.question?.answer_type === "date") {
      return (
        <DatePickerDialog
          selectedDate={item.userResponseStr ?? ""}
          onChange={(date) => {
            dispatch(
              updateSurvey({
                userResponseStr: format(date, "dd/MM/yyyy"),
                userResponseQuestionId: undefined,
                userResponseArr: [],
                id: item?.id,
                originAnswer: item?.originAnswer,
                parentQuetionId: parentQuetionId,
              })
            );
          }}
        />
      );
    } else if (item?.question?.answer_type === "radio") {
      return (
        <RadioButtonList
          onChange={(answer, id) => {
            dispatch(
              updateSurvey({
                userResponseStr: answer,
                userResponseQuestionId: id,
                userResponseArr: [],
                id: item?.id,
                originAnswer: item?.originAnswer,
                parentQuetionId: parentQuetionId,
              })
            );
          }}
          data={item?.question?.answers ?? []}
          selected={item?.userResponseStr ?? ""}
        />
      );
    } else if (item?.question?.answer_type === "select") {
      return (
        <DropdownView
          onChangeText={(text, id) => {
            dispatch(
              updateSurvey({
                userResponseStr: text,
                userResponseQuestionId: id,
                userResponseArr: [],
                id: item?.id,
                originAnswer: item?.originAnswer,
                parentQuetionId: parentQuetionId,
              })
            );
          }}
          placeholder={item?.userResponseStr ?? "Select"}
          data={item?.question?.answers ?? []}
          selectedTextStyle={{
            color: colors.text.title,
          }}
          itemTextStyle={{
            color: colors.text.title,
          }}
          customDropdown={{
            backgroundColor: colors.backgroundInput,
          }}
          placeholderStyle={{ color: colors.black }}
        />
      );
    } else if (item?.question?.answer_type === "social username") {
      return (
        <CustomInput
          defaultValue={refInputs?.current[item?.id] ?? ""}
          placeholder="Enter username"
          inputContainer={{ backgroundColor: colors.backgroundInput }}
          onChangeText={(text) => {
            const inputs = refInputs?.current;
            inputs[item.id] = text;
          }}
        />
      );
    } else if (item?.question?.answer_type === "url") {
      return (
        <CustomInput
          defaultValue={refInputs?.current[item?.id] ?? ""}
          placeholder="Enter url"
          value={item?.userResponseStr}
          inputContainer={{ backgroundColor: colors.backgroundInput }}
          onChangeText={(text) => {
            const inputs = refInputs?.current;
            inputs[item.id] = text;
          }}
        />
      );
    } else if (item?.question?.answer_type === "rating") {
      return (
        <RatingBar
          rating={item?.userResponseStr ?? ""}
          onChange={(rating) => {
            dispatch(
              updateSurvey({
                userResponseStr: rating.toString(),
                userResponseQuestionId: undefined,
                userResponseArr: [],
                id: item?.id,
                originAnswer: item?.originAnswer,
                parentQuetionId: parentQuetionId,
              })
            );
          }}
        />
      );
    } else if (item?.question?.answer_type === "checkboxGrid") {
      return (
        <DropdownView
          onChangeText={(text, id) => {
            dispatch(
              updateSurvey({
                userResponseStr: text,
                userResponseQuestionId: id,
                userResponseArr: [],
                id: item?.id,
                originAnswer: item?.originAnswer,
                parentQuetionId: parentQuetionId,
              })
            );
          }}
          placeholder={item?.userResponseStr ?? "Select"}
          data={item?.question?.checklist_grid ?? []}
          selectedTextStyle={{
            color: colors.text.title,
          }}
          itemTextStyle={{
            color: colors.text.title,
          }}
          customDropdown={{
            backgroundColor: colors.backgroundInput,
          }}
          placeholderStyle={{ color: colors.black }}
          isCheckGrid={true}
        />
      );
    } else if (item?.question?.answer_type === "scale") {
      return (
        <Scale
          maximumValue={5}
          value={item?.userResponseStr ?? ""}
          onChange={(value) => {
            dispatch(
              updateSurvey({
                userResponseStr: value.toString(),
                userResponseQuestionId: undefined,
                userResponseArr: [],
                id: item?.id,
                originAnswer: item?.originAnswer,
                parentQuetionId: parentQuetionId,
              })
            );
          }}
        />
      );
    } else if (item?.question?.answer_type === "scale-10") {
      return (
        <Scale
          maximumValue={10}
          value={item?.userResponseStr ?? ""}
          onChange={(value) => {
            dispatch(
              updateSurvey({
                userResponseStr: value.toString(),
                userResponseQuestionId: undefined,
                userResponseArr: [],
                id: item?.id,
                originAnswer: item?.originAnswer,
                parentQuetionId: parentQuetionId,
              })
            );
          }}
        />
      );
    } else {
      return null;
    }
  };
  const getSubQuestions = (item: QuestionData) => {
    var list: QuestionObject[] = [];
    if (item?.children && item?.userResponseQuestionId) {
      Object.entries(item?.children).map(([key, value], index) => {
        if (
          item?.userResponseQuestionId &&
          key == item?.userResponseQuestionId.toString()
        ) {
          list = value;
        }
      });
    }
    return list ?? [];
  };

  /*-----------------------------------------------------------
  Function/Method Name : surveyTitle
  Creation Date : 10/04/2023
  Purpose : To display survey question title
  -----------------------------------------------------------*/
  const surveyTitle = (item: QuestionData) => {
    return (
      <View style={styles.surveyTitleView}>
        {isHTML(item.question.title) ? (
          <>
            <RenderHTML
              contentWidth={useWindowDimensions().width}
              source={{
                html: item.question.title,
              }}
              tagsStyles={{
                p: styles.surveyQuestionTitle,
              }}
            />
            {item.required && <Text style={styles.requiredText}>*</Text>}
          </>
        ) : (
          <>
            <Text style={styles.surveyQuestionTitle}>
              {item.question.title}
            </Text>
            {item.required && <Text style={styles.requiredText}>*</Text>}
          </>
        )}
      </View>
    );
  };

  /*-----------------------------------------------------------
  Function/Method Name : Survey
  Creation Date : 10/04/2023
  Purpose : To display survey question
  -----------------------------------------------------------*/
  const Survey = ({
    parentQuetion,
    index,
  }: {
    parentQuetion: QuestionData;
    index: number;
  }) => {
    return (
      <View>
        {surveyTitle(parentQuetion)}
        {getSurveyComponet(parentQuetion, index)}
        <FlatList
          data={getSubQuestions(parentQuetion) ?? []}
          //@ts-ignore
          renderItem={({ item, idx }: { item: QuestionData; idx: number }) => (
            <SubQuestions index={idx} item={item} key={idx} />
          )}
          contentContainerStyle={{ paddingBottom: 50 }}
        />
      </View>
    );
  };

  /*-----------------------------------------------------------
  Function/Method Name : SubQuestions
  Creation Date : 10/04/2023
  Purpose :To display survey sub question
  -----------------------------------------------------------*/
  const SubQuestions = ({
    item,
    index,
  }: {
    item: QuestionData;
    index: number;
  }) => {
    return (
      <>
        {surveyTitle(item)}
        {getSurveyComponet(item, index, item.parent_id)}
      </>
    );
  };

  /*-----------------------------------------------------------
  Function/Method Name : validateForm
  Creation Date : 10/04/2023
  Purpose :To validate survey question required data
  -----------------------------------------------------------*/
  const validateForm = () => {
    var isValidate = true;
    for (let i of surveys) {
      if (i.required) {
        if (i?.children && i.userResponseQuestionId) {
          if (
            i.question.answer_type === "text" ||
            i.question.answer_type === "textarea" ||
            i.question.answer_type === "url" ||
            i.question.answer_type === "social username" ||
            i.question.answer_type === "numeric"
          ) {
            if (!refInputs.current[i.id]) {
              isValidate = false;
            }
          } else if (!i.userResponseStr || !i.userResponseArr) {
            isValidate = false;
          } else {
            i?.children[i?.userResponseQuestionId]?.map((item) => {
              if (item?.required) {
                if (
                  item.question.answer_type === "text" ||
                  item.question.answer_type === "textarea" ||
                  item.question.answer_type === "url" ||
                  item.question.answer_type === "social username" ||
                  item.question.answer_type === "numeric"
                ) {
                  if (!refInputs.current[item.id]) {
                    isValidate = false;
                  }
                } else if (!item.userResponseStr || !item.userResponseArr) {
                  isValidate = false;
                }
              }
            });
          }
        } else if (!i.userResponseStr || !i.userResponseArr) {
          isValidate = false;
        } else {
          isValidate = true;
        }
      }
    }
    return isValidate;
  };

  const onSubmitForm = () => {
    if (validateForm()) {
      submitSurveyApiCall();
    } else {
      showErrorMessage("Please fill required details");
    }
  };

  /*-----------------------------------------------------------
  Function/Method Name : submitSurveyApiCall
  Creation Date : 10/04/2023
  Purpose :To submit survey form
  -----------------------------------------------------------*/
  const submitSurveyApiCall = () => {
    var formObject: { [key: string]: any } = {};
    for (let i of surveys) {
      if (i?.children) {
        if (
          i.question.answer_type === "text" ||
          i.question.answer_type === "textarea" ||
          i.question.answer_type === "url" ||
          i.question.answer_type === "social username" ||
          i.question.answer_type === "numeric"
        ) {
          if (refInputs.current[i.id]) {
            var objectKey = "question_" + i.id.toString();
            formObject = {
              ...formObject,
              [objectKey]: refInputs.current[i.id],
            };
          }
        } else if (i.userResponseStr || i.userResponseArr) {
          var objectKey = "question_" + i.id.toString();
          formObject = {
            ...formObject,
            [objectKey]: i.userResponseStr
              ? i.userResponseStr
              : i.userResponseArr,
          };
        }

        if (i?.userResponseQuestionId) {
          i?.children[i?.userResponseQuestionId]?.map((item) => {
            if (
              item.question.answer_type === "text" ||
              item.question.answer_type === "textarea" ||
              item.question.answer_type === "url" ||
              item.question.answer_type === "social username" ||
              item.question.answer_type === "numeric"
            ) {
              if (refInputs.current[item.id]) {
                var objectKey = "subquestion_" + item.id.toString();
                formObject = {
                  ...formObject,
                  [objectKey]: refInputs.current[item.id],
                };
              }
            } else if (item.userResponseStr || item.userResponseArr) {
              var objectKey = "subquestion_" + item.id.toString();
              formObject = {
                ...formObject,
                [objectKey]: item.userResponseStr
                  ? item.userResponseStr
                  : item.userResponseArr,
              };
            }
          });
        }
      } else if (
        i.question.answer_type === "text" ||
        i.question.answer_type === "textarea" ||
        i.question.answer_type === "url" ||
        i.question.answer_type === "social username" ||
        i.question.answer_type === "numeric"
      ) {
        if (refInputs.current[i.id]) {
          var objectKey = "question_" + i.id.toString();
          formObject = {
            ...formObject,
            [objectKey]: refInputs.current[i.id],
          };
        }
      } else if (i.userResponseStr || i.userResponseArr) {
        var objectKey = "question_" + i.id.toString();
        formObject = {
          ...formObject,
          [objectKey]: i.userResponseStr
            ? i.userResponseStr
            : i.userResponseArr,
        };
      }
    }

    dispatch(
      submitSurveyForm(
        {
          participation_form: formObject,
          address_verification_user: {
            birthday: user?.birth_day,
            parentAuthorization: "on",
            address: user?.address,
            additionalAddress: user?.additional_address,
            postalCode: user?.postal_code,
            city: user?.city,
            state: user?.state,
            district: user?.district,
            subdistrict: user?.subdistrict,
            province: user?.province,
            country: user?.country,
            phone: user?.phone,
            email: user?.email,
          },
        },
        uid
      )
    );
  };

  useEffect(() => {
    if (isSurveySubmitted) {
      dispatch(updateSurveyPoints(EACH_SURVEY_POINT));
      navigation.navigate(Routes.Congratulation);
    } else if (error) {
      showErrorMessage(error);
    }
    return;
  }, [isSurveySubmitted, error]);

  return (
    <SafeAreaView style={styles.safeareaView}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.white} />
      <Pressable
        style={styles.backContainer}
        onPress={() => navigation.goBack()}
      >
        <Image source={LeftArrow} style={styles.backIcon} />
        <View style={styles.headerContainer}>
          <Text style={styles.headerTitleText}>{strings.application}</Text>
          <Text style={styles.headerSubTitleText}>{strings.stepOne}</Text>
        </View>
      </Pressable>
      <View style={styles.container}>
        {surveys.length > 0 && (
          <FlatList
            data={surveys}
            renderItem={({
              item,
              index,
            }: {
              item: QuestionData;
              index: number;
            }) => <Survey index={index} parentQuetion={item} key={index} />}
            contentContainerStyle={{ paddingBottom: 50 }}
            ListFooterComponent={() => (
              <CustomButton
                onPress={onSubmitForm}
                title={strings.submitSurvey}
                buttonViewStyle={styles.submitButtonView}
              />
            )}
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>
      <Loader isLoader={isLoading} />
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  safeareaView: {
    flex: 1,
    backgroundColor: colors.app.light,
    paddingTop: 50,
  },
  backContainer: {
    height: 60,
    backgroundColor: colors.white,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  backIcon: {
    height: 30,
    width: 30,
    resizeMode: "contain",
  },
  headerContainer: {
    flex: 1,
    alignSelf: "center",
  },
  headerTitleText: {
    color: colors.text.title,
    fontSize: 20,
    textAlign: "center",
    fontWeight: "800",
    fontFamily: fonts.MulishBold,
  },
  headerSubTitleText: {
    color: colors.InputText,
    fontSize: 15,
    textAlign: "center",
    fontFamily: fonts.MulishMedium,
  },
  container: {
    marginTop: 20,
    backgroundColor: colors.white,
    flex: 1,
    paddingHorizontal: 20,
  },
  surveyTitleView: {
    marginTop: 20,
    flexDirection: "row",
  },
  surveyQuestionTitle: {
    color: colors.app.primary,
    fontSize: 17,
    marginVertical: 0,
    fontFamily: fonts.MulishMedium,
  },
  textAreaView: { height: 120 },
  submitButtonView: {
    marginTop: 20,
  },
  requiredText: {
    color: colors.red,
    fontSize: 17,
    marginStart: 2,
    fontFamily: fonts.MulishMedium,
  },
});

export default SurveyForm;
