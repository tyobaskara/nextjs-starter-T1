import Head from 'next/head';
import MainLayout from '../components/_layouts/main.layout';

// Container
import AboutContainer from '../containers/about/about.container';

export default function AboutPage() {
  return (
    <MainLayout>
      <Head>
        <title>About Us Title</title>
      </Head>

      <AboutContainer />
    </MainLayout>
  );
}
