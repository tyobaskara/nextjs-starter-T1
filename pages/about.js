import Head from 'next/head';
import MainLayout from '~/components/_layouts/main.layout';

// Container
import About from '~/containers/About/About.container';

export default function AboutPage() {
  return (
    <MainLayout>
      <Head>
        <title>About Us Title</title>
      </Head>

      <About />
    </MainLayout>
  );
}
