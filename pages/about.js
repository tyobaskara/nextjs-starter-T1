import Head from 'next/head';
import MainLayout from '../components/_layouts/MainLayout';

// Container
import AboutContainer from '../containers/about.container';

const AboutPage = () => (
  <MainLayout>
    <Head>
      <title>About Us Title</title>
    </Head>

    <AboutContainer />
  </MainLayout>
);

export default AboutPage;
