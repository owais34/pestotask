import { useContext, useEffect } from "react";
import { GlobalStateContext } from "../utils/GlobalState";
import { useNavigate } from "react-router-dom";
import { LOCAL_STORAGE_KEY } from "../utils/Constants";

export default function PublicPage({ child }) {
  const [state, dispatch] = useContext(GlobalStateContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (state.isLoggedIn) navigate("/tasks");
    else {
      const localStore = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
      if (localStore && localStore.token) {
        dispatch({ type: "SET_TOKEN", payload: localStore.token ,caller : "public page"});
        navigate("/tasks")
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return child;
}
