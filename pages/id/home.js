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

      <Home 
        {...props}
        language={language} 
      />
    </LayoutMain>
  );
}

HomePage.getInitialProps = async () => {
  const res = await fetch('http://nonprod.dhealth.arinanda.com/api/v1/home');
  const { data } = await res.json();
  
  return {
    namespacesRequired: ['pages'],
    content: data
  }
}

export default HomePage;
