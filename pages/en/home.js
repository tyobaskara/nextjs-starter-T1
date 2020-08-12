import Head from 'next/head';
import fetch from 'isomorphic-unfetch';
import { i18n } from '../../i18n';

// Components
import LayoutMain from '@components/layout.LayoutMain';

// Containers
import Home from '@components/page.Home';

// Redux Actions
import { setFooterData } from '@redux/actions/footerActions';

// Config
import Config from '@config/api';

function HomePage(props) {
  const language = 'en';
  i18n.changeLanguage(language);

  return (
    <LayoutMain 
      activeNav='Home'
      language={language}
      footerData={props.footerData}
    >
      <Head>
        <title>Home</title>
        <meta name="Description" content="Home" />
      </Head>

      <Home 
        {...props}
        language={language} 
      />
    </LayoutMain>
  );
}

HomePage.getInitialProps = async ({ store }) => {
  const apiUrl = Config.apiUrl[process.env.NODE_ENV];
  // const { footer: { data } } = store.getState();

  const res = await fetch(`${apiUrl}/home`);
  const { data: content } = await res.json();

  const testimonialRes = await fetch(`${apiUrl}/testimonial?pageNumber=1&pageSize=3`);
  const { data: testimonialData } = await testimonialRes.json();

  const articleAndNewsRes = await fetch(`${apiUrl}/article?language=en&pageNumber=1&pageSize=3`);
  const { data: articleAndNewsData } = await articleAndNewsRes.json();

  const footerRes = await fetch(`${apiUrl}/footer`);
  const { data: footerData } = await footerRes.json();
  await store.dispatch(setFooterData(footerData));
  
  return {
    namespacesRequired: ['pages', 'common', 'articleAndNews'],
    content,
    testimonialData,
    articleAndNewsData,
    footerData
  }
}

export default HomePage;
