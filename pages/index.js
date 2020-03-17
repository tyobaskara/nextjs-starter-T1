import Head from 'next/head';
import MainLayout from '../components/_layouts/main.layout';

// Containers
import HomeContainer from '../containers/home/home.container';

export default function HomePage() {
  return (
    <MainLayout>
      <Head>
        <title>Home Title</title>
      </Head>

      <HomeContainer />
    </MainLayout>
  );
}
