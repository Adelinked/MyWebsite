import { useEffect, useState } from "react";
import "font-awesome/css/font-awesome.min.css";
import Link from "next/link";
import styles from "./NavBar.module.css";
import { useLocalStorageValue } from "@mantine/hooks";
import { useAppContext } from "../context";
import { useDispatch, useSelector } from "react-redux";
import { UserNav } from "../components/User/UserNav";
import UserLogin from "../components/User/UserLogin";
import { useSession } from "next-auth/react";
import AppLoading from "../components/AppLoading";
import { setAppLoading, setNavBar } from "../store/actions/appAction";
import { useRouter } from "next/router";

export default () => {
  const { data: session } = useSession();

  const cart = useSelector((state) => state.cart);
  const [logged, setLogged] = useState(false);
  const [show, setShow] = useState(true);
  const [scrollpos, setScrollpos] = useState();
  const [themeLocal, setThemeLocal] = useLocalStorageValue({
    key: "theme",
  });

  const dispatch = useDispatch();
  const { globalState, setGlobalState } = useAppContext();

  useEffect(() => {
    setGlobalState((themeLocal && themeLocal.theme) ?? "dark-theme");
  }, []);

  useEffect(() => {
    document.documentElement.className = theme;
    setThemeLocal({ theme: theme });
  }, [globalState]);

  const switchTheme = () => {
    setGlobalState((oldTheme) =>
      oldTheme === "dark-theme" ? "light-theme" : "dark-theme"
    );
  };
  let theme = globalState;
  const titleTheme = theme === "dark-theme" ? "light-theme" : "dark-theme";
  useEffect(() => {
    document.addEventListener("scroll", handleScroll);
    return function cleanup() {
      document.removeEventListener("scroll", handleScroll);
    };
  });
  const handleScroll = (e) => {
    const currentScrollPos = window.scrollY;

    if (!fixNavBar) {
      if (scrollpos > currentScrollPos) {
        document.getElementById("navbar").style.top = 0;
      } else {
        document.getElementById("navbar").style.top = "-12vh";
      }
    }

    setScrollpos(currentScrollPos);
  };
  const openVertNav = () => {
    if (show) {
      document.getElementById("vertNavbar").style.right = "0";
      document.getElementById("navbar").style.top = "-12vh";
    } else {
      document.getElementById("vertNavbar").style.right = "100%";
      document.getElementById("navbar").style.top = "0";
    }

    setShow((show) => !show);
  };
  const { query } = useRouter();
  useEffect(() => {
    dispatch(setAppLoading(false));
  }, [query]);

  const { loading, fixNavBar } = useSelector((state) => state.app);

  const pinStyle = {
    color: fixNavBar ? "var(--color-font)" : "var(--color-font-light)",
  };

  return (
    <>
      <nav className={styles.navbar} id="navbar">
        <span
          className={styles.themeSwitch}
          title={`Switch to ${titleTheme}`}
          onClick={switchTheme}
        >
          {theme === "light-theme" ? (
            <i className="fa fa-moon-o"></i>
          ) : (
            <i className="fa fa-sun-o"></i>
          )}
        </span>
        <Link href="/">
          <a
            onClick={() => {
              dispatch(setAppLoading(true));
            }}
          >
            Home
          </a>
        </Link>
        <Link href="/about">
          <a
            onClick={() => {
              dispatch(setAppLoading(true));
            }}
          >
            About me
          </a>
        </Link>
        <Link href="/projects">
          <a
            onClick={() => {
              dispatch(setAppLoading(true));
            }}
          >
            Projects
          </a>
        </Link>
        {session && (
          <Link href="/checkout">
            <a
              onClick={() => {
                dispatch(setAppLoading(true));
              }}
            >
              Checkout
            </a>
          </Link>
        )}

        <div className={styles.cartLogOpen}>
          <span className={fixNavBar ? styles.navBarPinFix : styles.navBarPin}>
            <i
              className="fa fa-thumb-tack"
              onClick={() => {
                dispatch(setNavBar(!fixNavBar));
              }}
              title={fixNavBar ? "Free navigation bar" : "Fix navigation bar"}
            ></i>
          </span>
          <div className={styles.loginContainer}></div>

          <span className={styles.openNav} onClick={openVertNav}>
            <i className="fa fa-bars"></i>
          </span>
        </div>
      </nav>
      <nav className={styles.vertNavbar} id="vertNavbar">
        <span className={styles.closeNav} onClick={openVertNav}>
          <i className="fa fa-close"></i>
        </span>
        <span
          className={styles.themeSwitch}
          title={`Switch to ${titleTheme}`}
          onClick={switchTheme}
        >
          {theme === "light-theme" ? (
            <i className="fa fa-moon-o"></i>
          ) : (
            <i className="fa fa-sun-o"></i>
          )}
        </span>
        <div className={styles.loginContainer}></div>
        <Link href="/">
          <a
            style={{ marginTop: "30px" }}
            onClick={() => {
              dispatch(setAppLoading(true));
            }}
          >
            Home
          </a>
        </Link>
        <Link href="/about">
          <a
            onClick={() => {
              dispatch(setAppLoading(true));
            }}
          >
            About
          </a>
        </Link>
        <Link href="/projects">
          <a
            onClick={() => {
              dispatch(setAppLoading(true));
            }}
          >
            Projects
          </a>
        </Link>
        {session && (
          <Link href="/checkout">
            <a
              onClick={() => {
                dispatch(setAppLoading(true));
              }}
            >
              Checkout
            </a>
          </Link>
        )}
      </nav>

      {loading && <AppLoading />}
    </>
  );
};
