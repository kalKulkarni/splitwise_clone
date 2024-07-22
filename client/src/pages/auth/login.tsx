// pages/auth/login.tsx
import { useState } from 'react';
import { useRouter } from 'next/router';
import { api, setAuthToken } from '../../utils/api';
import styles from '../../styles/login.module.scss';
import Layout from '@/components/layout';
const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await api.post('/auth/login', { email, password });
            setAuthToken(response.data.token);
            localStorage.setItem('token', response.data.token);
            router.push('/');
        } catch (error) {
            console.error('Login error', error);
        }
    };

    return (
        <Layout>
        <div className={styles.container}>
            <div className={styles.grid}>

                <h1>Login</h1>
                <form onSubmit={handleSubmit}>
                    <div className={styles.card}>
                        <label>Email:</label>
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    </div>
                    <div className={styles.card}>
                        <label>Password:</label>
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    </div>
                    <button type="submit">Login</button>
                </form>
            </div>
        </div>
        </Layout>
    );
};

export default Login;
