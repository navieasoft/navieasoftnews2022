import { useContext } from "react";
import { Context } from "./storeProvider";

const useStore = () => {
  return useContext(Context);
};

export default useStore;
