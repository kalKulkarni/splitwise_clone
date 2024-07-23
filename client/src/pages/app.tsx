// // pages/_app.tsx
// import { AppProps } from 'next/app';
// import '../styles/globals.css';
// import Layout from '@/components/layout';

// function MyApp({ Component, pageProps }: AppProps) {
//   return (
//     <Layout>
//       <Component {...pageProps} />
//     </Layout>
//   );
// }

// export default MyApp;



// pages/_app.tsx
import { AppProps } from 'next/app';
import { AuthProvider } from '../context/authContext';
import '../styles/globals.scss'; 

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
}

export default MyApp;
