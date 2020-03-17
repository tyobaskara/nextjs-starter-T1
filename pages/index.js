import Head from 'next/head';
import MainLayout from '../Containers/_layouts/MainLayout';

// Containers
import HomeContainer from '../Containers/Home/Home.container';

const HomePage = () => (
  <MainLayout>
    <Head>
      <title>Home Title</title>
    </Head>
    <HomeContainer />
  </MainLayout>
);

export default HomePage;
