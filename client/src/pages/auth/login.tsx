import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import styles from '../../styles/login.module.scss'
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post('/auth/login', { email, password });
      const { token } = response.data;
      if (token) {
        localStorage.setItem('token', token);
        router.push('/dashboard');
      } else {
        setError('Token is undefined');
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data.message || 'An error occurred');
      } else {
        setError('An unexpected error occurred');
      }
      console.error('Failed to login', err);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <h1 className={styles.title}>Welcome Back</h1>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <form onSubmit={handleLogin} className={styles.form}>
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

export default Login;
