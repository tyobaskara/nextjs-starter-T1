import Head from 'next/head';
import fetch from 'isomorphic-unfetch';
import { i18n } from '../../i18n';

// Components
import LayoutMain from '@components/LayoutMain.layout';

// Containers
import Home from '@components/Home.container';

function HomePage(props) {
  const language = 'id';

  i18n.changeLanguage(language);

  return (
    <LayoutMain 
      activeNav='Beranda'
      language={language}
    >
      <Head>
        <title>Beranda</title>
      </Head>

      <Home language={language} />
    </LayoutMain>
  );
}

HomePage.getInitialProps = async () => {
  const res = await fetch('https://jsonplaceholder.typicode.com/photos');
  const photos = await res.json();
  
  return {
    namespacesRequired: ['pages'],
    photos
  }
}

export default HomePage;
