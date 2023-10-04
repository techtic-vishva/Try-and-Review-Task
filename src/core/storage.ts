import AsyncStorage from "@react-native-async-storage/async-storage";

export const IS_AUTHENTICATED = "@IS_AUTHENTICATED";
export const TOKEN = "@TOKEN";

/*-----------------------------------------------------------
  Function/Method Name : storeString
  Creation Date : 10/01/2023
  Purpose : To store data in local storage 
  -----------------------------------------------------------*/
export async function storeString(key: string, value: string) {
  await AsyncStorage.setItem(key, value);
}
/*-----------------------------------------------------------
  Function/Method Name : readString
  Creation Date : 10/01/2023
  Purpose : To get data from local storage 
  -----------------------------------------------------------*/
export async function readString(key: string) {
  return AsyncStorage.getItem(key);
}
/*-----------------------------------------------------------
  Function/Method Name : deleteString
  Creation Date : 10/01/2023
  Purpose : To delete data from local storage 
  -----------------------------------------------------------*/
export async function deleteString(key: string) {
  return AsyncStorage.removeItem(key);
}
