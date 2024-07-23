// pages/index.tsx
import { GetServerSideProps } from 'next';

const Home = () => {
  return null;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    redirect: {
      destination: '/auth/login',
      permanent: false,
    },
  };
};

export default Home;
