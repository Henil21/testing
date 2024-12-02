"use client";

import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../redux/slices/authSlice';
import axios from 'axios';
import styles from "./page.module.css"
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('https://api.axamine.ignitionnestlabs.in/signup', {
        name,
        email,
        password,
      });

      const { token, credits } = response.data;
      dispatch(loginSuccess({ token, credits }));
      router.push('/signin');  
      
      console.log('Signed up successfully:', response.data);
    } catch (err) {
      setError('Signup failed. Please check your details.');
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h2 className={styles.title}>Sign Up</h2>
        {error && <p className={styles.error}>{error}</p>}
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={styles.input}
          required
        />
        <input
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
        <button type="submit" className={`${styles.button} buttonWithGradient`}>Sign Up</button>
        <p className={styles.smallPara}>Already have a account<Link className={styles.sinUpLink} href={"/signin"}>LOGIN</Link></p>
      </form>
    </div>
  );
};

export default SignUp;
