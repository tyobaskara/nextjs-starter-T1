import Head from 'next/head';
import MainLayout from '../components/_layouts/main.layout';

// Containers
import Home from '../containers/Home/Home.container';

export default function HomePage() {
  return (
    <MainLayout>
      <Head>
        <title>Home Title</title>
      </Head>

      <Home />
    </MainLayout>
  );
}
