"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { FaGoogle, FaFacebookF } from "react-icons/fa"; // <-- import icons
import styles from "../../styles/login.module.css";



export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleSwitch = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setIsLogin(!isLogin);
      setIsAnimating(false);
    }, 600); // matches animation duration
  };

  return (
    <>
   

      {/* === MAIN AUTH CONTAINER === */}
      <div className={styles.container}>
        <motion.div
          className={styles.cardWrapper}
          animate={{
            flexDirection: isLogin ? "row" : "row-reverse",
          }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          {/* === HALF-CIRCLE OVERLAY === */}
          <div
            className={`${styles.circleTransition} ${
              isAnimating
                ? isLogin
                  ? styles.circleExpandRight
                  : styles.circleExpandLeft
                : ""
            }`}
          />

          {/* === FORM SECTION === */}
          <motion.div
            key={isLogin ? "login" : "signup"}
            initial={{ opacity: 0, x: isLogin ? -40 : 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className={styles.formSection}
          >
            {isLogin ? (
              <>
                <h1>Log in to Hypeon.ai</h1>
                <form className={styles.form}>
                  <input type="email" placeholder="Email" required />
                  <input type="password" placeholder="Password" required />
                  <button type="submit" className={styles.primaryBtn}>
                    Log In
                  </button>

                  {/* --- Social Login Buttons --- */}
                  <div className={styles.socialLogin}>
                    <p>Or continue with</p>
                    <div className={styles.socialIcons}>
                      <button className={styles.googleBtn}>
                        <FaGoogle />
                        <span>Google</span>
                      </button>
                      <button className={styles.facebookBtn}>
                        <FaFacebookF />
                        <span>Facebook</span>
                      </button>
                    </div>
                  </div>
                </form>

                <p className={styles.switchText}>
                  Don’t have an account?{" "}
                  <span className={styles.link} onClick={handleSwitch}>
                    Sign Up
                  </span>
                </p>
              </>
            ) : (
              <>
                <h1>Create your Hypeon.ai Account</h1>
                <form className={styles.form}>
                  <input type="text" placeholder="Full Name" required />
                  <input type="email" placeholder="Email" required />
                  <input type="password" placeholder="Password" required />
                  <button type="submit" className={styles.primaryBtn}>
                    Sign Up
                  </button>
                </form>
                <p className={styles.switchText}>
                  Already have an account?{" "}
                  <span className={styles.link} onClick={handleSwitch}>
                    Log In
                  </span>
                </p>
              </>
            )}
          </motion.div>

          {/* === OVERLAY SECTION === */}
          <motion.div
            key={isLogin ? "overlay-login" : "overlay-signup"}
            initial={{ opacity: 0, x: isLogin ? 40 : -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className={styles.overlaySection}
          >
            <div className={styles.overlayContent}>
              <h2>{isLogin ? "Hello, Friend!" : "Welcome Back!"}</h2>
              <p>
                {isLogin
                  ? "Fill in your details and start your journey with us."
                  : "Login with your credentials to continue your journey."}
              </p>
              <button onClick={handleSwitch} className={styles.overlayBtn}>
                {isLogin ? "Sign Up" : "Log In"}
              </button>
            </div>
          </motion.div>
        </motion.div>
      </div>

    
    </>
  );
}
