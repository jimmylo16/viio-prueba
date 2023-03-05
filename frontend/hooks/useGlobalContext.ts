import { globalContext } from "../context/global.context";
import { useContext } from "react";

export function useGlobalContext() {
  return useContext(globalContext);
}
