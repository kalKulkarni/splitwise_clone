// pages/auth/signup.tsx
import { useState } from 'react';
import { useRouter } from 'next/router';
import styles from '../../styles/signup.module.scss';
import { api } from '../../utils/api';
import Layout from '@/components/layout';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState<string | null>(null);


  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post('/auth/signup', { email, password });
      router.push('/auth/login');
    } catch (error) {
      console.error('Signup error', error);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <h1 className={styles.title}>Create an Account</h1>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formControl}>
            <label className={styles.label}>Name:</label>
            <input 
              type="text" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              className={styles.input} 
              required 
              />
          </div>
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
          <button type="submit" className={styles.submitButton}>Signup</button>
        </form>
        <p className={styles.redirect}>
          Already have an account? <a href="/auth/login" className={styles.link}>Login here</a>
        </p>
      </div>
    </div>
  );
};

export default Signup;


