import { useSyncExternalStore } from "react";

const MOBILE_BREAKPOINT = 768;

function subscribe(callback: () => void) {
  window.addEventListener("resize", callback);
  return () => {
    window.removeEventListener("resize", callback);
  };
}

function getSnapshot() {
  if (typeof window === "undefined") {
    return false;
  }
  return window.innerWidth < MOBILE_BREAKPOINT;
}

function getServerSnapshot() {
  return false; // On the server, we can assume it's not mobile
}

export function useIsMobile() {
  // useSyncExternalStore is the recommended way to subscribe to external
  // data sources like window size, which avoids unnecessary re-renders.
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
