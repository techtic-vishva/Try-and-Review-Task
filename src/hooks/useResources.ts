import { useEffect, useState } from "react";

import { initializationComplete } from "../core/globalState";

export default function useResources() {
  const [isLoadingComplete, setLoadingComplete] = useState(false);
  /*-----------------------------------------------------------
  Function/Method Name : loadResourcesAndDataAsync
  Creation Date : 10/01/2023
  Purpose : Load any resources or data that we need prior to rendering the app
  -----------------------------------------------------------*/
  useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        await Promise.all([initializationComplete]);
      } catch (e) {
        console.warn(e);
      } finally {
        setLoadingComplete(true);
      }
    }

    loadResourcesAndDataAsync();
  }, []);

  return isLoadingComplete;
}
