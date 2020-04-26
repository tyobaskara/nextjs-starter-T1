import Head from 'next/head';
import fetch from 'isomorphic-unfetch';

// Components
import LayoutMain from '@components/LayoutMain.layout';

// Container
import About from '@components/About.container';

// Constants
import navListData from '@constants/navListData';

export default function AboutPage(props) {
  const { navList } = props;
  const language = 'en';

  return (
    <LayoutMain 
      navList={navList[language]}
      activeNav='About Us'
      language={language}
    >
      <Head>
        <title>Tentang Kami</title>
      </Head>

      <About />
    </LayoutMain>
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
