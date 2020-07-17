import Head from 'next/head';
import fetch from 'isomorphic-unfetch';
import { i18n } from '../../i18n';

// Components
import LayoutMain from '@components/layout.LayoutMain';

// Containers
import Home from '@components/page.Home';

// Redux Actions
import { setFooterData } from '@redux/actions/footerActions';

function HomePage(props) {
  const language = 'id';
  i18n.changeLanguage(language);

  return (
    <LayoutMain 
      activeNav='Beranda'
      language={language}
      footerData={props.footerData}
    >
      <Head>
        <title>Beranda</title>
        <meta name="Description" content="Beranda" />
      </Head>

      <Home 
        {...props}
        language={language} 
      />
    </LayoutMain>
  );
}

HomePage.getInitialProps = async ({ store }) => {
  // const { footer: { data } } = store.getState();

  const res = await fetch('http://nonprod.dhealth.arinanda.com/api/v1/home');
  const { data: content } = await res.json();

  const testimonialRes = await fetch('http://nonprod.dhealth.arinanda.com/api/v1/testimonial?pageNumber=1&pageSize=3');
  const { data: testimonialData } = await testimonialRes.json();

  const articleAndNewsres = await fetch(`http://nonprod.dhealth.arinanda.com/api/v1/article?language=id&pageNumber=1&pageSize=3`);
  const { data: articleAndNewsData } = await articleAndNewsres.json();
  
  const footerRes = await fetch('http://nonprod.dhealth.arinanda.com/api/v1/footer');
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
