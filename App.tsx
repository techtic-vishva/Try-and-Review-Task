import { useCallback } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import SplashScreen from "react-native-splash-screen";
import { Provider } from "react-redux";
import { RootSiblingParent } from "react-native-root-siblings";

import useResources from "./src/hooks/useResources";
import Navigation from "./src/navigation";
import { store } from "./src/redux/store"; 

export default function App() {
  // Load Resources Required at Boot
  const isLoadingComplete = useResources();

  const onLayoutRootView = useCallback(async () => {
    if (isLoadingComplete) {
      // Show app
      setTimeout(() => {
        SplashScreen.hide();
      }, 2000);
    }
  }, [isLoadingComplete]);

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <Provider store={store}>
        <RootSiblingParent>
          <SafeAreaProvider onLayout={onLayoutRootView}>
            <Navigation />
          </SafeAreaProvider>
        </RootSiblingParent>
      </Provider>
    );
  }
}
