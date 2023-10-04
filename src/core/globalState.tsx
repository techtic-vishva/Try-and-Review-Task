import { emitIsAuthenticated } from "./event";
import { IS_AUTHENTICATED, readString, storeString } from "./storage";

/*-----------------------------------------------------------
  Function/Method Name : GlobalState
  Creation Date : 10/01/2023
  Purpose : Initial state
  -----------------------------------------------------------*/
export const GlobalState: {
  isAuthenticated: boolean;
} = {
  isAuthenticated: false,
};
/*-----------------------------------------------------------
  Function/Method Name : initializationComplete
  Creation Date : 10/01/2023
  Purpose : Restore from Persisted Storage
  -----------------------------------------------------------*/
export const initializationComplete = (async () => {
  GlobalState.isAuthenticated = (await readString(IS_AUTHENTICATED)) === "true";
})();

/*-----------------------------------------------------------
  Function/Method Name : setIsAuthenticated
  Creation Date : 10/01/2023
  Purpose : To store and emit authentication state 
  -----------------------------------------------------------*/
export async function setIsAuthenticated(
  value: boolean,
  persist: boolean = true
) {
  GlobalState.isAuthenticated = value;
  if (persist) {
    await storeString(IS_AUTHENTICATED, value.toString());
  }
  emitIsAuthenticated(value);
}
