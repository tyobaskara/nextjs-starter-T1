import Head from 'next/head';
import fetch from 'isomorphic-unfetch';
import { i18n } from '../../i18n';

// Components
import LayoutMain from '@components/LayoutMain.layout';

// Container
import About from '@components/About.container';

// Constants
import navListData from '@constants/navListData';

export default function AboutPage(props) {
  const { navList } = props;
  const language = 'en';

  i18n.changeLanguage(language);

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
    namespacesRequired: ['common'],
    navList: navListData,
    photos
  }
}
