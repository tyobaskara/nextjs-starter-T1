import Head from 'next/head';
import MainLayout from '../components/_layouts/MainLayout';

// Containers
import HomeContainer from '../containers/home';

const HomePage = () => (
  <MainLayout>
    <Head>
      <title>Home Title</title>
    </Head>
    <HomeContainer />
  </MainLayout>
);

export default HomePage;
