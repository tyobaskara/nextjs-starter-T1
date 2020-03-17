import Head from 'next/head';
import MainLayout from '../components/_layouts/main.layout';

// Containers
import HomeContainer from '../containers/home/home.container';

const HomePage = () => (
  <MainLayout>
    <Head>
      <title>Home Title</title>
    </Head>
    <HomeContainer />
  </MainLayout>
);

export default HomePage;
