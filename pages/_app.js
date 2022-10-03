import { SessionProvider } from "next-auth/react";
import "../styles/globals.css";
import { Provider } from "react-redux";
import { useStore } from "../store/store";
import { AppWrapper } from "../context";
import tawkWidjet from "../utils/tawk"
import { useEffect } from "react";
export default function App({ Component, pageProps }) {
  const store = useStore(pageProps.initialReduxState);
  useEffect(() => { tawkWidjet(); }, [])
  return (
    <Provider store={store}>
      <SessionProvider session={pageProps.session}>
        <AppWrapper value={pageProps.value}>
          <Component {...pageProps} />
        </AppWrapper>
      </SessionProvider>
    </Provider>
  );
}
