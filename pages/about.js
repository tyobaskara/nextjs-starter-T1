import Head from 'next/head';
import MainLayout from '../Containers/_layouts/MainLayout';

// Container
import AboutContainer from '../Containers/About/About.container';

function AboutPage() {
  return (
    <MainLayout>
      <Head>
        <title>About Us Title</title>
      </Head>

      <AboutContainer />
    </MainLayout>
  );
}

export default AboutPage;
