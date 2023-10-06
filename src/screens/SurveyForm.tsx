import { format } from "date-fns";
import React, { useEffect, useRef, useState } from "react";
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
import RankingCriteria from "../components/RankingCriteria";
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
  updateInitialState,
  updateSurveyPoints,
} from "../redux/root/rootSlice";

/* To check the text is html or not */
const isHTML = (text: string) => /<\/?[a-z][\s\S]*>/i.test(text);

/* To check answer response type */

const checkAnswerResponseType = (value: any) => {
  if (typeof value === "string") {
    return "string";
  }
  if (Array.isArray(value)) {
    return "array";
  } else {
    return "object";
  }
};

function SurveyForm({
  navigation,
  route,
}: RootStackScreenProps<Routes.SurveyForm>) {
  const dispatch = useDispatch();
  const uid = route.params.uid;
  const { isLoading, surveys, user, isSurveySubmitted, error } =
    useSelector(selectRoot);
  const refInputs = useRef<any[]>([]);
  const [update, setUpdate] = useState(false);

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
          returnKeyType="done"
          blurOnSubmit={true}
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
            const inputs = refInputs?.current;
            inputs[item.id] = { answer: answer, id: id };
            setUpdate(!update);
          }}
          data={item?.question?.answers ?? []}
          selected={refInputs?.current[item?.id]?.answer ?? ""}
        />
      );
    } else if (item?.question?.answer_type === "rankingOfCriteria") {
      return (
        <RankingCriteria
          onChange={(answer, id) => {
            let inputs = refInputs?.current;

            if (
              inputs[item.id] &&
              inputs[item.id]?.length > 0 &&
              inputs[item.id]?.filter(
                (ans: { id: number; answer: string }) => ans?.id === id
              )?.length > 0
            ) {
              inputs[item.id] = inputs[item.id]?.filter(
                (ans: { id: number; answer: string }) => ans?.id !== id
              );
            } else {
              inputs[item.id] = [
                ...(inputs[item.id] ?? []),
                { answer: answer, id: id },
              ];
            }
            setUpdate(!update);
          }}
          data={item?.question?.answers ?? []}
          selected={refInputs?.current[item.id] ?? []}
        />
      );
    } else if (item?.question?.answer_type === "date") {
      return (
        <DatePickerDialog
          selectedDate={refInputs?.current[item.id] ?? ""}
          onChange={(date) => {
            const inputs = refInputs?.current;
            inputs[item.id] = format(date, "dd/MM/yyyy");
            setUpdate(!update);
          }}
        />
      );
    } else if (item?.question?.answer_type === "radio") {
      return (
        <RadioButtonList
          onChange={(answer, id) => {
            const inputs = refInputs?.current;
            inputs[item.id] = { answer: answer, id: id };
            setUpdate(!update);
          }}
          data={item?.question?.answers ?? []}
          selected={refInputs?.current[item?.id]?.answer ?? ""}
        />
      );
    } else if (item?.question?.answer_type === "select") {
      return (
        <DropdownView
          onChangeText={(text, id) => {
            const inputs = refInputs?.current;
            inputs[item.id] = { answer: text, id: id };
            setUpdate(!update);
          }}
          placeholder={refInputs?.current[item?.id]?.answer ?? "Select"}
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
          rating={refInputs?.current[item?.id] ?? ""}
          onChange={(rating) => {
            const inputs = refInputs?.current;
            inputs[item.id] = rating.toString();
            setUpdate(!update);
          }}
        />
      );
    } else if (item?.question?.answer_type === "checkboxGrid") {
      return (
        <DropdownView
          onChangeText={(text, id) => {
            const inputs = refInputs?.current;
            inputs[item.id] = { answer: text, id: id };
            setUpdate(!update);
          }}
          placeholder={refInputs?.current[item?.id]?.answer ?? "Select"}
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
          value={refInputs?.current[item?.id] ?? ""}
          onChange={(value) => {
            const inputs = refInputs?.current;
            inputs[item.id] = value.toString();
            setUpdate(!update);
          }}
        />
      );
    } else if (item?.question?.answer_type === "scale-10") {
      return (
        <Scale
          maximumValue={10}
          value={refInputs?.current[item?.id] ?? ""}
          onChange={(value) => {
            const inputs = refInputs?.current;
            inputs[item.id] = value.toString();
            setUpdate(!update);
          }}
        />
      );
    } else {
      return null;
    }
  };
  const getSubQuestions = (item: QuestionData) => {
    var list: QuestionObject[] = [];
    if (item?.children && refInputs?.current[item?.id]) {
      Object.entries(item?.children).map(([key, value], index) => {
        if (
          refInputs?.current[item?.id]?.id &&
          key == refInputs?.current[item?.id]?.id?.toString()
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
        if (i?.children && refInputs?.current[i?.id]?.id) {
          if (!refInputs.current[i.id]) {
            isValidate = false;
          } else {
            i?.children[refInputs?.current[i?.id]?.id]?.map((item) => {
              if (item?.required) {
                if (!refInputs.current[item.id]) {
                  isValidate = false;
                }
              }
            });
          }
        } else if (!refInputs?.current[i?.id]) {
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
        if (checkAnswerResponseType(refInputs.current[i.id]) === "string") {
          if (refInputs.current[i.id]) {
            var objectKey = "question_" + i.id.toString();
            formObject = {
              ...formObject,
              [objectKey]: refInputs.current[i.id],
            };
          }
        } else if (
          checkAnswerResponseType(refInputs.current[i.id]) === "object"
        ) {
          if (refInputs.current[i.id]) {
            var objectKey = "question_" + i.id.toString();
            formObject = {
              ...formObject,
              [objectKey]: refInputs.current[i.id]?.answer,
            };
          }
        } else if (
          checkAnswerResponseType(refInputs.current[i.id]) === "array"
        ) {
          if (refInputs.current[i.id]) {
            var objectKey = "question_" + i.id.toString();
            formObject = {
              ...formObject,
              [objectKey]: refInputs.current[i.id]?.map(
                (ans: { answer: string }) => ans?.answer
              ),
            };
          }
        }

        if (refInputs?.current[i.id]?.id) {
          i?.children[refInputs?.current[i.id]?.id]?.map((item) => {
            if (
              checkAnswerResponseType(refInputs.current[item.id]) === "string"
            ) {
              if (refInputs.current[item.id]) {
                var objectKey = "subquestion_" + item.id.toString();
                formObject = {
                  ...formObject,
                  [objectKey]: refInputs.current[item.id],
                };
              }
            } else if (
              checkAnswerResponseType(refInputs.current[i.id]) === "object"
            ) {
              var objectKey = "subquestion_" + item.id.toString();
              formObject = {
                ...formObject,
                [objectKey]: refInputs.current[item.id]?.answer,
              };
            } else if (
              checkAnswerResponseType(refInputs.current[i.id]) === "array"
            ) {
              var objectKey = "subquestion_" + item.id.toString();
              formObject = {
                ...formObject,
                [objectKey]: refInputs.current[item.id]?.map(
                  (ans: { answer: string }) => ans?.answer
                ),
              };
            }
          });
        }
      } else if (
        checkAnswerResponseType(refInputs.current[i.id]) === "string"
      ) {
        if (refInputs.current[i.id]) {
          var objectKey = "question_" + i.id.toString();
          formObject = {
            ...formObject,
            [objectKey]: refInputs.current[i.id],
          };
        }
      } else if (
        checkAnswerResponseType(refInputs.current[i.id]) === "object"
      ) {
        if (refInputs.current[i.id]) {
          var objectKey = "question_" + i.id.toString();
          formObject = {
            ...formObject,
            [objectKey]: refInputs.current[i.id]?.answer,
          };
        }
      } else if (checkAnswerResponseType(refInputs.current[i.id]) === "array") {
        if (refInputs.current[i.id]) {
          var objectKey = "question_" + i.id.toString();
          formObject = {
            ...formObject,
            [objectKey]: refInputs.current[i.id]?.map(
              (ans: { answer: string }) => ans?.answer
            ),
          };
        }
      }
    }
    dispatch(
      submitSurveyForm(
        {
          participation_form: formObject,
          address_verification_user: {
            birthday: "09/02/1988",
            address: "7 Lorong 27A* Geylang",
            postalCode: 225631,
            city: "singapore",
            state: "singapore",
            country: "Singapore",
            phone: "7203913164",
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
      dispatch(updateInitialState());
    } else if (error) {
      showErrorMessage(error);
      dispatch(updateInitialState());
    }
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
