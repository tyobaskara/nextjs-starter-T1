import Head from 'next/head';
import fetch from 'isomorphic-unfetch';

// Components
import MainLayout from '~/components/_layouts/main.layout';

// Containers
import Home from '~/containers/Home/Home.container';

// Constants
import navListData from '~/constants/navListData';

export default function HomePage(props) {
  const { navList } = props;
  const language = 'id';

  return (
    <MainLayout 
      navList={navList[language]}
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
    navList: navListData,
    photos
  }
}
