"use client"
import { useEffect, useState } from "react";
import styles from "./scrollUp.module.css"

const ScrollUp = () => {

    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
      const toggleVisibility = () => {
        if (window.scrollY > 300) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
        }
      };
  
      window.addEventListener('scroll', toggleVisibility);
  
      return () => {
        window.removeEventListener('scroll', toggleVisibility);
      };
    }, []);
  
    const scrollToTop = () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    };

  return (
    <button className={isVisible ? `${styles.scrollUpBtn} ${styles.scrollVisible}` : styles.scrollUpBtn} onClick={scrollToTop}>
            <img src="/upArrow.svg" alt="image" />
    </button>
  )
}

export default ScrollUp