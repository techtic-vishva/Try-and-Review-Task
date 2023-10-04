import Toast from "react-native-root-toast";
import { colors } from "../constants/colors";

/*-----------------------------------------------------------
  Function/Method Name : showSuccessMessage
  Creation Date : 10/01/2023
  Purpose : To show success message
  -----------------------------------------------------------*/
export function showSuccessMessage(message: string) {
  Toast.show(message, {
    duration: Toast.durations.SHORT,
    position: Toast.positions.BOTTOM,
    shadow: true,
    hideOnPress: true,
    backgroundColor: "green",
    textStyle: {
      color: colors.white,
      fontSize: 16,
    },
    containerStyle: { borderRadius: 20, padding: 10 },
    delay: 0,

    onShow: () => {
      // calls on toast\`s appear animation start
    },
    onShown: () => {
      // calls on toast\`s appear animation end.
    },
    onHide: () => {
      // calls on toast\`s hide animation start.
    },
    onHidden: () => {
      // calls on toast\`s hide animation end.
    },
  });
}
/*-----------------------------------------------------------
  Function/Method Name : showErrorMessage
  Creation Date : 10/01/2023
  Purpose : To show error message
  -----------------------------------------------------------*/
export function showErrorMessage(message: string) {
  Toast.show(message, {
    duration: Toast.durations.SHORT,
    position: Toast.positions.BOTTOM,
    animation: true,
    hideOnPress: true,
    backgroundColor: "red",
    delay: 0,
    containerStyle: { borderRadius: 20, padding: 10 },
    textStyle: {
      color: colors.white,
      fontSize: 16,
    },
    onShow: () => {
      // calls on toast\`s appear animation start
    },
    onShown: () => {
      // calls on toast\`s appear animation end.
    },
    onHide: () => {
      // calls on toast\`s hide animation start.
    },
    onHidden: () => {
      // calls on toast\`s hide animation end.
    },
  });
}
