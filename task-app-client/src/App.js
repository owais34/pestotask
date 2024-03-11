import { RouterProvider } from "react-router-dom";
import { router } from "./utils/Router";
import Loading from "./pages/Loading";
import { useContext} from "react";
import { GlobalStateContext } from "./utils/GlobalState";

function App() {
  // eslint-disable-next-line no-unused-vars
  const [state, dispatch] = useContext(GlobalStateContext);

  return <RouterProvider router={router} fallbackElement={<Loading />} />;
}

export default App;
