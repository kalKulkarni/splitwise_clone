import React, { ReactNode } from 'react';
import Link from 'next/link';
import styles from '../styles/header.module.scss';

interface HeaderProps {
  children?: ReactNode;
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ children, className }) => {
  return (
    <header className={`${styles.header} ${className}`}>
      <div className={styles.logo}>
        <Link href="/">
          <img src="https://www.switchedoninsurance.com/blog/wp-content/uploads/2019/09/sw-wide.png" alt="Splitwise Logo" />
        </Link>
      </div>
      <div className={styles.actions}>
        {children}
        <Link href="/auth/login">
          <span className={styles.button}>Login</span>
        </Link>
        <Link href="/auth/signup">
          <span className={styles.button}>Signup</span>
        </Link>
      </div>
    </header>
  );
};

export default Header;
