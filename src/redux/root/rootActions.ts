import { ThunkAction } from "redux-thunk";
import { Action } from "redux";
import axios from "axios";

import {
    fetchProfileStart,
    fetchProfileSuccess,
    fetchProfileFailure,
    fetchSurveyStart,
    fetchSurveySuccess,
    fetchSurveyFailure,
    submitSurveyFailure,
    submitSurveyStart,
    submitSurveySuccess,
} from "./rootSlice";
import { RootState } from "../store";
import { apiBaseUrl, getSurvey, getUserProfile } from "../apiUrls";
import { readString, TOKEN } from "../../core/storage";
import { setIsAuthenticated } from "../../core/globalState";
import { showErrorMessage } from "../../components/Toast";

/* For getting logged in user token */
const getToken = async () => {
    const token = await readString(TOKEN);
    return token ?? "";
};

/* Make the user profile API call using Axios */
export const fetchUserProfile =
    (): ThunkAction<void, RootState, null, Action<string>> =>
        async (dispatch) => {
            dispatch(fetchProfileStart());

            axios
                .get(apiBaseUrl + getUserProfile, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: await getToken(),
                    },
                })
                .then((response) => {
                    if (response.status === 200) {
                        dispatch(fetchProfileSuccess(response.data));
                    }
                })
                .catch((error) => {
                    if (error.response.data.code === 401) {
                        setIsAuthenticated(false, true);
                        showErrorMessage(error.response.data.message);
                    } else {
                        dispatch(fetchProfileFailure(error.response.data.message));
                    }
                });
        };

/*  Make the fetch survey question API call using Axios */
export const fetchSurvey =
    (uid: string): ThunkAction<void, RootState, null, Action<string>> =>
        async (dispatch) => {
            dispatch(fetchSurveyStart());
            axios
                .get(apiBaseUrl + `${getSurvey + uid}`, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: await getToken(),
                    },
                })
                .then((response) => {
                    if (response.status === 200) {
                        dispatch(fetchSurveySuccess(response.data));
                    }
                })
                .catch((error) => {
                    if (error.response.data.code === 401) {
                        setIsAuthenticated(false, true);
                        showErrorMessage(error.response.data.message);
                    } else {
                        dispatch(fetchSurveyFailure(error.response.data.message));
                    }
                });
        };

/* Make the submit survey API call using Axios */
export const submitSurveyForm =
    (
        formData: any,
        uid: string
    ): ThunkAction<void, RootState, null, Action<string>> =>
        async (dispatch) => {
            dispatch(submitSurveyStart());
            axios
                .post(apiBaseUrl + `${getSurvey + uid}`, formData, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: await getToken(),
                    },
                })
                .then((response) => {
                    if (response.status === 200) {
                        dispatch(submitSurveySuccess(true));
                    }
                })
                .catch((error) => {
                    if (error.response.data.code === 401) {
                        setIsAuthenticated(false, true);
                        showErrorMessage(error.response.data.message);
                    } else {
                        dispatch(submitSurveyFailure(error.response.data.message));
                    }
                });
        };
