import "../styles/globals.css";
import "highlight.js/styles/github.css";
import { Provider, useDispatch, useSelector } from "react-redux";
import { showPrjCmd, setProjectsDisplay } from "../store/actions/projectsAction";
import { setNavBar } from "../store/actions/appAction";

import { useStore } from "../store/store";
import { AppWrapper, useAppContext } from "../context";
import { useEffect } from "react";
/*import tawkWidjet from "../utils/tawk"
*/

export default function App({ Component, pageProps }) {
  const store = useStore(pageProps.initialReduxState);
  /*useEffect(() => { tawkWidjet(); }, [])*/
  return (
    <Provider store={store}>
      <AppWrapper value={pageProps.value}>
        <ClientSideTheme />
        <Component {...pageProps} />
      </AppWrapper>
    </Provider>
  );
}

function ClientSideTheme() {
  const { globalState, setGlobalState } = useAppContext();
  const dispatch = useDispatch();

  const { display, showCmd } = useSelector((state) => state.projects);
  const { fixNavBar } = useSelector((state) => state.app);


  useEffect(() => {
    let storedTheme = JSON.parse(localStorage.getItem("Adelinked"))?.theme ?? "dark";
    let storedDisplay = JSON.parse(localStorage.getItem("Adelinked"))?.display ?? "0";
    let storedShowCmd = JSON.parse(localStorage.getItem("Adelinked"))?.showCmd ?? false;
    let storedFixNavBar = JSON.parse(localStorage.getItem("Adelinked"))?.fixNavBar ?? false;
    if (!globalState) {
      setGlobalState(storedTheme);
    }
    dispatch(setProjectsDisplay(storedDisplay));
    dispatch(showPrjCmd(storedShowCmd));
    dispatch(setNavBar(storedFixNavBar));
    document.documentElement.className = storedTheme || "dark";

  }, []);

  return null;
}