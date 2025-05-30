import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./HomeNav.module.css";
import MulearnBrand from "../../Dashboard/assets/MulearnBrand";

const HomeNav = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobileView, setIsMobileView] = useState(window.innerWidth <= 768);
  const refreshToken = localStorage.getItem("refreshToken");

  useEffect(() => {
    const handleResize = () => setIsMobileView(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const navItems = [
    { label: "Home", onClick: () => navigate("/") },
    { label: "Mentorship", onClick: () => navigate("/dashboard/search?activetab=mentors") },
    { label: "Learning Paths", onClick: () => navigate("/dashboard/mujourney") },
    { label: "Learning Circles", onClick: () => navigate("/dashboard/learningcircle") },
    { label: "Why μLearn", onClick: () => window.open("https://www.youtube.com/watch?v=qEILjuB7oPk", "_blank") },
    { label: "Visit the Old Site", onClick: () => window.open("https://mulearn.org", "_blank") },
  ];

  return (
    <div className={styles.navWrapper}>
      {/* DESKTOP NAV */}
      {!isMobileView && (
        <motion.nav
          className={styles.desktopNav}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className={styles.logo}>
            <MulearnBrand />
          </div>

          <ul className={styles.navLinks}>
            {navItems.map((item, index) => (
              <li key={index} className="cursor-pointer" onClick={item.onClick}>
                {item.label}
              </li>
            ))}
          </ul>

          <div className={styles.navButtons}>
            <button
              className={styles.loginBtn}
              onClick={() => navigate(refreshToken ? "/dashboard/home" : "/login")}
            >
              {refreshToken ? "Dashboard" : "Login"}
            </button>
          </div>
        </motion.nav>
      )}

      {/* HAMBURGER ICON */}
      {isMobileView && !isMenuOpen && (
        <div className={styles.hamburger} onClick={() => setIsMenuOpen(true)}>
          <span />
          <span />
          <span />
        </div>
      )}

      {/* MOBILE MENU WITH ANIMATION */}
      <AnimatePresence>
        {isMobileView && isMenuOpen && (
          <motion.div
            className={styles.mobileMenu}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          >
            <button className={styles.closeBtn} onClick={() => setIsMenuOpen(false)}>×</button>
            <ul className={styles.mobileNavLinks}>
              {navItems.map((item, index) => (
                <li
                  key={index}
                  className="cursor-pointer"
                  onClick={() => {
                    setIsMenuOpen(false);
                    item.onClick();
                  }}
                >
                  {item.label}
                </li>
              ))}
            </ul>
            <button
              className={styles.loginBtn}
              onClick={() => {
                setIsMenuOpen(false);
                navigate(refreshToken ? "/dashboard/home" : "/login");
              }}
            >
              {refreshToken ? "Dashboard" : "Login"}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default HomeNav;
