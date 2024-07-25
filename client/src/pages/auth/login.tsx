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
      const response = await axios.post('http://localhost:3000/auth/login', { email, password }, {
        
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjYwLCJpYXQiOjE3MjE5MDQ4NTcsImV4cCI6MTcyMTk5MTI1N30.DO65O8qIGblRgsKLGX_aj51VFNkLHDPl6Rp4Wh5-4xY"
        },
      });
              router.push('/dashboard')

      console.log(response.data);
    } catch (error) {
      setError('Invalid email or password');
      console.error('Error logging in:', error);
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
