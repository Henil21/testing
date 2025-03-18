"use client";

import { useState, Suspense } from 'react';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../redux/slices/authSlice';
import axios from 'axios';
import styles from "./page.module.css";
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { auth, googleProvider, signInWithPopup } from '../firebase/firebaseConfig';


const SignInContent = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const searchParams = useSearchParams();
  const dispatch = useDispatch();
  const router = useRouter();
  const redirectPath = searchParams.get("redirect") || "/";  // Fallback to home if no redirect
  const signInMessage = redirectPath === "/chatbox" 
    ? "Sign In to open the chatbox" 
    : "Sign In";


 
    const handleGoogleSignIn = async () => {
      try {
        // Step 1: Sign in with Google and get the Firebase user token
        const result = await signInWithPopup(auth, googleProvider);
        const user = result.user;
    
        // Get the Firebase token
        const firebaseToken = await user.getIdToken();
    
        // Step 2: Exchange the Firebase token with your backend
        const response = await axios.post('https://gateway-server.agreeablepebble-91c72eda.southindia.azurecontainerapps.io/user/exchange-token', {
          firebase_token: firebaseToken,
        });
    
        // Step 3: Extract the token and credits from the response
        const { access_token, credits } = response.data;
    
        // Step 4: Dispatch the Redux action to save the token and credits
        dispatch(loginSuccess({ token:access_token, credits }));
    
        // Step 5: Redirect the user to the appropriate path
        router.push(redirectPath);
    
        console.log('Google sign-in and backend exchange successful:', response.data);
      } catch (err) {
        console.error('Google sign-in error or backend exchange failed:', err);
        setError('Google Sign-In failed. Please try again.');
      }
    };
    

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if(!agree) {
        setError('Please agree to the Terms and Conditions.');
        return;
      }
      const response = await axios.post('https://gateway-server.agreeablepebble-91c72eda.southindia.azurecontainerapps.io/user/login', {
        email,
        password,
      });
  
      const { access_token, credits } = response.data;
      dispatch(loginSuccess({ token:access_token, credits }));
      router.push(redirectPath);
  
      console.log('Logged in successfully:', response.data);
    } catch (err) {
      setError('Login failed. Please check your credentials.');
    }
  };
  const [agree, setAgree] = useState(false);
  

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h2 className={styles.title}>{signInMessage}</h2>
        {error && <p className={styles.error}>{error}</p>}
        {/* <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={styles.input}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={styles.input}
          required
        />
        <button type="submit" className={`${styles.button} buttonWithGradient`}>Sign In</button> */}
        <div className={styles.checkboxContainer}>
          <input
            type="checkbox"
            id="agree"
            checked={agree}
            onChange={() => setAgree(!agree)}
          />
          <label htmlFor="agree" className={styles.checkboxLabel}>
            I agree to the{" "}
            <Link href="/termsandconditions" className={styles.termsLink}>
              Terms and Conditions
            </Link>
          </label>
        </div>
        {!agree && <p className={styles.error}>Please agree to the Terms and Conditions.</p>}
        <button
          type="button"
          disabled={!agree}
          onClick={handleGoogleSignIn}
          className={`${styles.button} buttonWithGradient`}
        >
          Sign In with Google
           <img
    src="https://www.google.com/favicon.ico"
    alt="Google Logo"
    className={styles.googleLogo}
  />
        </button>
        {/* <p className={styles.smallPara}>Don&apos;t have an account? <Link className={styles.sinUpLink} href={"/signup"}>SIGNUP</Link></p> */}
      </form>
    </div>
  );
};

const SignIn = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SignInContent />
    </Suspense>
  );
};

export default SignIn;
