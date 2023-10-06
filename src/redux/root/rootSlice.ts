import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '../store';

export type Answers = {
    id: number,
    answer: string,
    visible: boolean
}
export type Question = {
    title: string,
    answer_type: string,
    required: boolean,
    answers: Answers[],
    checklist_grid: { title: string }[]

}
export type QuestionObject = {
    id: number,
    required: boolean,
    triggers?: any
    question: Question,
    parent_id: number
    originAnswer: number
}
export type QuestionData = QuestionObject & {
    children?: { [key: string]: QuestionObject[] } | undefined
}

export type User = {
    phoneVerified: boolean,
    emailVerified: boolean,
    referral_code: number,
    username: string,
    first_name: string,
    last_name: string,
    country: string,
    city: string,
    state: string,
    gender: string,
    birth_day: string,
    language: string,
    phone: string,
    address: string,
    additional_address: string,
    postal_code: string,
    email: string,
    district: string,
    subdistrict: string,
    province: string,
    pictures: string
    _embedded: {
        aggregations: {
            count_campaigns_Applied: number,
            count_reviews: number,
            count_images: number,
            count_videos: number,
            count_logins: number,
            count_campaign_being_tester: number,
            fb_user_friends: number,
            fb_username: string,
            ig_user_friends: number,
            ig_username: string
        },
    }
}
interface RootStates {
    user: User | null,
    surveyUIDs: string[],
    isLoading: boolean;
    error: string | null;
    surveys: QuestionData[],
    surveyPoints: number,
    isSurveySubmitted: boolean
}

const initialState: RootStates = {
    user: null,
    isLoading: false,
    error: null,
    surveyUIDs: ['651fddaf220bc4.21715590', '651fddb851fa47.37498351', '651fc3d0508511.84269239', '650db838123a4', '610a238e664c2', '60e6d3395efbe', '63c03b1fa8931', '5f4cd14f75ec6', '5dfade14e1c05'],
    surveys: [],
    surveyPoints: 0,
    isSurveySubmitted: false

};

const rootSlice = createSlice({
    name: 'root',
    initialState,
    reducers: {
        fetchProfileStart: (state) => {
            state.isLoading = true;
            state.error = null;
        },
        fetchProfileSuccess: (state, action: PayloadAction<User>) => {
            state.isLoading = false;
            state.user = action.payload;
        },
        fetchProfileFailure: (state, action: PayloadAction<string>) => {
            state.isLoading = false;
            state.error = action.payload;
        },
        submitSurveyStart: (state) => {
            state.isLoading = true;
            state.error = null;
        },
        submitSurveySuccess: (state, action: PayloadAction<boolean>) => {
            state.isLoading = false;
            state.isSurveySubmitted = action.payload;
            state.error = null;
        },
        submitSurveyFailure: (state, action: PayloadAction<string>) => {
            state.isLoading = false;
            state.error = action.payload;
            state.isSurveySubmitted = false;
        },
        fetchSurveyStart: (state) => {
            state.isLoading = true;
            state.error = null;
            state.surveys = []
        },
        fetchSurveySuccess: (state, action: PayloadAction<QuestionData[]>) => {
            state.isLoading = false;
            state.surveys = action.payload;
        },
        fetchSurveyFailure: (state, action: PayloadAction<string>) => {
            state.isLoading = false;
            state.error = action.payload;
        },

        updateSurveyPoints: (state, action: PayloadAction<number>) => {
            /* To update the survey points */
            state.surveyPoints += action.payload
        },
        updateInitialState: (state) => {
            state.error = null
            state.isSurveySubmitted = false;
            state.isLoading = false;


        }


    },
});

export const { fetchProfileStart, fetchProfileSuccess, fetchProfileFailure, fetchSurveyStart, fetchSurveySuccess, fetchSurveyFailure, updateSurveyPoints, submitSurveyStart, submitSurveyFailure, submitSurveySuccess, updateInitialState } = rootSlice.actions;

export default rootSlice.reducer;

// Create a selector to access root state
export const selectRoot = (state: RootState) => state.root;