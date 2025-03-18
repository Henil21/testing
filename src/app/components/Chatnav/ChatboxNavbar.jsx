"use client";
import { useState, useRef, useEffect } from "react";
import styles from "./navbar.module.css";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/slices/authSlice";
import { useCredits } from "../../hooks/useCredits";

const ChatboxNavbar = () => {
  const [menuActive, setMenuActive] = useState(false);
  const [activeNav, setActiveNav] = useState("#home");
  const toggleMenu = () => setMenuActive(!menuActive);
  const [popupVisible, setPopupVisible] = useState(false);
  const popupRef = useRef(null);  

  //for active links
  const pathname = usePathname();
  const dispatch = useDispatch();

  console.log(pathname);

  // Get the logged-in state and credits from Redux
  const { isAuthenticated, credits } = useSelector((state) => state.auth);

  const menuClickFunction = (link) => {
    link && setActiveNav(link);
    setMenuActive(false);
  };
  // const dispatch = useDispatch();
  const { purchaseCredits } = useCredits(dispatch);

  // Function to handle logout
  const handleLogout = () => {
    dispatch(logout()); // Dispatch the logout action to clear state and localStorage
    setPopupVisible(false); // Hide the popup after logout
  };

  const handleBuyCredits = (creditsAmount) => {
    purchaseCredits(creditsAmount); // Pass the number of credits to purchase
    setPopupVisible(false); // Close the popup
  };

  // //handle buy credits functions
  // const handleBuyCredits = () => {
  //   setPopupVisible(false)
  // }

    // Close popup if clicked outside
    useEffect(() => {
      const handleClickOutside = (event) => {
        if (popupRef.current && !popupRef.current.contains(event.target)) {
          setPopupVisible(false);  // Close the popup
        }
      };
  
      // Add event listener to detect clicks outside the popup
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        // Cleanup the event listener on unmount
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [popupVisible]);

  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <Link href="/" onClick={() => setActiveNav("/")}>
          <img src="/axamine_logo.png" alt="logo" />
        </Link>
      </div>
      <ul
        className={
          menuActive ? `${styles.links} ${styles.active}` : styles.links
        }
      >
        <li className={`${styles.link} `}>
          <Link
            href="/#benifits"
            onClick={() => menuClickFunction("#benifits")}
          >
            Benefits
          </Link>
        </li>
        <li
          className={`${styles.link} ${
            activeNav === "/chatbox" ? styles.active : ""
          }`}
        >
          <Link href="/chatbox" onClick={() => menuClickFunction("/chatbox")}>
            Chatbox
          </Link>
        </li>
        <li className={styles.link}>
          <Link href="/#about" onClick={() => menuClickFunction("#about")}>
            About us
          </Link>
        </li>
        <li className={styles.link}>
          <Link href="/#contact" onClick={() => menuClickFunction("#contact")}>
            Contact us
          </Link>
        </li>
        <Link href={"/chatbox"} onClick={() => menuClickFunction("/chatbox")}>
          <button
            className={`${styles.btn} ${styles.demoBtn} buttonWithGradient`}
          >
            Demo Request
          </button>
        </Link>
      </ul>
      <div className={styles.buttons}>
        {isAuthenticated ? (
          <button
            className={`${styles.btn} buttonWithGradientBorder`}
            onClick={() => setPopupVisible(!popupVisible)}
          >
            <p className={styles.credits}>
              Credits: <span className={styles.creditBubble}>{credits}</span>
            </p>
            {/* popup */}
            {popupVisible && (
              <div className={styles.popup} ref={popupRef}>
              <ul>
                <li
                  className={styles.popupOption}
                  onClick={() => handleBuyCredits(100)}
                >
                  Buy 100 Credits for ₹199
                </li>
                <li
                  className={styles.popupOption}
                  onClick={() => handleBuyCredits(300)}
                >
                  Buy 300 Credits for ₹499
                </li>
                <li className={styles.popupOption} onClick={handleLogout}>
                  Logout
                </li>
              </ul>
            </div>
            )}
          </button>
        ) : (
          <Link href="/signin">
            <button className={`${styles.btn} buttonWithGradientBorder`}>
              Sign In
            </button>
          </Link>
        )}
        <Link href={"/chatbox"} onClick={() => menuClickFunction("/chatbox")}>
          <button
            className={`${styles.btn} ${styles.demoBtn} buttonWithGradient`}
          >
            Demo Request
          </button>
        </Link>
      </div>
      <div
        className={
          menuActive
            ? `${styles.mobileMenu} ${styles.active}`
            : styles.mobileMenu
        }
        onClick={toggleMenu}
      >
        {menuActive ? (
          <img src="/crossIcon.png" alt="icon" />
        ) : (
          <img src="/menuIcon.png" alt="icon" />
        )}
        {/* \\\ */}
      </div>
    </nav>
  );
};

export default ChatboxNavbar;
