import { useContext, useEffect } from "react";
import { GlobalStateContext } from "../utils/GlobalState";
import { useNavigate } from "react-router-dom";
import { LOCAL_STORAGE_KEY } from "../utils/Constants";

function PrivatePage({ child }) {
  const [state, dispatch] = useContext(GlobalStateContext);
  const navigate = useNavigate();

  const loadAuthOrRedirect = () => {
    const localStore = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
      if (localStore && localStore.token ) {
        dispatch({ type: "SET_TOKEN", payload: localStore.token ,caller:"private page"});
      } else {
        navigate("/");
      }
  }


  useEffect(() => {
    if (!state.isLoggedIn) {
      loadAuthOrRedirect()
    } else if(!state.token) {
      loadAuthOrRedirect()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (child);
}

export default PrivatePage;
