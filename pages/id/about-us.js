import Head from 'next/head';
import fetch from 'isomorphic-unfetch';

// Components
import MainLayout from '~/components/_layouts/main.layout';

// Container
import About from '~/containers/About/About.container';

// Constants
import navListData from '~/constants/navListData';

export default function AboutPage(props) {
  const { navList } = props;
  const language = 'id';

  return (
    <MainLayout 
      navList={navList[language]}
      activeNav='Tentang Kami'
      language={language}
    >
      <Head>
        <title>Tentang Kami</title>
      </Head>

      <About />
    </MainLayout>
  );
}

AboutPage.getInitialProps = async () => {
  const res = await fetch('https://jsonplaceholder.typicode.com/photos');
  const photos = await res.json();
  
  return {
    navList: navListData,
    photos
  }
}
