import Head from 'next/head';
import fetch from 'isomorphic-unfetch';
import i18n from 'i18next';

// Components
import MainLayout from '~/components/_layouts/main.layout';

// Containers
import Home from '~/containers/Home/Home.container';

function HomePage() {
  const language = 'en';

  i18n.changeLanguage(language);

  return (
    <MainLayout 
      activeNav='Home'
      language={language}
    >
      <Head>
        <title>Home</title>
      </Head>

      <Home language={language} />
    </MainLayout>
  );
}

HomePage.getInitialProps = async () => {
  const res = await fetch('https://jsonplaceholder.typicode.com/photos');
  const photos = await res.json();
  
  return {
    namespacesRequired: ['common', 'pages'],
    photos
  }
}

export default HomePage;
