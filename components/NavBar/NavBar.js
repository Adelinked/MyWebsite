import { useEffect, useState, useRef, useMemo } from "react";
import Link from "next/link";
import styles from "./NavBar.module.css";
import { useLocalStorageValue } from "@mantine/hooks";
import { useAppContext } from "../../context";
import { useDispatch, useSelector } from "react-redux";
import AppLoading from "../../components/AppLoading";
import { setAppLoading, setNavBar } from "../../store/actions/appAction";
import { useRouter } from "next/router";
import { FaMoon, FaSun, FaBars, FaTimes } from "react-icons/fa";
import { ImPushpin } from "react-icons/im";
import throttle from "lodash.throttle";

const NavBar = () => {
  const navbarRef = useRef(null);
  const verticalNavbarRef = useRef(null);
  const vertNavbarFreeRef = useRef(null);
  const scrollpos = useRef(0);

  const [show, setShow] = useState(true);
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
  const { loading, fixNavBar } = useSelector((state) => state.app);
  const handleScroll = () => {
    const currentScrollPos = window.scrollY;
    const navbar = navbarRef.current;
    if (navbar == null || scrollpos == null) return;
    if (scrollpos.current > currentScrollPos) {
      navbar.style.top = "0";
    } else {
      navbar.style.top = "-120px";
    }
    scrollpos.current = currentScrollPos;
  };

  const throttledScrollHandler = useMemo(
    () => throttle(handleScroll, 300),
    [scrollpos]
  );

  useEffect(() => {
    document.addEventListener("scroll", throttledScrollHandler);
    return function cleanup() {
      throttledScrollHandler?.cancel();
      document.removeEventListener("scroll", throttledScrollHandler);
    };
  });

  const openVertNav = () => {
    const navbar = navbarRef.current;
    const verticalNavBar = verticalNavbarRef.current;
    const vertNavbarFree = vertNavbarFreeRef.current;
    if (show) {
      verticalNavBar.style.right = "0";
      if (!fixNavBar)
        navbar.style.top = "-12vh";
      navbar.addEventListener('transitionend', function handler() {
        navbar.removeEventListener('transitionend', handler);
        setTimeout(() => {
          vertNavbarFree.style.opacity = "0.75";
        }, 300);
      });

    } else {
      verticalNavBar.style.right = "100%";
      navbar.style.top = "0";
      vertNavbarFree.style.opacity = "0";
    }
    setShow((show) => !show);
  };
  const { query } = useRouter();
  useEffect(() => {
    dispatch(setAppLoading(false));
  }, [query]);
  return (
    <>
      <nav className={styles.navbar} id="navbar" ref={navbarRef}>
        <span
          className={styles.themeSwitch}
          title={`Switch to ${titleTheme}`}
          onClick={switchTheme}
        >
          {theme === "light-theme" ? <FaMoon /> : <FaSun />}
        </span>
        <Link href="/">
          <a
            onClick={() => {
              dispatch(setAppLoading(true));
            }}
            title="Home page"
          >
            Home
          </a>
        </Link>
        <Link href="/about">
          <a
            onClick={() => {
              dispatch(setAppLoading(true));
            }}
            title="About me"
          >
            About me
          </a>
        </Link>
        <Link href="/projects">
          <a
            onClick={() => {
              dispatch(setAppLoading(true));
            }}
            title="Projects"
          >
            Projects
          </a>
        </Link>
        {process.env.NODE_ENV !== "production" && (
          <Link href="/blog">
            <a
              onClick={() => {
                dispatch(setAppLoading(true));
              }}
              title="Blog"
            >
              Blog
            </a>
          </Link>
        )}

        <div className={styles.cartLogOpen}>
          <span className={fixNavBar ? styles.navBarPinFix : styles.navBarPin}>
            <ImPushpin
              onClick={() => {
                dispatch(setNavBar(!fixNavBar));
              }}
              title={fixNavBar ? "Free navigation bar" : "Fix navigation bar"}
            />
          </span>
          <div className={styles.loginContainer}></div>

          <span className={styles.openNav} onClick={openVertNav}>
            <FaBars />
          </span>
        </div>
      </nav>
      <nav className={styles.vertNavContainer} ref={verticalNavbarRef}>
        <div className={styles.vertNavbar} id="vertNavbar" >
          <span className={styles.closeNav} onClick={openVertNav}>
            <FaTimes />
          </span>
          <span
            className={styles.themeSwitch}
            title={`Switch to ${titleTheme}`}
            onClick={switchTheme}
          >
            {theme === "light-theme" ? <FaMoon /> : <FaSun />}
          </span>
          <div className={styles.loginContainer}></div>
          <Link href="/">
            <a
              style={{ marginTop: "30px" }}
              onClick={() => {
                dispatch(setAppLoading(true));
              }}
              title="Home page"
            >
              Home
            </a>
          </Link>
          <Link href="/about">
            <a
              onClick={() => {
                dispatch(setAppLoading(true));
              }}
              title="About"
            >
              About
            </a>
          </Link>
          <Link href="/projects">
            <a
              onClick={() => {
                dispatch(setAppLoading(true));
              }}
              title="Projects"
            >
              Projects
            </a>
          </Link>
          {process.env.NODE_ENV !== "production" && (
            <Link href="/blog">
              <a
                onClick={() => {
                  dispatch(setAppLoading(true));
                }}
                title="Blog"
              >
                Blog
              </a>
            </Link>
          )}
        </div>
        <div className={styles.vertNavbarFree} onClick={openVertNav} ref={vertNavbarFreeRef} ></div>
      </nav>
      {loading && <AppLoading />}
    </>
  );
};


export default NavBar;