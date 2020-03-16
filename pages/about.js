import Head from 'next/head';
import MainLayout from '../components/_layouts/MainLayout';

const About = () => (
  <MainLayout>
    <Head>
      <title>About Us Title</title>
    </Head>
    <div className="container">
      <h1>About Us</h1>
    </div>
  </MainLayout>
);

export default About;
