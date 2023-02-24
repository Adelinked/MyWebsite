import { useEffect, useState, useRef, useMemo } from "react";
import Link from "next/link";
import styles from "./NavBar.module.css";
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
  const dispatch = useDispatch();
  const { globalState, setGlobalState } = useAppContext();

  useEffect(() => {
    document.body.style.overflowY = "auto";
  }, []);

  const switchTheme = () => {
    setGlobalState((oldTheme) => (oldTheme === "dark" ? "light" : "dark"));

    const newTheme = globalState === "dark" ? "light" : "dark";
    document.documentElement.className = newTheme;
    localStorage.setItem("theme", newTheme);
  };
  let theme = globalState;
  const titleTheme = theme === "dark" ? "light" : "dark";
  const { loading, fixNavBar } = useSelector((state) => state.app);

  const handleScroll = () => {
    const currentScrollPos = window.scrollY;
    const navbar = navbarRef.current;
    if (fixNavBar) return;
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
    [scrollpos, fixNavBar]
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
      navbar.addEventListener("transitionend", function handler() {
        navbar.removeEventListener("transitionend", handler);
        setTimeout(() => {
          vertNavbarFree.style.opacity = "0.75";
        }, 200);
      });
      document.body.style.overflowY = "hidden";
    } else {
      document.body.style.overflowY = "auto";
      verticalNavBar.style.right = "100%";
      navbar.style.top = "0";
      vertNavbarFree.style.opacity = "0";
    }
    setShow((show) => !show);
  };
  const { query, pathname } = useRouter();

  const links =
    process.env.NODE_ENV == "development"
      ? ["home", "about", "projects", "blog"]
      : ["home", "about", "projects"];

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
          {theme === "light" ? <FaMoon /> : <FaSun />}
        </span>
        <>
          {links.map((i) => (
            <Link href={`${i == "home" ? "/" : `/${i}`}`} key={i}>
              <a
                className={`${(
                  i == "home"
                    ? pathname === "/"
                    : pathname.startsWith("/" + i)
                )
                  ? " activeNavBarLink"
                  : " navBarLink"
                  }`}
                onClick={() => {
                  dispatch(setAppLoading(true));
                }}
              >
                {i}
              </a>
            </Link>
          ))}
        </>

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
        <div className={styles.vertNavbar} id="vertNavbar">
          <span className={styles.closeNav} onClick={openVertNav}>
            <FaTimes />
          </span>
          <span
            className={styles.themeSwitch}
            title={`Switch to ${titleTheme}`}
            onClick={switchTheme}
          >
            {theme === "light" ? <FaMoon /> : <FaSun />}
          </span>
          <div className={styles.loginContainer}></div>
          <>
            {links.map((i) => (
              <Link href={`${i == "home" ? "/" : `/${i}`}`} key={i}>
                <a
                  className={`${(
                    i == "home"
                      ? pathname === "/"
                      : pathname.startsWith("/" + i)
                  )
                    ? " activeVertNavBarLink"
                    : " "
                    }`}
                  onClick={() => {
                    dispatch(setAppLoading(true));
                  }}
                >
                  {i}
                </a>
              </Link>
            ))}
          </>
        </div>
        <div
          className={styles.vertNavbarFree}
          onClick={openVertNav}
          ref={vertNavbarFreeRef}
        ></div>
      </nav>
      {loading && <AppLoading />}
    </>
  );
};

export default NavBar;
