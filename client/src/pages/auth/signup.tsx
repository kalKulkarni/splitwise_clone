import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import styles from '../../styles/signup.module.scss'
const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3000/auth/signup', { name, email, password });
      router.push('/auth/login');
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data.message || 'An error occurred');
      } else {
        setError('An unexpected error occurred');
      }
      console.error('Failed to signup', err);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <h1 className={styles.title}>Create an Account</h1>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <form onSubmit={handleSignup} className={styles.form}>
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
