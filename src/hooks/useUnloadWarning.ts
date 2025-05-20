import { useEffect } from "react";

export default function useUnloadWarning(condition: Boolean = true) {
  useEffect(() => {
    if (!condition) return;

    const listener = (e: BeforeUnloadEvent) => {
      e.preventDefault();
    };

    window.addEventListener("beforeunload", listener);

    return () => window.removeEventListener("beforeunload", listener);
  }, [condition]);
}
