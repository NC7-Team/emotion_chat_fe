import { useEffect } from "react";

import useForceUpdate from "./useForceUpdate";

import { perMessageStore } from "../stores/PerMessageStore";

export default function usePerMessageStore() {
  const forceUpdate = useForceUpdate();

  useEffect(() => {
    perMessageStore.subscribe(forceUpdate);

    return () => perMessageStore.unsubscribe(forceUpdate);
  }, [forceUpdate]);

  return perMessageStore;
}
