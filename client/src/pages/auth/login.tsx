// pages/auth/signup.tsx
import { useState } from 'react';
import { useRouter } from 'next/router';
import styles from '../../styles/signup.module.scss';
import { api } from '../../utils/api';
import Layout from '@/components/layout';
import axios from 'axios';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post('/auth/login', { email, password });
      router.push('/dashboard');
    } catch (err) {
        if (axios.isAxiosError(err) && err.response) {
            if (err.response.status === 401) {
              setError('Invalid email or password');
            } else {
              setError('Login error');
            }
          } else {
            setError('An unexpected error occurred');
          }
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <h1 className={styles.title}>Welcome Back</h1>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formControl}>
            <label className={styles.label}>Email:</label>
            <input 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              className={styles.input} 
              required 
              />
          </div>
          <div className={styles.formControl}>
            <label className={styles.label}>Password:</label>
            <input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              className={styles.input} 
              required 
              />
          </div>
          {error && <div className="error">{error}</div>}

          <button type="submit" className={styles.submitButton}>Log In </button>
        </form>
        <p className={styles.redirect}>
          Don't have an account? <a href="/auth/signup" className={styles.link}>Signup here</a>
        </p>
      </div>
    </div>
  );
};

export default Signup;


