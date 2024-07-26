import React from 'react';
import styles from '../styles/footer.module.scss';
import { FaSquareXTwitter } from "react-icons/fa6"; 
import { FaFacebookSquare } from "react-icons/fa";
import { FaSquareInstagram } from "react-icons/fa6";

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.footerContent}>
          <div className={styles.section}>
            <p className={styles.title}>Splitwise</p>
            <ul>
              <li><a className={styles.link} href="/about">About</a></li>
              <li><a className={styles.link} href="/press">Press</a></li>
              <li><a className={styles.link} href="https://blog.splitwise.com">Blog</a></li>
              <li><a className={styles.link} href="/jobs">Jobs</a></li>
              <li><a className={styles.link} href="/calculators">Calculators</a></li>
              <li><a className={styles.link} href="https://dev.splitwise.com/">API</a></li>
            </ul>
          </div>
          <div className={styles.separator}></div>
          <div className={styles.section}>
            <p className={styles.title1}>Account</p>
            <ul>
              <li><a className={styles.link} href="/login">Log in</a></li>
              <li><a className={styles.link} href="/signup">Sign up</a></li>
              <li><a className={styles.link} href="/password_reset">Reset password</a></li>
              <li><a className={styles.link} href="/account/settings">Settings</a></li>
              <li><a className={styles.link} href="/subscriptions/new">Splitwise Pro</a></li>
              <li><a className={styles.link} href="/pay">Splitwise Pay</a></li>
            </ul>
          </div>
          <div className={styles.separator}></div>
          <div className={styles.section}>
            <p className={styles.title2}>More</p>
            <ul>
              <li><a className={styles.link} href="/contact">Contact us</a></li>
              <li><a className={styles.link} href="http://feedback.splitwise.com/knowledgebase">FAQ</a></li>
              <li><a className={styles.link} href="/terms">Terms of Service</a></li>
              <li><a className={styles.link} href="/privacy">Privacy Policy</a></li>
              <li className={styles.social}>
                <a href="https://twitter.com/splitwise">
                  <FaSquareXTwitter/>
                </a>
                <a href="https://facebook.com/splitwise">
                  <FaFacebookSquare/>
                </a>
                <a href="https://www.instagram.com/splitwise/">
                  <FaSquareInstagram/>
                </a>
              </li>
            </ul>
          </div>
        </div>
       
      </div>
    </footer>
  );
};

export default Footer;
