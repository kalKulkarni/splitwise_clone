import React from 'react';
import Link from 'next/link';
import Layout from '../components/layout';
import styles from '../styles/dashboard.module.scss';

const Dashboard = () => {
  return (
    <Layout>
      <div className={styles.hero}>
        <div className={styles['hero-content']}>
          <h1>Less stress when sharing expenses with anyone.</h1>
          <p>
            Keep track of your shared expenses and balances with housemates, trips, groups, friends, and family.
          </p>
          <div className={styles.signup}>

            <Link href="/auth/signup">
              <span className={styles.button}>Sign Up</span>
            </Link>
          </div>
        </div>
        <div className={styles['hero-image']}>
          <img src="https://static.wixstatic.com/media/a40a93_98801c19ce96472b93accba9a85b720d~mv2.png/v1/fill/w_560,h_560,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/Splitwise%20cover%20icon2.png" alt="Hero Image" />
        </div>
      </div>
      <div className={styles.cards}>
        <div className={styles.card}>
          <Link href="/expenses/get-expenses">
            <h2>Expenses</h2>
            <p>Manage and track all your expenses in one place.</p>
            <div className={styles.expenseimage}>
              <img src="https://assets.splitwise.com/assets/home_page/fixtures/asset2@2x-1a032de8cdb5bd11e5c3cd37ce08391497ac0f14f2bba61987be82e3421ba42c.png" alt="Hero Image" />
            </div>
          </Link>
        </div>

        <div className={styles.card}>
          <Link href="/groups/get-groups">
            <h2>Groups</h2>
            <p>Create and manage groups for collaborative expense tracking.</p>
            <div className={styles.expenseimage}>
              <img src="https://assets.splitwise.com/assets/home_page/fixtures/asset1@2x-b7225a262a58f40d591ad168dded30b61f6c6e0daaba1b2e83f1e8f7263be050.png" alt="Hero Image" />
            </div>
          </Link>
        </div>
        <div className={styles.card}>
          <Link href="/expenses/add-expenses">
            <h2>Add expenses easily</h2>
            <p>Quickly add expenses on the go before you forget who paid.</p>
            <div className={styles.expenseimage}>
              <img src="https://assets.splitwise.com/assets/home_page/fixtures/asset3@2x-233776b3d1a29f11a498cb836488ad04a552788bb66c0f4e1fc0c5d2b0f4f69a.png" alt="Hero Image" />
            </div>
          </Link>
        </div>
      </div>
      <div className={styles.reviews}>

        <div className={styles.review}>
          <Link href="https://www.ft.com/content/8ccd6f0e-18bb-11e9-b93e-f4351a53f1c3">
            <p>“Fundamental” for tracking finances. As good as WhatsApp for containing awkwardness.</p>
            <div className={styles.reviewImage}>
              <img src="https://assets.splitwise.com/assets/home_page/logos/ft-152c170779821a7cff1ab468de0412defae4b4bcd1430bdd7cfc4901c8d338fc.png" alt="Hero Image" />
              <span className={styles.reviewText}>Financial Times</span>
            </div>
          </Link>
        </div>
        <div className={styles.review}>
          <Link href="https://www.nytimes.com/2018/08/28/smarter-living/money-finance-apps-tools.html">
            <p>“Makes it easy to split everything from your dinner bill to rent.</p>
            <div className={styles.reviewImage}>
              <img src="https://assets.splitwise.com/assets/home_page/logos/nyt-68d17fe3b579e967803b3bfa086047106eb7c67ba2d64149f606457e2df5437c.png" alt="Hero Image" />
              <span className={styles.reviewText}>NY Times</span>
            </div>
          </Link>
        </div>
        <div className={styles.review}>
          <Link href="https://www.businessinsider.in/?r=US&IR=T">
            <p>“I never fight with roommates over bills because of this genius expense-splitting app</p>
            <div className={styles.reviewImage}>
              <img src="https://assets.splitwise.com/assets/home_page/logos/bi-97c1894e95b2a91c0027403ebda13eb65e2c5df8a303dd36e53cd0b013a0da9f.png" alt="Hero Image" />
              <span className={styles.reviewText}>Business Insider</span>
            </div>
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;

