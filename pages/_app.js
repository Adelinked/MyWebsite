import "../styles/globals.css";
import "highlight.js/styles/github.css";

import { Provider } from "react-redux";
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

  useEffect(() => {
    let storedTheme = localStorage.getItem("theme");
    document.documentElement.className = storedTheme || "dark";
    if (!globalState) {
      setGlobalState(storedTheme);
    }
  }, []);

  return null;
}