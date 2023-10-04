import { ThunkAction } from "redux-thunk";
import { Action } from "redux";
import axios from "axios";

import { loginStart, loginSuccess, loginFailure } from "./authSlice";
import { RootState } from "../store";
import { apiBaseUrl } from "../apiUrls";
import { setIsAuthenticated } from "../../core/globalState";
import { storeString, TOKEN } from "../../core/storage";

export interface Credentials {
  username: string | undefined;
  password: string | undefined;
  googleId: string | undefined;
  email: string | undefined;
  firstName: string | undefined;
  lastName: string | undefined;
  facebookId: string | undefined;
  location: string | undefined;
  pictureUrl: string | undefined;
  gender: string | undefined;
  birthday: string | undefined;
  friendsTotalCount: number | undefined;
}

export const loginUser =
  (
    credentials: Partial<Credentials> | undefined,
    apiEndPoint: string
  ): ThunkAction<void, RootState, null, Action<string>> =>
    async (dispatch) => {
      dispatch(loginStart());

      // Make the login API call using Axios
      axios
        .post(apiBaseUrl + apiEndPoint, credentials, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          if (response.status === 200) {
            const user = response.data;
            storeString(TOKEN, `bearer ${user?.token}`).then(() => { });
            dispatch(loginSuccess(user));
            setIsAuthenticated(true, true);
          }
        })
        .catch((error) => {
          dispatch(loginFailure(error.response.data.message));
        });
    };
