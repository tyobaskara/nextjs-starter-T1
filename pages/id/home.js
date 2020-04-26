import Head from 'next/head';
import fetch from 'isomorphic-unfetch';
import { i18n } from '~/i18n';

// Components
import MainLayout from '~/components/_layouts/main.layout';

// Containers
import Home from '~/containers/Home/Home.container';

function HomePage(props) {
  const language = 'id';

  i18n.changeLanguage(language);

  return (
    <MainLayout 
      activeNav='Beranda'
      language={language}
    >
      <Head>
        <title>Beranda</title>
      </Head>

      <Home language={language} />
    </MainLayout>
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
